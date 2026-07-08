import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { FavoritesProvider } from '@/context/FavoritesContext';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Kasa - Chez vous, partout et ailleurs',
  description: 'Trouvez votre prochain logement avec Kasa',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased flex min-h-screen flex-col`}>
        <FavoritesProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}
