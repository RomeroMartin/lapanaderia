# La Panadería de Green Garden

Sitio estático (HTML + CSS + JS vanilla), sin build.

```
index.html
styles.css
main.js
assets/{img,fonts}
robots.txt  _headers
wrangler.jsonc     ← config de Cloudflare Workers
.assetsignore      ← archivos del repo que no se publican
```

## Probar en local
```
python3 -m http.server 8000
```

## Deploy (Cloudflare Workers)
Cada merge a `main` se publica automáticamente (Workers Builds, repo vinculado en Cloudflare).
Conectar este repo en un proyecto de Cloudflare Workers. Comando de deploy: `npx wrangler deploy` (sin build). El `name` de `wrangler.jsonc` debe coincidir con el nombre del proyecto.

## Imágenes
Siempre en formato `.webp` dentro de `assets/img/`.
