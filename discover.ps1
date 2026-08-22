$ws = 'C:\Users\jaatg\OneDrive\Desktop\Digital In App\kresko-chemicals-web'
Set-Location $ws
Write-Output "cwd: $(Get-Location)"
Write-Output "root index.html: $((Test-Path index.html))"
Write-Output "src index.html: $((Test-Path src\index.html))"
Write-Output "node_modules/playwright: $((Test-Path node_modules\playwright))"
Write-Output "node_modules/@playwright/test: $((Test-Path node_modules\@playwright\test))"
Write-Output '--- ms-playwright dirs ---'
Get-ChildItem 'C:\Users\jaatg\AppData\Local\ms-playwright' -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Name
Write-Output '--- chromium.executablePath via node ---'
node -e "try { console.log(require('playwright').chromium.executablePath()) } catch (e) { console.log('ERR: ' + e.message) }"
