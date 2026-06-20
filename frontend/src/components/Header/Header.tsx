import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="px-4 py-6 md:px-8">
      {/* --- Desktop : pilule blanche centrée, resserrée sur son contenu --- */}
      <div className="hidden md:flex w-fit items-center gap-30 max-w-1440 mx-auto bg-white rounded-2xl px-8 py-4">
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm hover:text-kasa-primary">
            Accueil
          </Link>
          <Link href="/a-propos" className="text-sm hover:text-kasa-primary">
            À propos
          </Link>
        </nav>

        <Link href="/" aria-label="Accueil Kasa">
          <Image src="/logo.svg" alt="Kasa" width={120} height={40} priority className="h-10 w-auto" />
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/logement/ajouter"
            className="text-sm text-kasa-primary hover:underline"
          >
            +Ajouter un logement
          </Link>
          <Link href="/favoris" aria-label="Favoris">
            ♡
          </Link>
          <Link href="/messages" aria-label="Messages">
            ✉
          </Link>
        </div>
      </div>

      {/* --- Mobile : icône + hamburger --- */}
      <div className="flex md:hidden items-center justify-between">
        <Link href="/" aria-label="Accueil Kasa">
          <Image src="/icon.svg" alt="Kasa" width={36} height={36} priority className="h-9 w-9" />
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}
