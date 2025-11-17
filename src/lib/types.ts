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

export type SubscriptionTier = 'free' | 'premium';

export interface User {
  id: string;
  email: string;
  name: string;
  subscriptionTier: SubscriptionTier;
  subscriptionExpiryDate?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
