/** Utilisateur retourné par l'API après inscription ou connexion */
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  picture: string | null;
  role: 'client' | 'owner' | 'admin';
}

/** Réponse commune de /auth/register et /auth/login */
export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: 'client' | 'owner';
}

export interface LoginPayload {
  email: string;
  password: string;
}
