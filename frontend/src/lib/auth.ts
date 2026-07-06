import { AuthResponse, RegisterPayload, LoginPayload } from "@/types/auth";

// Les routes /auth ne sont pas préfixées par /api, contrairement au reste de l'API
const API_ROOT = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "");

/** Inscrit un nouvel utilisateur, retourne le token JWT et son profil */
export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_ROOT}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Erreur lors de l'inscription");
  }

  return data;
}

/** Connecte un utilisateur existant, retourne le token JWT et son profil */
export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_ROOT}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Email ou mot de passe incorrect");
  }

  return data;
}
