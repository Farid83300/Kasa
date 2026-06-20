import { notFound } from "next/navigation";
import { getPropertyBySlug } from "@/lib/properties";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="px-4 md:px-8 max-w-1440 mx-auto pb-16">
      <h1>{property.title}</h1>
      {/* On construit le reste ensemble : Gallery, infos, équipements, hôte */}
    </div>
  );
}
