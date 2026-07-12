/**
 * Fichier spécial Next.js — affiché automatiquement pendant le chargement
 * de la page de détail d'un logement (via Suspense).
 */
export default function Loading() {
  return (
    <div className="px-4 md:px-8 max-w-1440 mx-auto pb-16">
      <div className="h-10 w-40 bg-gray-200 rounded-xl animate-pulse mb-6" />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-6">
          <div className="h-64 md:h-112.5 rounded-2xl bg-gray-200 animate-pulse" />

          <div className="space-y-2">
            <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="h-16 bg-gray-200 rounded animate-pulse" />

          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-9 w-24 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>

        <aside className="w-full lg:w-80 lg:shrink-0">
          <div className="h-64 rounded-2xl bg-gray-200 animate-pulse" />
        </aside>
      </div>
    </div>
  );
}
