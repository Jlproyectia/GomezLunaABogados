import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
const root=import.meta.dirname, assets=path.join(root,'dist/assets'), master=path.join(root,'images-4k');
fs.mkdirSync(master,{recursive:true});
const records=[];
for(const file of fs.readdirSync(assets).filter(f=>f.endsWith('.png')&&f!=='logo.png')){
 const source=path.join(assets,file),name=path.basename(file,'.png'),meta=await sharp(source).metadata();
 const portrait=meta.height>meta.width;
 const width=portrait?3072:3840,height=portrait?4096:2160;
 await sharp(source).resize(width,height,{fit:'cover',kernel:'lanczos3'}).jpeg({quality:95,chromaSubsampling:'4:4:4'}).toFile(path.join(master,name+'.jpg'));
 await sharp(source).resize({width:portrait?1200:1680,withoutEnlargement:true}).webp({quality:86}).toFile(path.join(assets,name+'.webp'));
 records.push({name,native:[meta.width,meta.height],export:[width,height],method:'4K export resampled from generated source with Lanczos3',original:'dist/assets/'+file,master:'images-4k/'+name+'.jpg'});
}
fs.writeFileSync(path.join(root,'image-delivery.json'),JSON.stringify(records,null,2));
console.log(records.length+' image masters exported to 4K; web versions optimized. Native dimensions recorded in image-delivery.json.');
