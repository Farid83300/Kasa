import { PropertySummary, PropertyDetail } from '@/types/logement';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Récupère la liste complète des propriétés
export async function getProperties(): Promise<PropertySummary[]> {
  const res = await fetch(`${API_URL}/properties`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Erreur lors de la récupération des propriétés');
  }

  return res.json();
}

// Récupère le détail complet d'une propriété par son ID
export async function getPropertyById(id: string): Promise<PropertyDetail> {
  const res = await fetch(`${API_URL}/properties/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Propriété introuvable');
  }

  return res.json();
}

/**
 * Récupère une propriété par son slug.
 * L'API n'accepte pas le slug sur /properties/:id — on fait le mapping slug → id côté frontend.
 * Retourne null si aucun logement ne correspond, pour permettre un notFound() propre dans la page.
 */
export async function getPropertyBySlug(slug: string): Promise<PropertyDetail | null> {
  const properties = await getProperties();
  const match = properties.find((property) => property.slug === slug);

  if (!match) {
    return null;
  }

  return getPropertyById(match.id);
}
