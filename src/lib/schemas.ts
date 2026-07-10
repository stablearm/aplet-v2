import { SITE_URL, SITE_NAME } from "./seo";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/aplet-logo-light.svg`,
    description:
      "آپلت: سیستم عامل کسب و کار تلگرام. مدیریت کانال، کمپین عضوگیری، درآمدزایی و تبلیغات.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Persian"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleSchema({
  title,
  description,
  path,
  author,
  publishedAt,
  updatedAt,
  image,
}: {
  title: string;
  description: string;
  path: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}${path}`,
    image: image || `${SITE_URL}/og/default.png`,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/aplet-logo-light.svg`,
      },
    },
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
  };
}

export function faqSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function howToSchema({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "آپلت",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description:
      "سیستم عامل کسب و کار تلگرام برای مدیریت کانال، کمپین عضوگیری، درآمدزایی و تبلیغات.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IRR",
      description: "ثبت نام رایگان",
    },
  };
}

export function productSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: `${SITE_URL}${path}`,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IRR",
      availability: "https://schema.org/InStock",
    },
  };
}
