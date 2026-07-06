import Image from 'next/image';
import type { Metadata } from 'next';

/** Métadonnées SEO pour la page À propos */
export const metadata: Metadata = {
  title: 'À propos — Kasa',
  description:
    'Découvrez la mission de Kasa : offrir une plateforme fiable et simple pour trouver des hébergements uniques.',
};

const missionItems = [
  "Offrir une plateforme fiable et simple d'utilisation",
  'Proposer des hébergements variés et de qualité',
  'Favoriser des échanges humains et chaleureux entre hôtes et voyageurs',
];

/** Page À propos — Server Component, contenu statique */
export default function AboutPage() {
  return (
    <div className="px-4 md:px-8 max-w-1440 mx-auto pb-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-kasa-primary">À propos</h1>
        <p className="mt-4 text-sm max-w-2xl mx-auto">
          Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.
        </p>
        <p className="mt-4 text-sm max-w-2xl mx-auto">
          Depuis notre création, nous mettons en relation des voyageurs en quête d&apos;authenticité
          avec des hôtes passionnés qui aiment partager leur région et leurs bonnes adresses.
        </p>
      </div>

      <div className="relative mt-8 h-72 md:h-114 rounded-2xl overflow-hidden">
        <Image
          src="/images/a-propos-1.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
          loading="eager"
        />
      </div>

      {/* items-center : la colonne gauche se centre verticalement par rapport à l'image */}
      <div className="mt-8 flex flex-col md:flex-row justify-between gap-8 items-center">
        <div className="w-full md:w-150 flex flex-col justify-center gap-8">
          <div>
            <h2 className="text-md font-semibold text-kasa-primary">Notre mission est simple :</h2>
            <ol className="mt-4 flex flex-col gap-4">
              {missionItems.map((item, index) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span>{index + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <p className="text-md text-kasa-primary font-medium leading-relaxed">
            Que vous cherchiez un appartement cosy en centre-ville, une maison en bord de mer ou un
            chalet à la montagne, Kasa vous accompagne pour que chaque séjour devienne un souvenir
            inoubliable.
          </p>
        </div>

        <div className="relative w-full md:w-125 h-72 md:h-112.5 rounded-2xl overflow-hidden shrink-0">
          <Image
            src="/images/a-propos-2.png"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
