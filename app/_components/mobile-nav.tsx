"use client";

import { useEffect, useState } from "react";
import { MenuIcon } from "./icons";
import { Sidebar } from "./sidebar";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <div className="flex h-14 items-center border-b border-line bg-card px-4 md:hidden">
        <button
          type="button"
          aria-label="Abrir menú"
          aria-controls="menu-panel"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
          className="flex size-10 items-center justify-center rounded-xl text-ink"
        >
          <MenuIcon className="size-6" />
        </button>
      </div>
      {isOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-ink/30"
          />
          <div id="menu-panel" className="absolute inset-y-0 left-0" onClick={() => setIsOpen(false)}>
            <Sidebar />
          </div>
        </div>
      ) : null}
    </>
  );
}
