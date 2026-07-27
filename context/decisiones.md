# Decisiones de diseño (producto/UX)

- **App = documentación viva del design system**, no una app de producto. Las 3 vistas (Foundations/Components/Templates) son "pantallas de catálogo"; el carrito y las métricas son demos interactivas, no features reales.
- **Dark-first**: el tema oscuro es el real; el toggle Dark/Light del header y de los previews es simulado (solo notifica o cambia el fondo del preview, no re-tematiza la app).
- **Interactividad didáctica**: cada sección enseña tocando — grid configurable (4/8/12 col), generador de badges, editor de tags del perfil, configurador de laptop que recalcula precio, simulación de tráfico con `setInterval` (2.5s).
- **Snippets de código junto a cada demo** (React o HTML) con botón copiar: el catálogo está pensado para copiar-pegar.
- **Búsqueda contextual**: un solo buscador en el header cuyo placeholder y alcance cambian según la vista activa; filtra localmente, sin resaltar coincidencias.
- **Contenido en español**, términos técnicos en inglés (Buttons, Badges, Templates). Persona de ejemplo: "Adrián Guerrero, Principal System Architect".
- Versión mostrada del sistema: v2.4.0 (24 Oct 2024) — hardcodeada en Sidebar y ComponentsView; si se actualiza, cambiar en ambos sitios.
