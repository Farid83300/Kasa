import Image from 'next/image';

interface BannerProps {
  title: string;
  subtitle: string;
  imageSrc: string;
}

/**
 * Bannière principale — Server Component.
 * alt="" car l'image est décorative, le titre porte l'information (bonne pratique WCAG).
 */
export default function Banner({ title, subtitle, imageSrc }: BannerProps) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-kasa-primary">{title}</h1>
      <p className="mt-2 text-sm max-w-2xl mx-auto">{subtitle}</p>

      <div className="relative mt-8 h-48 md:h-96 rounded-2xl overflow-hidden">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
