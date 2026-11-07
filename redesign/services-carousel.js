import {animate} from 'framer-motion';

export function initServicesCarousel(){
 const section=document.querySelector('.services-editorial');if(!section)return;
 const slides=[...section.querySelectorAll('.service-image-slide')];
 const rows=[...section.querySelectorAll('.directory-row')];
 const caption=section.querySelector('.service-caption-link');
 const counter=section.querySelector('.service-counter b');
 const status=section.querySelector('.service-carousel-status');
 const play=section.querySelector('.service-play');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let active=0,paused=reduced,visible=false,hovered=false,focused=false,timer,revision=0,animations=[];
 const interval=5200;
 function schedule(){clearTimeout(timer);if(!paused&&visible&&!hovered&&!focused&&!document.hidden)timer=setTimeout(()=>select(active+1,false),interval);}
 function updatePlay(){play.setAttribute('aria-label',paused?'Reanudar cambio automático':'Pausar cambio automático');play.querySelector('.service-play-symbol').textContent=paused?'▷':'Ⅱ';play.querySelector('.service-play-label').textContent=paused?'Reproducir':'Pausar';}
 function select(index,manual=true,direction=1){
  const next=(index+slides.length)%slides.length;if(next===active){schedule();return;}
  const previous=active,token=++revision;active=next;
  animations.forEach(a=>a.stop());animations=[];
  slides.forEach((el,i)=>{el.hidden=i!==previous&&i!==next;el.style.transform='none';el.style.opacity=i===previous?'1':'0';el.style.zIndex=i===next?'2':'1';});
  rows.forEach((row,i)=>{row.classList.toggle('is-active',i===next);row.querySelector('button').setAttribute('aria-pressed',String(i===next));});
  caption.href=slides[next].dataset.url;
  caption.querySelector('.service-caption-title').textContent=slides[next].dataset.title;
  counter.textContent=String(next+1).padStart(2,'0');
  if(manual)status.textContent=`${next+1} de ${slides.length}: ${slides[next].dataset.title}`;
  const incoming=slides[next],outgoing=slides[previous];
  if(reduced){incoming.style.opacity='1';outgoing.hidden=true;}
  else{
   incoming.style.opacity='1';
   animations=[animate(outgoing,{x:['0%',`${direction*100}%`]},{duration:.72,ease:[.22,1,.36,1]}),animate(incoming,{x:[`${-direction*100}%`,'0%']},{duration:.72,ease:[.22,1,.36,1]})];
   Promise.all(animations).then(()=>{if(token===revision){outgoing.hidden=true;incoming.style.transform='none';incoming.style.opacity='1';}});
  }
  schedule();
 }
 rows.forEach((row,i)=>{
  row.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')select(i);});
  row.querySelector('button').addEventListener('click',()=>select(i));
  row.addEventListener('focusin',()=>select(i));
  row.querySelector('button').addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();const next=(i+(e.key==='ArrowDown'?1:-1)+rows.length)%rows.length;rows[next].querySelector('button').focus();}});
 });
 section.querySelector('.service-next').addEventListener('click',()=>select(active+1));
 section.querySelector('.service-prev').addEventListener('click',()=>select(active-1,true,-1));
 play.addEventListener('click',()=>{paused=!paused;updatePlay();schedule();});
 section.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch'){hovered=true;schedule();}});
 section.addEventListener('pointerleave',()=>{hovered=false;schedule();});
 section.addEventListener('focusin',()=>{focused=true;schedule();});
 section.addEventListener('focusout',()=>{queueMicrotask(()=>{focused=section.contains(document.activeElement);schedule();});});
 document.addEventListener('visibilitychange',schedule);
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:.3}).observe(section);
 else{visible=true;schedule();}
 updatePlay();
}
