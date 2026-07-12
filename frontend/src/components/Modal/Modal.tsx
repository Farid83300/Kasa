"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
}

/**
 * Overlay générique utilisé avec les routes interceptées Next.js pour
 * afficher /messages en superposition plutôt qu'en page pleine. L'URL
 * change bien vers /messages, et le bouton retour du navigateur ferme
 * la modale (comportement natif de router.back()).
 */
export default function Modal({ children }: ModalProps) {
  const router = useRouter();
  const close = () => router.back();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={close}
    >
      {/* max-h-[90vh] : exception assumée à la règle "valeurs canoniques uniquement" —
          Tailwind n'a pas d'équivalent fixe pour "90% de la hauteur de viewport",
          contrairement aux espacements fixes qui ont toujours une classe dédiée. */}
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Fermer"
          className="absolute top-4 right-4 z-10 flex items-center justify-center h-9 w-9 rounded-full bg-black/50 text-white cursor-pointer"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}
