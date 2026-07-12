import { PropertySummary, PropertyDetail } from "@/types/logement";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Récupère la liste complète des propriétés depuis l'API.
 * @param options.cache - Si true, met en cache la réponse 30s (utilisé
 * uniquement par la page d'accueil pour éviter un skeleton visible lors
 * des navigations rapides). Par défaut à false : données toujours fraîches,
 * nécessaire pour getPropertyBySlug (redirection après création d'un logement).
 */
export async function getProperties(
  options?: { cache?: boolean }
): Promise<PropertySummary[]> {
  const res = await fetch(
    `${API_URL}/properties`,
    options?.cache ? { next: { revalidate: 30 } } : { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des propriétés");
  }

  return res.json();
}

/**
 * Récupère le détail complet d'une propriété par son ID.
 * @param id - Identifiant unique du logement côté backend.
 */
export async function getPropertyById(id: string): Promise<PropertyDetail> {
  const res = await fetch(`${API_URL}/properties/${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Propriété introuvable");
  }

  return res.json();
}

/**
 * Récupère une propriété par son slug (ex: "appartement-cosy").
 * Toujours des données fraîches (pas de cache) — nécessaire pour retrouver
 * un logement tout juste créé lors de la redirection post-création.
 */
export async function getPropertyBySlug(
  slug: string
): Promise<PropertyDetail | null> {
  const properties = await getProperties();
  const match = properties.find((property) => property.slug === slug);

  if (!match) {
    return null;
  }

  return getPropertyById(match.id);
}
