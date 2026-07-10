import type { Metadata } from "next";

const SITE_URL = "https://aplet.pages.dev";
const SITE_NAME = "آپلت";
const DEFAULT_DESCRIPTION =
  "آپلت: سیستم عامل کسب و کار تلگرام. مدیریت کانال، کمپین عضوگیری، درآمدزایی و تبلیغات.";

export function generatePageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}/og/default.png`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: "fa_IR",
      url,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}

export function generateArticleMetadata({
  title,
  description,
  path,
  author,
  publishedAt,
  updatedAt,
  image,
  tags,
}: {
  title: string;
  description: string;
  path: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  tags?: string[];
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}/og/default.png`;

  return {
    title,
    description,
    keywords: tags,
    authors: [{ name: author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      locale: "fa_IR",
      url,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      publishedTime: publishedAt,
      modifiedTime: updatedAt || publishedAt,
      authors: [author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}

export function generateProductMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return generatePageMetadata({
    title,
    description,
    path,
    image,
    type: "website",
  });
}

export { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION };
