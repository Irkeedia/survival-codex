import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/hooks/useSupabase';
import { SurvivalTechnique, SurvivalCategory } from '@/lib/types';
import { Language } from '@/lib/translations';
import { usePersistentState } from '@/hooks/use-persistent-state';

export function useTechniques(language: Language, downloadedIds: string[] = []) {
  const { client, isSupabaseReady, user } = useSupabase();
  // Cache the full techniques list locally for offline usage of the LIST
  const [cachedTechniques, setCachedTechniques] = usePersistentState<SurvivalTechnique[]>('cached-techniques', []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['techniques', language],
    enabled: isSupabaseReady,
    queryFn: async () => {
      // Fetch techniques from the new survival_sheets table
      const { data: techniquesData, error: techniquesError } = await client!
        .from('survival_sheets')
        .select('*');

      if (techniquesError) throw techniquesError;

      // Transform to SurvivalTechnique format
      const formatted: SurvivalTechnique[] = techniquesData.map((t: any) => ({
        id: t.id,
        category: t.category as SurvivalCategory,
        difficulty: t.difficulty,
        timeRequired: t.time_required,
        title: t.title,
        description: t.charlie_tip || '', // Use charlie_tip as description or empty
        steps: t.steps,
        warnings: t.warnings,
        tips: t.warnings, // Mapping warnings to tips as well for now, or empty array
        materials: t.materials,
        slug: t.slug,
        technical_data: t.technical_data,
        charlie_tip: t.charlie_tip
      }));

      setCachedTechniques(formatted);
      return formatted;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Logic to handle offline access based on subscription
  const effectiveTechniques = useMemo(() => {
    // 1. If we have fresh data from online fetch, use it
    if (data) return data;

    // 2. If we are offline (or fetch failed), check subscription
    // Only Premium users can access offline content, AND ONLY what they have downloaded
    if (user?.subscriptionTier === 'premium') {
      // Filter cached techniques to only show downloaded ones
      return (cachedTechniques || []).filter(t => downloadedIds.includes(t.id));
    }

    // 3. Free users get no access when offline
    return [];
  }, [data, cachedTechniques, user, downloadedIds]);

  return {
    techniques: effectiveTechniques,
    isLoading: isLoading && effectiveTechniques.length === 0, // Only loading if no cache
    error,
  };
}
