-- 1. Enable Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create Table: survival_sheets
CREATE TABLE IF NOT EXISTS survival_sheets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Métadonnées de tri
  category VARCHAR(50) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(100) NOT NULL,
  
  -- Métadonnées d'exécution
  difficulty VARCHAR(20) CHECK (difficulty IN ('débutant', 'intermédiaire', 'expert')),
  time_required VARCHAR(50),
  
  -- Cœur de la fiche
  materials TEXT[],
  steps TEXT[] NOT NULL,
  warnings TEXT[],
  
  -- La "Touch" Charlie
  charlie_tip TEXT,
  
  -- Données Techniques
  technical_data JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable RLS
ALTER TABLE survival_sheets ENABLE ROW LEVEL SECURITY;

-- Policy: Public read access
DROP POLICY IF EXISTS "Public sheets are viewable by everyone" ON survival_sheets;
CREATE POLICY "Public sheets are viewable by everyone" ON survival_sheets FOR SELECT USING (true);

-- Fiche : Système digestif et nutrition
INSERT INTO survival_sheets (category, slug, title, difficulty, time_required, materials, steps, warnings, charlie_tip, technical_data)
VALUES (
  'santé_soins',
  'systeme-digestif-nutrition',
  'Système digestif et nutrition : Comprendre, maintenir, réparer',
  'intermédiaire',
  'Continu',
  ARRAY['Eau potable', 'Sel', 'Sucre', 'Charbon actif', 'Riz blanc'],
  ARRAY[
    'Identifier les signes de défaillance digestive (diarrhée, constipation, vomissements)',
    'Traiter la diarrhée immédiatement par réhydratation (SRO maison) et repos digestif',
    'Gérer la constipation par hydratation massive, fibres et mouvement',
    'Traiter l''intoxication alimentaire par jeûne hydrique (12-24h) et charbon actif',
    'Optimiser l''absorption des nutriments : mastiquer longuement (30-50 fois)',
    'Cuire les aliments pour faciliter la digestion et tuer les pathogènes',
    'Fractionner les repas en petites portions fréquentes',
    'Surveiller l''aspect des selles comme indicateur de santé',
    'Pratiquer le jeûne tactique en cas d''infection ou déshydratation critique'
  ],
  ARRAY[
    'Ne jamais drainer le triangle du visage',
    'Douleur abdominale aiguë + fièvre + ventre dur = JAMAIS de manipulation terrain',
    'L''eau est 100x plus critique que la nourriture',
    'Ne jamais donner d''alcool en cas d''hypothermie ou déshydratation'
  ],
  'Le ventre est le moteur silencieux. Si la digestion s''arrête, tout s''arrête. Protège-le, écoute-le, nourris-le intelligemment.',
  '{
    "transit_moyen": "24-72 heures",
    "besoin_calorique_repos": "1200-1500 kcal/jour",
    "besoin_calorique_effort": "2500-3500 kcal/jour",
    "besoin_eau_tempere": "2-4L/jour",
    "besoin_eau_chaud": "4-8L/jour",
    "jeune_max_sante": "30-40 jours",
    "jeune_max_blesse": "10-15 jours",
    "sro_recette": "1L eau + 6 c.à.c sucre + 1/2 c.à.c sel"
  }'
);
