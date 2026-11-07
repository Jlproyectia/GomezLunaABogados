const steps = [
 {title:'Le escuchamos',description:'Conocemos su situación y revisamos la información que nos aporta.',image:'proceso-escucha',label:'Escucha',alt:'Primera consulta: conversación y escucha en una mesa del despacho.',icon:'<path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l1.8-5.4A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" stroke-width="2.5"/>'},
 {title:'Estudiamos su caso',description:'Analizamos las alternativas y le explicamos sus opciones con claridad.',image:'proceso-analisis',label:'Análisis',alt:'Estudio de documentación jurídica con un bolígrafo junto a un ordenador portátil.',icon:'<path d="M13 3H5v18h7M13 3l5 5h-5V3ZM8 8h2M8 12h4M8 16h3"/><circle cx="16.5" cy="16.5" r="3.5"/><path d="m19 19 3 3"/>'},
 {title:'Le acompañamos',description:'Defendemos sus intereses y mantenemos un trato directo durante el proceso.',image:'proceso-seguimiento',label:'Seguimiento',alt:'Revisión conjunta de un expediente organizado durante el seguimiento de un caso.',icon:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M7 14h2M15 14h2M7 17h2M15 17h2"/>'}
];

export function workflowSection(){
 return `<section class="section workflow-section" id="como-trabajamos" aria-labelledby="workflow-heading">
  <div class="wrap">
   <div class="section-heading workflow-heading reveal">
    <div><span class="eyebrow">Nuestra forma de trabajar</span><h2 id="workflow-heading">Claridad en cada paso.</h2></div>
    <p>Un proceso sencillo. Un trato cercano.</p>
   </div>
   <ol class="workflow-steps">
    ${steps.map((step,i)=>`<li class="workflow-step">
     <div class="workflow-number" aria-hidden="true"><span>0${i+1}</span></div>
     <h3>${step.title}</h3>
     <p>${step.description}</p>
     <figure class="workflow-visual">
      <img src="/assets/${step.image}.webp" alt="${step.alt}" width="1672" height="941" loading="lazy" decoding="async">
      <figcaption class="workflow-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${step.icon}</svg><span>${step.label}</span></figcaption>
     </figure>
    </li>`).join('')}
   </ol>
  </div>
 </section>`;
}
