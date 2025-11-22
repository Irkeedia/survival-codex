import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usePersistentState } from '@/hooks/use-persistent-state';
import { useSupabase } from '@/hooks/useSupabase';
import { SurvivalTechnique } from '@/lib/types';

export function useDownloads(userId?: string | null) {
  const queryClient = useQueryClient();
  const { client, isSupabaseReady } = useSupabase();
  const supabaseEnabled = Boolean(client && isSupabaseReady && userId);
  const [localDownloads, setLocalDownloads] = usePersistentState<string[]>('downloaded-techniques', []);
  const [offlineContent, setOfflineContent] = usePersistentState<Record<string, SurvivalTechnique>>('offline-content', {});

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

  const toggleLocal = useCallback((technique: SurvivalTechnique) => {
    const id = technique.id;
    setLocalDownloads((current = []) => {
      if (current.includes(id)) {
        setOfflineContent(prev => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
        return current.filter((techniqueId) => techniqueId !== id);
      }
      
      setOfflineContent(prev => ({ ...prev, [id]: technique }));
      return [...current, id];
    });
  }, [setLocalDownloads, setOfflineContent]);

  const toggleDownload = useCallback(async (technique: SurvivalTechnique) => {
    const techniqueId = technique.id;
    
    if (!supabaseEnabled) {
      toggleLocal(technique);
      return;
    }

    const alreadyDownloaded = (data ?? []).includes(techniqueId);

    if (alreadyDownloaded) {
      // Remove from offline content
      setOfflineContent(prev => {
        const next = { ...prev };
        delete next[techniqueId];
        return next;
      });

      const { error } = await client!
        .from('downloads')
        .delete()
        .eq('user_id', userId)
        .eq('technique_id', techniqueId);

      if (error) {
        throw error;
      }
    } else {
      // Save to offline content
      setOfflineContent(prev => ({ ...prev, [techniqueId]: technique }));

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
  }, [client, data, queryClient, supabaseEnabled, toggleLocal, userId, setOfflineContent]);

  const clearDownloads = useCallback(async () => {
    setOfflineContent({});
    
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
  }, [client, queryClient, supabaseEnabled, setLocalDownloads, userId, setOfflineContent]);

  return {
    downloads: effectiveDownloads,
    offlineContent,
    downloadsLoading: supabaseEnabled ? isLoading : false,
    toggleDownload,
    clearDownloads,
    usingSupabase: supabaseEnabled,
  } as const;
}
