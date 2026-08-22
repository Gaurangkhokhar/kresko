const fs = require('fs');
const [,,file,...args] = process.argv;
let lines = fs.readFileSync(file, 'utf8').split('\n');
let start=1,end=lines.length;
if(args.length>=1){start=+args[0];}
if(args.length>=2){end=+args[1];}
for(let i=start;i<=end;i++){console.log((i)+'|'+lines[i-1]);}
