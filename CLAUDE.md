# Kasa

Plateforme de réservation de locations meublées entre particuliers (Île-de-France). Repo GitHub : https://github.com/Farid83300/Kasa

Monorepo à deux dossiers indépendants, chacun avec son propre gestionnaire de paquets :

- `frontend/` — Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. Gestionnaire : **yarn**.
- `backend/` — API Express 5 + SQLite (fichier `backend/data/kasa.sqlite3`), JWT pour l'auth. Gestionnaire : **npm**.

Les deux serveurs doivent tourner en parallèle en dev (frontend sur :3002, backend sur :3000).

## Commandes utiles

```bash
# backend (depuis backend/)
npm start

# frontend (depuis frontend/)
yarn dev
yarn lint
yarn format
yarn test
yarn build && yarn start -p 3002
```

## Fonctionnalités

- Liste + détail des logements (galerie, description, équipements, notes, hôte)
- Inscription/connexion (JWT en cookie `httpOnly`)
- Favoris (Context + `localStorage`, indépendant de l'auth)
- Ajout de logement pour les comptes hôtes (`role: owner`, upload d'images)
- Messagerie : interface statique uniquement, l'API backend ne la supporte pas
- SEO (sitemap, robots.txt, microdonnées Schema.org) + accessibilité WCAG 2.1 AA

## Mode démo (déploiement Vercel)

Le déploiement public sur Vercel (`kasa-delta-sepia.vercel.app`) tourne **sans backend live**, en frontend-only :

- Activé via la variable d'env Vercel `NEXT_PUBLIC_DEMO_MODE=true` (jamais dans `.env.local`, qui reste pour le dev local avec le vrai backend).
- Quand actif, [frontend/src/lib/properties.ts](frontend/src/lib/properties.ts) sert les données depuis l'instantané statique [frontend/src/data/mockProperties.ts](frontend/src/data/mockProperties.ts) au lieu d'appeler l'API.
- Connexion, inscription et ajout de logement sont désactivés dans ce mode (voir [frontend/src/components/Auth/LoginForm.tsx](frontend/src/components/Auth/LoginForm.tsx) et [RegisterForm.tsx](frontend/src/components/Auth/RegisterForm.tsx)).
- Le bandeau visuel d'avertissement "Mode démonstration" (composant `DemoBanner`) a été retiré du layout — la désactivation fonctionnelle en mode démo reste en place, seul l'affichage du bandeau a été supprimé.

## Backend — points clés

- SQLite : `backend/data/kasa.sqlite3`, schéma auto-créé, seed depuis `backend/data/properties.json` si la table `properties` est vide.
- Auth JWT via header `Authorization: Bearer <token>`, secret dans `JWT_SECRET` (env).
- Rôles : `client`, `owner`, `admin`. Création/édition/suppression de propriétés et uploads réservés à `owner`/`admin`.
- Doc API : `backend/public/openapi.json`, UI d'exploration sur `http://localhost:3000/docs.html`.
- Endpoints principaux sous `/api` : `properties`, `users`, `properties/:id/ratings`, `properties/:id/favorite`, `users/:id/favorites`, `uploads/image`, `uploads/images` (DELETE).
- Pour repartir de zéro : stopper le serveur, supprimer `backend/data/kasa.sqlite3`, relancer.

## Frontend — structure

- `src/app/` — routes App Router (`a-propos`, `connexion`, `inscription`, `favoris`, `logement`, `messages`, `@modal` pour les modales interceptées).
- `src/components/` — composants UI (Auth, AddProperty, Gallery, Header, Footer, Modal, PropertyCard, Rating, etc.).
- `src/context/` — `FavoritesContext` (favoris en `localStorage`).
- `src/lib/` — logique métier (`properties.ts` pour le fetch/mode démo, `lib/backend/` pour les appels API).
- `src/data/mockProperties.ts` — instantané statique utilisé uniquement en mode démo.
- `src/test/` — tests Vitest + Testing Library (carrousel d'images, favoris).
- `src/stories/` — Storybook.

## Historique récent notable

- La bande "Mode démonstration" affichée sur le déploiement Vercel a été retirée (composant `DemoBanner` supprimé, plus référencé dans `layout.tsx`). La logique de désactivation (connexion/inscription/ajout indisponibles en démo) est conservée.
