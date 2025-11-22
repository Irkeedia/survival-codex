import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usePersistentState } from '@/hooks/use-persistent-state';
import { useSupabase } from '@/hooks/useSupabase';

export function useDownloads(userId?: string | null) {
  const queryClient = useQueryClient();
  const { client, isSupabaseReady } = useSupabase();
  const supabaseEnabled = Boolean(client && isSupabaseReady && userId);
  const [localDownloads, setLocalDownloads] = usePersistentState<string[]>('downloaded-techniques', []);

  const { data, isLoading } = useQuery({
    queryKey: ['downloads', userId],
    enabled: supabaseEnabled,
    queryFn: async () => {
      const { data, error } = await client!
        .from('downloads')
        .select('technique_id')
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      const ids = data?.map((row) => row.technique_id) ?? [];
      
      // Sync to local storage for offline access
      setLocalDownloads(ids);
      
      return ids;
    },
  });

  // Use local downloads as fallback when offline or loading
  const effectiveDownloads = data ?? localDownloads ?? [];

  const toggleLocal = useCallback((id: string) => {
    setLocalDownloads((current = []) => {
      if (current.includes(id)) {
        return current.filter((techniqueId) => techniqueId !== id);
      }
      return [...current, id];
    });
  }, [setLocalDownloads]);

  const toggleDownload = useCallback(async (techniqueId: string) => {
    if (!supabaseEnabled) {
      toggleLocal(techniqueId);
      return;
    }

    const alreadyDownloaded = (data ?? []).includes(techniqueId);

    if (alreadyDownloaded) {
      const { error } = await client!
        .from('downloads')
        .delete()
        .eq('user_id', userId)
        .eq('technique_id', techniqueId);

      if (error) {
        throw error;
      }
    } else {
      const { error } = await client!
        .from('downloads')
        .insert({
          user_id: userId,
          technique_id: techniqueId,
        });

      if (error) {
        throw error;
      }
    }

    queryClient.invalidateQueries({ queryKey: ['downloads', userId] });
  }, [client, data, queryClient, supabaseEnabled, toggleLocal, userId]);

  const clearDownloads = useCallback(async () => {
    if (!supabaseEnabled) {
      setLocalDownloads([]);
      return;
    }

    const { error } = await client!
      .from('downloads')
      .delete()
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    queryClient.invalidateQueries({ queryKey: ['downloads', userId] });
  }, [client, queryClient, supabaseEnabled, setLocalDownloads, userId]);

  return {
    downloads: effectiveDownloads,
    downloadsLoading: supabaseEnabled ? isLoading : false,
    toggleDownload,
    clearDownloads,
    usingSupabase: supabaseEnabled,
  } as const;
}
