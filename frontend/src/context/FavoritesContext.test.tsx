import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { FavoritesProvider, useFavorites } from './FavoritesContext';

const wrapper = ({ children }: { children: ReactNode }) => (
  <FavoritesProvider>{children}</FavoritesProvider>
);

describe('FavoritesContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('commence avec une liste de favoris vide', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });
    expect(result.current.favoriteIds).toEqual([]);
  });

  it('ajoute un logement aux favoris', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.toggleFavorite('abc123');
    });

    expect(result.current.isFavorite('abc123')).toBe(true);
  });

  it('retire un logement déjà en favoris au second clic (toggle)', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.toggleFavorite('abc123');
    });
    act(() => {
      result.current.toggleFavorite('abc123');
    });

    expect(result.current.isFavorite('abc123')).toBe(false);
  });

  it('persiste les favoris dans le localStorage', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.toggleFavorite('xyz789');
    });

    const stored = JSON.parse(localStorage.getItem('kasa_favorites') ?? '[]');
    expect(stored).toContain('xyz789');
  });
});
