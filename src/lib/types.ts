export type SurvivalCategory = 
  | 'shelter'
  | 'water'
  | 'fire'
  | 'food'
  | 'navigation'
  | 'first-aid'
  | 'signaling';

export interface SurvivalTechnique {
  id: string;
  title: string;
  category: SurvivalCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  steps: string[];
  warnings?: string[];
  tips?: string[];
  timeRequired?: string;
}
