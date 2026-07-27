# Skill: añadir sección/componente a una vista

1. Elegir vista destino en `src/components/*View.tsx`. Leer solo esa vista + `src/types.ts`.
2. Seguir el patrón existente de sección:
   - `<section id="..." className="scroll-mt-24 space-y-6">` con header (icono lucide + título + subtítulo).
   - Datos mock como array tipado local a la vista; tipo nuevo → `src/types.ts`.
   - Feedback de interacciones vía `addNotification(msg, 'success'|'info')` (llega por props).
3. Integrar con la búsqueda global: filtrar el array con `searchQuery` (ver `filteredColors` en FoundationsView como referencia) o añadir el término al patrón `show*` (ver ComponentsView).
4. Si la sección es de ComponentsView: añadir entrada `{id, label}` a la sub-navegación en `Sidebar.tsx` (array de "Elementos"); el id debe coincidir con el `id=` de la sección (scroll por `scrollIntoView`).
5. Estilo: solo tokens semánticos de Tailwind ya usados (`bg-surface-container`, `text-on-surface-variant`, `border-outline-variant`...). No inventar colores hex salvo en datos mock.
6. DoD: `npm run lint` limpio + verificación visual en el navegador.
