$ErrorActionPreference = 'SilentlyContinue'
$ws = 'C:\Users\jaatg\OneDrive\Desktop\Digital In App\kresko-chemicals-web'
$devlog = 'C:\temp\kresko-dev.log'
$dom    = 'C:\temp\kresko-dom.html'
$cherr  = 'C:\temp\kresko-chrome.err'
if (-not (Test-Path 'C:\temp')) { New-Item -ItemType Directory -Path 'C:\temp' | Out-Null }
# clear previous artifacts
Remove-Item $devlog, $dom, $cherr -ErrorAction SilentlyContinue

Stop-Process -Name node -Force
Stop-Process -Name npm -Force
Stop-Process -Name chrome -Force
Start-Sleep -Seconds 2

# Start dev server via cmd, redirect to space-free log
Start-Process -FilePath 'cmd.exe' -ArgumentList "/c npm run dev > `"$devlog`" 2>&1" -WorkingDirectory $ws -WindowStyle Hidden

# Poll for readiness
$ready = $false; $port = 0
for ($i = 0; $i -lt 35; $i++) {
  Start-Sleep -Seconds 1
  foreach ($p in 5173..5177) {
    try { $t = Invoke-WebRequest -Uri "http://127.0.0.1:$p/" -UseBasicParsing -TimeoutSec 2; if ($t.StatusCode -eq 200) { $ready = $true; $port = $p; break } } catch {}
  }
  if ($ready) { break }
}
Write-Output "SERVER_READY: $ready  PORT: $port"
Write-Output '--- dev.log head ---'
if (Test-Path $devlog) { Get-Content $devlog -TotalCount 25 | Out-String -Width 240 }

if ($ready) {
  $chrome = 'C:\Users\jaatg\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe'
  $cjob = Start-Job {
    $c = 'C:\Users\jaatg\AppData\Local\ms-playwright\chromium-1228\chrome-win64\chrome.exe'
    & $c --headless=new --disable-gpu --no-sandbox --timeout=15000 --dump-dom ('http://127.0.0.1:' + $using:port) > 'C:\temp\kresko-dom.html' 2> 'C:\temp\kresko-chrome.err'
  }
  Wait-Job $cjob -Timeout 30 | Out-Null
  if ($cjob.State -eq 'Running') { Write-Output 'CHROME_TIMED_OUT'; Stop-Job $cjob }
  Remove-Job $cjob
  Write-Output 'CHROME_EXIT_CODE_FILE_PRESENT'

  if (Test-Path $dom) {
    $d = Get-Content $dom -Raw
    Write-Output "DOM_LEN: $($d.Length)"
    Write-Output "HERO_SLIDE_COUNT: $(($d -split 'hero-slide' | Measure-Object).Count - 1)"
    Write-Output "HERO_TRACK: $(if ($d -match 'hero-track') { 'YES' } else { 'NO' })"
    Write-Output "HERO_ARROW: $(if ($d -match 'slider-arrow') { 'YES' } else { 'NO' })"
    Write-Output "HERO_DOTS: $(if ($d -match 'slider-dot') { 'YES' } else { 'NO' })"
    Write-Output "TESTIMONIAL_SLIDE: $(if ($d -match 'testimonial-slide') { 'YES' } else { 'NO' })"
    Write-Output "TESTIMONIAL_DOTS: $(if ($d -match 'testimonial-dot') { 'YES' } else { 'NO' })"
    Write-Output '--- ERROR SCAN ---'
    $d -split "`n" | Select-String -Pattern 'TypeError|Cannot read|is not a function|is not defined|Something went wrong|React-dom|error-overlay|__vite' | Select-Object -First 15 | Out-String -Width 300
    Write-Output '--- DOM snippet (first 1600 chars) ---'
    $d.Substring(0, [Math]::Min(1600, $d.Length))
  } else { Write-Output 'NO_DOM_FILE' }

  Write-Output '--- chrome.err (tail) ---'
  if (Test-Path $cherr) { Get-Content $cherr -Tail 15 | Out-String -Width 300 }
}

Stop-Process -Name node -Force
Stop-Process -Name npm -Force
Stop-Process -Name chrome -Force
Write-Output '=== DONE ==='
