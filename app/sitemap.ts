import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL("/", siteConfig.url).toString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/daftar", siteConfig.url).toString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]
}
