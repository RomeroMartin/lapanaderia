# Green Garden — Handoff del rediseño para Claude Code

Este paquete contiene el diseño aprobado de la nueva home de greengarden.com.ar.
Tu tarea: **implementarlo en el proyecto real** como sitio estático (HTML + CSS + JS vanilla, sin frameworks ni build), mobile first y responsive.

## Contenido del paquete

```
diseno/Main.dc.html        ← referencia visual del diseño (fuente de verdad)
assets/fonts/              ← GreenFont-Regular.otf, MyriadPro-Regular.otf, MyriadPro-LightSemiCnIt.otf
assets/img/                ← logo-light.png (para fondo verde/negro), logo-dark.png (fondo claro),
                             iso-gold.png, iso-green.png (isotipo de hojas)
```

`Main.dc.html` es HTML con estilos inline y algunas etiquetas propias del editor de diseño
(`<x-dc>`, `<helmet>`, `<sc-if>`, `{{variables}}`, `/_blob/...`). **No copiarlo tal cual**:
usarlo como referencia de estructura, textos, medidas y colores, y reescribirlo como HTML semántico
limpio con un CSS externo y clases. Las rutas `/_blob/...` corresponden a los archivos de `assets/`.

## Tokens de marca

| Token | Valor | Uso |
|---|---|---|
| `--green` | `#002f2a` | Header, hero, Playroom, botones principales sobre claro |
| `--green-2` | `#0b3f39` | Paneles/placeholders sobre verde |
| `--gold` | `#d6b36a` | Acentos, botones sobre verde, divisores. **Nunca como texto sobre crema** (no pasa contraste) |
| `--gold-ink` | `#7A5C22` | Texto dorado sobre fondos claros |
| `--ivory` | `#F6F1E6` | Fondo de secciones claras / texto sobre verde |
| `--paper` | `#FBF8F1` | Fondo alternativo y tarjetas |
| `--line` | `#E3D9C3` | Bordes sobre claro |
| `--ink` | `#141414` | Texto principal |
| `--muted` | `#3F3F3A` | Texto secundario sobre claro |
| `--muted-dark` | `#C9D3CF` / `#B9C7C2` | Texto secundario sobre verde |
| `--black` | `#000000` | Footer |

Tipografías (cargar con `@font-face` desde `assets/fonts`, convertir a .woff2 si es posible):
- **Green Font** → títulos (h1, h2, h3), siempre `text-transform: uppercase`, `letter-spacing: .03–.06em`, `font-weight: 400`.
  ⚠️ No tiene números ni signos de puntuación: dejar Myriad como fallback en el `font-family`.
- **Myriad Pro Regular** → texto general, botones (mayúsculas, `letter-spacing: .16em`, 13–14px).
- **Myriad Pro Light SemiCond Italic** → frases cortas sobre los títulos ("eyebrows") y cifras destacadas (+10, 08–02, $3.800, 2016).

Detalles de estilo: bordes rectos (`border-radius: 2px`), sin sombras ni degradados.
Motivo de marca: **línea dorada + rombo + línea** (del logo) como divisor de secciones.

## Responsive

- Mobile first. Breakpoint principal: **900px** (menú hamburguesa ↔ nav completa).
- Contenedor `max-width: 1200px`, padding lateral `clamp(20px, 5vw, 48px)`.
- Tipografía y espaciados fluidos con `clamp()` (en el diseño están en `cqi`; pasarlos a `vw`).
- Grillas con `repeat(auto-fit, minmax(...))` y bloques con `flex-wrap`, tal como en el diseño.
- Áreas táctiles de mínimo 44px.

## Secciones (en este orden)

1. **Franja de promo** (dorada, se puede cerrar con ×; recordar el cierre en `sessionStorage`). Reemplaza al popup actual.
2. **Header sticky** verde: logo claro, nav (Inicio, Menú, Playroom, Nosotros, Contacto), estado "Abierto ahora / Cerrado", botón "Reservar" (tel:). En mobile: hamburguesa que despliega el menú debajo.
3. **Hero** `#inicio`: frase pequeña, h1 "Nuestra casa, tu lugar.", texto, botones Ver el menú / Playroom, 3 cifras (+10 años, 08–02, 3–10 años), foto con marco dorado interno.
4. **Acceso rápido**: 4 tarjetas (Almuerzos & Cenas, Desayunos & Meriendas, Menú Sin TACC, Cámaras Playroom — esta última en verde). 2×2 en mobile, 4 en desktop.
5. **Nuestra historia** `#nosotros`: 2 fotos + tarjeta "2016", título, texto, 4 ítems con rombo, botón Conocer más.
6. **Nuestro menú** `#menu`: 3 tarjetas numeradas I / II / III con horario, título, texto y botón.
7. **Playroom** `#playroom` (fondo verde): foto limpia (sin chips ni textos encima; la transmisión en vivo NO se embebe acá, solo se accede con el botón), 4 características en grilla 2×2, precio $3.800, botones Ver cámaras en vivo / Reglamento.
8. **Nuestros aliados**: **carrusel infinito de logos en blanco y negro** (Coca-Cola, Heineken, Segafredo, Los Prados, Escorihuela Gascón). Solo CSS: track con la lista duplicada, `animation: translateX(0 → -50%)` lineal infinita (~40s), `filter: grayscale(1)` + `opacity: .7` en los logos (1 al hover), pausa al hover, bordes con fade (`mask-image`), y sin animación con `prefers-reduced-motion`. Las copias duplicadas llevan `aria-hidden="true"`.
9. **Vení a visitarnos** `#visitanos`: contactos (tel, email, Instagram), tarjeta verde con Dirección / Horarios / Playroom / WiFi, mapa embebido de Google Maps y botón "Ver ubicación en el mapa".
10. **Footer** negro: logo, frase, Contacto / Dirección / Horarios, divisor de marca, © año + "Desarrollado por Martin Romero Studio".

## Comportamiento JS (vanilla)

- Menú mobile: toggle con `aria-expanded`, cierra al tocar un link o con Escape.
- Estado del local: abierto si la hora en **America/Argentina/Buenos_Aires** está entre 08:00 y 02:00
  (usar `Intl.DateTimeFormat` con esa zona, no la hora del dispositivo).
- Cierre de la promo.
- Año del footer automático.
- Scroll suave a anclas con `scroll-margin-top` igual a la altura del header sticky.

## Datos reales

- Reservas: 0221 489-5239 → `tel:+542214895239`
- Email: greengardenlaplata@gmail.com
- Instagram: @greengardenlaplata
- Dirección: Diag. 74 1618 (e/ 49 y 50), La Plata
- Horario: lunes a domingo, 08:00 a 02:00
- Playroom: 3 a 10 años, $3.800, máximo 30 niños
- WiFi: "Green Garden - Libre"

## Pendientes / reutilizar del sitio actual

- **Fotos**: reutilizar las del proyecto actual (`img/hero.webp`, `img/nosotros1.webp`, `img/nosotros2.webp`, `img/playroom1.webp`) y los logos de `img/aliados/`.
- Mantener los links reales existentes de las cartas (Almuerzos, Merienda, Sin TACC), cámaras y reglamento.
- Texto de la promo: completar con el contenido real.
- Accesibilidad: `alt` en imágenes, `aria-label` en botones de solo ícono, contraste AA (ya contemplado en la paleta).
- SEO básico: mantener title/meta/OG actuales.
