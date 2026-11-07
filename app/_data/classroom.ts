export type NavIcon = "home" | "kids" | "bell" | "user";

export type NavItem = {
  readonly label: string;
  readonly href: string;
  readonly icon: NavIcon;
};

export const CLASSROOM = {
  name: "Sala Soles",
  eyebrow: "GUARDERÍA · SALA SOLES",
  greeting: "Buenas, Caro",
  headerMeta: "12 niños · martes 17 jun",
  teacher: { name: "Caro Giménez", role: "Maestra · Soles", initial: "C" },
} as const;

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Feed", href: "/", icon: "home" },
  { label: "Niños", href: "/ninos", icon: "kids" },
  { label: "Avisos", href: "/avisos", icon: "bell" },
  { label: "Mi cuenta", href: "/mi-cuenta", icon: "user" },
] as const;
