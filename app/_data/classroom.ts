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
  { label: "Feed", href: "/feed", icon: "home" },
  { label: "Niños", href: "/kids", icon: "kids" },
  { label: "Avisos", href: "/notices", icon: "bell" },
  { label: "Mi cuenta", href: "/account", icon: "user" },
] as const;
