const fs=require('fs'),crypto=require('crypto');
const root=__dirname, index=JSON.parse(fs.readFileSync(root+'/pages-index.json','utf8').replace(/^\uFEFF/,''));
const entities={nbsp:' ',amp:'&',quot:'"',apos:"'",lt:'<',gt:'>',aacute:'á',eacute:'é',iacute:'í',oacute:'ó',uacute:'ú',ntilde:'ñ',uuml:'ü',Aacute:'Á',Eacute:'É',Iacute:'Í',Oacute:'Ó',Uacute:'Ú',Ntilde:'Ñ',copy:'©',hellip:'…'};
function clean(t){return t.replace(/<br\s*\/?\s*>/gi,'\n').replace(/<[^>]+>/g,' ').replace(/&(#x[\da-f]+|#\d+|\w+);/gi,(m,v)=>v[0]==='#'?String.fromCodePoint(v[1]==='x'?parseInt(v.slice(2),16):+v.slice(1)):entities[v]??m).replace(/[ \t\r\n]+/g,' ').trim()}
const summaries={
'divorcios-y-familia':['Acompañamiento en separaciones y divorcios, con atención a los hijos, la vivienda y el patrimonio familiar.',['Divorcio de mutuo acuerdo y contencioso','Custodia y régimen de visitas','Pensiones de alimentos y compensatorias','Liquidación del régimen matrimonial','Filiación y patria potestad']],
'derecho-laboral':['Asesoramiento a trabajadores y empresas para resolver conflictos laborales y proteger sus intereses.',['Despidos e impugnaciones','Accidentes laborales e indemnizaciones','Bajas laborales','Sanciones y conciliación familiar','Mediación, arbitraje y conciliación']],
'derecho-inmobiliario':['Seguridad jurídica en la compra, venta, alquiler y transmisión de inmuebles.',['Compraventa y arrendamiento','Donaciones y cesiones','Hipotecas y cláusulas abusivas','Escrituras y repercusiones fiscales']],
'herencias-y-testamentos':['Orientación en todos los trámites de una sucesión y en la resolución de conflictos entre herederos.',['Testamentos y sucesión intestada','Certificados y gestiones administrativas','Inventario y reparto','Aceptación o renuncia','Conflictos entre herederos']],
'derecho-penal':['Defensa y asistencia jurídica a personas investigadas y víctimas de delitos.',['Asistencia en comisaría','Agresiones y lesiones','Delitos patrimoniales','Menores','Asistencia las 24 horas']],
'derecho-de-extranjeria':['Acompañamiento en trámites de nacionalidad, residencia y trabajo en España.',['Nacionalidad española','Arraigo y permisos de trabajo','Permisos de estudiantes','Homologación de títulos','Matrimonios y divorcios mixtos','Expulsiones y recuperación de nacionalidad']],
'accidentes-de-trafico':['Asesoramiento y reclamación de indemnizaciones por daños y lesiones tras un accidente.',['Daños personales y materiales','Indemnizaciones','Informes médicos y valoración de secuelas','Reclamaciones a aseguradoras']],
'derecho-administrativo':['Asistencia en sus relaciones con las administraciones públicas.',['Procedimientos administrativos','Recursos y reclamaciones','Defensa de sus intereses ante la Administración']],
'comunidad-de-propietarios':['Asesoramiento para la gestión y resolución de conflictos en comunidades de propietarios.',['Propiedad horizontal','Conflictos vecinales','Acuerdos de comunidad','Reclamaciones de cuotas']],
'contratos-de-arrendamiento':['Redacción y revisión de contratos para proteger a propietarios e inquilinos.',['Redacción de contratos','Revisión de condiciones','Derechos y obligaciones','Prevención de conflictos']],
'desahucios':['Asistencia jurídica en procedimientos de desahucio y recuperación de inmuebles.',['Impago de rentas','Procedimientos de desahucio','Recuperación del inmueble','Defensa de propietarios e inquilinos']],
'reclamaciones-a-polizas-de-seguro':['Revisión de pólizas y defensa de sus intereses ante discrepancias con la aseguradora.',['Coberturas de la póliza','Reclamaciones a aseguradoras','Indemnizaciones y siniestros']],
'derecho-fiscal':['Asesoramiento fiscal y contable para particulares, autónomos y empresas.',['Impuestos','Contabilidad y libros de cuentas','Subvenciones','Constitución de sociedades','Seguridad Social']]
};
const pages=[], seen=new Map();
for(const row of index){
let html=fs.readFileSync(root+'/'+row.file,'utf8').replace(/<!--[\s\S]*?-->/g,'');
let title=clean((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)||html.match(/<title>([\s\S]*?)<\/title>/i)||[])[1]||'');
let body=html;
if(/blog-details interior-text/.test(html))body=html.split(/<div[^>]+class="[^"]*blog-details interior-text[^"]*"[^>]*>/)[1].split(/<aside\b/)[0];
else body=html.slice(html.indexOf('</header>')+9).split(/<footer\b/)[0];
body=body.replace(/<(script|style|noscript)\b[\s\S]*?<\/\1>/gi,'');
body=body.replace(/<br\s*\/?\s*>\s*<br\s*\/?\s*>/gi,'</p><p>');
const blocks=[];for(const m of body.matchAll(/<(h[1-6]|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi)){const text=clean(m[2]);if(text&&text!=='Inicio'&&!(m[1]==='li'&&text===title))blocks.push({type:m[1],text})}
let slug=row.path.replace(/^\//,'').replace(/\.php$/,'')||'inicio';
const signature=crypto.createHash('sha256').update(JSON.stringify(blocks)).digest('hex');
if(seen.has(signature)){seen.get(signature).aliases.push(row.url);continue}
const info=summaries[slug];
const p={url:row.url,title,slug,kind:slug==='inicio'?'home':slug.startsWith('blog/')?'article':info?'service':/legal|privacidad|cookies/.test(slug)?'legal':slug==='blog'?'blog':'page',summary:info?.[0]||blocks.find(b=>b.type==='p')?.text||'',topics:info?.[1]||blocks.filter(b=>/^h[2-6]$/.test(b.type)).map(b=>b.text),blocks,paragraphs:blocks.map(b=>b.text),images:[...body.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/g)].map(m=>new URL(m[1],row.url).href),aliases:[]};
p.fullText=clean(body);
p.links=[...body.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/g)].filter(m=>!m[1].startsWith('#')).map(m=>({text:clean(m[2]),url:new URL(m[1],row.url).href}));
if(/<object/.test(body))p.note='El original incorpora contenido legal externo que no se recuperó; usar las páginas locales de aviso legal, privacidad y cookies.';
seen.set(signature,p);pages.push(p);
}
fs.writeFileSync(process.argv[2]||root+'/../content.json',JSON.stringify({source:'https://www.abogadosfuengirola.org/',retrieved:'2026-11-07',pages},null,2));
console.log(JSON.stringify(pages.map(p=>({slug:p.slug,title:p.title,blocks:p.blocks.length,aliases:p.aliases.length})),null,2));
