import fs from 'node:fs'; import path from 'node:path';
const ROOTS=['packages','.storybook']; const FILE_RX=/\.(tsx?|jsx?)$/; const IMPORT_SCSS=/(['"])([^'"]+)\.scss\1/g;
function walk(d:string,a:string[]=[]){ for(const e of fs.readdirSync(d,{withFileTypes:true})){ const f=path.join(d,e.name); if(e.isDirectory()) walk(f,a); else if(FILE_RX.test(e.name)) a.push(f);} return a; }
const files=ROOTS.filter(p=>fs.existsSync(p)).flatMap(p=>walk(p)); let changed=0;
for(const f of files){ const b=fs.readFileSync(f,'utf8'); const a=b.replace(IMPORT_SCSS,(_m,q,p)=>`${q}${p}.css${q}`); if(a!==b){ fs.writeFileSync(f,a,'utf8'); console.log(`[imports] Updated ${path.relative(process.cwd(),f)}`); changed++; } }
console.log(`[imports] Done. Files changed: ${changed}`);
