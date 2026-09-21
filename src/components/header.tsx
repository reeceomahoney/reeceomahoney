import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  return (
    <header className="w-full max-w-[760px] px-4 pt-8 pb-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/"
            className="text-2xl font-bold text-fg hover:no-underline"
          >
            Reece O&apos;Mahoney
          </Link>
          <p className="text-sm text-muted">
            Head of AI at a stealth startup · PhD candidate, Oxford Robotics
            Institute
          </p>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
