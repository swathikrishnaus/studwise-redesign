import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { posts } from "@/data/blog";
import { serviceDetails } from "@/data/serviceDetails";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/study-destinations",
    "/universities",
    "/courses",
    "/services",
    "/testimonials",
    "/team",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  return [
    ...routes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    })),
    ...serviceDetails.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(`${p.date}T00:00:00`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
