import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

/**
 * Police Inter auto-hébergée par Next.js — zéro requête Google Fonts au runtime.
 * La variable CSS --font-inter est consommée dans globals.css.
 */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
});

/** Métadonnées globales — surchargées page par page via generateMetadata() */
export const metadata: Metadata = {
  title: 'Kasa - Chez vous, partout et ailleurs',
  description: 'Trouvez votre prochain logement avec Kasa',
};

/** Layout racine — enveloppe toutes les pages avec Header + Footer */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased flex min-h-screen flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
