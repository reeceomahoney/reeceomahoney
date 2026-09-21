import Image from "next/image";

export default function BlogImage({
  src,
  caption,
}: {
  src: string;
  caption: string;
}) {
  return (
    <figure>
      <Image src={src} alt={caption} width={500} height={300} />
      <figcaption className="text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}
