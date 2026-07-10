"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ApletLogo } from "@/components/brand";

const mainNav = [
  { href: "/features", label: "امکانات" },
  { href: "/pricing", label: "تعرفه" },
  { href: "/how-it-works", label: "نحوه کار" },
  { href: "/blog", label: "وبلاگ" },
];

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-border/50 bg-surface/80 backdrop-blur-xl shadow-sm"
          : "border-border/30 bg-surface/60 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Right: Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <ApletLogo className="h-8" />
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Left: Auth buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            prefetch={true}
            className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 transition-all duration-200"
          >
            ورود
          </Link>
          <Link
            href="/register"
            prefetch={true}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-l from-primary to-accent px-6 text-sm font-bold text-white shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 hover:scale-[1.02] transition-all duration-200"
          >
            شروع رایگان
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden flex items-center justify-center h-9 w-9 rounded-xl hover:bg-surface-elevated transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border/30 bg-surface/95 backdrop-blur-xl">
          <nav className="container mx-auto flex flex-col px-4 py-4 gap-1">
            {mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:bg-surface-elevated hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-border/30 my-2" />
            <Link
              href="/login"
              className="flex items-center px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:bg-surface-elevated hover:text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              ورود
            </Link>
            <Link
              href="/register"
              className="flex items-center justify-center rounded-xl bg-gradient-to-l from-primary to-accent px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-primary/25 mt-2"
              onClick={() => setMobileOpen(false)}
            >
              شروع رایگان
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
