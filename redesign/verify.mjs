import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
const root=path.join(import.meta.dirname,'dist');
const files=[];function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,e.name);if(e.isDirectory())walk(f);else if(f.endsWith('.html'))files.push(f);}}walk(root);
const missing=[];
for(const f of files){const html=fs.readFileSync(f,'utf8');for(const m of html.matchAll(/(?:href|src)="(\/[^\"]*)"/g)){const u=m[1].split('#')[0].split('?')[0];if(!fs.existsSync(path.join(root,u)))missing.push({page:path.relative(root,f),target:u});}}
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
const office=fs.readFileSync(path.join(root,'nuestro-despacho/index.html'),'utf8');
const masters=JSON.parse(fs.readFileSync(path.join(import.meta.dirname,'image-delivery.json'),'utf8'));
for(const master of masters){const m=await sharp(path.join(import.meta.dirname,master.master)).metadata();if(m.width!==master.export[0]||m.height!==master.export[1])throw Error('4K export mismatch: '+master.name);}
const result={pages:files.length,missingLocalLinks:missing,images4k:masters.length,mergedOfficeAndTeam:office.includes('id="equipo"')&&office.includes('África Gómez Luna'),noSeparateTeamNavigation:!home.match(/>Equipo<\/a>/),framerMotionBundle:fs.statSync(path.join(root,'motion.js')).size};
console.log(JSON.stringify(result,null,2));
if(missing.length||!result.mergedOfficeAndTeam||!result.noSeparateTeamNavigation)process.exitCode=1;
