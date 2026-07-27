# Design — DevPortal UI

Lenguaje de diseño: "Technical Precision" — estética de portal para desarrolladores, dark-first, denso en información.

## Tokens de color (Material 3 Slate adaptado)
- Primary `#BAC3FF` / container `#3F51B5` (indigo).
- Secondary `#67D9C9` / container `#21A293` (teal) — usado para éxito/estados "live".
- Surface high `#222A3D` / base `#171F33`.
- Error `#FFB4AB` / container `#93000A`.
- En código: solo clases semánticas Tailwind (`bg-surface-container`, `text-on-primary-container`, `border-outline-variant`...), nunca hex directos en UI (hex solo en datos mock).

## Tipografía
- Sans para UI; **mono (JetBrains Mono) para metadatos, tokens, códigos y badges**.
- Escala: headline-xl 40/Bold, headline-lg 30/SemiBold, headline-md 20/SemiBold, body-lg 18, body-md 16, label-sm 12/mono/uppercase.

## Espaciado y layout
- Escala: 4/8/16/24/32/64 px (XS→2XL). Gutter estándar 24px. Max-width sistema 1200px.
- Layout raíz: header sticky 64px + sidebar fija 256px + main `max-w-5xl` centrado.
- Cards: `rounded-xl`, borde `outline-variant`, fondos `surface-container*` por elevación.

## Patrones de interacción
- Toda acción da feedback vía toast (success=teal, info=neutral, error=rojo), auto-dismiss 4.5s, esquina superior derecha.
- Click-para-copiar en colores y snippets: icono Copy→Check + toast "Copiado".
- Previews interactivos con toggle Dark/Light simulado por sección (no cambia el tema global).
- Badges por método HTTP: GET=secondary-container (con dot animado), POST=primary-container, DELETE=error-container, PATCH=outline, beta=surface-variant.
- Animaciones: `animate-fade-in` al montar vistas, `animate-slide-in` toasts, `animate-scale-up` modales, `active:scale-95` en botones.
