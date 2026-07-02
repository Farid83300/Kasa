import Image from 'next/image';

/** Footer global — Server Component */
export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-between max-w-1440 mx-auto px-4 py-6 md:px-8">
      <Image src="/icon.svg" alt="Kasa" width={32} height={32} className="h-8 w-8" />
      <p className="text-sm text-kasa-text-secondary">© 2025 Kasa. All rights reserved</p>
    </footer>
  );
}
