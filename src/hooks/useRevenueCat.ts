import { useEffect, useRef, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Purchases, LOG_LEVEL } from '@revenuecat/purchases-capacitor';
import { User } from '@/lib/types';

const ANDROID_KEY = import.meta.env.VITE_REVENUECAT_ANDROID_KEY;
const IOS_KEY = import.meta.env.VITE_REVENUECAT_IOS_KEY;

const isNativePlatform = () => {
  const platform = Capacitor.getPlatform();
  return platform === 'ios' || platform === 'android';
};

export const useRevenueCat = (user: User | null) => {
  const [isConfigured, setIsConfigured] = useState(false);
  const platformRef = useRef<'ios' | 'android' | null>(null);

  useEffect(() => {
    if (!isNativePlatform()) {
      return;
    }

    const platform = Capacitor.getPlatform() as 'ios' | 'android';
    platformRef.current = platform;
    const apiKey = platform === 'ios' ? IOS_KEY : ANDROID_KEY;

    if (!apiKey) {
      console.warn(`RevenueCat API key missing for ${platform}. Set VITE_REVENUECAT_${platform.toUpperCase()}_KEY.`);
      return;
    }

    let isMounted = true;

    (async () => {
      try {
        await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
        await Purchases.configure({ apiKey });
        if (isMounted) {
          setIsConfigured(true);
        }
      } catch (error) {
        console.error('Failed to configure RevenueCat', error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isConfigured || !platformRef.current) {
      return;
    }

    const syncCustomer = async () => {
      try {
        if (user?.id) {
          await Purchases.logIn({ appUserID: user.id });
        } else {
          await Purchases.logOut();
        }
      } catch (error) {
        console.error('Failed to sync RevenueCat customer', error);
      }
    };

    syncCustomer();
  }, [isConfigured, user]);

  return { revenueCatConfigured: isConfigured } as const;
};
