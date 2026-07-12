/**
 * Bandeau affiché uniquement en mode démo (déploiement Vercel sans backend
 * live) — informe le visiteur que les données sont statiques et que
 * l'authentification/ajout de logement ne sont pas fonctionnels.
 */
export default function DemoBanner() {
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== 'true') {
    return null;
  }

  return (
    <div className="bg-kasa-primary text-white text-center text-xs py-2 px-4">
      Mode démonstration — données statiques. Connexion, inscription et ajout de logement ne sont
      pas disponibles sur cette version en ligne.
    </div>
  );
}
