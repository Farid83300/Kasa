'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface FavoritesContextValue {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

const STORAGE_KEY = 'kasa_favorites';

/**
 * Fournit la liste des favoris à toute l'application.
 * Synchronisée avec localStorage — indépendante de l'authentification,
 * les favoris sont liés au navigateur, pas à un compte utilisateur.
 */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Chargement initial depuis localStorage — uniquement possible côté client.
  // Le setState ici est volontaire : localStorage est inaccessible pendant le
  // rendu serveur, donc on hydrate avec un tableau vide puis on met à jour
  // juste après le montage pour éviter un hydration mismatch.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFavoriteIds(JSON.parse(stored));
      } catch {
        setFavoriteIds([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    }
  }, [favoriteIds, isLoaded]);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favoriteIds.includes(id);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

/** Hook d'accès au contexte des favoris — doit être utilisé sous FavoritesProvider */
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites doit être utilisé à l'intérieur de FavoritesProvider");
  }
  return context;
}
