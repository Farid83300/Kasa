import { getProperties } from '@/lib/properties';
import FavoritesList from '@/components/FavoritesList/FavoritesList';

/** Page Favoris — Server Component, récupère tous les logements côté serveur */
export default async function FavoritesPage() {
  const properties = await getProperties();

  return (
    <div className="px-4 md:px-8 max-w-1440 mx-auto pb-16">
      <div className="text-center mt-5">
        <h1 className="text-3xl font-bold text-kasa-primary">Vos favoris</h1>
        <p className="mt-2 text-sm max-w-2xl mx-auto">
          Retrouvez ici tous les logements que vous avez aimés. Prêts à réserver ? Un simple clic et
          votre prochain séjour est en route.
        </p>
      </div>

      <FavoritesList properties={properties} />
    </div>
  );
}
