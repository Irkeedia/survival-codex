export type SurvivalCategory = 
  | 'shelter'
  | 'water'
  | 'fire'
  | 'food'
  | 'navigation'
  | 'first-aid'
  | 'signaling'
  | 'santé_urgence'
  | 'santé_soins'
  | 'santé_chirurgie'
  | 'nucléaire_protection'
  | 'nucléaire_décontamination'
  | 'ingénierie_lowtech'
  | 'défense_tactique';

export interface SurvivalTechnique {
  id: string;
  title: string;
  category: SurvivalCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'débutant' | 'expert';
  description?: string; // Optional now as some sheets might not have it in the same way
  steps: string[];
  warnings?: string[];
  tips?: string[];
  timeRequired?: string;
  materials?: string[]; // New field
  charlie_tip?: string; // New field
  technical_data?: any; // New field
  slug?: string; // New field
}

export type SubscriptionTier = 'free' | 'premium';

export interface User {
  id: string;
  email: string;
  name: string;
  subscriptionTier: SubscriptionTier;
  subscriptionExpiryDate?: string;
  avatarUrl?: string;
  language?: string;
  apiKey?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}
