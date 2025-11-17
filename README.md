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
