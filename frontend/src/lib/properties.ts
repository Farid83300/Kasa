import { PropertySummary, PropertyDetail } from '@/types/logement';
import { mockProperties } from '@/data/mockProperties';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Activée uniquement via une variable d'environnement Vercel — jamais dans
// .env.local. Permet un déploiement frontend-only sans backend live,
// conformément à la recommandation OpenClassrooms sur le mock de données.
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

/**
 * Récupère la liste complète des propriétés.
 * En mode démo, retourne l'instantané statique local sans appel réseau.
 * @param options.cache - Si true, met en cache la réponse 30s (page d'accueil uniquement).
 */
export async function getProperties(options?: { cache?: boolean }): Promise<PropertySummary[]> {
  if (DEMO_MODE) {
    return mockProperties;
  }

  const res = await fetch(
    `${API_URL}/properties`,
    options?.cache ? { next: { revalidate: 30 } } : { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Erreur lors de la récupération des propriétés');
  }

  return res.json();
}

/**
 * Récupère le détail complet d'une propriété par son ID.
 * En mode démo, cherche directement dans l'instantané statique.
 * @param id - Identifiant unique du logement.
 */
export async function getPropertyById(id: string): Promise<PropertyDetail> {
  if (DEMO_MODE) {
    const property = mockProperties.find((p) => p.id === id);
    if (!property) throw new Error('Propriété introuvable');
    return property;
  }

  const res = await fetch(`${API_URL}/properties/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Propriété introuvable');
  }

  return res.json();
}

/**
 * Récupère une propriété par son slug (ex: "appartement-cosy").
 * @param slug - Identifiant lisible utilisé dans l'URL.
 * @returns Le détail du logement, ou `null` si aucun ne correspond.
 */
export async function getPropertyBySlug(slug: string): Promise<PropertyDetail | null> {
  if (DEMO_MODE) {
    return mockProperties.find((p) => p.slug === slug) ?? null;
  }

  const properties = await getProperties();
  const match = properties.find((property) => property.slug === slug);

  if (!match) {
    return null;
  }

  return getPropertyById(match.id);
}
