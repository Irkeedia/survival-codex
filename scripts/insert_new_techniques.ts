import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const newTechniques = [
  {
    id: uuidv4(),
    title: 'Lecture des Signes Visibles du Corps',
    category: 'santé_urgence',
    difficulty: 'intermediate',
    content: `## Introduction
Le corps humain parle sans mots. Il exprime des déséquilibres internes visibles. Cette fiche décode les signaux d’alerte biologiques à surveiller pour détecter tôt une dégradation.

## Signes à surveiller

### Urines
* **Clair** : OK
* **Jaune foncé** : Boire
* **Ambre** : Urgence
* **Rouge** : Sang/Urgence

### Pupilles
* **Dilatées** : Stress/Douleur
* **Contractées** : Intoxication/Froid
* **Inégales** : Trauma crânien (Alerte !)

### Teint
* **Pâle** : Choc/Anémie
* **Bleu** : Manque oxygène
* **Jaune** : Foie
* **Rouge vif** : Fièvre/Infection

### Odeurs
* **Soufre** : Infection
* **Acétone (fruit)** : Jeûne/Diabète
* **Ammoniaque** : Déshydratation sévère

### Bouche
* **Sèche** : Soif
* **Langue blanche** : Infection
* **Goût métal** : Intoxication

### Selles
* **Billes dures** : Déshydratation
* **Liquide** : Gastro/Virus
* **Noire** : Sang digéré (Urgence)
* **Rouge** : Sang frais

### Cheveux
* **Perte soudaine ou cassants** : Carence grave ou stress majeur

## Astuces
* Utilisez une lampe faible pour tester la réactivité des pupilles.
* Pincez la peau du dos de la main : si elle reste plissée, la déshydratation est déjà avancée.
* Le corps a ses propres alarmes. Si une odeur ou couleur anormale apparaît, n'attendez pas la douleur pour agir.

## Charlie Tip
> Le corps parle, écoute-le. N'attends pas l'évanouissement pour comprendre qu'il manque d'eau ou de sucre.

## Avertissements
* Une pupille qui ne réagit plus à la lumière est une urgence neurologique absolue.
* L'odeur d'ammoniaque dans la sueur ou l'urine indique que le corps commence à consommer ses propres muscles.
* Des selles noires et goudronneuses (méléna) signalent une hémorragie digestive haute grave.`,
    steps: [], // Empty as we use content
    warnings: [], // Empty as we use content
    time_required: 'Continu',
    materials: ['Lampe (optionnel)', 'Miroir (optionnel)']
  },
  {
    id: uuidv4(),
    title: 'Préparation de Traitements Naturels (Plantes, Argile, Produits bruts)',
    category: 'santé_soins',
    difficulty: 'beginner',
    content: `## Introduction
Savoir transformer les plantes et produits bruts en remèdes utilisables. Techniques d'extraction simples pour l'autonomie médicale.

## 1. Infusion (plantes en tisane)
Pour extraire les principes actifs solubles dans l’eau.

**Étapes :**
* Faire bouillir 250 à 500 ml d’eau potable.
* Ajouter 1 à 2 cuillères à soupe de plante sèche ou une poignée de plante fraîche.
* Couvrir et laisser infuser 10 à 15 minutes.
* Filtrer avec tissu propre ou filtre à café.
* Boire chaud ou tiède, jusqu’à 3 fois par jour.

**Plantes typiques :** thym, sauge, camomille, ortie, menthe, achillée.

## 2. Décoction (racines, écorces, graines dures)
Pour les parties plus dures des plantes.

**Étapes :**
* Placer les racines ou écorces dans l’eau froide (250-500 ml).
* Porter à ébullition.
* Laisser bouillir 10 à 20 minutes.
* Filtrer avant utilisation.
* Boire ou appliquer selon besoin.

**Exemples :** racine de gingembre, écorce de saule, graines de fenouil.

## 3. Macération (à froid)
Extraction lente sans chauffer : idéale pour conserver des actifs sensibles.

**Étapes :**
* Mettre plante sèche dans un bocal hermétique.
* Recouvrir d’eau propre, vinaigre, huile ou alcool (selon usage).
* Fermer et laisser 1 à 3 jours à température ambiante (ombre).
* Filtrer et conserver au frais.

**Applications :** lotion cutanée, bain de bouche, friction, huile médicinale.

## 4. Cataplasme (application externe)
Pour désinfecter, calmer, ou extraire toxines.

**Étapes :**
* Écraser ou râper la plante (ail, oignon, plantain).
* Mélanger avec un peu d’eau ou d’argile pour former une pâte.
* Étaler sur une compresse ou linge propre.
* Appliquer sur la zone concernée 15 à 45 minutes.
* Renouveler 2 à 3 fois par jour.

## 5. Solution salée (lavage ou gargarisme)
Antiseptique simple et rapide.

**Recette :**
* 1 verre d’eau propre tiède
* 1/2 cuillère à café de sel

**Utilisations :** gargarisme pour gorge infectée, lavage nasal, rinçage de plaie.

## 6. Onguent / Pommade maison
Conservation longue des propriétés d’une plante sur support gras.

**Étapes :**
* Faire fondre de la cire d’abeille ou du beurre végétal (karité, coco).
* Ajouter extrait de plante (infusion concentrée ou huile macérée).
* Mélanger et couler dans un récipient hermétique.
* Laisser refroidir, conserver à l’abri de la chaleur.

**Usage :** plaies, brûlures, peau sèche, infections cutanées.

## Astuce Charlie
> Chaque préparation doit être faite dans le calme et avec rigueur. Les erreurs de dosage, d’hygiène ou de conservation sont souvent plus dangereuses que l’absence de soin. Prends ton temps, même en urgence.

## Fil d’Ariane
À consulter après la fiche "Mini-Vidal de Survie" – Chapitre 1.`,
    steps: [], // Empty as we use content
    warnings: [], // Empty as we use content
    time_required: '15-60 min',
    materials: ['Eau potable', 'Récipient résistant au feu', 'Tissu filtrant', 'Sel', 'Corps gras (optionnel)']
  }
];

async function insertTechniques() {
  console.log('Inserting techniques...');
  
  for (const technique of newTechniques) {
    // Clean up existing techniques with the same title to avoid duplicates
    const { error: deleteError } = await supabase
      .from('survival_sheets')
      .delete()
      .eq('title', technique.title);

    if (deleteError) {
      console.error(`Error cleaning up old version of ${technique.title}:`, deleteError);
    }

    const { error } = await supabase
      .from('survival_sheets')
      .insert(technique);
      
    if (error) {
      console.error(`Error inserting ${technique.title}:`, error);
    } else {
      console.log(`Inserted: ${technique.title}`);
    }
  }
}

insertTechniques();
