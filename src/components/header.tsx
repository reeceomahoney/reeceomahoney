import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="container mx-16 flex items-center justify-between py-4">
        <div className="flex gap-16 items-end">
          <Link href="/">
            <h1 className="py-8 text-4xl font-bold">Reece O&apos;mahoney</h1>
          </Link>
          <Link href="/publications">
            <h2 className="py-8 text-2xl">Publications</h2>
          </Link>
          <Link href="/projects">
            <h2 className="py-8 text-2xl">Projects</h2>
          </Link>
          <Link href="/blog">
            <h2 className="py-8 text-2xl">Blog</h2>
          </Link>
        </div>
        <ModeToggle />
      </header>
    </>
  );
}
