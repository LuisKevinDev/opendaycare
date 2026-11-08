interface BadgeProps {
  label: string;
  variant: "warning" | "action" | "info";
}

const variantStyles: Record<BadgeProps["variant"], string> = {
  warning: "bg-[#FDE8D0] text-[#C67A1F]",
  action: "bg-[#FCE4EC] text-[#B8365A]",
  info: "bg-[#D6EEF8] text-[#1F7A93]",
};

export function Badge({ label, variant }: BadgeProps) {
  return (
    <span
      className={`px-2 py-0.5 rounded-md text-xs font-fredoka font-semibold tracking-wide ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}
