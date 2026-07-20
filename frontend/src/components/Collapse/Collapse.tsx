"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface CollapseProps {
  /** Titre affiché dans l'en-tête cliquable */
  title: string;
  /** Contenu à afficher/masquer */
  children: ReactNode;
  /** État initial à l'ouverture de la page */
  defaultOpen?: boolean;
}

/**
 * Section repliable — anime la hauteur via la technique CSS grid-template-rows
 * (0fr ↔ 1fr), qui permet une transition fluide sans mesurer manuellement
 * la hauteur en JS (contrairement à scrollHeight, plus fragile).
 */
export default function Collapse({ title, children, defaultOpen = true }: CollapseProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-2 mb-3 cursor-pointer"
      >
        <h2 className="font-semibold">{title}</h2>
        <ChevronDown
          size={20}
          aria-hidden="true"
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
