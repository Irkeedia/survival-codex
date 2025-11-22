import { SurvivalTechnique } from './types';

// Les techniques sont maintenant chargées depuis Supabase (table survival_sheets).
// Ce fichier ne sert plus qu'à la configuration de l'interface (couleurs, labels).

export const categoryColors: Record<string, string> = {
  shelter: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
  water: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
  fire: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
  food: 'bg-green-500/20 text-green-300 border-green-500/50',
  navigation: 'bg-purple-500/20 text-purple-300 border-purple-500/50',
  'first-aid': 'bg-red-500/20 text-red-300 border-red-500/50',
  signaling: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
  'santé_urgence': 'bg-red-600/20 text-red-400 border-red-600/50',
  'santé_soins': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
  'santé_chirurgie': 'bg-rose-500/20 text-rose-300 border-rose-500/50',
  'nucléaire_protection': 'bg-yellow-600/20 text-yellow-400 border-yellow-600/50',
  'nucléaire_décontamination': 'bg-lime-500/20 text-lime-300 border-lime-500/50',
  'ingénierie_lowtech': 'bg-slate-500/20 text-slate-300 border-slate-500/50',
  'défense_tactique': 'bg-zinc-700/20 text-zinc-300 border-zinc-700/50',
};

export const categoryLabels: Record<string, string> = {
  shelter: 'Shelter',
  water: 'Water',
  fire: 'Fire',
  food: 'Food',
  navigation: 'Navigation',
  'first-aid': 'First Aid',
  signaling: 'Signaling',
  'santé_urgence': 'Santé Urgence',
  'santé_soins': 'Santé Soins',
  'santé_chirurgie': 'Santé Chirurgie',
  'nucléaire_protection': 'Nucléaire Protection',
  'nucléaire_décontamination': 'Nucléaire Décontamination',
  'ingénierie_lowtech': 'Ingénierie Low-tech',
  'défense_tactique': 'Défense Tactique',
};
