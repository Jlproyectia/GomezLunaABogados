const maps='https://www.google.com/maps/place/G%C3%B3mez+Luna+Abogados/data=!4m2!3m1!1s0xd72e214bf829099:0x431027a42350f7c6?hl=es';
const arrow='<svg class="ui-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const star='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2 2 9.3l6.9-1Z"/></svg>';
const reviews=[
 {name:'Angela Guillen',initials:'AG',quote:'Quiero agradecer públicamente a África su increíble trabajo'},
 {name:'Alejandra HF',initials:'AH',quote:'la experiencia no ha podido ser mejor.'},
 {name:'Jose Burgos',initials:'JB',quote:'su profesionalidad y experiencia se notan'}
];
// Manually verified on the Google Maps listing on 2026-11-07. No live API connection.
export function reviewsSection(){return `<section class="section reviews-section" id="resenas" aria-labelledby="reviews-heading"><div class="wrap">
 <div class="reviews-heading reveal"><div><span class="eyebrow">Opiniones en Google</span><h2 id="reviews-heading">La confianza,<br>en sus palabras.</h2></div><p>Quienes nos han confiado su caso<br>comparten su experiencia.</p></div>
 <div class="reviews-layout">
  <aside class="reviews-summary reveal" aria-label="Valoración en Google: 4,9 de 5, basada en 131 reseñas"><span class="reviews-source">Google</span><div class="reviews-score">4,9<span>/ 5</span></div><div class="review-stars" aria-hidden="true">${star.repeat(5)}</div><p>Basado en <strong>131 reseñas</strong></p><a class="reviews-all" href="${maps}" target="_blank" rel="noopener noreferrer">Ver todas en Google ${arrow}</a></aside>
  <div class="reviews-cards">${reviews.map(r=>`<article class="review-card reveal"><div class="review-stars" role="img" aria-label="5 de 5 estrellas">${star.repeat(5)}</div><blockquote><p>«${r.quote}»</p></blockquote><div class="review-author"><span class="review-avatar" aria-hidden="true">${r.initials}</span><div><h3>${r.name}</h3><span>Reseña en Google</span></div></div><a class="review-original" href="${maps}" target="_blank" rel="noopener noreferrer" aria-label="Consultar las reseñas de Google, incluida la de ${r.name}">Leer en Google ${arrow}</a></article>`).join('')}</div>
 </div><p class="reviews-note">Selección de extractos de reseñas publicadas en Google. Valoración y número de opiniones consultados el 7 de noviembre de 2026.</p>
 </div></section>`;}
