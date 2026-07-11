'use client';

import { useFavorites } from '@/context/FavoritesContext';
import PropertyCard from '@/components/PropertyCard/PropertyCard';
import { PropertySummary } from '@/types/logement';

interface FavoritesListProps {
  properties: PropertySummary[];
}

/**
 * Filtre et affiche les logements favoris.
 * Client Component isolé : seul le filtrage dépend de localStorage (via useFavorites),
 * le fetch des données reste côté serveur dans la page parente.
 */
export default function FavoritesList({ properties }: FavoritesListProps) {
  const { favoriteIds } = useFavorites();

  const favoriteProperties = properties.filter((property) => favoriteIds.includes(property.id));

  if (favoriteProperties.length === 0) {
    return (
      <p className="mt-10 text-center text-sm text-kasa-text-secondary">
        Vous n&apos;avez pas encore de favoris.
      </p>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-10">
      {/* sr-only : rétablit une hiérarchie de titres logique (h1 > h2 > h3) sans changement visuel */}
      <h2 className="sr-only">Vos logements favoris</h2>
      {favoriteProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </section>
  );
}
