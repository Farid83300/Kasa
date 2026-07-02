/** Section "Comment ça marche" — Server Component */
export default function HowItWorks() {
  const steps = [
    {
      title: 'Recherchez',
      description: 'Entrez votre destination, vos dates et laissez Kasa faire le reste.',
    },
    {
      title: 'Réservez',
      description: "Profitez d'une plateforme sécurisée et de profils d'hôtes vérifiés.",
    },
    {
      title: "Vivez l'expérience",
      description: 'Installez-vous, profitez de votre séjour et sentez-vous chez vous, partout.',
    },
  ];

  return (
    <section className="mt-24 text-center" aria-labelledby="comment-ca-marche">
      <h2 id="comment-ca-marche" className="text-2xl font-bold">
        Comment ça marche ?
      </h2>
      <p className="mt-2 text-sm text-kasa-text-secondary max-w-xl mx-auto">
        Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage
        professionnel, Kasa vous aide à trouver un lieu qui vous ressemble.
      </p>

      <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
        {steps.map((step) => (
          <div
            key={step.title}
            className="bg-kasa-primary rounded-lg px-5 py-6 text-left w-68 h-50 flex flex-col"
          >
            <h3 className="font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm text-white/80 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
