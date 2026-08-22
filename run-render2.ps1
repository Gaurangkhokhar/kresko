$ErrorActionPreference = 'SilentlyContinue'
$ws = 'C:\Users\jaatg\OneDrive\Desktop\Digital In App\kresko-chemicals-web'
Stop-Process -Name node -Force
Stop-Process -Name npm -Force
Start-Sleep -Seconds 3

# Launch dev server via cmd (reliable npm resolution); output discarded (no pipe block)
$p = Start-Process -FilePath 'cmd.exe' -ArgumentList '/c npm run dev' -WorkingDirectory $ws -WindowStyle Hidden -PassThru

# Poll Vite ports until ready
$ready = $false; $url = ''
$ports = @(5173, 5174, 5175, 5176, 5177)
for ($i = 0; $i -lt 30; $i++) {
  Start-Sleep -Seconds 1
  foreach ($port in $ports) {
    try { $t = Invoke-WebRequest -Uri "http://127.0.0.1:$port/" -UseBasicParsing -TimeoutSec 2; if ($t.StatusCode -eq 200) { $ready = $true; $url = "http://127.0.0.1:$port"; break } } catch {}
  }
  if ($ready) { break }
}
Write-Output "SERVER_READY: $ready  URL: $url"

if ($ready) {
  Start-Sleep -Seconds 1
  $chrome = 'C:\Users\jaatg\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe'
  & $chrome --headless --disable-gpu --disable-dev-shm-usage --no-sandbox --virtual-time-budget=12000 --timeout=20000 --dump-dom "$url" > "$ws\rendered.html" 2> "$ws\chrome.err"
  Write-Output "CHROME_EXIT: $LASTEXITCODE"

  if (Test-Path "$ws\rendered.html") {
    $dom = Get-Content "$ws\rendered.html" -Raw
    Write-Output "DOM_LEN: $($dom.Length)"
    Write-Output "HERO_SLIDE_COUNT: $(($dom -split 'hero-slide' | Measure-Object).Count - 1)"
    Write-Output "HERO_TRACK: $(if ($dom -match 'hero-track') { 'YES' } else { 'NO' })"
    Write-Output "HERO_ARROW: $(if ($dom -match 'slider-arrow') { 'YES' } else { 'NO' })"
    Write-Output "TESTIMONIAL_SLIDE: $(if ($dom -match 'testimonial-slide') { 'YES' } else { 'NO' })"
    Write-Output "TESTIMONIAL_DOTS: $(if ($dom -match 'testimonial-dot') { 'YES' } else { 'NO' })"
    Write-Output '--- ERROR SCAN ---'
    $dom -split "`n" | Select-String -Pattern 'TypeError|Cannot read|is not a function|is not defined|null is not|Something went wrong|Error:' | Select-Object -First 15 | Out-String -Width 300
    Write-Output '--- REACT ERROR OVERLAY check ---'
    if ($dom -match '__vite-error|react-error|__vite-broken-overlay|TypeError|Cannot read') { 'error indicators PRESENT' } else { 'no error indicators' }
    Write-Output '--- first 1500 chars of DOM ---'
    $dom.Substring(0, [Math]::Min(1500, $dom.Length))
  } else {
    Write-Output 'NO rendered.html produced'
  }

  Write-Output '--- chrome.err (tail) ---'
  if (Test-Path "$ws\chrome.err") { Get-Content "$ws\chrome.err" -Tail 20 | Out-String -Width 300 }
}

Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue
Stop-Process -Name node -Force -ErrorAction SilentlyContinue
Stop-Process -Name npm -Force -ErrorAction SilentlyContinue
Write-Output '=== DONE ==='
