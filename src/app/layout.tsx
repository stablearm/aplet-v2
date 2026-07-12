import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: {
    default: "آپلت | سیستم عامل کسب و کار تلگرام",
    template: "%s | آپلت",
  },
  description:
    "آپلت: سیستم عامل کسب و کار تلگرام. مدیریت کانال، کمپین عضوگیری، درآمدزایی و تبلیغات در تلگرام.",
  keywords: [
    "تلگرام",
    "تبلیغات تلگرام",
    "بازاریابی تلگرام",
    "کسب درآمد از تلگرام",
    "مدیریت کانال تلگرام",
    "بات تلگرام",
    "عضوگیری تلگرام",
    "تحلیل تلگرام",
    "اتوماسیون تلگرام",
    "Telegram",
  ],
  authors: [{ name: "آپلت" }],
  icons: {
    icon: "/brand/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "آپلت",
    title: "آپلت | سیستم عامل کسب و کار تلگرام",
    description: "آپلت: سیستم عامل کسب و کار تلگرام. مدیریت کانال، کمپین عضوگیری، درآمدزایی و تبلیغات.",
    images: [
      {
        url: "/og/default.svg",
        width: 1200,
        height: 630,
        alt: "آپلت - سیستم عامل کسب و کار تلگرام",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "آپلت | سیستم عامل کسب و کار تلگرام",
    description: "آپلت: سیستم عامل کسب و کار تلگرام. مدیریت کانال، کمپین عضوگیری، درآمدزایی و تبلیغات.",
    images: ["/og/default.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://aplet.ir"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="dark" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=JSON.parse(localStorage.getItem('theme')||'"dark"');if(t==='system')t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.className=t+' dark';document.documentElement.style.colorScheme='dark';}catch(e){document.documentElement.className='dark';document.documentElement.style.colorScheme='dark';}})()`,
          }}
        />
        {/* Font optimization: preconnect + display=swap for FOIT prevention */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Critical font preload for Vazirmatn Regular (most used weight) */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/vazirmatn/v15/DXXy8b-dCrPXYO929A9Daw.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
