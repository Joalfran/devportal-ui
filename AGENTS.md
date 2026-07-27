# AGENTS.md — DevPortal UI

## Identidad y propósito
- Proyecto: **devportal-ui** — showcase/documentación de un design system ("DevPortal UI v2.4.0").
- Stack: React 19 + Vite 6 + TypeScript + Tailwind 4 (plugin `@tailwindcss/vite`). Iconos: `lucide-react`.
- 100% frontend. **No hay backend ni llamadas de red**: todos los datos son mock hardcodeados en cada vista.
- Origen: app exportada de Google AI Studio (por eso `.env.example` menciona GEMINI_API_KEY; **no se usa en el código actual**).
- Idioma de la UI y de la documentación: español.

## Reglas duras (invariantes)
1. Todo el estado global vive en `src/App.tsx` y baja por props. No introducir Redux/Zustand/Context sin decisión registrada.
2. Los datos mock viven dentro de cada vista (`FoundationsView`, `ComponentsView`, `TemplatesView`). No crear APIs falsas.
3. Tipos compartidos solo en `src/types.ts`.
4. No tocar `vite.config.ts` (la lógica de `DISABLE_HMR` es requerida por AI Studio).
5. Notificaciones: siempre vía `addNotification(msg, tipo)` recibido por props; nunca otro sistema de toasts.
6. Shell del usuario: **PowerShell en Windows**. No usar comandos Unix (`rm -rf`, `&&` de bash, etc.). El script `npm run clean` está roto en Windows por esto.
7. `diagrama-arquitectura.html` es un artefacto de documentación autocontenido; no importarlo ni referenciarlo desde la app.

## Gestión de contexto (reglas de oro)
- El context window es caro y volátil. **La memoria real vive en estos archivos.**
- Nunca cargar todo el historial ni todos los archivos del proyecto. Cargar solo lo necesario para la tarea actual.
- Preferir **referenciar** archivos (ruta + líneas) antes que copiar contenido largo al prompt.
- Al cerrar una sesión importante: actualizar `state/estado.md`, registrar decisiones nuevas en `decisions/registro.md` y comprimir lo valioso en `logs/`.
- Procedimiento repetido ≥2 veces → convertirlo en skill en `skills/`.
- Mantener este archivo <300 líneas y de alta densidad. Si crece, mover detalle a las carpetas.

## Orden de lectura al iniciar sesión
1. `AGENTS.md` (este archivo).
2. `state/estado.md` — qué está hecho, pendiente y bloqueado.
3. Solo si la tarea lo requiere:
   - Diseño/UI → `context/design.md`
   - "¿Por qué está así?" → `decisions/registro.md` y `context/decisiones.md`
   - Errores raros / entorno → `gotchas/gotchas.md`
   - Contexto de sesiones pasadas → `logs/` (el más reciente primero)
4. Código: leer solo los archivos afectados por la tarea. Mapa rápido:
   - Estado global y layout → `src/App.tsx`
   - Pantallas → `src/components/{Foundations,Components,Templates}View.tsx`
   - Navegación / header → `src/components/{Sidebar,Header}.tsx`

## Routing de skills
| Tarea | Skill |
|---|---|
| Levantar/verificar el dev server | `skills/dev-server.md` |
| Añadir sección o componente nuevo a una vista | `skills/nueva-seccion.md` |
| Cierre de sesión (actualizar memoria) | `skills/cierre-sesion.md` |

## Definition of Done
- `npm run lint` (tsc --noEmit) pasa sin errores.
- La app carga en `http://localhost:3000/` sin errores de consola.
- Las 3 vistas siguen navegables y la búsqueda global sigue filtrando.
- Nuevos patrones/decisiones registrados en `decisions/` o `gotchas/` según corresponda.
- `state/estado.md` actualizado si cambió el estado del proyecto.

## Mapa de memoria
- `context/` — decisiones de diseño visual y de producto (`design.md`, `decisiones.md`).
- `decisions/` — registro cronológico de decisiones técnicas con fecha y razonamiento.
- `state/` — estado vivo del proyecto: hecho / pendiente / blockers.
- `skills/` — procedimientos paso a paso reutilizables.
- `gotchas/` — problemas conocidos del proyecto/entorno + solución.
- `logs/` — resúmenes comprimidos de sesiones importantes (1 archivo por sesión, formato `YYYY-MM-DD-tema.md`).
