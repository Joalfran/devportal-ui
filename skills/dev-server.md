# Skill: levantar/verificar dev server

1. Verificar si ya corre: revisar terminales activas o `Test-NetConnection localhost -Port 3000`. Si responde, no duplicar.
2. Si no hay `node_modules`: `npm install` (~2 min en esta máquina).
3. `npm run dev` en background (bloquea la terminal; Vite listo en ~2s, imprime "Local: http://localhost:3000/").
4. Verificación mínima: abrir `http://localhost:3000/` y confirmar que carga sin errores de consola.

Notas: puerto 3000 fijo en package.json; no requiere `.env` para correr.
