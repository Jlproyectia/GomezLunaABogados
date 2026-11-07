const summaries={
 'divorcios-y-familia':'Acuerdos, custodia y separación.',
 'derecho-inmobiliario':'Compraventa, alquiler y propiedad.',
 'derecho-laboral':'Trabajadores y empresas.',
 'herencias-y-testamentos':'Sucesiones y reparto de bienes.',
 'derecho-bancario':'Préstamos, hipotecas y cláusulas.',
 'derecho-penal':'Asistencia y defensa jurídica.'
};
export function servicesSection(services){
 const order=['divorcios-y-familia','derecho-inmobiliario','derecho-laboral','herencias-y-testamentos','derecho-bancario','derecho-penal'];
 const selected=order.map(slug=>services.find(s=>s.slug===slug));
 return `<section class="section services-editorial" id="servicios" aria-labelledby="services-heading">
 <div class="wrap services-editorial-grid">
  <div class="services-editorial-intro">
   <span class="eyebrow">Áreas de práctica</span>
   <h2 id="services-heading">Una respuesta para cada situación.</h2>
   <p class="services-intro-copy">Encuentre el asesoramiento que necesita.</p>
   <div class="service-carousel" role="region" aria-roledescription="carrusel" aria-label="Áreas de práctica">
    <div class="service-image-stage">
     ${selected.map((s,i)=>`<div class="service-image-slide" data-slide="${i}" data-title="${s.title}" data-url="/${s.slug}/" role="group" aria-roledescription="diapositiva" aria-label="${i+1} de 6: ${s.title}" ${i?'hidden':''}><img src="/assets/${s.image==='bancario'?'asesoramiento':s.image}.webp" alt="${s.title}: asesoramiento y revisión de documentación en el despacho" loading="lazy" decoding="async" width="1672" height="941"></div>`).join('')}
     <div class="service-image-caption"><a class="service-caption-link" href="/${selected[0].slug}/"><span class="service-caption-title">${selected[0].title}</span><span aria-hidden="true"><svg class="ui-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a><span>Asesoramiento claro y cercano.</span></div>
    </div>
    <div class="service-carousel-controls">
     <span class="service-counter" aria-hidden="true"><b>01</b> / 06</span>
     <div class="service-control-buttons"><button type="button" class="service-prev" aria-label="Imagen anterior"><svg class="ui-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 12H4m7-7-7 7 7 7"/></svg></button><button type="button" class="service-next" aria-label="Imagen siguiente"><svg class="ui-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16m-7-7 7 7-7 7"/></svg></button></div>
    </div>
    <p class="sr-only service-carousel-status" aria-live="polite" aria-atomic="true"></p>
   </div>
  </div>
  <div class="services-directory">
   <div class="service-directory-list" aria-label="Seleccione un área de práctica">
    ${selected.map((s,i)=>`<div class="directory-row ${i===0?'is-active':''}" data-service="${i}"><button type="button" class="directory-select" aria-pressed="${i===0}" aria-label="Mostrar ${s.title}"><span class="directory-number">0${i+1}</span><span class="directory-copy"><span class="directory-title">${s.title}</span><span class="directory-description">${summaries[s.slug]}</span></span></button><a class="directory-visit" href="/${s.slug}/" aria-label="Ver servicio de ${s.title}"><svg class="ui-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></a></div>`).join('')}
   </div>
   <a class="services-all-link" href="/servicios/">Ver los 15 servicios <span aria-hidden="true"><svg class="ui-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span></a>
  </div>
 </div>
 </section>`;
}
