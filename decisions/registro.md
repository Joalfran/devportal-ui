# Registro de decisiones técnicas

Formato: fecha — decisión — razonamiento. Añadir al final, no reescribir.

## 2026-07-20 — Documentación como HTML autocontenido
Se creó `diagrama-arquitectura.html` (sin dependencias externas) en vez de Markdown/mermaid.
Razón: el usuario quería abrirlo visualmente en el navegador sin tooling.

## 2026-07-22 — Sistema de memoria en archivos
Se instaló AGENTS.md + `context/ decisions/ state/ skills/ gotchas/ logs/`.
Razón: reducir tokens por sesión; el contexto crítico se perdía entre sesiones (stack, mocks, entorno Windows, estado del server).

## 2026-07-22 — Sandbox responsivo con container queries (no iframe)
Nueva vista `SandboxView` + `src/sandbox/registry.tsx`. Las demos usan `@container` + variantes arbitrarias `@min-[768px]:`/`@min-[1024px]:` de Tailwind 4 para que respondan al ancho del frame redimensionable, no al viewport.
Razón: iframe con srcdoc era frágil para inyectar Tailwind 4 + React; container queries son nativas en la versión ya instalada y no añaden dependencias. Trade-off: las demos son copias adaptadas de los componentes, no el JSX de producción.
Breakpoints estándar: Mobile <768, Tablet 768–1023, Desktop ≥1024 (presets 375/768/1280). Resize con Pointer Events puros. El `<main>` pasa a `max-w-[1600px]` solo en la vista sandbox. La selección de demo reutiliza `activeSubSection` de App.

## Decisiones heredadas del código (pre-existentes, respetarlas)
- Estado global centralizado en `App.tsx` con props drilling; sin librería de estado. App pequeña, no lo necesita.
- Datos 100% mock dentro de cada vista; sin capa de servicios ni fetch.
- Búsqueda global: un solo `searchQuery` en App; cada vista filtra sus propios arrays localmente.
- Toasts con auto-dismiss a 4.5s, gestionados como array en App.
- Tailwind con tokens semánticos estilo Material 3 (`surface-container`, `on-primary`, `outline-variant`, etc.).
