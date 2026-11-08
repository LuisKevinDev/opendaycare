import Link from "next/link";
import { CLASSROOM, NAV_ITEMS } from "@/app/_data/classroom";
import { PlusIcon, SunIcon } from "./icons";
import { TeacherBlock } from "./teacher-block";
import { NavLink } from "./nav-link";

export function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-[248px] shrink-0 flex-col border-r border-line bg-card px-4 py-6">
      <Link href="/" className="flex items-center gap-[11px] px-2 pt-1 pb-[22px]">
        <span className="flex size-[38px] shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(155deg,#F8C3A8,#F2937A)]">
          <SunIcon className="size-[21px] text-white" />
        </span>
        <span>
          <span className="block font-title text-[17px] font-semibold leading-none text-ink">OpenDayCare</span>
          <span className="mt-0.5 block text-[11.5px] text-mute-soft">{CLASSROOM.name}</span>
        </span>
      </Link>
      <Link
        href="/crear-publicacion"
        className="mb-[18px] flex items-center justify-center gap-2 rounded-[14px] bg-gradient-to-b from-brand-light to-brand px-3 py-3 text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)]"
      >
        <PlusIcon className="size-[17px]" />
        Nueva publicación
      </Link>
      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>
      <TeacherBlock />
    </aside>
  );
}
