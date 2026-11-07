import {animate,inView,scroll,stagger} from 'framer-motion';
import {initServicesCarousel} from './services-carousel.js';
initServicesCarousel();
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced){
 const ease=[.22,1,.36,1];
 inView('.reveal',el=>{animate(el,{opacity:[0,1],y:[25,0]},{duration:.75,ease});},{margin:'0px 0px -35px 0px'});
 document.querySelectorAll('.workflow-step').forEach((el,i)=>{
  inView(el,()=>{animate(el,{opacity:[0,1],y:[24,0]},{duration:.7,delay:matchMedia('(min-width: 801px)').matches?i*.1:0,ease});},{margin:'0px 0px -35px 0px'});
 });
 if(document.querySelector('.hero-glass-panel')){
  animate('.hero-background',{opacity:[0,1]},{duration:.7,ease});
  animate('.hero-glass-panel',{opacity:[0,1],y:[14,0]},{duration:.8,delay:.12,ease});
  animate('.hero-glass-panel > *',{opacity:[0,1],y:[12,0]},{duration:.65,delay:stagger(.075,{startDelay:.22}),ease});
 }
 if(document.querySelector('.photo-caption'))animate('.photo-caption',{opacity:[0,1],y:[20,0]},{duration:.9,delay:.65,ease});
 scroll(animate('.progress',{scaleX:[0,1]},{ease:'linear'}));
 document.querySelectorAll('.button').forEach(el=>{el.addEventListener('pointerenter',()=>animate(el,{y:-3},{type:'spring',stiffness:350,damping:20}));el.addEventListener('pointerleave',()=>animate(el,{y:0},{type:'spring',stiffness:350,damping:20}));});
 document.querySelectorAll('.service-card,.team-card').forEach(el=>{const image=el.querySelector('img');el.addEventListener('pointerenter',()=>animate(image,{scale:1.035},{duration:.6,ease}));el.addEventListener('pointerleave',()=>animate(image,{scale:1},{duration:.6,ease}));});
 document.querySelectorAll('.service-row').forEach(el=>{const arrow=el.querySelector('.arrow');el.addEventListener('pointerenter',()=>animate(arrow,{x:5,y:-5},{type:'spring',stiffness:300,damping:20}));el.addEventListener('pointerleave',()=>animate(arrow,{x:0,y:0},{type:'spring',stiffness:300,damping:20}));});
 document.querySelector('.menu-toggle')?.addEventListener('click',()=>{if(document.querySelector('.navlinks').classList.contains('open'))animate('.navlinks>a',{opacity:[0,1],x:[-10,0]},{delay:stagger(.045),duration:.3});});
 document.querySelectorAll('.filter').forEach(el=>el.addEventListener('click',()=>requestAnimationFrame(()=>animate('.service-card:not([hidden])',{opacity:[0,1],y:[10,0]},{duration:.35,delay:stagger(.035),ease}))));
}
