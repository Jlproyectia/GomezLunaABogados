# Gomez Luna Abogados

Rediseño de la web del despacho de Fuengirola. Incluye cabecera con glassmorphism, animaciones con Framer Motion, directorio de servicios con carrusel sincronizado, equipo y despacho unificados, artículos y páginas legales.

## Ejecutar en local

Requiere Node.js 22 o posterior y npm.

```sh
cd redesign
npm ci
npm run build
npm run dev
```

Abrir **http://localhost:4173/**.

## Estructura

- `redesign/build.mjs`: genera las páginas estáticas y el bundle de animaciones.
- `redesign/dist/`: web completa, lista para servir desde un hosting estático.
- `redesign/dist/assets/`: fotografías, versiones WebP, logo y tipografía originales.
- `redesign/hero.mjs`: cabecera de la portada.
- `redesign/services-section.mjs` y `services-carousel.js`: directorio de servicios y carrusel.
- `redesign/content.json` y `services.json`: contenido y organización de los servicios.
- `redesign/source/`: contenido recuperado de la web original y recursos de referencia.
- `redesign/images-4k/`: másteres exportados a 4K mediante reescalado; la resolución nativa se documenta en `image-delivery.json`.
- `redesign/qa/`: capturas y resultados de las comprobaciones visuales y funcionales.

El CSS y el JavaScript general se editan en `redesign/dist/style.css` y `redesign/dist/app.js`. El generador conserva estos archivos; no debe eliminarse `dist/` antes de compilar.

## Verificar

```sh
cd redesign
node verify.mjs
```

Las comprobaciones visuales `check-hero.mjs` y `check-services.mjs` requieren el servidor local en marcha. Actualmente utilizan Google Chrome instalado en la ruta habitual de Windows; adapte `executablePath` si trabaja en otro entorno.

El formulario de contacto prepara un borrador para enviarlo desde la aplicación de correo del visitante; no incluye un backend de envío. Este repositorio no publica automáticamente sobre el dominio original.

Más detalles en [redesign/README.md](redesign/README.md).
