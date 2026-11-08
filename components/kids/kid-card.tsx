import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Kid } from "@/lib/types/kid";

interface KidCardProps {
  kid: Kid;
}

export function KidCard({ kid }: KidCardProps) {
  return (
    <Link href={`/kids/${kid.id}`}>
      <article className="bg-card border border-line rounded-xl p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-3">
          <Avatar
            fallback={kid.initials}
            bgColor={kid.avatarColor}
            textColor={kid.initialsColor}
            size={56}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-fredoka font-semibold text-lg text-ink leading-tight">
              {kid.firstName} {kid.lastName}
            </h3>
            <p className="font-nunito text-sm text-mute">
              {kid.age} {kid.age === 1 ? "año" : "años"}
            </p>
            <p className="font-nunito text-xs text-mute mt-1">
              {kid.linkedParentsCount}{" "}
              {kid.linkedParentsCount === 1 ? "padre vinculado" : "padres vinculados"}
            </p>
          </div>
        </div>

        {kid.badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-hairline">
            {kid.badges.map((badge) => (
              <Badge key={badge.id} label={badge.label} variant={badge.variant} />
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
