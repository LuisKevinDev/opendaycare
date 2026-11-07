import type { ReactNode } from "react";
import { MobileNav } from "./mobile-nav";
import { Sidebar } from "./sidebar";

type AppShellProps = { readonly children: ReactNode };

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileNav />
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[760px] px-6 pt-8 pb-20 md:px-10 md:pt-[34px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
