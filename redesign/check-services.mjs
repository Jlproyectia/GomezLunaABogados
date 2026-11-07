import {chromium,expect} from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const out=path.join(import.meta.dirname,'qa');fs.mkdirSync(out,{recursive:true});
const report=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});await page.locator('#servicios').scrollIntoViewIfNeeded();await page.mouse.move(0,0);
 await expect(page.locator('.directory-row.is-active')).toHaveAttribute('data-service','0');
 await expect(page.locator('.directory-row.is-active')).toHaveAttribute('data-service','1',{timeout:7000});
 await expect(page.locator('.service-caption-title')).toHaveText('Derecho inmobiliario');
 await page.getByRole('button',{name:'Imagen siguiente',exact:true}).click();
 await expect(page.locator('.directory-row.is-active')).toHaveAttribute('data-service','2');
 await expect(page.locator('.service-caption-title')).toHaveText('Derecho laboral');
 await expect(page.locator('.service-image-slide:not([hidden])')).toHaveCount(1);
 await page.getByRole('button',{name:'Mostrar Derecho penal',exact:true}).hover();
 await expect(page.locator('.directory-row.is-active')).toHaveAttribute('data-service','5');
 await page.getByRole('button',{name:'Imagen siguiente',exact:true}).click();
 await expect(page.locator('.directory-row.is-active')).toHaveAttribute('data-service','0');
 await page.getByRole('button',{name:'Imagen anterior',exact:true}).click();
 await expect(page.locator('.directory-row.is-active')).toHaveAttribute('data-service','5');
 // Interrupt several transitions quickly; only the latest slide may remain visible.
 await page.getByRole('button',{name:'Imagen siguiente',exact:true}).click({clickCount:3,delay:40});
 await expect(page.locator('.directory-row.is-active')).toHaveAttribute('data-service','2');
 await expect(page.locator('.service-image-slide:not([hidden])')).toHaveCount(1);
 await page.getByRole('button',{name:'Mostrar Herencias y testamentos',exact:true}).focus();
 await expect(page.locator('.directory-row.is-active')).toHaveAttribute('data-service','3');
 await page.keyboard.press('ArrowDown');await expect(page.locator('.directory-row.is-active')).toHaveAttribute('data-service','4');
 await expect(page.locator('.service-play')).toHaveCount(0);
 await page.waitForTimeout(5500);
 await expect(page.locator('.directory-row.is-active')).toHaveAttribute('data-service','4');
 await page.getByRole('button',{name:'Mostrar Familia y divorcios',exact:true}).click();
 await expect(page.locator('.service-image-slide:not([hidden])')).toHaveCount(1);
 await page.locator('#servicios').screenshot({path:path.join(out,'services-desktop.png')});
 await page.getByRole('link',{name:'Ver servicio de Familia y divorcios',exact:true}).click();await page.waitForURL('**/divorcios-y-familia/');
 report.push({desktop:'autoplay, synchronized captions, hover, keyboard, pause while focused, links, wrapping and interrupted transitions pass; no pause button',errors});
 for(const width of [768,390,320]){
  const mobile=await browser.newPage({viewport:{width,height:844},reducedMotion:'reduce',hasTouch:true});const mobileErrors=[];mobile.on('pageerror',e=>mobileErrors.push(e.message));
  await mobile.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});await mobile.locator('#servicios').scrollIntoViewIfNeeded();
  await expect(mobile.locator('.service-play')).toHaveCount(0);
  await mobile.getByRole('button',{name:'Mostrar Derecho laboral',exact:true}).click();
  await expect(mobile.locator('.service-caption-title')).toHaveText('Derecho laboral');
  await expect(mobile.locator('.service-image-slide:not([hidden])')).toHaveCount(1);
  const overflow=await mobile.evaluate(()=>document.documentElement.scrollWidth>innerWidth);if(overflow)throw Error('Horizontal overflow at '+width);
  if(width===390)await mobile.locator('#servicios').screenshot({path:path.join(out,'services-mobile.png')});
  report.push({width,overflow,errors:mobileErrors,reducedMotion:'manual selection works; autoplay off'});await mobile.close();
 }
 fs.writeFileSync(path.join(out,'services-check.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.some(r=>r.errors.length))process.exitCode=1;
}finally{await browser.close();}
