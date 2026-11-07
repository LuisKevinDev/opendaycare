import Link from "next/link";
import { PostCard } from "./_components/post-card";
import { CameraIcon } from "./_components/icons";
import { CLASSROOM } from "./_data/classroom";
import { POSTS } from "./_data/posts";

export default function HomePage() {
  return (
    <>
      <header className="mb-6">
        <p className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-eyebrow">{CLASSROOM.eyebrow}</p>
        <h1 className="font-title text-[30px] font-semibold text-ink">{CLASSROOM.greeting}</h1>
        <p className="mt-[5px] text-[14.5px] text-mute">{CLASSROOM.headerMeta}</p>
      </header>
      <Link
        href="/crear-publicacion"
        className="mb-6 flex items-center gap-[14px] rounded-[18px] border border-line bg-card p-[14px_18px] shadow-[0_4px_14px_-10px_rgba(120,90,60,0.4)]"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-avatar-teacher font-title text-[16px] font-semibold text-white">
          {CLASSROOM.teacher.initial}
        </span>
        <span className="flex-1 text-[15px] text-mute-soft">Compartí un momento…</span>
        <span className="flex size-[38px] shrink-0 items-center justify-center rounded-xl bg-nav-active text-like">
          <CameraIcon className="size-[19px]" />
        </span>
      </Link>
      <div className="mb-[14px] flex items-center gap-[14px]">
        <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-[#8A7C6D]">PUBLICADO HOY</span>
        <span className="h-px flex-1 bg-rule" />
      </div>
      <div className="flex flex-col gap-4">
        {POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
