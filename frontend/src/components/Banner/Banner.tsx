import Image from 'next/image';

interface BannerProps {
  subtitle: string;
  imageSrc: string;
}

/** Bannière principale — alt="" car l'image est décorative (bonne pratique WCAG) */
export default function Banner({ subtitle, imageSrc }: BannerProps) {
  return (
    <div className="text-center mt-5">
      <h1 className="text-3xl font-bold text-kasa-primary">
        Chez vous, <br className="md:hidden" />
        partout et ailleurs
      </h1>
      <p className="mt-2 text-sm max-w-3xl mx-auto">{subtitle}</p>

      <div className="relative mt-8 h-114 rounded-2xl overflow-hidden">
        <Image
          src={imageSrc}
          alt="Bannière de Kasa"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
