import Image from 'next/image';
import Link from 'next/link';
import { PropertySummary } from '@/types/logement';
import FavoriteButton from '@/components/FavoriteButton/FavoriteButton';

interface PropertyCardProps {
  property: PropertySummary;
  // priority=true uniquement sur la première carte — précharge le LCP
  priority?: boolean;
}

/**
 * Carte de logement — Server Component.
 * Le bouton favori est extrait en Client Component à part (FavoriteButton)
 * et positionné en frère du Link, pas imbriqué dedans — un <button> dans un <a>
 * serait invalide en HTML et poserait des soucis d'accessibilité/navigation.
 */
export default function PropertyCard({ property, priority = false }: PropertyCardProps) {
  return (
    <article className="relative bg-white rounded-2xl overflow-hidden group">
      <Link href={`/logement/${property.slug}`} className="block">
        <div className="relative aspect-square">
          <Image
            src={property.cover}
            alt={property.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform"
          />
        </div>

        <div className="py-4">
          <h3 className="font-semibold">{property.title}</h3>
          <p className="text-sm text-kasa-text-secondary">{property.location}</p>
          <p className="mt-4 text-sm">
            <span className="font-bold">{property.price_per_night}€</span> par nuit
          </p>
        </div>
      </Link>

      <FavoriteButton propertyId={property.id} />
    </article>
  );
}
