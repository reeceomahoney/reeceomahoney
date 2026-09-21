import Image from "next/image";

export function Figure({
  src,
  alt,
  caption,
  width = 800,
  height = 600,
  className = "mx-auto w-full",
}: {
  src: string;
  alt: string;
  caption: React.ReactNode;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
      <figcaption className="pt-2 text-left text-sm text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
