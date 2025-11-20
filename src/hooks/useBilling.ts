import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { useSupabase } from '@/hooks/useSupabase';
import { BILLING_ENABLED, BILLING_PRODUCTS } from '@/lib/billing';
import { User } from '@/lib/types';

interface GooglePlayPurchase {
  productId: string;
  purchaseToken: string;
  orderId?: string;
  acknowledged?: boolean;
  expiryTimeMillis?: string;
  purchaseState?: number;
}

interface GooglePlayBillingPlugin {
  connect(): Promise<void>;
  endConnection(): Promise<void>;
  getProducts(options: { productIds: string[] }): Promise<{ products: Array<{ productId: string; title: string; description: string; price: string; }>; }>;
  purchase(options: { productId: string }): Promise<{ purchase: GooglePlayPurchase }>;
  acknowledge(options: { purchaseToken: string }): Promise<void>;
  getPurchases(): Promise<{ purchases: GooglePlayPurchase[] }>;
}

const getBillingPlugin = (): GooglePlayBillingPlugin | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const plugins = (window as unknown as { Capacitor?: { Plugins?: Record<string, unknown> } })?.Capacitor?.Plugins;
  if (!plugins) return null;
  const candidate = plugins.CapacitorGooglePlayBilling as GooglePlayBillingPlugin | undefined;
  if (!candidate) return null;
  return candidate;
};

const MILLIS_IN_DAY = 24 * 60 * 60 * 1000;

const purchaseHasExpired = (purchase: GooglePlayPurchase) => {
  if (!purchase.expiryTimeMillis) return false;
  const expiry = Number(purchase.expiryTimeMillis);
  return Number.isFinite(expiry) && expiry < Date.now();
};

export function useBilling(user: User | null) {
  const { client, updateProfile } = useSupabase();
  const pluginRef = useRef<GooglePlayBillingPlugin | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [syncingPurchases, setSyncingPurchases] = useState(false);
  const [lastSyncError, setLastSyncError] = useState<Error | null>(null);

  const isAndroid = Capacitor.getPlatform() === 'android';
  const billingAvailable = BILLING_ENABLED && isAndroid;

  const ensurePlugin = useCallback(() => {
    if (!billingAvailable) return null;
    if (pluginRef.current) return pluginRef.current;
    const plugin = getBillingPlugin();
    pluginRef.current = plugin;
    return plugin;
  }, [billingAvailable]);

  const initializeBilling = useCallback(async () => {
    if (!billingAvailable) return false;
    const plugin = ensurePlugin();
    if (!plugin) return false;

    try {
      setIsInitializing(true);
      await plugin.connect();
      setIsReady(true);
      return true;
    } catch (error) {
      console.error('Failed to initialize Google Play Billing', error);
      setIsReady(false);
      return false;
    } finally {
      setIsInitializing(false);
    }
  }, [billingAvailable, ensurePlugin]);

  const upsertReceipt = useCallback(async (purchase: GooglePlayPurchase) => {
    if (!client || !user) return;
    const expiry = purchase.expiryTimeMillis
      ? new Date(Number(purchase.expiryTimeMillis)).toISOString()
      : new Date(Date.now() + 365 * MILLIS_IN_DAY).toISOString();

    await client.from('play_billing_receipts').upsert({
      user_id: user.id,
      platform: 'android',
      product_id: purchase.productId,
      purchase_token: purchase.purchaseToken,
      order_id: purchase.orderId ?? null,
      expiry_time: expiry,
      raw_payload: purchase,
    });

    await updateProfile({
      subscriptionTier: 'premium',
      subscriptionExpiryDate: expiry,
    });
  }, [client, updateProfile, user]);

  const syncPurchases = useCallback(async () => {
    if (!billingAvailable || !user) return;
    const plugin = ensurePlugin();
    if (!plugin) return;

    try {
      setSyncingPurchases(true);
      setLastSyncError(null);
      const { purchases } = await plugin.getPurchases();
      const activePurchases = (purchases || []).filter((purchase) => !purchaseHasExpired(purchase));

      for (const purchase of activePurchases) {
        await upsertReceipt(purchase);
        if (!purchase.acknowledged) {
          await plugin.acknowledge({ purchaseToken: purchase.purchaseToken });
        }
      }
    } catch (error) {
      console.error('Failed to sync purchases', error);
      setLastSyncError(error as Error);
      throw error;
    } finally {
      setSyncingPurchases(false);
    }
  }, [billingAvailable, ensurePlugin, upsertReceipt, user]);

  const purchaseSubscription = useCallback(async () => {
    if (!billingAvailable) {
      throw new Error('Google Play Billing is unavailable on this device');
    }
    const plugin = ensurePlugin();
    if (!plugin) {
      throw new Error('Google Play Billing plugin missing');
    }

    const product = BILLING_PRODUCTS[0];
    const { purchase } = await plugin.purchase({ productId: product.id });
    await upsertReceipt(purchase);
  }, [billingAvailable, ensurePlugin, upsertReceipt]);

  useEffect(() => {
    if (!billingAvailable) return;
    initializeBilling();
  }, [billingAvailable, initializeBilling]);

  useEffect(() => {
    return () => {
      if (pluginRef.current) {
        const plugin = pluginRef.current;
        pluginRef.current = null;
        try {
          void plugin.endConnection();
        } catch (error) {
          console.warn('Failed to close billing connection', error);
        }
      }
    };
  }, []);

  const state = useMemo(() => ({
    billingAvailable,
    isReady,
    isInitializing,
    syncingPurchases,
    lastSyncError,
  }), [billingAvailable, isReady, isInitializing, syncingPurchases, lastSyncError]);

  return {
    ...state,
    initializeBilling,
    purchaseSubscription,
    restorePurchases: syncPurchases,
  } as const;
}
