export type Language = 'en' | 'fr' | 'es' | 'de' | 'it';

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  searchPlaceholder: string;
  bookmarks: string;
  allCategories: string;
  noBookmarksTitle: string;
  noBookmarksDesc: string;
  noResultsTitle: string;
  noResultsDesc: string;
  steps: string;
  warnings: string;
  tips: string;
  tabs: {
    home: string;
    downloads: string;
    ai: string;
    settings: string;
  };
  auth: {
    signIn: string;
    signUp: string;
    signOut: string;
    email: string;
    password: string;
    name: string;
    welcomeBack: string;
    createAccount: string;
    alreadyHaveAccount: string;
    noAccount: string;
    signInSuccess: string;
    signOutSuccess: string;
  };
  subscription: {
    free: string;
    premium: string;
    upgradeToPremium: string;
    upgradeRequired: string;
    upgradeMessage: string;
    premiumFeatures: string;
    unlimitedDownloads: string;
    aiAssistant: string;
    offlineAccess: string;
    subscribeNow: string;
    yourPlan: string;
    activeUntil: string;
  };
  ai: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    thinking: string;
    premiumOnly: string;
    askAnything: string;
    exampleQuestion: string;
    clearChat: string;
    apiKeyRequired: string;
    apiKeyDesc: string;
    saveApiKey: string;
    apiKeySaved: string;
  };
  settings: {
    title: string;
    subtitle: string;
    language: string;
    languageDesc: string;
    appearance: string;
    appearanceDesc: string;
    storage: string;
    storageDesc: string;
    clearBookmarks: string;
    clearDownloads: string;
    clearAllData: string;
    bookmarksCount: string;
    downloadsCount: string;
    confirmClear: string;
    confirmClearBookmarks: string;
    confirmClearDownloads: string;
    confirmClearAll: string;
    cleared: string;
    account: string;
    accountDesc: string;
    openAiApiKey: string;
    openAiApiKeyDesc: string;
  };
  downloads: {
    title: string;
    subtitle: string;
    noDownloadsTitle: string;
    noDownloadsDesc: string;
    downloaded: string;
    removeDownload: string;
    downloadTechnique: string;
  };
  categories: {
    shelter: string;
    water: string;
    fire: string;
    food: string;
    navigation: string;
    'first-aid': string;
    signaling: string;
  };
  difficulty: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appTitle: 'Survival Codex',
    appSubtitle: 'Essential wilderness survival techniques and knowledge',
    searchPlaceholder: 'Search techniques...',
    bookmarks: 'Bookmarks',
    allCategories: 'All Categories',
    noBookmarksTitle: 'No bookmarks yet',
    noBookmarksDesc: 'Start bookmarking techniques to save them for quick access later.',
    noResultsTitle: 'No techniques found',
    noResultsDesc: "Try adjusting your search or filters to find what you're looking for.",
    steps: 'Steps',
    warnings: 'Warnings',
    tips: 'Tips',
    tabs: {
      home: 'Home',
      downloads: 'Downloads',
      ai: 'AI Assistant',
      settings: 'Settings',
    },
    auth: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      email: 'Email',
      password: 'Password',
      name: 'Name',
      welcomeBack: 'Welcome back',
      createAccount: 'Create your account',
      alreadyHaveAccount: 'Already have an account?',
      noAccount: "Don't have an account?",
      signInSuccess: 'Signed in successfully',
      signOutSuccess: 'Signed out successfully',
    },
    subscription: {
      free: 'Free',
      premium: 'Premium',
      upgradeToPremium: 'Upgrade to Premium',
      upgradeRequired: 'Premium Required',
      upgradeMessage: 'Upgrade to Premium to access unlimited downloads and AI assistant.',
      premiumFeatures: 'Premium Features',
      unlimitedDownloads: 'Unlimited offline downloads',
      aiAssistant: 'AI survival assistant',
      offlineAccess: 'Full offline access',
      subscribeNow: 'Subscribe Now',
      yourPlan: 'Your Plan',
      activeUntil: 'Active until',
    },
    ai: {
      title: 'AI Survival Assistant',
      subtitle: 'Get expert survival advice powered by AI',
      placeholder: 'Ask a survival question...',
      send: 'Send',
      thinking: 'Thinking...',
      premiumOnly: 'AI Assistant is a Premium feature',
      askAnything: 'Ask anything about survival',
      exampleQuestion: 'How do I purify water in the wilderness?',
      clearChat: 'Clear chat',
      apiKeyRequired: 'OpenAI API Key Required',
      apiKeyDesc: 'Enter your OpenAI API key in Settings to use the AI assistant.',
      saveApiKey: 'Save API Key',
      apiKeySaved: 'API key saved successfully',
    },
    settings: {
      title: 'Settings',
      subtitle: 'Manage your app preferences',
      language: 'Language',
      languageDesc: 'Select your preferred language',
      appearance: 'Appearance',
      appearanceDesc: 'Customize the app appearance',
      storage: 'Storage',
      storageDesc: 'Manage your saved data',
      clearBookmarks: 'Clear Bookmarks',
      clearDownloads: 'Clear Downloads',
      clearAllData: 'Clear All Data',
      bookmarksCount: 'bookmarks',
      downloadsCount: 'downloads',
      confirmClear: 'Are you sure?',
      confirmClearBookmarks: 'This will remove all bookmarked techniques.',
      confirmClearDownloads: 'This will remove all downloaded techniques.',
      confirmClearAll: 'This will remove all your data including bookmarks and downloads.',
      cleared: 'Cleared successfully',
      account: 'Account',
      accountDesc: 'Manage your account and subscription',
      openAiApiKey: 'OpenAI API Key',
      openAiApiKeyDesc: 'Your API key for AI assistant features',
    },
    downloads: {
      title: 'Downloaded Techniques',
      subtitle: 'Access your offline techniques',
      noDownloadsTitle: 'No downloads yet',
      noDownloadsDesc: 'Download techniques to access them offline anytime.',
      downloaded: 'Downloaded',
      removeDownload: 'Remove download',
      downloadTechnique: 'Download technique',
    },
    categories: {
      shelter: 'Shelter',
      water: 'Water',
      fire: 'Fire',
      food: 'Food',
      navigation: 'Navigation',
      'first-aid': 'First Aid',
      signaling: 'Signaling',
    },
    difficulty: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    },
  },
  fr: {
    appTitle: 'Codex de Survie',
    appSubtitle: 'Techniques essentielles de survie en nature',
    searchPlaceholder: 'Rechercher des techniques...',
    bookmarks: 'Favoris',
    allCategories: 'Toutes les catégories',
    noBookmarksTitle: 'Aucun favori',
    noBookmarksDesc: 'Ajoutez des techniques en favoris pour un accès rapide.',
    noResultsTitle: 'Aucune technique trouvée',
    noResultsDesc: 'Essayez d\'ajuster votre recherche ou vos filtres.',
    steps: 'Étapes',
    warnings: 'Avertissements',
    tips: 'Conseils',
    tabs: {
      home: 'Accueil',
      downloads: 'Téléchargements',
      ai: 'Assistant IA',
      settings: 'Paramètres',
    },
    auth: {
      signIn: 'Se connecter',
      signUp: "S'inscrire",
      signOut: 'Se déconnecter',
      email: 'Email',
      password: 'Mot de passe',
      name: 'Nom',
      welcomeBack: 'Bon retour',
      createAccount: 'Créer votre compte',
      alreadyHaveAccount: 'Vous avez déjà un compte ?',
      noAccount: "Vous n'avez pas de compte ?",
      signInSuccess: 'Connexion réussie',
      signOutSuccess: 'Déconnexion réussie',
    },
    subscription: {
      free: 'Gratuit',
      premium: 'Premium',
      upgradeToPremium: 'Passer à Premium',
      upgradeRequired: 'Premium Requis',
      upgradeMessage: 'Passez à Premium pour accéder aux téléchargements illimités et à l\'assistant IA.',
      premiumFeatures: 'Fonctionnalités Premium',
      unlimitedDownloads: 'Téléchargements hors ligne illimités',
      aiAssistant: 'Assistant IA de survie',
      offlineAccess: 'Accès hors ligne complet',
      subscribeNow: "S'abonner maintenant",
      yourPlan: 'Votre abonnement',
      activeUntil: 'Actif jusqu\'au',
    },
    ai: {
      title: 'Assistant IA de Survie',
      subtitle: 'Obtenez des conseils de survie experts grâce à l\'IA',
      placeholder: 'Posez une question de survie...',
      send: 'Envoyer',
      thinking: 'Réflexion...',
      premiumOnly: 'L\'assistant IA est une fonctionnalité Premium',
      askAnything: 'Posez n\'importe quelle question sur la survie',
      exampleQuestion: 'Comment purifier l\'eau en pleine nature ?',
      clearChat: 'Effacer la conversation',
      apiKeyRequired: 'Clé API OpenAI requise',
      apiKeyDesc: 'Entrez votre clé API OpenAI dans les paramètres pour utiliser l\'assistant IA.',
      saveApiKey: 'Enregistrer la clé API',
      apiKeySaved: 'Clé API enregistrée avec succès',
    },
    settings: {
      title: 'Paramètres',
      subtitle: 'Gérez vos préférences',
      language: 'Langue',
      languageDesc: 'Sélectionnez votre langue préférée',
      appearance: 'Apparence',
      appearanceDesc: 'Personnalisez l\'apparence',
      storage: 'Stockage',
      storageDesc: 'Gérez vos données sauvegardées',
      clearBookmarks: 'Effacer les favoris',
      clearDownloads: 'Effacer les téléchargements',
      clearAllData: 'Effacer toutes les données',
      bookmarksCount: 'favoris',
      downloadsCount: 'téléchargements',
      confirmClear: 'Êtes-vous sûr?',
      confirmClearBookmarks: 'Cela supprimera tous les favoris.',
      confirmClearDownloads: 'Cela supprimera tous les téléchargements.',
      confirmClearAll: 'Cela supprimera toutes vos données.',
      cleared: 'Effacé avec succès',
      account: 'Compte',
      accountDesc: 'Gérez votre compte et abonnement',
      openAiApiKey: 'Clé API OpenAI',
      openAiApiKeyDesc: 'Votre clé API pour les fonctionnalités IA',
    },
    downloads: {
      title: 'Techniques téléchargées',
      subtitle: 'Accédez à vos techniques hors ligne',
      noDownloadsTitle: 'Aucun téléchargement',
      noDownloadsDesc: 'Téléchargez des techniques pour y accéder hors ligne.',
      downloaded: 'Téléchargé',
      removeDownload: 'Supprimer',
      downloadTechnique: 'Télécharger',
    },
    categories: {
      shelter: 'Abri',
      water: 'Eau',
      fire: 'Feu',
      food: 'Nourriture',
      navigation: 'Navigation',
      'first-aid': 'Premiers soins',
      signaling: 'Signalisation',
    },
    difficulty: {
      beginner: 'Débutant',
      intermediate: 'Intermédiaire',
      advanced: 'Avancé',
    },
  },
  es: {
    appTitle: 'Códice de Supervivencia',
    appSubtitle: 'Técnicas esenciales de supervivencia en la naturaleza',
    searchPlaceholder: 'Buscar técnicas...',
    bookmarks: 'Marcadores',
    allCategories: 'Todas las categorías',
    noBookmarksTitle: 'Sin marcadores',
    noBookmarksDesc: 'Comienza a marcar técnicas para acceder rápidamente más tarde.',
    noResultsTitle: 'No se encontraron técnicas',
    noResultsDesc: 'Intenta ajustar tu búsqueda o filtros.',
    steps: 'Pasos',
    warnings: 'Advertencias',
    tips: 'Consejos',
    tabs: {
      home: 'Inicio',
      downloads: 'Descargas',
      ai: 'Asistente IA',
      settings: 'Ajustes',
    },
    auth: {
      signIn: 'Iniciar sesión',
      signUp: 'Registrarse',
      signOut: 'Cerrar sesión',
      email: 'Correo',
      password: 'Contraseña',
      name: 'Nombre',
      welcomeBack: 'Bienvenido de nuevo',
      createAccount: 'Crea tu cuenta',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      noAccount: '¿No tienes una cuenta?',
      signInSuccess: 'Sesión iniciada correctamente',
      signOutSuccess: 'Sesión cerrada correctamente',
    },
    subscription: {
      free: 'Gratis',
      premium: 'Premium',
      upgradeToPremium: 'Actualizar a Premium',
      upgradeRequired: 'Premium Requerido',
      upgradeMessage: 'Actualiza a Premium para acceder a descargas ilimitadas y asistente IA.',
      premiumFeatures: 'Características Premium',
      unlimitedDownloads: 'Descargas sin conexión ilimitadas',
      aiAssistant: 'Asistente IA de supervivencia',
      offlineAccess: 'Acceso completo sin conexión',
      subscribeNow: 'Suscribirse ahora',
      yourPlan: 'Tu plan',
      activeUntil: 'Activo hasta',
    },
    ai: {
      title: 'Asistente IA de Supervivencia',
      subtitle: 'Obtén consejos expertos de supervivencia con IA',
      placeholder: 'Haz una pregunta sobre supervivencia...',
      send: 'Enviar',
      thinking: 'Pensando...',
      premiumOnly: 'El Asistente IA es una función Premium',
      askAnything: 'Pregunta cualquier cosa sobre supervivencia',
      exampleQuestion: '¿Cómo purifico el agua en la naturaleza?',
      clearChat: 'Limpiar chat',
      apiKeyRequired: 'Se requiere clave API de OpenAI',
      apiKeyDesc: 'Ingresa tu clave API de OpenAI en Ajustes para usar el asistente IA.',
      saveApiKey: 'Guardar clave API',
      apiKeySaved: 'Clave API guardada correctamente',
    },
    settings: {
      title: 'Ajustes',
      subtitle: 'Administra tus preferencias',
      language: 'Idioma',
      languageDesc: 'Selecciona tu idioma preferido',
      appearance: 'Apariencia',
      appearanceDesc: 'Personaliza la apariencia',
      storage: 'Almacenamiento',
      storageDesc: 'Administra tus datos guardados',
      clearBookmarks: 'Borrar marcadores',
      clearDownloads: 'Borrar descargas',
      clearAllData: 'Borrar todos los datos',
      bookmarksCount: 'marcadores',
      downloadsCount: 'descargas',
      confirmClear: '¿Estás seguro?',
      confirmClearBookmarks: 'Esto eliminará todos los marcadores.',
      confirmClearDownloads: 'Esto eliminará todas las descargas.',
      confirmClearAll: 'Esto eliminará todos tus datos.',
      cleared: 'Borrado exitoso',
      account: 'Cuenta',
      accountDesc: 'Administra tu cuenta y suscripción',
      openAiApiKey: 'Clave API de OpenAI',
      openAiApiKeyDesc: 'Tu clave API para funciones de IA',
    },
    downloads: {
      title: 'Técnicas descargadas',
      subtitle: 'Accede a tus técnicas sin conexión',
      noDownloadsTitle: 'Sin descargas',
      noDownloadsDesc: 'Descarga técnicas para acceder sin conexión.',
      downloaded: 'Descargado',
      removeDownload: 'Eliminar',
      downloadTechnique: 'Descargar',
    },
    categories: {
      shelter: 'Refugio',
      water: 'Agua',
      fire: 'Fuego',
      food: 'Comida',
      navigation: 'Navegación',
      'first-aid': 'Primeros auxilios',
      signaling: 'Señalización',
    },
    difficulty: {
      beginner: 'Principiante',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
    },
  },
  de: {
    appTitle: 'Survival-Kodex',
    appSubtitle: 'Wesentliche Überlebenstechniken in der Wildnis',
    searchPlaceholder: 'Techniken suchen...',
    bookmarks: 'Lesezeichen',
    allCategories: 'Alle Kategorien',
    noBookmarksTitle: 'Noch keine Lesezeichen',
    noBookmarksDesc: 'Beginnen Sie, Techniken zu markieren, um später schnell darauf zugreifen zu können.',
    noResultsTitle: 'Keine Techniken gefunden',
    noResultsDesc: 'Versuchen Sie, Ihre Suche oder Filter anzupassen.',
    steps: 'Schritte',
    warnings: 'Warnungen',
    tips: 'Tipps',
    tabs: {
      home: 'Startseite',
      downloads: 'Downloads',
      ai: 'KI-Assistent',
      settings: 'Einstellungen',
    },
    auth: {
      signIn: 'Anmelden',
      signUp: 'Registrieren',
      signOut: 'Abmelden',
      email: 'E-Mail',
      password: 'Passwort',
      name: 'Name',
      welcomeBack: 'Willkommen zurück',
      createAccount: 'Konto erstellen',
      alreadyHaveAccount: 'Haben Sie bereits ein Konto?',
      noAccount: 'Noch kein Konto?',
      signInSuccess: 'Erfolgreich angemeldet',
      signOutSuccess: 'Erfolgreich abgemeldet',
    },
    subscription: {
      free: 'Kostenlos',
      premium: 'Premium',
      upgradeToPremium: 'Auf Premium upgraden',
      upgradeRequired: 'Premium erforderlich',
      upgradeMessage: 'Upgraden Sie auf Premium für unbegrenzte Downloads und KI-Assistenten.',
      premiumFeatures: 'Premium-Funktionen',
      unlimitedDownloads: 'Unbegrenzte Offline-Downloads',
      aiAssistant: 'KI-Überlebensassistent',
      offlineAccess: 'Vollständiger Offline-Zugriff',
      subscribeNow: 'Jetzt abonnieren',
      yourPlan: 'Ihr Plan',
      activeUntil: 'Aktiv bis',
    },
    ai: {
      title: 'KI-Überlebensassistent',
      subtitle: 'Erhalten Sie KI-gestützte Überlebensratschläge',
      placeholder: 'Stellen Sie eine Überlebensfrage...',
      send: 'Senden',
      thinking: 'Denke nach...',
      premiumOnly: 'KI-Assistent ist eine Premium-Funktion',
      askAnything: 'Fragen Sie alles über Überleben',
      exampleQuestion: 'Wie reinige ich Wasser in der Wildnis?',
      clearChat: 'Chat löschen',
      apiKeyRequired: 'OpenAI-API-Schlüssel erforderlich',
      apiKeyDesc: 'Geben Sie Ihren OpenAI-API-Schlüssel in den Einstellungen ein.',
      saveApiKey: 'API-Schlüssel speichern',
      apiKeySaved: 'API-Schlüssel erfolgreich gespeichert',
    },
    settings: {
      title: 'Einstellungen',
      subtitle: 'Verwalten Sie Ihre Einstellungen',
      language: 'Sprache',
      languageDesc: 'Wählen Sie Ihre bevorzugte Sprache',
      appearance: 'Aussehen',
      appearanceDesc: 'Passen Sie das Aussehen an',
      storage: 'Speicher',
      storageDesc: 'Verwalten Sie Ihre gespeicherten Daten',
      clearBookmarks: 'Lesezeichen löschen',
      clearDownloads: 'Downloads löschen',
      clearAllData: 'Alle Daten löschen',
      bookmarksCount: 'Lesezeichen',
      downloadsCount: 'Downloads',
      confirmClear: 'Sind Sie sicher?',
      confirmClearBookmarks: 'Dies entfernt alle Lesezeichen.',
      confirmClearDownloads: 'Dies entfernt alle Downloads.',
      confirmClearAll: 'Dies entfernt alle Ihre Daten.',
      cleared: 'Erfolgreich gelöscht',
      account: 'Konto',
      accountDesc: 'Verwalten Sie Ihr Konto und Abonnement',
      openAiApiKey: 'OpenAI-API-Schlüssel',
      openAiApiKeyDesc: 'Ihr API-Schlüssel für KI-Funktionen',
    },
    downloads: {
      title: 'Heruntergeladene Techniken',
      subtitle: 'Greifen Sie auf Ihre Offline-Techniken zu',
      noDownloadsTitle: 'Keine Downloads',
      noDownloadsDesc: 'Laden Sie Techniken herunter, um offline darauf zuzugreifen.',
      downloaded: 'Heruntergeladen',
      removeDownload: 'Entfernen',
      downloadTechnique: 'Herunterladen',
    },
    categories: {
      shelter: 'Unterkunft',
      water: 'Wasser',
      fire: 'Feuer',
      food: 'Nahrung',
      navigation: 'Navigation',
      'first-aid': 'Erste Hilfe',
      signaling: 'Signalisierung',
    },
    difficulty: {
      beginner: 'Anfänger',
      intermediate: 'Fortgeschritten',
      advanced: 'Experte',
    },
  },
  it: {
    appTitle: 'Codice di Sopravvivenza',
    appSubtitle: 'Tecniche essenziali di sopravvivenza in natura',
    searchPlaceholder: 'Cerca tecniche...',
    bookmarks: 'Segnalibri',
    allCategories: 'Tutte le categorie',
    noBookmarksTitle: 'Nessun segnalibro',
    noBookmarksDesc: 'Inizia ad aggiungere segnalibri per un accesso rapido.',
    noResultsTitle: 'Nessuna tecnica trovata',
    noResultsDesc: 'Prova a modificare la ricerca o i filtri.',
    steps: 'Passi',
    warnings: 'Avvertenze',
    tips: 'Suggerimenti',
    tabs: {
      home: 'Home',
      downloads: 'Download',
      ai: 'Assistente IA',
      settings: 'Impostazioni',
    },
    auth: {
      signIn: 'Accedi',
      signUp: 'Registrati',
      signOut: 'Esci',
      email: 'Email',
      password: 'Password',
      name: 'Nome',
      welcomeBack: 'Bentornato',
      createAccount: 'Crea il tuo account',
      alreadyHaveAccount: 'Hai già un account?',
      noAccount: 'Non hai un account?',
      signInSuccess: 'Accesso effettuato',
      signOutSuccess: 'Disconnesso con successo',
    },
    subscription: {
      free: 'Gratuito',
      premium: 'Premium',
      upgradeToPremium: 'Passa a Premium',
      upgradeRequired: 'Premium Richiesto',
      upgradeMessage: 'Passa a Premium per download illimitati e assistente IA.',
      premiumFeatures: 'Funzionalità Premium',
      unlimitedDownloads: 'Download offline illimitati',
      aiAssistant: 'Assistente IA di sopravvivenza',
      offlineAccess: 'Accesso offline completo',
      subscribeNow: 'Abbonati ora',
      yourPlan: 'Il tuo piano',
      activeUntil: 'Attivo fino al',
    },
    ai: {
      title: 'Assistente IA di Sopravvivenza',
      subtitle: 'Ottieni consigli esperti di sopravvivenza con IA',
      placeholder: 'Fai una domanda sulla sopravvivenza...',
      send: 'Invia',
      thinking: 'Pensando...',
      premiumOnly: 'L\'Assistente IA è una funzione Premium',
      askAnything: 'Chiedi qualsiasi cosa sulla sopravvivenza',
      exampleQuestion: 'Come purifico l\'acqua in natura?',
      clearChat: 'Cancella chat',
      apiKeyRequired: 'Chiave API OpenAI richiesta',
      apiKeyDesc: 'Inserisci la tua chiave API OpenAI nelle Impostazioni.',
      saveApiKey: 'Salva chiave API',
      apiKeySaved: 'Chiave API salvata con successo',
    },
    settings: {
      title: 'Impostazioni',
      subtitle: 'Gestisci le tue preferenze',
      language: 'Lingua',
      languageDesc: 'Seleziona la tua lingua preferita',
      appearance: 'Aspetto',
      appearanceDesc: 'Personalizza l\'aspetto',
      storage: 'Archiviazione',
      storageDesc: 'Gestisci i tuoi dati salvati',
      clearBookmarks: 'Cancella segnalibri',
      clearDownloads: 'Cancella download',
      clearAllData: 'Cancella tutti i dati',
      bookmarksCount: 'segnalibri',
      downloadsCount: 'download',
      confirmClear: 'Sei sicuro?',
      confirmClearBookmarks: 'Questo rimuoverà tutti i segnalibri.',
      confirmClearDownloads: 'Questo rimuoverà tutti i download.',
      confirmClearAll: 'Questo rimuoverà tutti i tuoi dati.',
      cleared: 'Cancellato con successo',
      account: 'Account',
      accountDesc: 'Gestisci il tuo account e abbonamento',
      openAiApiKey: 'Chiave API OpenAI',
      openAiApiKeyDesc: 'La tua chiave API per funzioni IA',
    },
    downloads: {
      title: 'Tecniche scaricate',
      subtitle: 'Accedi alle tue tecniche offline',
      noDownloadsTitle: 'Nessun download',
      noDownloadsDesc: 'Scarica tecniche per accedervi offline.',
      downloaded: 'Scaricato',
      removeDownload: 'Rimuovi',
      downloadTechnique: 'Scarica',
    },
    categories: {
      shelter: 'Rifugio',
      water: 'Acqua',
      fire: 'Fuoco',
      food: 'Cibo',
      navigation: 'Navigazione',
      'first-aid': 'Pronto soccorso',
      signaling: 'Segnalazione',
    },
    difficulty: {
      beginner: 'Principiante',
      intermediate: 'Intermedio',
      advanced: 'Avanzato',
    },
  },
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
  it: 'Italiano',
};
