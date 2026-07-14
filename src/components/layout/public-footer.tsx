import Link from "next/link";
import { ApletLogo } from "@/components/brand";

const productLinks = [
  { href: "/features", label: "امکانات" },
  { href: "/pricing", label: "تعرفه بات محتوا" },
  { href: "/how-it-works", label: "نحوه کار" },
  { href: "/publishers", label: "ناشران" },
  { href: "/advertisers", label: "تبلیغ‌کنندگان" },
];

const contentLinks = [
  { href: "/blog", label: "بلاگ" },
  { href: "/guides", label: "راهنماها" },
  { href: "/glossary", label: "واژه‌نامه تلگرام" },
  { href: "/tools", label: "ابزارها" },
];

const topicLinks = [
  { href: "/telegram-channel", label: "کانال تلگرام" },
  { href: "/telegram-growth", label: "رشد تلگرام" },
  { href: "/telegram-ads", label: "تبلیغات تلگرام" },
  { href: "/telegram-monetization", label: "درآمدزایی تلگرام" },
];

const supportLinks = [
  { href: "/faq", label: "سوالات متداول" },
  { href: "/contact", label: "تماس با ما" },
  { href: "/about", label: "درباره ما" },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-border/30 bg-surface">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <ApletLogo className="h-8" />
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mt-3 max-w-xs">
              پلتفرم جامع مدیریت و رشد کانال‌های تلگرامی. خرید ممبر تلگرام و بات
              محتوای هوشمند برای ناشران و تبلیغ‌کنندگان.
            </p>
            <div className="mt-4 text-xs text-text-tertiary space-y-1">
              <p>support@aplet.ir</p>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-bold text-text-primary mb-4">محصول</h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-tertiary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div>
            <h4 className="text-sm font-bold text-text-primary mb-4">محتوا</h4>
            <ul className="space-y-2.5">
              {contentLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-tertiary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-sm font-bold text-text-primary mb-4">
              موضوعات
            </h4>
            <ul className="space-y-2.5">
              {topicLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-tertiary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/30 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} آپلت. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-4 text-xs text-text-tertiary">
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              شرایط استفاده
            </Link>
            <span className="text-border">|</span>
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              حریم خصوصی
            </Link>
            <span className="text-border">|</span>
            <Link href="/faq" className="hover:text-primary transition-colors">
              پشتیبانی
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
