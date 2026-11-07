import {chromium} from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
const out=path.join(import.meta.dirname,'qa');fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const results=[];
try{
 for(const [width,height] of [[1920,1080],[1672,941],[1440,900],[1366,768],[1280,720],[900,600],[768,1024],[390,844],[375,667],[320,568]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const metrics=await page.evaluate(()=>{
   const panel=document.querySelector('.hero-glass-panel'),hero=document.querySelector('.hero-immersive'),heading=document.querySelector('#hero-title');
   return {viewport:innerWidth,height:innerHeight,pageOverflow:document.documentElement.scrollWidth>innerWidth,panelOverflow:panel.scrollWidth>panel.clientWidth,headingOverflow:heading.scrollWidth>heading.clientWidth,heroFitsViewport:hero.getBoundingClientRect().bottom<=innerHeight+2,panelFitsHero:panel.getBoundingClientRect().bottom<=hero.getBoundingClientRect().bottom&&panel.getBoundingClientRect().top>=hero.getBoundingClientRect().top,panel:panel.getBoundingClientRect().toJSON(),hero:hero.getBoundingClientRect().toJSON(),backgroundLoaded:document.querySelector('.hero-background').naturalWidth>0};
  });
  if(width===1672||width===390||width===1366)await page.screenshot({path:path.join(out,`hero-${width}.png`)});
  if(width===1440){await page.getByRole('link',{name:'Hablemos de su caso',exact:true}).click();await page.waitForURL('**/contactar/');await page.goBack();await page.getByRole('link',{name:'Conozca nuestros servicios',exact:true}).click();await page.waitForURL('**/servicios/');}
  results.push({width,...metrics,errors});await page.close();
 }
 const motionPage=await browser.newPage({viewport:{width:1440,height:1000}});const motionErrors=[];motionPage.on('pageerror',e=>motionErrors.push(e.message));await motionPage.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});await motionPage.waitForFunction(()=>getComputedStyle(document.querySelector('.hero-glass-panel')).opacity==='1');results.push({motionErrors});
 fs.writeFileSync(path.join(out,'hero-check.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
 if(results.some(r=>r.pageOverflow||r.panelOverflow||r.headingOverflow||r.heroFitsViewport===false||r.panelFitsHero===false||r.errors?.length||r.motionErrors?.length||r.backgroundLoaded===false))process.exitCode=1;
}finally{await browser.close();}
