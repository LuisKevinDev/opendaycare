# SPEC 02 — Kids list page

> **Status:** Aprobado
> **Depends on:** SPEC 01
> **Date:** 2026-11-07
> **Objective:** Implementar la página de lista de niños con layout global reutilizable, datos mock en TypeScript y diseño responsive fiel al mockup `ninos.dc.html`.

## Scope

**In:**

- Layout global reutilizable (sidebar con navegación, logo, usuario).
- Página de lista de niños en `/kids`.
- Barra de búsqueda funcional (filtra en cliente).
- Grid responsive de tarjetas de niños (1 columna mobile, 2 columnas desktop).
- Componentes reutilizables: `Avatar` (con fallback de inicial) y `Badge` (con variantes).
- Tipos TypeScript para `Kid`, `Parent`, `Badge`.
- Datos mock en archivo separado.
- Navegación: logo a `/`, tarjetas a `/kids/[id]`, botones a otras rutas.
- Sidebar responsive: oculto en mobile, se abre con botón hamburguesa.
- Diseño fiel al mockup: tokens de color, tipografías Fredoka/Nunito, espaciados.

**Out of scope (for future specs):**

- Página de perfil de niño (`/kids/[id]`).
- Página de agregar niño.
- Lógica de negocio, autenticación o base de datos.
- Backend, API routes o server actions.
- Animaciones complejas o transiciones.
- Mobile-first design (solo responsive básico).

## Data model

```typescript
// lib/types/kid.ts
export interface Kid {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  initials: string;
  avatarColor: string;
  initialsColor: string;
  linkedParentsCount: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  label: string;
  variant: "warning" | "action" | "info";
}

export interface Parent {
  id: string;
  name: string;
  email: string;
}
```

```typescript
// lib/data/kids-mock.ts
import { Kid } from "@/lib/types/kid";

export const mockKids: Kid[] = [
  {
    id: "kid-1",
    firstName: "Mateo",
    lastName: "Fernández",
    age: 3,
    initials: "M",
    avatarColor: "#A9D9E8",
    initialsColor: "#1F7A93",
    linkedParentsCount: 2,
    badges: [{ id: "b1", label: "MANÍ", variant: "warning" }],
  },
  // ... más niños mock
];
```

No se introducen nuevas estructuras de persistencia. Los datos mock son estáticos.

## Implementation plan

1. Crear tipos TypeScript en `lib/types/kid.ts` con las interfaces `Kid`, `Badge`, `Parent`.
2. Crear archivo de datos mock en `lib/data/kids-mock.ts` con 8 niños de ejemplo.
3. Crear componente `Avatar` en `components/ui/avatar.tsx` que acepte `src?: string`, `fallback: string`, `size?: number`, `bgColor?: string`, `textColor?: string`.
4. Crear componente `Badge` en `components/ui/badge.tsx` con variantes `warning` (naranja), `action` (rosa), `info` (azul).
5. Crear componente `Sidebar` en `components/layout/sidebar.tsx` con: logo enlazando a `/`, navegación (Feed, Niños, Avisos, Mi cuenta), usuario actual, botón hamburguesa para mobile.
6. Crear componente `KidCard` en `components/kids/kid-card.tsx` que muestre avatar, nombre, edad, padres vinculados, badges opcionales, y enlace a `/kids/[id]`.
7. Crear componente `KidSearch` en `components/kids/kid-search.tsx` con input de búsqueda y estado local.
8. Crear página `app/kids/page.tsx` que integre todos los componentes, con estado de búsqueda en cliente y grid responsive.
9. Agregar estilos globales en `app/globals.css` si faltan tokens de color o tipografías.
10. Verificar que `npm run build` pase sin errores de TypeScript.

Cada paso deja el sistema funcional. Las dependencias entre componentes se resuelven en orden.

## Acceptance criteria

- [ ] La página `/kids` carga sin errores en consola.
- [ ] El sidebar muestra logo, navegación, usuario y es responsive (oculto en mobile, visible en desktop).
- [ ] El logo en el sidebar enlaza a `/`.
- [ ] La barra de búsqueda filtra la lista de niños en tiempo real (cliente).
- [ ] El grid muestra 1 columna en mobile (<640px) y 2 columnas en desktop (>=640px).
- [ ] Cada tarjeta de niño muestra avatar con inicial, nombre completo, edad, número de padres vinculados.
- [ ] Las tarjetas con badges los muestran con el color correcto (warning=naranja, action=rosa, info=azul).
- [ ] Las tarjetas enlazan a `/kids/[id]` con el ID del niño.
- [ ] El botón "Agregar niño" enlaza a `/kids/new` (o la ruta que se defina en el spec correspondiente).
- [ ] Los enlaces de navegación (Feed, Avisos, Mi cuenta) apuntan a `/feed`, `/notices`, `/account`.
- [ ] El diseño es fiel al mockup: colores `#F6ECDF` (fondo), `#FFFDF9` (tarjetas), `#3F362E` (texto), tipografías Fredoka y Nunito.
- [ ] `npm run build` pasa sin errores de TypeScript.
- [ ] No hay errores de lint en los archivos nuevos (ignorando `references/pantallas/support.js`).

## Decisions

- **Sí:** Layout global reutilizable desde el inicio. Evita duplicar sidebar en cada página.
- **No:** Base de datos o API. Fuera de alcance, se agregará en specs posteriores.
- **Sí:** Datos mock en archivo separado. Facilita reemplazar con datos reales después.
- **No:** Búsqueda con backend. Filtro en cliente es suficiente para <100 niños.
- **Sí:** Componentes `Avatar` y `Badge` genéricos. Se reutilizarán en otras pantallas (perfil, feed).
- **No:** Animaciones complejas. Fuera de alcance para este spec.
- **Sí:** Enlaces estáticos a rutas que no existen aún (`/kids/[id]`, `/kids/new`). Correcto para maquetación.
- **No:** Mobile-first con breakpoints personalizados. Tailwind por defecto es suficiente.
- **Sí:** Sidebar oculto en mobile con botón hamburguesa. Patrón estándar, mejor UX.

## What is **not** in this spec

- Página de perfil de niño (`/kids/[id]`).
- Página de agregar niño (`/kids/new` con formulario).
- Lógica de negocio, autenticación o base de datos.
- Backend, API routes o server actions.
- Animaciones complejas o transiciones.

Cada uno de esos, si se implementa, va en su propio spec.
