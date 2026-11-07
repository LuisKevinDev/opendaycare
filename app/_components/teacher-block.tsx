import Link from "next/link";
import { CLASSROOM } from "@/app/_data/classroom";
import { LogOutIcon } from "./icons";

export function TeacherBlock() {
  return (
    <div className="mt-2.5 border-t border-line pt-3.5">
      <div className="flex items-center gap-[11px] px-2 py-1.5">
        <span className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-avatar-teacher font-title text-[16px] font-semibold text-white">
          {CLASSROOM.teacher.initial}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-extrabold text-ink">{CLASSROOM.teacher.name}</span>
          <span className="block text-[12px] text-mute-soft">{CLASSROOM.teacher.role}</span>
        </span>
        <Link
          href="/login"
          aria-label="Cerrar sesión"
          className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-crema text-mute"
        >
          <LogOutIcon className="size-4" />
        </Link>
      </div>
    </div>
  );
}
