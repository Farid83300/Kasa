'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/** Formulaire de connexion — Client Component pour l'état et la soumission */
export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') {
      setError('Cette fonctionnalité nécessite un backend, indisponible en mode démonstration.');
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-xl bg-kasa-primary py-3 text-center text-sm text-white hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isSubmitting ? 'Connexion...' : 'Se connecter'}
      </button>

      <p className="text-center text-sm text-kasa-primary">Mot de passe oublié</p>

      <p className="text-center text-sm text-kasa-primary">
        Pas encore de compte ?{' '}
        <Link href="/inscription" className="underline">
          Inscrivez-vous
        </Link>
      </p>
    </form>
  );
}
