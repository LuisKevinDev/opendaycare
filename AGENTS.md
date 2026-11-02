<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Open Daycare — guía para agentes

App de guardería en español: Next.js 16 (App Router) + React 19 + Tailwind v4. Rutas planeadas según los mockups: login, feed, detalle de publicación, crear publicación, niños, perfil-niño, avisos, resumen del día, cuenta, vincular padre, activar cuenta.

## MCPs

- Playwright MCP: configurado localmente en `opencode.json` (`node node_modules/@playwright/mcp/cli.js --headless`). Todo screenshot o artefacto de Playwright va en la carpeta `playwright-mcp/`.
  - `.playwright-mcp/` son logs de sesión (`.gitignore`) — no los edites ni los comitees; `playwright-mcp/` sí se versiona.
- Context7: úsalo para traer la documentación actualizada del framework antes de escribir código.

## Comandos

- `npm run dev` → http://localhost:3000
- `npm run build` → incluye el chequeo de TypeScript ("Running TypeScript"). Es la verificación final fiable.
- `npx tsc --noEmit` → typecheck rápido (no existe script `typecheck`; tsconfig tiene `noEmit`).
- `npm run lint` → **falla hoy con 2 errores preexistentes** en `references/pantallas/support.js` (vendor de los mockups). Ignora ese archivo; lo que importa es que no aparezcan tus archivos.
- No hay test runner configurado.

## Next 16 con `cacheComponents` activo (lo que más rompe)

`next.config.ts` tiene `cacheComponents: true` y `partialPrefetching: true` (además de `experimental.agentFeedback`). Consecuencias que no son las de Next 13–15:

- Exportar `dynamic`, `revalidate`, `fetchCache` o `runtime` en un segmento es un error. En su lugar: `use cache`, `cacheLife`, `cacheTag`.
- Todo lo dinámico (cookies, headers, fetch no cacheado, DB) debe ir dentro de `<Suspense>` o en una función marcada con `use cache`.
- `new Date()`, `Date.now()`, `Math.random()`, `crypto.randomUUID()` en el shell prerenderizado tiran error de build: muévelos dentro de `<Suspense>` (+ `connection()`) o a un Client Component.
- Los errores e insights de validación **no** salen en la respuesta HTTP (la ruta devuelve 200 igual); sólo aparecen en el overlay/log de `next dev`. Lee ese log o la salida de `next build`.
- Con Cache Components las rutas se validan en dev para navegación instantánea; el opt-out temporal es `export const instant = false` en el segmento.
- Documentación local del framework: `node_modules/next/dist/docs/01-app/` (empieza por `02-guides/migrating-to-cache-components.md` y `03-api-reference/01-directives/use-cache.md`).

## Estilos

- Tailwind v4 **sin PostCSS ni `tailwind.config`**: se carga por la regla de Turbopack en `next.config.ts` (`loaders: ["@tailwindcss/turbopack"]` para `*.css`) y `@import "tailwindcss"` en `app/globals.css`. Los tokens se declaran con `@theme inline` en `globals.css`. Cambiar config/plugins de Tailwind implica tocar esa regla.
- Alias de import: `@/*` → raíz del repo.

## Los mockups son la fuente de verdad del diseño

- `references/pantallas/*.dc.html`: una pantalla por archivo (`login`, `feed`, `familia-feed`, `detalle-publicacion`, `crear-publicacion`, `ninos`, `agregar-nino`, `perfil-nino`, `avisos`, `resumen-dia`, `mi-cuenta`, `familia-cuenta`, `foto`, `activar-cuenta`, `vincular-padre`, `index`). Antes de maquetar, abre el HTML correspondiente: define los textos en español, los tokens de color (crema `#f6ecdf`, tarjetas `#fffdf9`, texto `#3f362e`) y las tipografías (Fredoka para títulos, Nunito para texto).
- `references/screenshots/*.png`: capturas de esas mismas pantallas.
- `references/pantallas/support.js` es librería de apoyo de los HTML: no la edites ni la corrijas por lint.

## Flujo de trabajo: spec-driven

- Skills en `.agents/skills/` (registradas en `skills-lock.json`): `spec` y `spec-impl`. Features grandes van primero a spec: `specs/NN-slug.md`, creado en estado `Draft`.
- `spec-impl NN-slug` sólo arranca si el estado dice "Approved"/"Aprobado" (o equivalente), crea y cambia a la rama `spec-NN-slug` (`AutoCreateBranch` en `specs/.spec-config.yml`), implementa paso a paso pidiendo revisión del diff, y **nunca commitea**: el commit lo hace el humano.
- Responde en el mismo idioma en que te escriban (las skills lo exigen y el producto es en español).
