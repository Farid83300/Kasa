interface DecodedToken {
  id: number;
  role: 'client' | 'owner' | 'admin';
  name: string;
  email: string;
}

/**
 * Décode le payload d'un JWT sans vérifier sa signature.
 * Utilisé uniquement pour lire l'id/role côté serveur avant de forwarder
 * le token au backend — c'est le backend qui effectue la vraie vérification
 * de signature lors de l'appel réel, donc pas de risque de sécurité ici.
 */
export function decodeToken(token: string): DecodedToken | null {
  try {
    const payload = token.split('.')[1];
    const json = Buffer.from(payload, 'base64').toString('utf-8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}
