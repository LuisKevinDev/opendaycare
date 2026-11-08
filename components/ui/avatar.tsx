import Image from "next/image";

interface AvatarProps {
  src?: string;
  fallback: string;
  size?: number;
  bgColor?: string;
  textColor?: string;
}

export function Avatar({
  src,
  fallback,
  size = 48,
  bgColor = "#A9D9E8",
  textColor = "#1F7A93",
}: AvatarProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={fallback}
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
        color: textColor,
        fontSize: size * 0.4,
      }}
      className="rounded-full flex items-center justify-center font-fredoka font-bold"
    >
      {fallback}
    </div>
  );
}
