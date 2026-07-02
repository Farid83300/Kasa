import Image from "next/image";
import Link from "next/link";
import Rating from "@/components/Rating/Rating";

interface HostInfoProps {
  name: string;
  picture: string;
  rating: number;
}

export default function HostInfo({ name, picture, rating }: HostInfoProps) {
  return (
    <div className="rounded-2xl bg-white p-6 flex flex-col gap-6">
      <h2 className="text-lg font-semibold">Votre hôte</h2>

      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
          <Image
            src={picture}
            alt={`Photo de ${name}`}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          <Rating value={rating} />
        </div>
      </div>

      <Link
        href="/messages"
        className="block w-full rounded-xl bg-kasa-primary py-3 text-center text-sm text-white hover:opacity-90 transition-opacity"
      >
        Contacter l&apos;hôte
      </Link>
      <Link
        href="/messages"
        className="block w-full rounded-xl bg-kasa-primary py-3 text-center text-sm text-white hover:opacity-90 transition-opacity"
      >
        Envoyer un message
      </Link>
    </div>
  );
}
