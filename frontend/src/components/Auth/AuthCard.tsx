interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

/** Carte blanche centrée partagée entre les pages Connexion et Inscription */
export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="flex justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        <h1 className="text-center text-2xl font-bold text-kasa-primary">
          {title}
        </h1>
        <p className="mt-2 text-center text-sm">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
