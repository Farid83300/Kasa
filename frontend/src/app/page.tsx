import { getProperties } from "@/lib/properties";
import Banner from "@/components/Banner/Banner";
import PropertyCard from "@/components/PropertyCard/PropertyCard";

export default async function Home() {
  const properties = await getProperties();

  return (
    <div className="px-4 md:px-8 max-w-1440 mx-auto pb-16">
      <Banner
        title="Chez vous, partout et ailleurs"
        subtitle="Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes."
        imageSrc="/images/banner-home.jpg"
      />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </section>
    </div>
  );
}
