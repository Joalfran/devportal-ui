# Estado del proyecto — actualizado 2026-07-29

## Hecho
- App funcional: 4 vistas (Foundations, Components, Templates, Sandbox) + Header/Sidebar/Footer + toasts.
- Sandbox responsivo implementado (2026-07-22): frame redimensionable, regla de breakpoints, 5 demos con container queries. `npm run lint` limpio; módulos verificados vía Vite (HTTP 200). Pendiente solo confirmación visual del usuario.
- Repo publicado en GitHub (`Joalfran/devportal-ui`) y desplegado en Vercel (`https://devportal-ui.vercel.app`, auto-deploy on push).
- Navegación móvil implementada y mergeada a `master` (2026-07-29, commit `ada6353`): Sidebar convertido en drawer responsivo con botón hamburguesa en Header (`lg:hidden`), backdrop, cierre por Escape/click-fuera/selección de ítem, scroll lock. `npm run lint` limpio.
- Verificación visual en navegador completada (2026-07-29): probado en 1440px (sidebar fijo, sin hamburguesa), 768px y 375px (drawer + backdrop). Confirmado: apertura/cierre del drawer, navegación con cierre automático, cierre por Escape y por clic en backdrop, scroll lock del body aplicado/restaurado.
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
