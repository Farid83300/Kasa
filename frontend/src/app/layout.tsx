import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DemoBanner from "@/components/DemoBanner/DemoBanner";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { SITE_URL } from "@/lib/site";
import PageTransition from "@/components/PageTransition/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Kasa - Chez vous, partout et ailleurs",
  description: "Trouvez votre prochain logement avec Kasa",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased flex min-h-screen flex-col`}>
        <FavoritesProvider>
          <DemoBanner />
          <Header />
          <main className="flex-1 overflow-hidden">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          {modal}
        </FavoritesProvider>
      </body>
    </html>
  );
}
