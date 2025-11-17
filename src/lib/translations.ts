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
