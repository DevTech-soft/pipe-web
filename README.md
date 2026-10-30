# Pipe Gomitas · Web

Sitio de **Pipe Gomitas** (dulces importados, Bucaramanga). Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + TypeScript.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm start
```

## Estructura

```
src/
  app/                 Rutas: / (inicio) y /catalogo (tienda)
  assets/images/       Fotos (provisionales, tomadas de Instagram)
  components/
    bag/               Bolsa de pedido: estado (BagProvider) y panel lateral (BagDrawer)
    brand/             Wordmark y osito de goma en SVG
    home/              Secciones del inicio
    catalog/           Tienda con filtro por categoría
    product/           ProductCard + AddToBagButton
    layout/            Header y Footer
    ui/Reveal.tsx      Aparición al hacer scroll (Motion)
  lib/
    site.ts            Contacto, dirección y redes (editar aquí)
    catalog.ts         Tipos + categorías + productos (+ imageFocus para recortes)
    whatsapp.ts        Links y mensaje del pedido por WhatsApp
```

- **Contacto, dirección y redes:** `src/lib/site.ts`.
- **Productos y categorías:** `src/lib/catalog.ts`. `price` es opcional; si falta se muestra "Precio por WhatsApp".
  Las categorías con `image` aparecen en la grilla de fotos del inicio.
- **Campaña de temporada (hoy Halloween):** objeto `season` en `src/components/home/SeasonBanner.tsx`.

## Diseño y movimiento

- Tipografías: Bricolage Grotesque (títulos), Figtree (texto), Lilita One solo en el logo.
- Animaciones con `motion` y CSS: entradas de 600 ms con `cubic-bezier(0.23, 1, 0.32, 1)`, panel de la bolsa con
  curva tipo iOS `cubic-bezier(0.32, 0.72, 0, 1)` y salida más rápida que la entrada, `scale(0.97)` al presionar,
  hover solo en dispositivos con puntero. Respeta `prefers-reduced-motion`.

## Pendiente con el cliente

- Logo en alta resolución (hoy el logo está recreado en SVG/tipografía: `Wordmark`).
- Fotos originales en alta calidad para reemplazar las de `src/assets/images` (mismo nombre de archivo = cero cambios de código).
- Precios reales y catálogo completo.
- Horario de atención y número de WhatsApp principal (en Instagram aparecen 316 060 6532 y 322 721 0567).
- Dominio definitivo (`site.url`).

## Hoja de ruta: de la bolsa al checkout

1. **Hecho:** bolsa de pedido persistente (localStorage) que arma un único mensaje de WhatsApp con cantidades,
   forma de entrega y nota.
2. **Precios:** llenar `price` en el catálogo; la bolsa puede mostrar subtotal sin otros cambios.
3. **Pago en línea:** pasarela colombiana (Wompi, Mercado Pago o ePayco) con Server Actions; el checkout consume
   las mismas líneas de `useBag()`.
4. **Pedidos y administración:** base de datos (Postgres) para catálogo y pedidos + panel simple.
