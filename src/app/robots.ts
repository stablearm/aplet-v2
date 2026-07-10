import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/workspace/", "/api/"],
      },
    ],
    sitemap: "https://aplet.pages.dev/sitemap.xml",
  };
}
