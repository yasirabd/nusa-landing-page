import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/site-config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/login",
          "/reset-password",
          "/test",
          "/test-supabase",
        ],
      },
    ],
    host: siteConfig.url.origin,
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  }
}
