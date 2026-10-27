# La Panadería de Green Garden: handoff del rediseño

Implementar el rediseño de la web de la panadería (hoy: lapanaderia.romeromartin1990.workers.dev) como **una sola página estática**: HTML + CSS + JS vanilla, mobile first y responsive. Usa la misma estética que el rediseño de greengarden.com.ar.

## Archivos
```
diseno/Panaderia.dc.html   ← referencia visual (fuente de verdad)
assets/img/pan-logo.png        logo completo, para fondo claro (hero)
assets/img/pan-logo-light.png  logo completo, para fondo oscuro (footer)
assets/img/pan-iso.png         isotipo dorado: gota + hojas (header)
assets/img/pan-iso-green.png   isotipo verde (placeholders y detalles)
assets/img/gg-logo-light.png   logo Green Garden claro (sección "Al lado de Green Garden" y footer)
assets/fonts/                  Green Font + Myriad Pro (Regular / Light SemiCond Italic)
```
`Panaderia.dc.html` tiene etiquetas propias del editor (`<x-dc>`, `<sc-for>`, `{{...}}`, `/_blob/...`). No copiarlo tal cual: reescribirlo como HTML semántico limpio, con un CSS externo. Las rutas `/_blob/...` corresponden a los archivos de `assets/`.

## Marca
Mismos tokens que Green Garden: verde `#002f2a`, dorado `#d6b36a` (texto dorado sobre claro: `#7A5C22`), crema `#F6F1E6` / `#FBF8F1`, líneas `#E3D9C3`, negro para el footer. Green Font en mayúsculas para títulos (no tiene números: Myriad como fallback), Myriad Pro para el texto, Myriad Light Italic para frases cortas. Divisor de marca: línea, rombo, línea. Bordes rectos (2px).

## Secciones (en orden)
1. **Header sticky** verde: isotipo dorado + "La Panadería / de Green Garden"; nav (La panadería `#mirada`, Qué horneamos `#horneamos`, Para llevar `#vereda`, Dónde estamos `#visitanos`); estado abierto/cerrado; botón "Cómo llegar". Menú hamburguesa en mobile (breakpoint 900px).
2. **Hero `#inicio`** crema: logo completo centrado como `<h1>` (con alt), texto, botones "Mirá qué hacemos" y "Cómo llegar", horario y dirección, y una foto ancha de la vidriera con la frase "no hay cocina escondida".
3. **`#mirada` "Todo pasa delante tuyo"** (verde): texto, 3 ítems I–III y foto del obrador con la frase "recién hecho, todos los días".
4. **`#horneamos` "Qué horneamos"**: 3 tarjetas (Panes / Facturas / Pastelería), cada una con foto y una lista de 4 productos. 1 columna en mobile, 3 en desktop.
5. **`#vereda` "Un café y algo rico para el camino"**: foto del café ("a cualquier hora del día"), texto y 3 pasos (Pedís / Retirás / Seguís viaje).
6. **"Al lado de Green Garden"** (verde): los dos logos juntos, la frase "puerta con puerta", texto, botón a greengarden.com.ar y foto de las dos fachadas.
7. **`#visitanos` "Dónde estamos"**: dirección, horario, teléfono e Instagram; mapa de Google Maps embebido y botón "Abrir en Google Maps".
8. **Footer** negro: logo claro, links, datos y "Parte de" con el logo de Green Garden; © año y crédito a Martin Romero Studio.

## JS
- Menú mobile (toggle con `aria-expanded`, se cierra con Escape y al tocar un link).
- Estado abierto/cerrado: abierto de 07:00 a 20:30, calculado con la zona horaria `America/Argentina/Buenos_Aires` (`Intl.DateTimeFormat`).
- Año del footer automático. Scroll suave con `scroll-margin-top` igual a la altura del header.

## Pendientes (datos a confirmar con el cliente)
- **Teléfono:** 0221 400-0000 parece de relleno.
- **Instagram:** el link actual apunta a instagram.com/ genérico; falta la URL real del perfil @lapanaderiadegreengarden.
- **Mapa:** hoy es un placeholder; falta el iframe real.
- **Fotos:** vidriera, obrador, hogaza, medialunas, vitrina de pastelería, café y fachadas. Todas son placeholders.
- **SEO:** mantener el title y la meta description actuales; sumar og:image y favicon con el isotipo.
