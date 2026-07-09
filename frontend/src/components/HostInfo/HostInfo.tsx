import Image from 'next/image';
import Link from 'next/link';
import { UserRound } from 'lucide-react';
import Rating from '@/components/Rating/Rating';

interface HostInfoProps {
  name: string;
  picture: string;
  rating: number;
}

/**
 * Bloc hôte — Server Component.
 * overflow-hidden sur le conteneur (pas sur Image) car next/image avec fill ne supporte pas border-radius.
 */
export default function HostInfo({ name, picture, rating }: HostInfoProps) {
  return (
    <div className="rounded-2xl bg-white p-6 flex flex-col gap-6">
      <h2 className="text-lg font-semibold">Votre hôte</h2>

      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
          {picture ? (
            <Image
              src={picture}
              alt={`Photo de ${name}`}
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <div
              className="h-full w-full bg-gray-200 flex items-center justify-center"
              aria-hidden="true"
            >
              <UserRound size={28} className="text-gray-400" strokeWidth={1.5} />
            </div>
          )}
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
