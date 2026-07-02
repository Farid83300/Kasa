'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * Menu mobile — Client Component.
 * Isolé du Header pour limiter "use client" au strict minimum.
 */
export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={isOpen}
        className="flex flex-col gap-1.5 p-2"
      >
        <span className="block w-6 h-0.5 bg-gray-700" />
        <span className="block w-6 h-0.5 bg-gray-700" />
        <span className="block w-6 h-0.5 bg-gray-700" />
      </button>

      {isOpen && (
        <nav className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg p-4 flex flex-col gap-3 z-50 min-w-45">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-sm">
            Accueil
          </Link>
          <Link href="/a-propos" onClick={() => setIsOpen(false)} className="text-sm">
            À propos
          </Link>
          <Link
            href="/logement/ajouter"
            onClick={() => setIsOpen(false)}
            className="text-sm text-kasa-primary"
          >
            +Ajouter un logement
          </Link>
          <Link href="/favoris" onClick={() => setIsOpen(false)} className="text-sm">
            Favoris
          </Link>
          <Link href="/messages" onClick={() => setIsOpen(false)} className="text-sm">
            Messages
          </Link>
        </nav>
      )}
    </div>
  );
}
