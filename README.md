# Charlie Codex

Guide de survie multilingue avec assistant IA Charlie.

## Configuration

### Clé API pour Charlie (l'IA)

Charlie nécessite une clé API configurée par le créateur de l'application. Les utilisateurs n'ont pas besoin de fournir leur propre clé.

1. Copiez le fichier `.env.example` vers `.env`:
   ```bash
   cp .env.example .env
   ```

2. Éditez le fichier `.env` et ajoutez votre clé API:
   ```
   VITE_AI_API_KEY=votre-clé-api-ici
   ```

3. Redémarrez l'application pour que les changements prennent effet.

### Clés API supportées

Charlie est compatible avec les modèles OpenAI accessibles via l'API Spark runtime. Assurez-vous que votre clé API a accès aux modèles nécessaires (gpt-4o, gpt-4o-mini).

## Navigation

L'application utilise une navigation à 3 onglets :
- **Charlie (gauche)** : Assistant IA de survie
- **Accueil (centre)** : Parcourir les techniques de survie
- **Téléchargements (droite)** : Accès hors ligne (Premium)

Les paramètres et les plans d'abonnement sont accessibles via le menu de profil en haut à droite.

## Fonctionnalités

- **Gratuit** : Navigation, recherche, favoris
- **Premium** : Téléchargements hors ligne, accès à Charlie l'IA
- **Multilingue** : Support de plusieurs langues
- **Mobile-First** : Optimisé pour les appareils mobiles

## Ajouter une nouvelle fiche technique

1. **Créer l’entrée principale** : dupliquez un objet dans `src/lib/data.ts`, donnez-lui un `id` unique (chaîne) et remplissez `title`, `category`, `difficulty`, `description`, `steps`, ainsi que les éventuels `warnings`, `tips` et `timeRequired`.
2. **Fournir les traductions** : ouvrez `src/lib/techniqueTranslations.ts` et ajoutez une clé correspondant à l’`id` avec les textes pour chaque langue supportée (`en`, `fr`, `es`, `de`, `it`). Vous pouvez commencer par l’anglais puis laisser les autres langues pour plus tard si besoin, l’app retombera sur l’anglais par défaut.
3. **Nouvelles catégories (si besoin)** : si la fiche introduit une catégorie inédite, mettez à jour `SurvivalCategory` dans `src/lib/types.ts`, puis ajoutez les styles dans `categoryColors` et les libellés dans `categoryLabels` (`src/lib/data.ts`). Complétez également les traductions de catégories dans `src/lib/translations.ts`.
4. **Tester** : lancez `npm run dev` pour vérifier l’affichage, ouvrez la fiche dans l’onglet Accueil et contrôlez les traductions via le sélecteur de langue.

## Connexion à une base de données et hébergement

### État actuel
- Toutes les fiches, les favoris et les comptes sont simulés côté client via `useKV` (stockage local). Il n’y a ni authentification réelle ni API.
- L’application est prête à être buildée (`npm run build`) et produit un bundle Vite/React statique hébergeable sur Netlify, Vercel, Render, etc.

### Passer à une base de données
1. **Choisir un backend** : API REST/GraphQL (Supabase, Firebase, NestJS, Express, etc.) pour stocker utilisateurs, abonnements et fiches.
2. **Créer des endpoints** : `/techniques`, `/bookmarks`, `/downloads`, `/auth`… Prévoyez pagination et champs de filtrage.
3. **Brancher l’app** : remplacez les appels `useKV` par des hooks/fonctions qui consomment l’API (`fetch`, React Query déjà installé via `@tanstack/react-query`). Stockez l’URL de l’API dans `.env` (ex. `VITE_API_BASE_URL`).
4. **Authentification réelle** : implémentez OAuth/JWT côté backend, exposez une route de login et stockez le token (idéalement via cookies httpOnly).
5. **Gestion Premium** : synchronisez l’état d’abonnement depuis la base (Stripe webhooks, par exemple) plutôt que de le simuler côté client.

### Hébergement recommandé
1. **Front-end** : `npm run build` puis déployez le dossier `dist/` sur Vercel/Netlify (hébergement statique + previews).
2. **Backend** : hébergez votre API et votre base (Railway, Render, Supabase, Fly.io, etc.).
3. **CI/CD** : ajoutez un workflow (GitHub Actions) qui exécute `npm install`, `npm run build` et vos tests avant de déployer.
4. **Variables d’environnement** : configurez `VITE_AI_API_KEY` (et plus tard `VITE_API_BASE_URL`) dans vos environnements de build/preview.
