# Charlie Codex

Guide de survie multilingue avec assistant IA Charlie.

## Configuration

### Variables d'environnement

1. Copiez le fichier `.env.example` vers `.env` :
   ```bash
   cp .env.example .env
   ```

2. Complétez les valeurs :
   ```bash
   VITE_AI_API_KEY=votre-cle-openai
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=votre-cle-anon
   VITE_APP_ID=com.votre.bundle.id
   VITE_APP_NAME="Survival Codex"
   VITE_PLAY_BILLING_SUBSCRIPTION_ID=survival_codex_premium_yearly
   VITE_PLAY_BILLING_WEBHOOK_URL=https://your-api.com/play-billing/webhook
   ```

3. Relancez `npm run dev` pour prendre en compte les modifications.

Charlie utilise la clé `VITE_AI_API_KEY` côté créateur (pas côté utilisateur final) pour invoquer le runtime Spark.

### Supabase

1. Créez un projet Supabase puis exécutez la migration `supabase/migrations/0001_init.sql` (via `supabase db push` ou psql).
2. Activez les politiques RLS (déjà incluses dans la migration) et créez un bucket de stockage si vous prévoyez d'héberger des assets.
3. Copiez l'URL et la clé `anon` dans `.env`.
4. Les favoris, téléchargements, conversations IA et profils utilisateurs utilisent maintenant Supabase avec fallback local si les variables ne sont pas présentes.

> ℹ️ Sans Supabase, l'app reste fonctionnelle en mode démo (stockage local `useKV`).

### Google Play Billing (préparation)

- Installez le plugin Capacitor Google Play Billing (ex. `@capacitor-community/google-play-billing`) puis exécutez `npx cap sync`.
- Renseignez `VITE_PLAY_BILLING_SUBSCRIPTION_ID` (SKU abonnement côté Console Google Play) et, si besoin, `VITE_PLAY_BILLING_WEBHOOK_URL` pour votre backend de vérification.
- La table `play_billing_receipts` est incluse dans `supabase/migrations/0001_init.sql` et stocke les reçus synchronisés/acknowledged via `useBilling`.
- Sur Android avec l'ID produit configuré, l'onglet **Plans** activera automatiquement les boutons Google Play (achat et restauration).

### RevenueCat (Purchases SDK)

- `@revenuecat/purchases-capacitor` est initialisé par `useRevenueCat` (Android/iOS uniquement).
- Ajoutez les clés SDK publiques dans `.env` (`VITE_REVENUECAT_ANDROID_KEY` / `VITE_REVENUECAT_IOS_KEY`).
- Les sessions Supabase sont synchronisées avec RevenueCat via `Purchases.logIn` / `logOut`, ce qui prépare l'app pour les offres multi-plateformes (RevenueCat Play Billing + App Store Connect).

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

## Architecture backend & hébergement

### État actuel
- Authentification, profils, abonnements, favoris, téléchargements et historiques IA sont synchronisés avec Supabase.
- En absence de configuration Supabase, l'app repasse automatiquement en mode local (stockage `useKV`) pour faciliter le prototypage.
- Les hooks (`useBookmarks`, `useDownloads`) s'appuient sur React Query pour gérer le cache et l'invalidation.

### Aller plus loin
1. **Stripe / paiements** : implémentez un webhook pour mettre à jour `subscription_tier` et `subscription_expiry_date` dans `profiles`.
2. **Fonctions Edge** : centralisez la logique d'upgrade et les quotas de téléchargements.
3. **Observabilité** : ajoutez Sentry / LogRocket et du monitoring Supabase.
4. **Sécurité** : stockez les clés API utilisateurs chiffrées côté serveur si vous autorisez l’IA BYOK.

### Hébergement recommandé
1. **Front-end** : `npm run build` puis déployez `dist/` sur Vercel, Netlify ou Cloudflare Pages.
2. **Mobile** : voir la section Capacitor ci-dessous pour conditionner un binaire Android/iOS à publier sur Play Store / App Store.
3. **Backend** : Supabase couvre PostgreSQL + auth + stockage. Ajoutez un backend custom uniquement si nécessaire.
4. **CI/CD** : une action GitHub qui lance `npm ci`, `npm run lint`, `npm run build` et (optionnel) `npm run mobile:sync` pour vérifier l'intégrité mobile.

## Build mobile (Google Play / App Store)

1. **Préparer le bundle web** :
   ```bash
   npm run mobile:sync
   ```
   Cela exécute `vite build` puis `npx cap sync`.

2. **Ouvrir Android Studio** :
   ```bash
   npm run mobile:android
   ```

3. **Ouvrir Xcode** :
   ```bash
   npm run mobile:ios
   ```

4. **Assets & manifestes** :
   - Remplacez les icônes dans `public/icons/` par vos visuels (192/512px minimum).
   - Mettez à jour `VITE_APP_ID` / `VITE_APP_NAME` avant de publier.

5. **Tests** : utilisez `npx cap run android --target emulator-5554` ou l’équivalent iOS pour vérifier caméra/offline/permissions avant soumission store.
