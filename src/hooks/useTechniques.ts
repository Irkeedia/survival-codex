import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/hooks/useSupabase';
import { SurvivalTechnique, SurvivalCategory } from '@/lib/types';
import { Language } from '@/lib/translations';
import { usePersistentState } from '@/hooks/use-persistent-state';

export function useTechniques(language: Language) {
  const { client, isSupabaseReady } = useSupabase();
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

  // If we have data from Supabase, use it. Otherwise fallback to cache (offline mode).
  const effectiveTechniques = data || cachedTechniques || [];

  return {
    techniques: effectiveTechniques,
    isLoading: isLoading && effectiveTechniques.length === 0, // Only loading if no cache
    error,
  };
}
