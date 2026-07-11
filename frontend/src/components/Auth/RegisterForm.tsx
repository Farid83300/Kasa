'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/** Formulaire d'inscription — Client Component pour l'état et la soumission */
export default function RegisterForm() {
  const router = useRouter();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'client' | 'owner'>('client');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!acceptedTerms) {
      setError("Vous devez accepter les conditions générales d'utilisation.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${prenom} ${nom}`.trim(),
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Une erreur est survenue.');
      }

      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="nom" className="block text-sm mb-1">
          Nom
        </label>
        <input
          id="nom"
          type="text"
          required
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="prenom" className="block text-sm mb-1">
          Prénom
        </label>
        <input
          id="prenom"
          type="text"
          required
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm mb-1">
          Adresse email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm mb-1">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
        />
      </div>

      {/* Sélecteur de rôle — absent de la maquette, ajouté pour permettre la création de logements (fonctionnalité optionnelle) */}
      <fieldset>
        <legend className="block text-sm mb-1">Vous êtes</legend>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="role"
              checked={role === 'client'}
              onChange={() => setRole('client')}
            />
            Un voyageur
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="role"
              checked={role === 'owner'}
              onChange={() => setRole('owner')}
            />
            Un hôte
          </label>
        </div>
      </fieldset>

      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          className="mt-1"
        />
        <span>
          J&apos;accepte les{" "}
          <span className="underline">conditions générales d&apos;utilisation</span>
        </span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-xl bg-kasa-primary py-3 text-center text-sm text-white hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isSubmitting ? 'Inscription...' : "S'inscrire"}
      </button>

      <p className="text-center text-sm text-kasa-primary">
        Déjà membre ?{' '}
        <Link href="/connexion" className="underline">
          Se connecter
        </Link>
      </p>
    </form>
  );
}
