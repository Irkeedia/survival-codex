import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useKV } from '@github/spark/hooks';
import { useSupabase } from '@/hooks/useSupabase';

export function useBookmarks(userId?: string | null) {
  const queryClient = useQueryClient();
  const { client, isSupabaseReady } = useSupabase();
  const supabaseEnabled = Boolean(client && isSupabaseReady && userId);
  const [localBookmarks, setLocalBookmarks] = useKV<string[]>('bookmarked-techniques', []);

  const { data, isLoading } = useQuery({
    queryKey: ['bookmarks', userId],
    enabled: supabaseEnabled,
    queryFn: async () => {
      const { data, error } = await client!
        .from('bookmarks')
        .select('technique_id')
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      return data?.map((row) => row.technique_id) ?? [];
    },
  });

  const toggleLocal = useCallback((id: string) => {
    setLocalBookmarks((current = []) => {
      if (current.includes(id)) {
        return current.filter((techniqueId) => techniqueId !== id);
      }
      return [...current, id];
    });
  }, [setLocalBookmarks]);

  const toggleBookmark = useCallback(async (techniqueId: string) => {
    if (!supabaseEnabled) {
      toggleLocal(techniqueId);
      return;
    }

    const isAlreadyBookmarked = (data ?? []).includes(techniqueId);

    if (isAlreadyBookmarked) {
      const { error } = await client!
        .from('bookmarks')
        .delete()
        .eq('user_id', userId)
        .eq('technique_id', techniqueId);

      if (error) {
        throw error;
      }
    } else {
      const { error } = await client!
        .from('bookmarks')
        .insert({
          user_id: userId,
          technique_id: techniqueId,
        });

      if (error) {
        throw error;
      }
    }

    queryClient.invalidateQueries({ queryKey: ['bookmarks', userId] });
  }, [client, data, queryClient, supabaseEnabled, toggleLocal, userId]);

  const clearBookmarks = useCallback(async () => {
    if (!supabaseEnabled) {
      setLocalBookmarks([]);
      return;
    }

    const { error } = await client!
      .from('bookmarks')
      .delete()
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    queryClient.invalidateQueries({ queryKey: ['bookmarks', userId] });
  }, [client, queryClient, supabaseEnabled, setLocalBookmarks, userId]);

  const resetLocalState = useCallback(() => {
    setLocalBookmarks([]);
  }, [setLocalBookmarks]);

  return {
    bookmarks: supabaseEnabled ? (data ?? []) : (localBookmarks ?? []),
    bookmarksLoading: supabaseEnabled ? isLoading : false,
    toggleBookmark,
    clearBookmarks,
    resetLocalState,
    usingSupabase: supabaseEnabled,
  } as const;
}
