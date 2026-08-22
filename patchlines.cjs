const fs = require('fs');
const f = 'src/pages/Home.jsx';
const lines = fs.readFileSync(f, 'utf8').split('\n');
const fixes = {
  94: '  const [slides, setSlides] = useState(() => sanitizeSlides(DEFAULT_HERO_SLIDES));',
  96: '  useEffect(() => {',
};
for (const k of Object.keys(fixes)) {
  const ln = +k;
  lines[ln - 1] = fixes[k];
}
fs.writeFileSync(f, lines.join('\n'));
console.log('Line 94:', JSON.stringify(lines[93]));
console.log('Line 96:', JSON.stringify(lines[95]));
