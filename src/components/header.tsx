"use client";

import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="px-4 md:container md:mx-16 md:px-0">
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:justify-between">
          <div className="flex items-end gap-16">
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
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center justify-between py-4 md:hidden">
          <Link href="/">
            <h1 className="text-3xl font-bold">Reece O&apos;mahoney</h1>
          </Link>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="flex flex-col space-y-4 pb-4 md:hidden">
            <Link
              href="/publications"
              className="text-2xl"
              onClick={() => setIsMenuOpen(false)}
            >
              Publications
            </Link>
            <Link
              href="/projects"
              className="text-2xl"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className="text-2xl"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
