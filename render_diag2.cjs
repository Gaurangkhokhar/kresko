const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, 'dist');
const server = http.createServer((req, res) => {
  let u = req.url; if (u === '/') u = '/index.html';
  let file = path.join(root, decodeURIComponent(u));
  try {
    const b = fs.readFileSync(file);
    const ext = path.extname(file);
    const ct = { '.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json' }[ext]||'application/octet-stream';
    res.writeHead(200, { 'Content-Type': ct, 'Cache-Control':'no-store, no-cache, must-revalidate', 'Pragma':'no-cache' });
    res.end(b);
  } catch(e){ res.writeHead(404); res.end('not found'); }
});
server.listen(5002, () => {
  console.log('server up on :5002 (no-store)');
  const chrome='C:\\Users\\jaatg\\AppData\\Local\\ms-playwright\\chromium-1228\\chrome-win64\\chrome.exe';
  const args=['--headless=new','--disable-gpu','--disable-cache','--aggressive-cache-discard','--disable-dev-shm-use','--virtual-time-budget=20000','--timeout=30000','--dump-dom','http://localhost:5002/'];
  console.log('launching chrome (cache disabled)');
  const c=spawn(chrome,args,{stdio:['ignore','pipe','pipe']});
  let out='',err='';
  c.stdout.on('data',d=>out+=d);
  c.stderr.on('data',d=>err+=d);
  c.on('close',code=>{
    fs.writeFileSync('dom2.html',out||''); fs.writeFileSync('cc2.txt',err||'');
    console.log('EXIT='+code);
    console.log('HERO_SLIDE_DIV='+ (out.match(/hero-slide/g)||[]).length);
    console.log('LOCAL_DEFAULT_IMG='+ (out.match(/photo-1528218609959/g)||[]).length);
    console.log('BROKEN_BACKEND_IMG='+ (out.match(/kreskobackend\.onrender\.com\/uploads\/sliders/g)||[]).length);
    console.log('TRACK='+out.includes('hero-track'));
    console.log('TITLE='+out.includes('High-Performance Cleaning Concentrates'));
    console.log('DOM_LEN='+out.length);
    server.close(()=>process.exit(0));
  });
});
setTimeout(()=>{console.error('TIMEOUT');server.close(()=>process.exit(2));},50000);
