# Gotchas conocidos

## Entorno
- **PowerShell/Windows**: `npm run clean` falla (usa `rm -rf`). Alternativa: `Remove-Item -Recurse -Force dist`.
- Comandos largos en esta máquina a veces tardan >30s en shells nuevos; no asumir cuelgue inmediato.

## Proyecto
- `package.json` tiene `"name": "react-example"` — es el nombre del template de AI Studio, no del proyecto.
- README y `.env.example` piden `GEMINI_API_KEY`, y `@google/genai` está en dependencies, pero **ningún archivo de `src/` lo usa**. La app corre sin API key. `express`, `dotenv` y `motion` tampoco se usan en `src/`.
- `vite.config.ts` tiene lógica `DISABLE_HMR` para AI Studio con comentario explícito de no modificar.
- Alias de import `@` apunta a la **raíz** del repo (no a `src/`).
- Dev server expone `--host=0.0.0.0`: accesible desde la red local.
- Imágenes de las plantillas son URLs de `lh3.googleusercontent.com`; si caducan, las cards salen rotas (no es bug del código).
- En `App.tsx`, `removeNotification` tiene una condición redundante (`prev.some(...)`) — funciona, pero no imitar ese patrón.
