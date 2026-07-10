/**
 * URL de base du site, utilisée pour générer des URLs absolues
 * (sitemap, metadataBase, Open Graph...). À adapter avec la vraie
 * URL de production si le projet est déployé.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3002";
