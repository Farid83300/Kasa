import { getProperties } from '@/lib/properties';
import Banner from '@/components/Banner/Banner';
import PropertyCard from '@/components/PropertyCard/PropertyCard';
import HowItWorks from '@/components/HowItWorks/HowItWorks';

/** Page d'accueil — Server Component, le fetch se fait directement sans useEffect */
export default async function Home() {
  const properties = await getProperties();

  return (
    <div className="px-4 md:px-8 max-w-1440 mx-auto pb-16">
      <Banner
        subtitle="Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes."
        imageSrc="/images/banner-home.jpg"
      />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-10">
        {properties.map((property, index) => (
          // priority uniquement sur la première carte — LCP (Largest Contentful Paint)
          <PropertyCard key={property.id} property={property} priority={index === 0} />
        ))}
      </section>

      <HowItWorks />
    </div>
  );
}
