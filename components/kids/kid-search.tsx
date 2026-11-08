"use client";

interface KidSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function KidSearch({ value, onChange }: KidSearchProps) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 text-mute"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        placeholder="Buscar niño..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-card border border-line rounded-lg font-nunito text-sm text-ink placeholder:text-mute focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
      />
    </div>
  );
}
