# SPEC 01 — Plantilla base y home del feed

> **Estado:** Aprobado
> **Depende de:** ninguno
> **Fecha:** 2026-11-01
> **Objetivo:** Replicar `references/pantallas/feed.dc.html` como home `/` en Tailwind con el shell compartido (sidebar + tema global), sin autenticación ni base de datos.

## 1. Por qué existe este spec

El repo sigue en el estado de `create-next-app` (Geist, `page.tsx` de demo, tokens por defecto). Antes de maquetar cualquiera de las 16 pantallas hay que fijar el shell y el sistema de diseño, porque todas comparten el mismo sidebar, paleta y tipografías. Este spec define esa base y la valida contra una pantalla real, la del feed.

## 2. Alcance

**Dentro:**

- Layout raíz con Fredoka y Nunito vía `next/font/google`, `lang="es"` y metadata de OpenDayCare.
- Paleta y tipografías declaradas como tokens en `@theme inline` de `app/globals.css`.
- Shell compartido: sidebar de 248px en escritorio y drawer con botón hamburguesa por debajo de `md`.
- Home `/` completa según el mockup: header "Buenas, Caro", composer "Compartí un momento…", divisor "PUBLICADO HOY" y las 3 tarjetas (logro, actividad con foto, anuncio).
- Iconos SVG inline extraídos del mockup.
- 5 rutas stub con el shell: `/ninos`, `/avisos`, `/crear-publicacion`, `/detalle-publicacion`, `/mi-cuenta`.
- Limpieza de los restos de `create-next-app`.
- Responsive: escritorio fiel al mockup, mobile con drawer.

**Fuera de alcance (para specs futuros):**

- Autenticación, sesiones y permisos.
- Base de datos, API routes y persistencia.
- Interactividad: likes, comentarios, edición y creación de publicaciones (los enlaces quedan navegables, no funcionales).
- Maquetado del resto de pantallas (niños, avisos, resumen del día, cuenta, activar cuenta, vincular padre).
- Dark mode, internacionalización y tests automatizados.

## 3. Convenciones de código

Código limpio y mantenible; exigible en revisión.

- **Idioma:** todo identificador en inglés — tipos, props, funciones, variables, constantes y nombres de archivo (`PostCard`, `post-card.tsx`, `classroomLabel`, `POSTS`). Los únicos strings en español son los textos visibles copiados del mockup.
- **Componentes:** un componente por archivo, kebab-case para el archivo y PascalCase para el componente. Server Components por defecto; `'use client'` solo en `mobile-nav.tsx`.
- **Tipado:** `type` para uniones y modelos, props como `type XProps = { ... }` explícito. Prohibido `any`; inferencia preferida cuando es obvia.
- **Datos:** constantes inmutables (`as const` / `readonly`). Nada de `let` mutable ni estado global.
- **Estilos:** tokens Tailwind antes que valores arbitrarios. Valor arbitrario solo para colores que aparecen una vez (badges por tipo).
- **Sin comentarios.** El código se explica por sus nombres; lo que no se entienda se resuelve renombrando.
- **Tamaño:** si un archivo pasa ~60 líneas o mezcla dos responsabilidades, se parte (de ahí `sidebar.tsx` separado de `app-shell.tsx` y `mobile-nav.tsx`).
- **Accesibilidad:** el drawer usa `aria-expanded`, `aria-label` y cierre con Escape; todo SVG decorativo lleva `aria-hidden`.
- **Sin dependencias nuevas.** No se instala ninguna librería de iconos ni de UI.

## 4. Modelo de datos

No hay persistencia: los datos son constantes literales copiadas del mockup.

```ts
// app/_data/posts.ts
export type PostKind = "logro" | "actividad" | "anuncio";

export type Post = {
  readonly id: string;              // "logro-mateo"
  readonly kind: PostKind;
  readonly avatarInitial: string;   // "M" — "" en "Anuncio general"
  readonly author: string;          // "Mateo" | "Anuncio general"
  readonly time: string;            // "14:20"
  readonly audience: string;        // "Para: familia de Mateo" | "Para: toda la sala"
  readonly text: string;
  readonly photo?: { readonly caption: string };  // "Foto · pintando con témperas"
  readonly likes: number;           // 3 / 5 / 8
  readonly comments: number;        // 1 / 2 / 0
};

export const POSTS: readonly Post[] = [/* logro 14:20, actividad 09:40, anuncio 07:50 */];
```

```ts
// app/_data/classroom.ts
export const CLASSROOM = {
  name: "Sala Soles",
  eyebrow: "GUARDERÍA · SALA SOLES",
  greeting: "Buenas, Caro",
  headerMeta: "12 niños · martes 17 jun",
  teacher: { name: "Caro Giménez", role: "Maestra · Soles", initial: "C" },
} as const;

export const NAV_ITEMS = [
  { label: "Feed", href: "/", icon: "home" },
  { label: "Niños", href: "/ninos", icon: "kids" },
  { label: "Avisos", href: "/avisos", icon: "bell" },
  { label: "Mi cuenta", href: "/mi-cuenta", icon: "user" },
] as const;
```

**Tokens** en `@theme inline` (los nombres generan utilidades `bg-crema`, `text-mute`, etc.):

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-crema` | `#F6ECDF` | fondo de app |
| `--color-card` | `#FFFDF9` | tarjetas y sidebar |
| `--color-line` | `#ECE0D0` | bordes y separadores |
| `--color-ink` | `#3F362E` | títulos |
| `--color-body` | `#4A4038` | texto de publicación |
| `--color-mute` | `#94887B` | texto secundario |
| `--color-mute-soft` | `#A89A8B` | metadatos |
| `--color-brand` / `--color-brand-light` | `#EE8164` / `#F4977E` | botón "Nueva publicación" |
| `--color-like` | `#E0654A` | corazón |
| `--color-edit` | `#C5503A` | "Editar" |
| `--color-eyebrow` | `#D9583C` | "GUARDERÍA · SALA SOLES" |
| `--color-nav-active` | `#FBE3D8` | ítem activo del nav |
| `--color-avatar-teacher` | `#F2937A` | avatar de la maestra |
| `--color-avatar-kid` / `--color-avatar-kid-ink` | `#A9D9E8` / `#1F7A93` | avatar de niño |
| `--color-photo-bg` / `--color-photo-line` | `#F4ECE1` / `#DBCDBA` | placeholder de foto |
| `--color-hairline` | `#F0E6D8` | divisor interno de tarjeta |
| `--color-rule` | `#E7DAC8` | línea de "PUBLICADO HOY" |
| `--font-fredoka` / `--font-nunito` | variables de `next/font` | títulos / texto |

Badges por tipo: logro `#CFEBD8` + `#3E9B6C`; actividad `#C7E7F1` + `#2E89A6`; anuncio `#CCD8F4` + `#4E72C8`.

## 5. Plan de implementación

1. Limpiar la plantilla: borrar `public/{file,globe,next,vercel,window}.svg` y reemplazar `app/page.tsx` por un placeholder mínimo. Estado: build limpio.
2. Reescribir `app/globals.css`: `@theme inline` con los tokens de la tabla, `body` con fondo `--color-crema` y color `--color-ink`, scrollbar del mockup. Estado: build limpio sin cambios visuales.
3. Actualizar `app/layout.tsx`: `Fredoka` y `Nunito` desde `next/font/google` con variables `--font-fredoka` y `--font-nunito`, quitar Geist, `lang="es"`, metadata "OpenDayCare", conservar la firma tipada del proyecto. Verificación: `npm run build` resuelve las dos familias.
4. Crear `app/_components/icons.tsx` con los SVG del mockup (`SunIcon`, `HomeIcon`, `KidsIcon`, `BellIcon`, `UserIcon`, `LogOutIcon`, `PlusIcon`, `CameraIcon`, `HeartIcon`, `CommentIcon`, `MegaphoneIcon`) usando `currentColor`.
5. Crear `app/_data/classroom.ts` y `app/_data/posts.ts` con el tipo `Post`, `NAV_ITEMS`, `CLASSROOM` y `POSTS`.
6. Crear `app/_components/post-card.tsx` (Server Component): avatar, autor, hora, badge por `kind`, audiencia, texto, placeholder de foto opcional y pie con likes, comentarios y "Editar".
7. Crear `app/_components/sidebar.tsx`: logo, botón "Nueva publicación", nav desde `NAV_ITEMS` con "Feed" activo, y bloque de la maestra con "Cerrar sesión".
8. Crear `app/_components/mobile-nav.tsx` (`'use client'`): botón hamburguesa visible bajo `md` y drawer que envuelve `sidebar.tsx` con overlay y cierre por Escape.
9. Crear `app/_components/app-shell.tsx` que compone `mobile-nav` + `sidebar` (oculto bajo `md`) + `<main>`, y montarlo en el layout.
10. Escribir `app/page.tsx`: header, composer, divisor "PUBLICADO HOY" y mapeo de `POSTS` a `post-card`. Verificación: la home se ve como el mockup.
11. Crear las 5 rutas stub (`app/ninos/page.tsx`, `app/avisos/page.tsx`, `app/crear-publicacion/page.tsx`, `app/detalle-publicacion/page.tsx`, `app/mi-cuenta/page.tsx`) con título en Fredoka y texto "En construcción". Verificación: ningún enlace del sidebar da 404.
12. Verificación final: `npm run build`, `npx tsc --noEmit`, `npm run lint` (ignorando `references/pantallas/support.js`) y capturas en `playwright-mcp/` a 1280px y 390px contra `references/screenshots/`.

## 6. Criterios de aceptación

- [ ] `npm run build` termina sin errores ni warnings de validación de `cacheComponents`.
- [ ] `npx tsc --noEmit` pasa.
- [ ] `npm run lint` no reporta ningún archivo nuevo (solo los 2 errores preexistentes de `references/pantallas/support.js`).
- [ ] `/` muestra exactamente los 3 posts del mockup con sus textos en español, horas, likes (3/5/8) y comentarios (1/2/0).
- [ ] El sidebar mide 248px en escritorio y el ítem "Feed" usa fondo `#FBE3D8` con texto `#D9583C`.
- [ ] Fondo, tarjeta y texto coinciden con `#F6ECDF`, `#FFFDF9` y `#3F362E`.
- [ ] Los títulos usan Fredoka y el cuerpo Nunito (verificable en DevTools → computed font-family).
- [ ] A 390px el sidebar no es visible, aparece el botón hamburguesa y el drawer abre y cierra.
- [ ] Los 5 enlaces del sidebar navegan a una página con el shell y no devuelven 404.
- [ ] No queda ningún `*.svg` de `create-next-app` en `public/`.
- [ ] El layout no referencia Geist.
- [ ] No hay dependencias nuevas en `package.json`.
- [ ] Todo identificador (tipos, props, funciones, variables, nombres de archivo) está en inglés; solo los strings visibles están en español.
- [ ] Ningún archivo `.tsx`/`.ts` nuevo supera 60 líneas sin partirse.
- [ ] No hay comentarios en el código nuevo.
- [ ] Existen capturas en `playwright-mcp/` del home en escritorio y en mobile.

## 7. Decisiones tomadas y descartadas

- **Sí:** código en inglés, UI en español. Producto en español pero mantenible para cualquier persona; los strings visibles salen literales del mockup.
- **Sí:** rutas en español (`/ninos`, `/avisos`). Coinciden con los mockups y con las rutas ya planeadas en `AGENTS.md`; los componentes dentro se nombran en inglés (`ChildrenPage`, `NoticesPage`).
- **Sí:** Tailwind con tokens en `@theme inline`. Se pidió "lo más parecido posible con Tailwind": los tokens dan nombres legibles y valores exactos; se permiten valores arbitrarios para los colores de badge que no se repiten.
- **No:** CSS Modules ni copiar los `style` inline del HTML. El HTML es la fuente de verdad visual, no la forma de implementar.
- **Sí:** `next/font/google` para Fredoka y Nunito. Self-hosted y sin FOUT; el `<link>` del mockup queda como respaldo.
- **Sí:** iconos SVG inline en un único módulo. Cero dependencias y trazo idéntico al original.
- **No:** `lucide-react`. Añade un paquete y no siempre coincide el trazo.
- **Sí:** drawer con hamburguesa en mobile. Conserva los 5 destinos del mockup sin inventar navegación nueva.
- **No:** bottom tabs ni sidebar icons-only. Cambian la estructura de navegación que sí define el mockup.
- **Sí:** fechas y contadores como constantes. Con `cacheComponents`, `new Date()` en el shell prerenderizado rompe el build y hoy la fecha real no aporta valor.
- **No:** `Suspense` + `connection()` ni Client Component con `Date.now()`. Complejidad sin beneficio en esta etapa.
- **Sí:** 5 rutas stub. Evita enlaces muertos y deja claro qué falta maquetar.
- **No:** `not-found.tsx` como única red. El sidebar quedaría lleno de enlaces rotos.
- **Sí:** limpiar todo rastro de `create-next-app` (Geist, `page.tsx` demo, los 5 svg).

## 8. Riesgos

| Riesgo | Mitigación |
| --- | --- |
| `next/font/google` no resuelve la familia `Fredoka` y falla el build | Verificarlo en el paso 3 antes de seguir; si falla, caer al `<link>` de Google Fonts del propio mockup y anotarlo aquí. |
| `next/font` necesita red en tiempo de build | Si el entorno de build está offline el paso 3 falla; la mitigación es la misma (`<link>`). |
| Algún componente usa `new Date()`, `Math.random()` o `crypto.randomUUID()` y rompe la validación de `cacheComponents` | Los datos son constantes; el único Client Component es `mobile-nav.tsx` y solo maneja un booleano. |
| El drawer móvil duplica el marcado del sidebar | `sidebar.tsx` es el único componente de contenido; el drawer solo lo envuelve. |
| Comparar "estilo idéntico" a ojo es subjetivo | Los criterios fijan valores hexadecimales y medidas concretas, y las capturas quedan en `playwright-mcp/` para comparar contra `references/screenshots/`. |

## 9. Lo que **no** está en este spec

- Autenticación, login y control de sesión.
- Base de datos, API routes y cualquier persistencia.
- Likes, comentarios, edición y creación de publicaciones funcionando.
- Maquetado de niños, avisos, resumen del día, cuenta, activar cuenta y vincular padre.
- Dark mode, internacionalización y tests automatizados.

Cada uno de esos, si llega, va en su propio spec.
