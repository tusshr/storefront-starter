import type { MetadataRoute } from "next";

import { getRoots } from "@/lib/mock/categories";

const siteUrl = "https://bhalow.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/new`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/deals`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/trending`, changeFrequency: "daily", priority: 0.7 },
    { url: `${siteUrl}/top-rated`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.4 },
    { url: `${siteUrl}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    {
      url: `${siteUrl}/data-deletion`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const categoryEntries: MetadataRoute.Sitemap = getRoots().map((c) => ({
    url: `${siteUrl}/c/${c.name.toLowerCase().replace(/[^\w]+/g, "-")}`,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticEntries, ...categoryEntries];
}
