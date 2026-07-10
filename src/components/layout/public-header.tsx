"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, BookOpen, FileText, HelpCircle, Wrench, Package } from "lucide-react";
import { ApletLogo } from "@/components/brand";

const mainNav = [
  { href: "/features", label: "امکانات" },
  { href: "/pricing", label: "قیمت‌گذاری" },
  { href: "/how-it-works", label: "نحوه کار" },
];

const contentDropdown = {
  label: "محتوا",
  items: [
    { href: "/blog", label: "بلاگ", icon: FileText, description: "مقالات آموزشی" },
    { href: "/guides", label: "راهنماها", icon: BookOpen, description: "راهنمای جامع" },
    { href: "/glossary", label: "واژه‌نامه", icon: HelpCircle, description: "فرهنگ لغت تلگرام" },
    { href: "/tools", label: "ابزارها", icon: Wrench, description: "ماشین حساب و ابزار" },
    { href: "/resources", label: "منابع", icon: Package, description: "منابع کاربردی" },
  ],
};

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${
      scrolled
        ? "border-border/50 bg-surface/80 backdrop-blur-xl shadow-sm"
        : "border-border/30 bg-surface/60 backdrop-blur-md"
    }`}>
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
              className="px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-[#5B5FEF] hover:bg-[#5B5FEF]/5 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}

          {/* Content Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-[#5B5FEF] hover:bg-[#5B5FEF]/5 transition-all duration-200"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              محتوا
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
              dropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
            }`}>
              <div className="w-72 rounded-2xl border border-border/40 bg-surface/95 backdrop-blur-xl shadow-xl shadow-black/5 p-2">
                {contentDropdown.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#5B5FEF]/5 transition-colors group"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5B5FEF]/8 text-[#5B5FEF] group-hover:bg-[#5B5FEF]/15 transition-colors shrink-0">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary group-hover:text-[#5B5FEF] transition-colors">{item.label}</p>
                      <p className="text-[10px] text-text-tertiary">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Left: Auth buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/login"
            prefetch={true}
            className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-[#5B5FEF] hover:bg-[#5B5FEF]/5 transition-all duration-200"
          >
            ورود
          </Link>
          <Link
            href="/register"
            prefetch={true}
            className="inline-flex h-9 items-center justify-center rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-5 text-sm font-bold text-white shadow-md shadow-[#5B5FEF]/25 hover:shadow-lg hover:shadow-[#5B5FEF]/35 hover:scale-[1.02] transition-all duration-200"
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
                className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:bg-surface-elevated hover:text-[#5B5FEF] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile content section */}
            <div className="border-t border-border/30 my-2 pt-2">
              <p className="px-3 py-1 text-[10px] font-bold text-text-tertiary uppercase tracking-wider">محتوا</p>
              {contentDropdown.items.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:bg-surface-elevated hover:text-[#5B5FEF] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <link.icon className="h-4 w-4 text-text-tertiary" />
                  <div>
                    <span className="block font-medium">{link.label}</span>
                    <span className="block text-[10px] text-text-tertiary">{link.description}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="border-t border-border/30 my-2" />
            <Link
              href="/login"
              className="flex items-center px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:bg-surface-elevated hover:text-[#5B5FEF] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              ورود
            </Link>
            <Link
              href="/register"
              className="flex items-center justify-center rounded-xl bg-gradient-to-l from-[#5B5FEF] to-[#3B82F6] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#5B5FEF]/25 mt-2"
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
