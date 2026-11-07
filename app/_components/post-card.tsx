import Link from "next/link";
import type { Post, PostKind } from "@/app/_data/posts";
import { CameraIcon, CommentIcon, HeartIcon } from "./icons";
import { PostAvatar } from "./post-avatar";

type KindBadge = { readonly bg: string; readonly dot: string; readonly ink: string };

const KIND_BADGES: Record<PostKind, KindBadge> = {
  logro: { bg: "bg-[#CFEBD8]", dot: "bg-[#3E9B6C]", ink: "text-[#3E9B6C]" },
  actividad: { bg: "bg-[#C7E7F1]", dot: "bg-[#2E89A6]", ink: "text-[#2E89A6]" },
  anuncio: { bg: "bg-[#CCD8F4]", dot: "bg-[#4E72C8]", ink: "text-[#4E72C8]" },
};

type PostCardProps = { readonly post: Post };

export function PostCard({ post }: PostCardProps) {
  const badge = KIND_BADGES[post.kind];

  return (
    <article className="rounded-[20px] border border-line bg-card p-[20px_22px] shadow-[0_4px_16px_-12px_rgba(120,90,60,0.5)]">
      <header className="flex items-center gap-3 mb-3.5">
        <PostAvatar initial={post.avatarInitial} />
        <div className="flex-1">
          <h2 className="font-title text-[16.5px] font-semibold text-ink">{post.author}</h2>
          <p className="text-[12.5px] text-mute-soft">{post.time} · publicado por vos</p>
        </div>
        <span className={`flex items-center gap-[7px] rounded-full px-3 py-1.5 ${badge.bg}`}>
          <span className={`size-2 rounded-full ${badge.dot}`} />
          <span className={`text-[12px] font-extrabold tracking-[0.5px] ${badge.ink}`}>
            {post.kind.toUpperCase()}
          </span>
        </span>
      </header>
      
      <p className="mb-2.5 text-[12.5px] text-mute-soft">{post.audience}</p>
      <p className="text-[15.5px] leading-[1.55] text-body">{post.text}</p>
      {post.photo ? (
        <div className="mt-3.5 flex h-[200px] flex-col items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-photo-line bg-photo-bg text-[#B0A290]">
          <CameraIcon className="size-[30px]" />
          <span className="text-[13.5px]">{post.photo.caption}</span>
        </div>
      ) : null}
      <footer className="mt-4 flex items-center gap-[18px] border-t border-hairline pt-3.5">
        <span className="flex items-center gap-[7px] text-[14px] font-bold text-like">
          <HeartIcon className="size-[19px]" />{post.likes}
        </span>
        <Link href="/detalle-publicacion" className="flex items-center gap-[7px] text-[14px] font-bold text-mute">
          <CommentIcon className="size-[18px]" />{post.comments}
        </Link>
        <span className="flex-1" />
        <Link href="/crear-publicacion" className="text-[14px] font-extrabold text-edit">
          Editar
        </Link>
      </footer>
    </article>
  );
}
