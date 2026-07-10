import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Génère automatiquement /robots.txt via la convention Next.js App Router */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/favoris", "/messages", "/logement/ajouter"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
