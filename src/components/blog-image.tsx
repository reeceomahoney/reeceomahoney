import Image from "next/image";

export default function BlogImage({
  src,
  caption,
}: {
  src: string;
  caption: string;
}) {
  return (
    <div>
      <Image src={src} alt={caption} width={500} height={300} />
      <figcaption>{caption}</figcaption>
    </div>
  );
}
