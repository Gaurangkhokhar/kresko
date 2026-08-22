$ErrorActionPreference = 'SilentlyContinue'
$ws = 'C:\Users\jaatg\OneDrive\Desktop\Digital In App\kresko-chemicals-web'
Stop-Process -Name node -Force
Start-Sleep -Seconds 2

# Start dev server in a background job, capture log to file
$job = Start-Job { Set-Location 'C:\Users\jaatg\OneDrive\Desktop\Digital In App\kresko-chemicals-web'; npm run dev > 'C:\Users\jaatg\OneDrive\Desktop\Digital In App\kresko-chemicals-web\dev.log' 2>&1 }

# Wait for server to respond
$ready = $false
for ($i = 0; $i -lt 25; $i++) {
  Start-Sleep -Seconds 1
  try { $t = Invoke-WebRequest -Uri http://127.0.0.1:5173/ -UseBasicParsing -TimeoutSec 3; if ($t.StatusCode -eq 200) { $ready = $true; break } } catch {}
}
Write-Output "SERVER_READY: $ready"

# Headless render (executes React, captures DOM + any error overlay)
$chrome = 'C:\Users\jaatg\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe'
& $chrome --headless --disable-gpu --disable-dev-shm-usage --no-sandbox --virtual-time-budget=12000 --timeout=20000 --dump-dom --virtual-time-budget=12000 http://127.0.0.1:5173/ > "$ws\rendered.html" 2> "$ws\chrome.err"
Write-Output "CHROME_EXIT: $LASTEXITCODE"

# Analyze rendered DOM
if (Test-Path "$ws\rendered.html") {
  $dom = Get-Content "$ws\rendered.html" -Raw
  Write-Output "DOM_LEN: $($dom.Length)"
  Write-Output "HERO_SLIDE_COUNT: $(($dom -split 'hero-slide' | Measure-Object).Count - 1)"
  Write-Output "HERO_TRACK: $(if ($dom -match 'hero-track') { 'YES' } else { 'NO' })"
  Write-Output "HERO_ARROW: $(if ($dom -match 'slider-arrow') { 'YES' } else { 'NO' })"
  Write-Output "TESTIMONIAL_SLIDE: $(if ($dom -match 'testimonial-slide') { 'YES' } else { 'NO' })"
  Write-Output "TESTIMONIAL_DOTS: $(if ($dom -match 'testimonial-dot') { 'YES' } else { 'NO' })"
  Write-Output '--- ERROR SCAN ---'
  $errs = $dom -split "`n" | Select-String -Pattern 'TypeError|Cannot read|is not a function|is not defined|null is not|Error:|React' -SimpleMatch
  $errs | Select-Object -First 15 | Out-String -Width 300
  Write-Output '--- REACT ERROR OVERLAY check ---'
  if ($dom -match 'React|TypeError|Something went wrong|error-layer|__vite') { 'found error indicators' } else { 'no error indicators' }
  Write-Output '--- first 1200 chars of DOM ---'
  $dom.Substring(0, [Math]::Min(1200, $dom.Length))
} else {
  Write-Output 'NO rendered.html produced'
}

Write-Output '--- chrome.err (tail) ---'
if (Test-Path "$ws\chrome.err") { Get-Content "$ws\chrome.err" -Tail 20 | Out-String -Width 300 }

Stop-Job $job
Remove-Job $job
Stop-Process -Name node -Force
Write-Output '=== DONE ==='
