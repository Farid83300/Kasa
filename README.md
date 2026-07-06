# ![Logo Kasa](./frontend/public/logo.svg)

Kasa est une plateforme de réservation de locations meublées entre particuliers, permettant aux utilisateurs de parcourir des logements, consulter leurs détails (équipements, photos, avis) et trouver leur prochain hébergement en Île-de-France. Ce README fournit un aperçu du projet, des instructions d'installation et des directives d'utilisation.

## Table des matières

1. [Aperçu du projet](#aperçu-du-projet)
2. [Fonctionnalités](#fonctionnalités)
3. [Technologies](#technologies)
4. [Installation](#installation)
5. [Utilisation](#utilisation)

## Aperçu du projet

Kasa permet aux utilisateurs de consulter une liste de logements disponibles à la location, d'accéder au détail de chaque bien (galerie photo, description, équipements, note moyenne, informations sur l'hôte) et de naviguer dans une interface moderne, responsive et accessible.

## Fonctionnalités

- Liste des logements disponibles avec aperçu (photo, titre, tags, note)
- Page de détail d'un logement (galerie d'images, description, équipements, hôte)
- Navigation fluide entre les différentes pages de l'application
- Page "À propos" présentant la collection
- Gestion des erreurs 404 pour les logements introuvables
- Interface responsive adaptée à toutes les tailles d'écrans
- Accessibilité intégrée pour tous les utilisateurs

## Technologies

- TypeScript
- Tailwind CSS
- React
- Next.js (App Router)

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
