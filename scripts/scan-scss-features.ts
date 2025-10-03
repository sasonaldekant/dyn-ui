import fs from 'node:fs'; import path from 'node:path';
const ROOTS = ['packages/dyn-ui-react/src', '.storybook'];
const SCAN = { mixin:/@(mixin|include)\b/, functions:/\b(lighten|darken|mix|adjust-(?:hue|color)|saturate|desaturate|rgba?\()\b/, moduleUse:/@(use|forward|import)\s+['"][^'"]+['"]/, variables:/\$[a-zA-Z0-9_-]+/ };
function walk(d:string,a:string[]=[]){ for(const e of fs.readdirSync(d,{withFileTypes:true})){ const f=path.join(d,e.name); if(e.isDirectory()) walk(f,a); else if(e.name.endsWith('.scss')) a.push(f);} return a; }
const files = ROOTS.filter(p=>fs.existsSync(p)).flatMap(p=>walk(p));
const rows:any[]=[];
for(const file of files){ const t=fs.readFileSync(file,'utf8'); const marks:string[]=[]; for(const [k,rx] of Object.entries(SCAN)){ if((rx as RegExp).test(t)) marks.push(k);} rows.push({file,markers:marks}); }
console.log('SCSS features report:'); for(const r of rows){ console.log(`- ${r.file} :: ${r.markers.join(', ') || 'OK'}`); }
fs.mkdirSync('reports',{recursive:true}); fs.writeFileSync('reports/scss-features.json', JSON.stringify(rows,null,2)); console.log('\n[scan-scss-features] wrote reports/scss-features.json');
