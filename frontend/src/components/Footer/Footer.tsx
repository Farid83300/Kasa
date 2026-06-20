import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-between max-w-1440 mx-auto px-4 py-6 md:px-8">
      <Image src="/icon.svg" alt="Kasa" width={32} height={32} className="h-12 w-12" />
      <p className="text-sm text-kasa-text-secondary">
        © 2025 Kasa. All rights reserved
      </p>
    </footer>
  );
}
