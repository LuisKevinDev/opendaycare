"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import type { NavItem, NavIcon } from "@/app/_data/classroom";
import { BellIcon, HomeIcon, KidsIcon, UserIcon } from "./icons";

const NAV_ICONS: Record<NavIcon, ComponentType<{ readonly className?: string }>> = {
  home: HomeIcon,
  kids: KidsIcon,
  bell: BellIcon,
  user: UserIcon,
};

export function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const Icon = NAV_ICONS[item.icon];
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-xl px-3 py-[11px] text-[14.5px] ${
        isActive ? "bg-nav-active font-extrabold text-eyebrow" : "font-semibold text-[#6E6359]"
      }`}
    >
      <Icon className="size-[19px]" />
      {item.label}
    </Link>
  );
}
