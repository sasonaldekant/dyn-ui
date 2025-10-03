import fs from 'node:fs'; import path from 'node:path';
const ROOTS=['packages/dyn-ui-react/src','.storybook']; const MAP_PATH='config/migrate.map.json';
type Mapping = Record<string,string>; const overrides:Mapping = fs.existsSync(MAP_PATH)?JSON.parse(fs.readFileSync(MAP_PATH,'utf8')):{};
function walk(d:string,a:string[]=[]){ for(const e of fs.readdirSync(d,{withFileTypes:true})){ const f=path.join(d,e.name); if(e.isDirectory()) walk(f,a); else if(e.name.endsWith('.scss')) a.push(f);} return a; }
const files=ROOTS.filter(p=>fs.existsSync(p)).flatMap(p=>walk(p)); let converted=0;
for(const file of files){ const cssPath=file.replace(/\.scss$/,'.css'); let txt=fs.readFileSync(file,'utf8');
txt=txt.replace(/\$[a-zA-Z0-9_-]+/g,(m)=>{ if(overrides[m]) return overrides[m]; const body=m.slice(1);
if(/^[a-zA-Z]+-[a-zA-Z0-9_-]+$/.test(body)) return `var(--dyn-${body})`;
if(/^(primary|secondary|text|bg|muted|success|warning|danger|neutral)$/.test(body)) return `var(--dyn-colors-${body})`;
if(/^radius-/.test(body)) return `var(--dyn-radius-${body.replace(/^radius-/,'')})`;
if(/^spacing-/.test(body)) return `var(--dyn-spacing-${body.replace(/^spacing-/,'')})`;
if(/^size-/.test(body)) return `var(--dyn-size-${body.replace(/^size-/,'')})`;
if(/^fontSize-/.test(body)) return `var(--dyn-fontSize-${body.replace(/^fontSize-/,'')})`;
if(/^fontWeight-/.test(body)) return `var(--dyn-fontWeight-${body.replace(/^fontWeight-/,'')})`;
return `var(--dyn-${body})`; });
fs.writeFileSync(cssPath, txt, 'utf8'); converted++; console.log(`[migrate] ${path.relative(process.cwd(),file)} -> ${path.relative(process.cwd(),cssPath)}`); }
console.log(`[migrate] Done. Converted: ${converted}`);
