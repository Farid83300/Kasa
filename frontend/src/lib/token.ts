const TOKEN_KEY = "kasa_token";

/** Sauvegarde le token JWT dans le localStorage du navigateur */
export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

/** Récupère le token — retourne null côté serveur (pas de window) */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

/** Supprime le token, utilisé à la déconnexion */
export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}
