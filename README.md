# ![Logo Kasa](./frontend/public/logo.svg)

Kasa est une plateforme de réservation de locations meublées entre particuliers, permettant aux utilisateurs de parcourir des logements, consulter leurs détails (équipements, photos, avis), créer un compte, gérer leurs favoris et publier leurs propres annonces en Île-de-France. Ce README fournit un aperçu du projet, des instructions d'installation et des directives d'utilisation.

## Table des matières

1. [Aperçu du projet](#aperçu-du-projet)
2. [Fonctionnalités](#fonctionnalités)
3. [Technologies](#technologies)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Utilisation](#utilisation)
7. [Tests](#tests)
8. [Qualité et accessibilité](#qualité-et-accessibilité)

## Aperçu du projet

Kasa permet aux utilisateurs de consulter une liste de logements disponibles à la location, d'accéder au détail de chaque bien (galerie photo, description, équipements, note moyenne, informations sur l'hôte), de créer un compte, d'ajouter des logements en favoris et de publier leurs propres annonces en tant qu'hôte.

## Fonctionnalités

- Liste des logements disponibles avec aperçu (photo, titre, localisation, prix)
- Page de détail d'un logement (carrousel d'images, description, équipements, catégories, hôte)
- Inscription et connexion (JWT stocké en cookie `httpOnly`)
- Gestion des favoris (Context + `localStorage`, indépendante de l'authentification)
- Ajout de logement pour les comptes hôtes (upload d'images, équipements, catégories personnalisées)
- Messagerie (interface statique, fidèle à la maquette — l'API backend ne supporte pas la messagerie)
- Page "À propos" présentant la plateforme
- Gestion des erreurs 404 pour les logements et pages introuvables
- Interface responsive adaptée à toutes les tailles d'écrans
- SEO : sitemap, robots.txt, microdonnées Schema.org, métadonnées dynamiques par page
- Accessibilité conforme WCAG 2.1 AA (validé via Lighthouse)

## Technologies

- TypeScript
- Tailwind CSS v4
- React 19
- Next.js 16 (App Router)
- Vitest + Testing Library (tests unitaires)
- lucide-react (icônes)

## Installation

Pour configurer le projet localement, suivez ces étapes :

1. Clonez le dépôt :
```bash
git clone https://github.com/Farid83300/Kasa
```
2. Accédez au répertoire du frontend :
```bash
cd ../frontend
```
3. Installez les dépendances du frontend :
```bash
yarn install
```
4. Accédez au répertoire du backend :
```bash
cd ../backend
```
5. Installez les dépendances du backend :
```bash
npm install
```

## Configuration

Créez un fichier `.env.local` à la racine du dossier `frontend` :
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Utilisation

### Démarrer le serveur Backend

Pour démarrer le serveur Backend (écoute sur le port 3000), exécutez :
```bash
npm start
```

### Démarrer le serveur Frontend

Pour démarrer le serveur Frontend (écoute sur le port 3002), exécutez la commande suivante :
```bash
yarn dev
```

Ouvrez votre navigateur et accédez à [http://localhost:3002](http://localhost:3002) pour voir l'application.

> ⚠️ Le backend et le frontend doivent tous les deux être lancés simultanément (dans deux terminaux séparés) pour que l'application fonctionne correctement.

### Créer un compte hôte

L'ajout de logement nécessite un compte avec le rôle "hôte" (`owner`). Ce choix est disponible sur le formulaire d'inscription (`/inscription`).

## Tests

Le projet inclut des tests unitaires (Vitest + Testing Library) sur le carrousel d'images et la gestion des favoris :
```bash
cd frontend
yarn test
```

## Qualité et accessibilité

- Lint : `yarn lint`
- Formatage : `yarn format`
- Build de production : `yarn build && yarn start -p 3002`
- Le projet a été audité avec Lighthouse (Performance, Accessibilité, Bonnes pratiques, SEO) sur les principales pages, avec correction des points de contraste, hiérarchie des titres et attributs ARIA relevés.
