import { Language } from '@/lib/translations';

export type BillingProduct = {
  id: string;
  title: string;
  description: string;
  type: 'subscription';
  benefits: string[];
};

const defaultProductId = import.meta.env.VITE_PLAY_BILLING_SUBSCRIPTION_ID || 'survival_codex_premium_yearly';

export const BILLING_PRODUCTS: BillingProduct[] = [
  {
    id: defaultProductId,
    title: 'Survival Codex Premium',
    description: 'Unlimited downloads, AI access and yearly updates.',
    type: 'subscription',
    benefits: [
      'Unlimited offline downloads',
      'Charlie AI assistant',
      'Priority technique updates',
    ],
  },
];

export const BILLING_SUPPORTED_LANGUAGES: Language[] = ['en', 'fr', 'es', 'de', 'it'];

export const BILLING_ENABLED = Boolean(import.meta.env.VITE_PLAY_BILLING_SUBSCRIPTION_ID);

export const BILLING_SYNC_ENDPOINT = import.meta.env.VITE_PLAY_BILLING_WEBHOOK_URL || '';

export type BillingPlatform = 'android' | 'ios';

export interface BillingReceiptPayload {
  user_id: string;
  platform: BillingPlatform;
  product_id: string;
  purchase_token: string;
  order_id?: string;
  expiry_time?: string | null;
  raw_payload?: Record<string, unknown>;
}
