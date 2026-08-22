const fs=require('fs');const path=require('path');
const dir='dist/assets';
const want=process.argv[2];
let found=[];
function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){
  const p=path.join(d,e.name);
  if(e.isDirectory()) walk(p);
  else { try{const c=fs.readFileSync(p,'utf8');if(c.includes(want)) found.push(p);}catch{}}
}}
walk(dir);
console.log(want+' => '+ (found.length? found.join(' | '):'NOT FOUND in dist'));
