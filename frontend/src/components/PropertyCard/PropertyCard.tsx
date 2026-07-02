import Image from 'next/image';
import Link from 'next/link';
import { PropertySummary } from '@/types/logement';

interface PropertyCardProps {
  property: PropertySummary;
  // priority=true uniquement sur la première carte — précharge le LCP
  priority?: boolean;
}

/** Carte de logement — Server Component. Navigue vers /logement/[slug] au clic */
export default function PropertyCard({ property, priority = false }: PropertyCardProps) {
  return (
    <Link href={`/logement/${property.slug}`} className="block group">
      <article className="bg-white rounded-2xl overflow-hidden">
        <div className="relative aspect-square">
          <Image
            src={property.cover}
            alt={property.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform"
          />
          <span className="absolute top-3 right-3 bg-white/30 rounded-full p-2" aria-hidden="true">
            ♡
          </span>
        </div>

        <div className="py-4">
          <h3 className="font-semibold">{property.title}</h3>
          <p className="text-sm text-kasa-text-secondary">{property.location}</p>
          <p className="mt-4 text-sm">
            <span className="font-bold">{property.price_per_night}€</span> par nuit
          </p>
        </div>
      </article>
    </Link>
  );
}
