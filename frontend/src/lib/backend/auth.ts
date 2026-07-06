import { AuthResponse, RegisterPayload, LoginPayload } from '@/types/auth';

// Utilisé uniquement dans les Route Handlers, jamais côté client
const API_ROOT = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '');

/** Appelle POST /auth/register sur le vrai backend Express */
export async function registerOnBackend(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_ROOT}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Erreur lors de l'inscription");
  }

  return data;
}

/** Appelle POST /auth/login sur le vrai backend Express */
export async function loginOnBackend(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_ROOT}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? 'Email ou mot de passe incorrect');
  }

  return data;
}
