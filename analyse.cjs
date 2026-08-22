// Analyze captured dom.html + chrome_console.txt
const fs = require('fs');
let dom = '';
try { dom = fs.readFileSync('dom.html', 'utf8'); } catch (e) { console.log('no dom.html'); }
let con = '';
try { con = fs.readFileSync('chrome_console.txt', 'utf8'); } catch (e) {}

const count = (re) => (dom.match(re) || []).length;
console.log('=== DOM STATS ===');
console.log('hero-slide class occurrences:', count(/hero-slide/g));
console.log('hero-slide open-div count:', count(/<div class="hero-slide/g));
console.log('slider-arrow count:', count(/slider-arrow/g));
console.log('slider-dot count:', count(/slider-dot/g));
console.log('hero-title text present:', dom.includes('High-Performance Cleaning Concentrates'));
console.log('all 3 slide titles:', ['High-Performance Cleaning Concentrates','Build Your Own Cleaning Product Brand','Pine Oil & Citronella Floor Concentrates'].map(t=>t+':'+dom.includes(t)).join(' | '));

// Extract the hero-slider block
const hs = dom.indexOf('hero-slider');
const start = dom.indexOf('>', hs);
let block = dom.slice(hs, hs+3000);
console.log('\n=== HERO NEAR-MARKUP (first 2000 chars around hero-slider) ===');
console.log(block.slice(0,2000));

console.log('\n=== CHROME STDERR (first 4000) ===');
console.log(con.slice(0,4000));
