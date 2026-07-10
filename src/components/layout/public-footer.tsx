import Link from "next/link";
import { ApletLogo } from "@/components/brand";

const productLinks = [
  { href: "/features", label: "امکانات" },
  { href: "/pricing", label: "قیمت‌گذاری" },
  { href: "/how-it-works", label: "نحوه کار" },
  { href: "/publishers", label: "ناشران" },
  { href: "/advertisers", label: "تبلیغ‌کنندگان" },
];

const contentLinks = [
  { href: "/blog", label: "بلاگ" },
  { href: "/guides", label: "راهنماها" },
  { href: "/glossary", label: "واژه‌نامه" },
  { href: "/tools", label: "ابزارها" },
  { href: "/resources", label: "منابع" },
];

const topicLinks = [
  { href: "/telegram-channel", label: "کانال تلگرام" },
  { href: "/telegram-growth", label: "رشد تلگرام" },
  { href: "/telegram-marketing", label: "بازاریابی تلگرام" },
  { href: "/telegram-ads", label: "تبلیغات تلگرام" },
  { href: "/telegram-monetization", label: "درآمدزایی تلگرام" },
];

const supportLinks = [
  { href: "/faq", label: "سوالات متداول" },
  { href: "/contact", label: "تماس با ما" },
  { href: "/about", label: "درباره ما" },
];

const legalLinks = [
  { href: "/terms", label: "شرایط استفاده" },
  { href: "/privacy", label: "حریم خصوصی" },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-border/30 bg-gradient-to-b from-surface to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <ApletLogo className="h-8" />
            </Link>
            <p className="text-xs text-text-tertiary leading-relaxed mt-3 max-w-xs">
              پلتفرم مدیریت رشد، اسپانسرشیپ و درآمدزایی تلگرام. ابزارهای حرفه‌ای برای ناشران و تبلیغ‌کنندگان.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-bold text-text-primary mb-4 uppercase tracking-wider">محصول</h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-text-tertiary hover:text-[#5B5FEF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div>
            <h4 className="text-xs font-bold text-text-primary mb-4 uppercase tracking-wider">محتوا</h4>
            <ul className="space-y-2.5">
              {contentLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-text-tertiary hover:text-[#5B5FEF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-xs font-bold text-text-primary mb-4 uppercase tracking-wider">موضوعات</h4>
            <ul className="space-y-2.5">
              {topicLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-text-tertiary hover:text-[#5B5FEF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-bold text-text-primary mb-4 uppercase tracking-wider">پشتیبانی</h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-text-tertiary hover:text-[#5B5FEF] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} آپلت. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link, i) => (
              <span key={link.href}>
                {i > 0 && <span className="text-text-tertiary/30 mx-1">|</span>}
                <Link href={link.href} className="text-xs text-text-tertiary hover:text-[#5B5FEF] transition-colors">
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
