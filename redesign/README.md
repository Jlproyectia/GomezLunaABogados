# Gomez Luna Abogados — rediseño local

Vista local: http://localhost:4173

## Iniciar

Desde esta carpeta, `npm install` (solo si faltan dependencias), `npm run build` y `npm run dev`.

La estructura principal es Inicio, Servicios, El despacho y Contacto. El despacho incluye la trayectoria y el equipo; la antigua URL de quiénes somos redirige al equipo dentro de esa página. Los 15 servicios se pueden buscar y filtrar. Los 12 artículos del archivo y los textos legales locales están conservados. Los documentos originales y el inventario de 61 URLs revisadas se encuentran en `source/` y `content.json`.

## Imágenes

20 imágenes generadas con la herramienta integrada Imagegen. Se descartaron las versiones rurales y las escenas con abogados ficticios. Las imágenes finales muestran oficinas modernas; las personas reconocibles son Jesús y África, regenerados desde sus fotografías originales. La imagen conjunta del despacho se utiliza en su presentación y el equipo comparte esa misma página. La cabecera utiliza `hero-immersive.webp`, reconstruido desde la propuesta visual elegida eliminando la interfaz de la imagen y conservando la composición fotográfica. El texto, panel y botones son HTML/CSS accesible, con enlaces funcionales.

`images-4k/` contiene los másteres a 3840 × 2160 (horizontales) o 3072 × 4096 (retratos). Son exportaciones reescaladas con Lanczos3, no generación nativa 4K. `image-delivery.json` registra dimensiones nativas y de exportación. `dist/assets/` contiene originales PNG y versiones WebP optimizadas. `node prepare-images.mjs` regenera las exportaciones.

Dirección de prompts: fotografía corporativa editorial, despacho urbano contemporáneo, blanco/gris/negro con rojo discreto, cristal y luz neutra; sin entorno rural. Escenas de servicio: asesoramiento, familia, herencias, laboral, inmobiliario, comunidad, arrendamiento, desahucios, seguros, tráfico, penal, administrativo y extranjería. En esas escenas solo aparecen manos y documentos, sin rostros inventados. Retratos individuales y escena conjunta: preservar caras y edades usando las fotos originales de Jesús y África como referencias, con nueva composición y oficina.

## Movimiento y contacto

Framer Motion se compila localmente desde `motion-entry.js`: apariciones al scroll, entradas escalonadas, progreso de lectura, estados de tarjetas y botones, filtros y menú. Se respeta la preferencia de movimiento reducido. Navegación y paneles fotográficos usan glassmorphism.

Áreas de práctica usa el directorio editorial de la segunda propuesta: fotografía a la izquierda y seis servicios a la derecha. El carrusel de `services-carousel.js` desliza las imágenes hacia la derecha y sincroniza imagen, título, enlace y categoría resaltada. Cambia automáticamente cada 5,2 segundos mientras está visible; se detiene mientras el puntero o el foco están dentro de la sección, y al ocultar la pestaña. Los controles visibles son anterior y siguiente; el botón Pausar se ha retirado. Las filas permiten selección con ratón, tacto y teclado; las flechas de cada fila abren el servicio. Movimiento reducido desactiva la reproducción automática y la transición. `node check-services.mjs` comprueba selección, sincronización, teclado, controles, enlaces, vueltas del carrusel, cambios rápidos y pantallas pequeñas.

Nuestra forma de trabajar sigue la primera propuesta elegida: tres pasos numerados, texto encima de cada fotografía, etiquetas de cristal Escucha/Análisis/Seguimiento y aparición escalonada con Framer Motion. `workflow-section.mjs` genera la misma sección en Inicio y El despacho. Las tres columnas se apilan en móvil. Fotografías independientes: `dist/assets/proceso-escucha.png`, `proceso-analisis.png` y `proceso-seguimiento.png`, con versiones WebP y másteres en `images-4k/`. Generadas con Imagegen integrado usando la propuesta como referencia: (1) manos conversando en la primera consulta, cuaderno y bolígrafo; (2) análisis y anotación de documentos junto a portátil y carpeta burdeos; (3) revisión conjunta de un expediente organizado. En las tres: oficina contemporánea de cristal, luz neutra, encuadre sin rostros, sin texto ni interfaz incrustada. Los textos e iconos visibles se renderizan mediante HTML/SVG, no forman parte de las fotos.

El formulario prepara un borrador de correo y requiere que el visitante lo revise y lo envíe desde su aplicación. No existe backend de envío ni simulación de envío correcto. No se ha modificado ni publicado sobre el dominio original.

## Verificación

`node verify.mjs` comprueba enlaces y recursos locales, unificación del despacho/equipo y dimensiones de los másteres. Las rutas principales y el bundle de animación se comprueban por HTTP. `node check-hero.mjs` revisa la cabecera en un Chrome headless aislado a 1672, 1440, 900, 768, 390 y 320 px: desbordamientos, imágenes, enlaces y errores de animación. Las capturas de escritorio/móvil y el informe se guardan en `qa/`. La vista integrada no estuvo disponible; estas comprobaciones se ejecutan independientemente de las pestañas personales del usuario.

El aviso legal combinado original carga un objeto externo de socializame.es que no se descargó: la revisión automática rechazó transmitir identificadores personales en esa URL. Se conservaron los avisos legales, de privacidad y cookies servidos directamente por el dominio original; no queda bloqueada la navegación legal local.
