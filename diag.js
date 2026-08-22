// Diagnostic: load the previewed site, capture console + page errors + hero DOM.
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const URL = process.argv[2] || 'http://localhost:5000/';

(async () => {
  const exe = require('path').join(process.env.LOCALAPPDATA || 'C:\\Users\\jaatg\\AppData\\Local', 'ms-playwright', 'chromium-1228', 'chrome-win', 'chrome.exe');
  let browser;
  try {
    browser = await puppeteer.launch({ executablePath: exe, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  } catch (e) {
    fs.writeFileSync('diag_result.txt', 'LAUNCH_FAILED: ' + e.message);
    console.error('LAUNCH_FAILED', e.message);
    return;
  }
  const page = await browser.newPage();
  const logs = [];
  const errors = [];
  page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
  page.on('pageerror', (e) => errors.push(`${e.message}\n${e.stack || ''}`));
  page.on('requestfailed', (req) => logs.push(`[REQFAIL] ${req.url()} - ${req.failure() && req.failure().errorText}`));
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 }).catch((e) => errors.push('NAV: ' + e.message));
  await page.waitForTimeout(3000);
  let heroHTML = '';
  let slideCount = 0;
  try {
    heroHTML = await page.evaluate(() => {
      const h = document.querySelector('.hero-slider');
      return h ? h.innerHTML.slice(0, 4000) : 'NO_HERO_SLIDER_FOUND';
    });
  } catch (e) {
    heroHTML = 'EVAL_ERROR: ' + e.message;
  }
  try {
    slideCount = await page.$eval ? (await page.evaluate(()=>document.querySelectorAll('.hero-slide').length)) : 0;
  } catch (e) { slideCount = -1; }
  const out = `URL: ${URL}
SLIDE_COUNT: ${slideCount}
HERO_HAS_TRACK: ${heroHTML.includes('hero-track')}
HERO_HAS_ARROWS: ${heroHTML.includes('slider-arrow')}
HERO_HTML:
${heroHTML}
---CONSOLE---
${logs.join('\n').slice(0, 6000)}
---PAGEERRORS---
${errors.join('\n').slice(0, 6000)}`;
  fs.writeFileSync('diag_result.txt', out);
  console.log(out);
  await browser.close();
})();