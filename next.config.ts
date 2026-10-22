import type { NextConfig } from "next";
import posts from "./src/data/blog/posts.json";
import { serviceDetails } from "./src/data/serviceDetails";

const nextConfig: NextConfig = {
  redirects() {
    return [
      // The old WordPress About page lived at /about-us/; keep its links working
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      // Old WordPress service pages
      ...serviceDetails.map((s) => ({ source: s.legacyPath, destination: `/services/${s.slug}`, permanent: true })),
      // Old WordPress articles lived at the site root (/<slug>/)
      ...posts.map((p) => ({ source: `/${p.slug}`, destination: `/blog/${p.slug}`, permanent: true })),
    ];
  },
};

export default nextConfig;
