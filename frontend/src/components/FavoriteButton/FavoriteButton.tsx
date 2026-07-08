'use client';

import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

interface FavoriteButtonProps {
  propertyId: string;
}

/** Bouton cœur — Client Component isolé pour permettre l'interactivité au sein d'une carte majoritairement Server */
export default function FavoriteButton({ propertyId }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(propertyId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(propertyId)}
      aria-label={active ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      aria-pressed={active}
      className={`absolute top-3 right-3 z-10 rounded-lg p-2 cursor-pointer flex items-center justify-center transition-colors ${
        active ? 'bg-[#99331A]' : 'bg-white/70'
      }`}
    >
      <Heart
        size={18}
        strokeWidth={2}
        className={active ? 'fill-[#F5F5F5] text-[#F5F5F5]' : 'fill-[#565656] text-[#565656]'}
      />
    </button>
  );
}
