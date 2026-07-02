'use client';

import Image from 'next/image';
import { useCallback, useState, type KeyboardEvent } from 'react';

interface GalleryProps {
  images: string[];
  alt: string;
}

/**
 * Carrousel d'images — Client Component (état local + interactions clavier).
 * Règles backlog : pas de flèches si une seule image, boucle entre dernière et première.
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

  return (
    <div
      className="relative h-64 md:h-112.5 w-full overflow-hidden rounded-2xl outline-none"
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
        sizes="(max-width: 768px) 100vw, 1200px"
        className="object-cover"
      />

      {hasMultipleImages && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Image précédente"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl cursor-pointer"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Image suivante"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl cursor-pointer"
          >
            ›
          </button>
          <span className="absolute bottom-4 right-4 text-white text-sm">
            {currentIndex + 1}/{images.length}
          </span>
        </>
      )}
    </div>
  );
}
