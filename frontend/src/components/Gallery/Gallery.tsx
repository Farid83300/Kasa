'use client';

import Image from 'next/image';
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { useCallback, useState, type KeyboardEvent } from 'react';

interface GalleryProps {
  images: string[];
  alt: string;
}

/**
 * Galerie d'images — Client Component (état local pour le carrousel mobile).
 * Deux affichages distincts selon la taille d'écran, fidèles à la maquette :
 * - Mobile : carrousel avec flèches (espace trop restreint pour tout montrer)
 * - Desktop/tablette : grille statique, toutes les photos visibles à la fois
 * Règles backlog respectées : pas de flèches si une seule image, boucle dernière/première.
 */
export default function Gallery({ images, alt }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!hasMultipleImages) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }
  };

  if (images.length === 0) {
    return <div className="relative h-64 md:h-112.5 w-full rounded-2xl bg-gray-200" />;
  }

  // Desktop : jusqu'à 4 miniatures en plus de l'image principale
  const thumbnails = images.slice(1, 5);

  return (
    <>
      {/* Mobile : carrousel avec navigation — une seule image visible à la fois par manque d'espace */}
      <div
        className="relative h-64 w-full overflow-hidden rounded-2xl outline-none md:hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label={`Galerie photo de ${alt}`}
        tabIndex={hasMultipleImages ? 0 : -1}
        onKeyDown={handleKeyDown}
      >
        <Image
          src={images[currentIndex]}
          alt={`${alt} - photo ${currentIndex + 1} sur ${images.length}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Image précédente"
              className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-9 w-9 rounded-full bg-black/50 text-white cursor-pointer"
            >
              <CircleChevronLeft size={22} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Image suivante"
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-9 w-9 rounded-full bg-black/50 text-white cursor-pointer"
            >
              <CircleChevronRight size={22} strokeWidth={1.5} />
            </button>
            <span className="absolute bottom-4 right-4 rounded-lg bg-black/50 px-2 py-1 text-white text-sm">
              {currentIndex + 1}/{images.length}
            </span>
          </>
        )}
      </div>

      {/* Desktop / tablette : grille statique fidèle à la maquette — chaque photo a son propre arrondi */}
      <div className="hidden md:grid md:h-112.5 w-full gap-2 md:grid-cols-3">
        <div className="relative col-span-2 h-full rounded-2xl overflow-hidden">
          <Image
            src={images[0]}
            alt={`${alt} - photo principale`}
            fill
            priority
            sizes="(max-width: 1024px) 66vw, 800px"
            className="object-cover"
          />
        </div>

        {thumbnails.length > 0 && (
          <div className="grid grid-cols-2 gap-2 h-full">
            {thumbnails.map((picture, index) => (
              <div key={picture} className="relative rounded-2xl overflow-hidden">
                <Image
                  src={picture}
                  alt={`${alt} - photo ${index + 2}`}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
