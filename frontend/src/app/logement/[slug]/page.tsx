import { notFound } from "next/navigation";
import Link from "next/link";
import { getPropertyBySlug } from "@/lib/properties";
import Gallery from "@/components/Gallery/Gallery";
import Tag from "@/components/Tag/Tag";
import HostInfo from "@/components/HostInfo/HostInfo";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// SEO dynamique — génère un <title> et <description> par logement
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) return {};

  return {
    title: `${property.title} — Kasa`,
    description: property.description,
  };
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="px-4 md:px-8 max-w-1440 mx-auto pb-16">

      {/* Bouton retour */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-6 rounded-xl border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
      >
        ← Retour aux annonces
      </Link>

      {/* Layout desktop : galerie + hôte côte à côte */}
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Colonne gauche : galerie + infos */}
        <div className="flex-1 flex flex-col gap-6">
          <Gallery images={property.pictures} alt={property.title} />

          <div>
            <h1 className="text-2xl font-bold">{property.title}</h1>
            <p className="mt-1 flex items-center gap-1 text-sm text-kasa-text-secondary">
              <span aria-hidden="true">📍</span>
              {property.location}
            </p>
          </div>

          <p className="text-sm leading-relaxed">{property.description}</p>

          {/* Équipements */}
          {property.equipments.length > 0 && (
            <section aria-labelledby="equipements-titre">
              <h2 id="equipements-titre" className="mb-3 font-semibold">
                Équipements
              </h2>
              <ul className="flex flex-wrap gap-2" role="list">
                {property.equipments.map((equipment) => (
                  <li key={equipment}>
                    <Tag label={equipment} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Tags / catégories */}
          {property.tags.length > 0 && (
            <section aria-labelledby="categorie-titre">
              <h2 id="categorie-titre" className="mb-3 font-semibold">
                Catégorie
              </h2>
              <ul className="flex flex-wrap gap-2" role="list">
                {property.tags.map((tag) => (
                  <li key={tag}>
                    <Tag label={tag} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Colonne droite : bloc hôte (sticky sur desktop) */}
        <aside className="w-full lg:w-80 lg:shrink-0">
          <div className="lg:sticky lg:top-8">
            <HostInfo
              name={property.host.name}
              picture={property.host.picture}
              rating={property.rating_avg}
            />
          </div>
        </aside>

      </div>
    </div>
  );
}
