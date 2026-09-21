import Image from "next/image";
import Link from "next/link";
import { publications } from "@/lib/publications";

export function PublicationList() {
  return (
    <ul className="space-y-6">
      {publications.map((pub) => {
        const page = `/publications/${pub.slug}`;
        return (
          <li key={pub.slug} className="flex gap-4">
            <Link href={page} className="mt-1 shrink-0">
              <Image
                src={`${page}/thumb.gif`}
                alt=""
                width={120}
                height={68}
                className="w-[96px] rounded-sm sm:w-[120px]"
              />
            </Link>
            <div>
              <Link href={page} className="font-bold text-fg">
                {pub.title}
              </Link>
              <span className="text-muted"> · {pub.venue}</span>
              <p className="text-sm text-muted">{pub.authors}</p>
              <p className="text-sm">
                <a href={pub.arxiv}>[Paper]</a> <a href={pub.code}>[Code]</a>{" "}
                <Link href={page}>[Website]</Link>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
