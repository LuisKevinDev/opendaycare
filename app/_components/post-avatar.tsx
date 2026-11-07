import { MegaphoneIcon } from "./icons";

type PostAvatarProps = { readonly initial: string };

export function PostAvatar({ initial }: PostAvatarProps) {
  if (initial.length === 0) {
    return (
      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#CCD8F4] text-[#4E72C8]">
        <MegaphoneIcon className="size-5" />
      </div>
    );
  }

  return (
    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-avatar-kid font-title text-[17px] font-semibold text-avatar-kid-ink">
      {initial}
    </div>
  );
}
