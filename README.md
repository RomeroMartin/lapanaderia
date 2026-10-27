# La Panadería de Green Garden

Sitio estático (HTML + CSS + JS vanilla), sin build.

```
public/            ← lo que se publica
  index.html
  styles.css
  main.js
  assets/{img,fonts}
  robots.txt  sitemap.xml  _headers
wrangler.jsonc     ← config de Cloudflare Workers (assets de ./public)
```

## Probar en local
```
cd public && python3 -m http.server 8000
```

## Deploy (Cloudflare Workers)
Conectar este repo en Cloudflare con el worker `lapanaderia`. Comando de deploy: `npx wrangler deploy` (sin build).

## Pendientes del cliente
- Teléfono real (hoy `0221 400-0000`) y URL real de Instagram, en `public/index.html`.
- Fotos reales (hoy placeholders con el isotipo).
- Si se usa dominio propio: actualizar `canonical`, `og:url`, `og:image`, el JSON-LD y `robots.txt`/`sitemap.xml`.
