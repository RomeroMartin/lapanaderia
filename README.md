# La Panadería de Green Garden

Sitio estático (HTML + CSS + JS vanilla), sin build.

```
public/            ← lo que se publica
  index.html
  styles.css
  main.js
  assets/{img,fonts}
  robots.txt  _headers
wrangler.jsonc     ← config de Cloudflare Workers (assets de ./public)
```

## Probar en local
```
cd public && python3 -m http.server 8000
```

## Deploy (Cloudflare Workers)
Conectar este repo en un proyecto de Cloudflare Workers. Comando de deploy: `npx wrangler deploy` (sin build). El `name` de `wrangler.jsonc` debe coincidir con el nombre del proyecto.

## Pendientes del cliente
- Teléfono real (hoy `0221 400-0000`) y URL real de Instagram, en `public/index.html`.
- Fotos reales (hoy placeholders con el isotipo).
- Al vincular el dominio propio: agregar `canonical`, `og:url` y `og:image` (URL absoluta; imagen en `public/assets/img/og-image.jpg`) en `public/index.html`, `url` e `image` en el JSON-LD, y crear `sitemap.xml` + línea `Sitemap:` en `robots.txt`.

## Imágenes
Siempre en formato `.webp` dentro de `public/assets/img/`.
