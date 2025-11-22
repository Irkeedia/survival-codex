import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { usePersistentState } from '@/hooks/use-persistent-state';
import { Language } from '@/lib/translations';
import { SubscriptionTier, User } from '@/lib/types';

interface EmailCredentials {
  email: string;
  password: string;
  name?: string;
}

export type ProfileUpdate = Partial<Pick<User, 'name' | 'subscriptionTier' | 'subscriptionExpiryDate' | 'avatarUrl' | 'language' | 'apiKey'>>;

interface SupabaseContextValue {
  client: SupabaseClient | null;
  session: Session | null;
  user: User | null;
  loading: boolean;
  isSupabaseReady: boolean;
  signInWithEmail: (credentials: EmailCredentials) => Promise<void>;
  signUpWithEmail: (credentials: EmailCredentials) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: ProfileUpdate) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

interface ProfileRow {
  id: string;
  email: string;
  name: string;
  subscription_tier: SubscriptionTier;
  subscription_expiry_date: string | null;
  avatar_url: string | null;
  language: string | null;
  api_key: string | null;
}

const defaultLanguages: Language[] = ['en', 'fr', 'es', 'de', 'it'];

const getInitialsName = (email: string, preferred?: string) => {
  if (preferred && preferred.trim().length > 0) {
    return preferred.trim();
  }
  const fallback = email.split('@')[0];
  return fallback || 'Explorer';
};

const normalizeLanguage = (value?: string | null): Language => {
  if (value && defaultLanguages.includes(value as Language)) {
    return value as Language;
  }
  return 'en';
};

const mapRowToUser = (row: ProfileRow): User => ({
  id: row.id,
  email: row.email,
  name: row.name ?? row.email,
  subscriptionTier: (row.subscription_tier as SubscriptionTier) || 'free',
  subscriptionExpiryDate: row.subscription_expiry_date || undefined,
  avatarUrl: row.avatar_url || undefined,
  language: normalizeLanguage(row.language),
  apiKey: row.api_key || undefined,
});

const generateId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}`;
};

export const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined);

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const isSupabaseReady = Boolean(supabaseUrl && supabaseAnonKey);

  const [client] = useState<SupabaseClient | null>(() => {
    if (!isSupabaseReady) {
      return null;
    }
    return createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        detectSessionInUrl: true,
        persistSession: true,
      },
    });
  });

  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(isSupabaseReady);
  const [localUser, setLocalUser] = usePersistentState<User | null>('current-user', null);
  const [cachedProfile, setCachedProfile] = usePersistentState<User | null>('cached-profile', null);

  useEffect(() => {
    if (!client) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    // Try to restore session from local storage first (fast)
    client.auth.getSession().then(({ data }) => {
      if (!cancelled) {
        setSession(data.session);
        // If we have a session but no profile yet, try to use cached profile temporarily
        if (data.session && cachedProfile && cachedProfile.id === data.session.user.id) {
          setProfile(cachedProfile);
        }
      }
    }).finally(() => {
      if (!cancelled) {
        setLoading(false);
      }
    });

    const { data } = client.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      if (event === 'SIGNED_OUT') {
        setProfile(null);
        setCachedProfile(null);
      }
    });

    return () => {
      cancelled = true;
      data.subscription.unsubscribe();
    };
  }, [client]);

  const fetchProfile = useCallback(async () => {
    if (!client || !session?.user) {
      setProfile(null);
      return;
    }

    // Don't set loading to true here to avoid UI flickering if we already have data
    // setLoading(true); 
    
    try {
      const { data, error } = await client
        .from('profiles')
        .select('id, email, name, subscription_tier, subscription_expiry_date, avatar_url, language, api_key')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Failed to load profile from Supabase', error);
        
        // Fallback to cached profile if network error
        if (cachedProfile && cachedProfile.id === session.user.id) {
          console.log('Using cached profile due to error');
          setProfile(cachedProfile);
          return;
        }

        if (error.code === 'PGRST116') {
          const { data: inserted, error: insertError } = await client
            .from('profiles')
            .upsert({
              id: session.user.id,
              email: session.user.email ?? '',
              name: getInitialsName(session.user.email ?? '', session.user.user_metadata?.full_name),
              subscription_tier: 'free',
              language: 'en',
            }, {
              onConflict: 'id',
            })
            .select('id, email, name, subscription_tier, subscription_expiry_date, avatar_url, language, api_key')
            .eq('id', session.user.id)
            .single();

          if (insertError) {
            console.error('Failed to create profile', insertError);
            return;
          }

          const newUser = mapRowToUser(inserted as ProfileRow);
          setProfile(newUser);
          setCachedProfile(newUser);
          return;
        }
        return;
      }

      if (data) {
        const user = mapRowToUser(data as ProfileRow);
        setProfile(user);
        setCachedProfile(user);
      }
    } finally {
      setLoading(false);
    }
  }, [client, session, cachedProfile, setCachedProfile]);

  useEffect(() => {
    if (!client || !session?.user) {
      setProfile(null);
      return;
    }

    fetchProfile();
  }, [client, session, fetchProfile]);

  const signInWithEmail = useCallback(async ({ email, password }: EmailCredentials) => {
    if (!client) {
      setLocalUser({
        id: generateId(),
        email,
        name: getInitialsName(email),
        subscriptionTier: 'free',
      });
      return;
    }

    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) {
      throw error;
    }
    await fetchProfile();
  }, [client, fetchProfile, setLocalUser]);

  const signUpWithEmail = useCallback(async ({ email, password, name }: EmailCredentials) => {
    if (!client) {
      setLocalUser({
        id: generateId(),
        email,
        name: getInitialsName(email, name),
        subscriptionTier: 'free',
      });
      return;
    }

    const { error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
        emailRedirectTo: 'com.irkeedia.survivalcodex://login-callback',
      },
    });

    if (error) {
      throw error;
    }
  }, [client, setLocalUser]);

  const signInWithGoogle = useCallback(async () => {
    if (!client) {
      setLocalUser({
        id: generateId(),
        email: 'user@google.com',
        name: 'Google User',
        subscriptionTier: 'free',
      });
      return;
    }

    const { data, error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // C'est CETTE ligne qui manque et qui cause le bug localhost
        redirectTo: 'com.irkeedia.survivalcodex://login-callback',
        
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      throw error;
    }
  }, [client, setLocalUser]);

  const signOut = useCallback(async () => {
    if (!client) {
      setLocalUser(null);
      return;
    }

    await client.auth.signOut();
    setProfile(null);
    setCachedProfile(null);
  }, [client, setLocalUser, setCachedProfile]);

  const updateProfile = useCallback(async (updates: ProfileUpdate) => {
    if (!updates || Object.keys(updates).length === 0) {
      return;
    }

    if (!client || !session?.user) {
      setCachedProfile((current) => {
        if (!current) return null;
        return { ...current, ...updates };
      });
      setLocalUser((current) => {
        if (!current) return null;
        return { ...current, ...updates };
      });
      return;
    }

    const payload: Record<string, unknown> = {};
    if (typeof updates.name === 'string') payload.name = updates.name;
    if (typeof updates.subscriptionTier === 'string') payload.subscription_tier = updates.subscriptionTier;
    if (typeof updates.subscriptionExpiryDate === 'string') payload.subscription_expiry_date = updates.subscriptionExpiryDate;
    if (typeof updates.avatarUrl === 'string') payload.avatar_url = updates.avatarUrl;
    if (typeof updates.language === 'string') payload.language = updates.language;
    if (typeof updates.apiKey === 'string') payload.api_key = updates.apiKey;

    if (Object.keys(payload).length === 0) {
      return;
    }

    const { error } = await client
      .from('profiles')
      .update(payload)
      .eq('id', session.user.id);

    if (error) {
      throw error;
    }

    await fetchProfile();
  }, [client, session, fetchProfile, setLocalUser]);

  const refreshProfile = useCallback(async () => {
    if (!client || !session?.user) {
      return;
    }
    await fetchProfile();
  }, [client, session, fetchProfile]);

  const currentUser = isSupabaseReady ? (profile ?? cachedProfile ?? null) : (localUser ?? null);
  const value = useMemo<SupabaseContextValue>(() => ({
    client,
    session,
    user: currentUser,
    loading,
    isSupabaseReady,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    updateProfile,
    refreshProfile,
  }), [client, session, currentUser, loading, isSupabaseReady, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut, updateProfile, refreshProfile]);

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}
