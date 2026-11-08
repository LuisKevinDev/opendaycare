"use client";

import { useMemo, useState } from "react";
import { mockKids } from "@/lib/data/kids-mock";
import { KidCard } from "@/components/kids/kid-card";
import { KidSearch } from "@/components/kids/kid-search";
import Link from "next/link";

export default function KidsPage() {
  const [query, setQuery] = useState("");

  const filteredKids = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return mockKids;
    return mockKids.filter(
      (kid) =>
        kid.firstName.toLowerCase().includes(normalized) ||
        kid.lastName.toLowerCase().includes(normalized)
    );
  }, [query]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-title text-[30px] font-semibold text-ink">Niños</h1>
        <Link
          href="/kids/new"
          className="rounded-xl bg-gradient-to-b from-brand-light to-brand px-4 py-2 text-sm font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)]"
        >
          Agregar niño
        </Link>
      </div>
      <p className="mt-1 text-sm text-mute">
        {mockKids.length} niños registrados
      </p>

      <div className="mt-6">
        <KidSearch value={query} onChange={setQuery} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filteredKids.map((kid) => (
          <KidCard key={kid.id} kid={kid} />
        ))}
      </div>

      {filteredKids.length === 0 && (
        <div className="mt-8 text-center">
          <p className="font-nunito text-sm text-mute">
            No se encontraron niños para &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </>
  );
}
