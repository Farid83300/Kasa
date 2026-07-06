import Link from "next/link";

/** Fichier spécial Next.js — affiché quand notFound() est appelé ou qu'aucune route ne correspond */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
      <h1 className="text-8xl font-black text-kasa-primary">404</h1>
      <p className="text-base max-w-sm">
        Il semble que la page que vous cherchez ait pris des vacances... ou
        n&apos;ait jamais existé.
      </p>
      <div className="flex flex-col gap-3 w-full max-w-56 md:max-w-xs">
        <Link
          href="/"
          className="block rounded-xl bg-kasa-primary py-3 text-center text-sm text-white hover:opacity-90 transition-opacity"
        >
          Accueil
        </Link>
        <Link
          href="/"
          className="block rounded-xl bg-kasa-primary py-3 text-center text-sm text-white hover:opacity-90 transition-opacity"
        >
          Logements
        </Link>
      </div>
    </div>
  );
}
