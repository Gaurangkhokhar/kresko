$ErrorActionPreference = 'SilentlyContinue'
Stop-Process -Name node -Force
Start-Sleep -Seconds 2
$ws = 'C:\Users\jaatg\OneDrive\Desktop\Digital In App\kresko-chemicals-web'
Start-Process -FilePath 'cmd.exe' -ArgumentList "/c npm run dev > $ws\dev.log 2>&1" -WorkingDirectory $ws -WindowStyle Hidden
Start-Sleep -Seconds 13
Write-Output '=== dev.log (tail) ==='
Get-Content "$ws\dev.log" -Tail 30 | Out-String -Width 200
Write-Output '=== curl / ==='
try { $r = Invoke-WebRequest -Uri http://127.0.0.1:5173/ -UseBasicParsing -TimeoutSec 8; Write-Output "HTTP $($r.StatusCode)"; $r.Content | Out-String -Width 200 } catch { Write-Output "CURL_ERR: $_" }
Write-Output '=== curl /src/pages/Home.jsx (transform check) ==='
try { $r2 = Invoke-WebRequest -Uri http://127.0.0.1:5173/src/pages/Home.jsx -UseBasicParsing -TimeoutSec 10; Write-Output "HTTP $($r2.StatusCode) len=$($r2.Content.Length)" } catch { Write-Output "MODULE_ERR: $_" }
Stop-Process -Name node -Force
Write-Output '=== cleanup done ==='
