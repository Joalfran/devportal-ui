# Estado del proyecto — actualizado 2026-07-22

## Hecho
- App funcional: 4 vistas (Foundations, Components, Templates, Sandbox) + Header/Sidebar/Footer + toasts.
- Sandbox responsivo implementado (2026-07-22): frame redimensionable, regla de breakpoints, 5 demos con container queries. `npm run lint` limpio; módulos verificados vía Vite (HTTP 200). Pendiente solo confirmación visual del usuario.
- Repo publicado en GitHub (`Joalfran/devportal-ui`) y desplegado en Vercel (`https://devportal-ui.vercel.app`, auto-deploy on push).
- Navegación móvil implementada en rama `mobile-navigation` (2026-07-29): Sidebar convertido en drawer responsivo con botón hamburguesa en Header (`lg:hidden`), backdrop, cierre por Escape/click-fuera/selección de ítem, scroll lock. `npm run lint` limpio. Pendiente: confirmación visual del usuario en los 3 breakpoints y merge a `master`.
- Dependencias instaladas (`node_modules` presente desde 2026-07-22).
- Dev server verificado en `http://localhost:3000/` (Vite 6.4.3).
- Documentación generada: `diagrama-arquitectura.html` (árbol de componentes + 4 flujos de datos).
- Sistema de memoria persistente creado (AGENTS.md + carpetas).

## Pendiente
- (vacío — no hay tareas comprometidas)

## Blockers
- Ninguno.

## Notas de entorno
- Windows + PowerShell. Puerto dev: 3000 (fijado en `package.json`, host 0.0.0.0).
- `npm install` tarda ~2 min en esta máquina.
