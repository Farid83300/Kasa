'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

// Seules ces deux routes ont l'effet de glissement, fidèle au prototype Figma —
// toutes les autres pages s'affichent normalement, sans animation.
const ANIMATED_ROUTES = ['/', '/a-propos'];

/**
 * Anime la transition uniquement entre l'accueil et à propos : la nouvelle
 * page glisse depuis la droite et se superpose à la précédente. Pour toute
 * autre route, le contenu s'affiche directement sans wrapper animé.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  if (!ANIMATED_ROUTES.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={pathname}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 bg-kasa-bg"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
