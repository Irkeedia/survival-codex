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
    settings: string;
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
      settings: 'Settings',
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
      settings: 'Paramètres',
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
      settings: 'Ajustes',
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
      settings: 'Einstellungen',
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
      settings: 'Impostazioni',
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
