"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { ApletLogo } from "@/components/brand";
import { useAuthStore } from "@/store/auth-store";
import { authApi } from "@/lib/api";
import { getRefreshToken } from "@/lib/api-client";

const mainNav = [
  { href: "/features", label: "امکانات" },
  { href: "/pricing", label: "تعرفه" },
  { href: "/how-it-works", label: "نحوه کار" },
  { href: "/blog", label: "وبلاگ" },
];

export function PublicHeader() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    if (!profileOpen) return;
    const handleClick = () => setProfileOpen(false);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [profileOpen]);

  const handleLogout = async () => {
    const token = getRefreshToken();
    try {
      if (token) await authApi.logout({ refreshToken: token });
    } catch {
      // Ignore API errors — clear local state anyway
    }
    logout();
    setProfileOpen(false);
    router.push("/");
  };

  const userInitials = user
    ? (user.firstName?.[0] || user.email?.[0] || "?").toUpperCase()
    : "?";

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

        {/* Left: Auth buttons or Profile */}
        <div className="hidden lg:flex items-center gap-3">
          {isLoading ? (
            <div className="h-10 w-10 rounded-full bg-surface-elevated animate-pulse" />
          ) : isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileOpen(!profileOpen);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-surface-elevated transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
                  {userInitials}
                </div>
                <span className="text-sm font-medium text-text-primary max-w-[120px] truncate">
                  {user.firstName || user.email?.split("@")[0] || "کاربر"}
                </span>
                <ChevronDown className={`h-4 w-4 text-text-tertiary transition-transform ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {profileOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-border/50 bg-surface shadow-xl py-1 z-50">
                  <div className="px-4 py-3 border-b border-border/30">
                    <p className="text-sm font-medium text-text-primary truncate">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-text-tertiary truncate mt-0.5">{user.email}</p>
                  </div>
                  <Link
                    href="/workspace/dashboard"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-elevated hover:text-primary transition-colors"
                    onClick={() => setProfileOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    پنل کاربری
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-danger hover:bg-danger/5 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    خروج
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
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
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2.5">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-white">
                    {userInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{user.firstName || "کاربر"}</p>
                    <p className="text-xs text-text-tertiary truncate">{user.email}</p>
                  </div>
                </div>
                <Link
                  href="/workspace/dashboard"
                  className="flex items-center px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:bg-surface-elevated hover:text-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4 ml-2" />
                  پنل کاربری
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="flex items-center px-3 py-2.5 rounded-xl text-sm text-danger hover:bg-danger/5 transition-colors"
                >
                  <LogOut className="h-4 w-4 ml-2" />
                  خروج
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
