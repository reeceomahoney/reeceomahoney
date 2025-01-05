import Image from "next/image";
import Link from "next/link";

export default function PublicationsPage() {
  return (
    <div className="ml-16 max-w-3xl">
      <h1 className="pb-8 text-3xl font-bold">Projects</h1>
      <div className="flex items-center gap-4">
        <Image
          src="/arxiv-lib.png"
          alt="Locodiff"
          width={300}
          height={300}
          className="rounded-lg shadow-lg drop-shadow-lg"
        />
        <div>
          <Link href="https://arxiv-library.vercel.app/" className="hover:text-blue-500">
            <h2 className="text-xl font-bold">
              Arxiv Library
            </h2>
          </Link>
          <h3>A web app for reading and organizing arXiv papers</h3>
        </div>
      </div>
    </div>
  );
}
