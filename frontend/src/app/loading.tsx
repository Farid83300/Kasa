export default function Loading() {
  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto pb-16">
      <div className="text-center">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-80 mx-auto" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-96 mx-auto mt-4" />
        <div className="h-48 md:h-96 rounded-2xl bg-gray-200 animate-pulse mt-8" />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden">
            <div className="aspect-square bg-gray-200 animate-pulse" />
            <div className="py-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3 mt-3" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
