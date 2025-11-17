import { DownloadSimple } from '@phosphor-icons/react';
import { TechniqueCard } from '@/components/TechniqueCard';
import { survivalTechniques } from '@/lib/data';
import { SurvivalTechnique } from '@/lib/types';
import { Language } from '@/lib/translations';

interface DownloadsTabProps {
  language: Language;
  t: any;
  downloadedIds: string[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onToggleDownload: (id: string) => void;
  onTechniqueClick: (technique: SurvivalTechnique) => void;
}

export function DownloadsTab({ 
  language, 
  t, 
  downloadedIds, 
  bookmarkedIds,
  onToggleBookmark,
  onToggleDownload,
  onTechniqueClick 
}: DownloadsTabProps) {
  const downloadedTechniques = survivalTechniques.filter(technique => 
    downloadedIds.includes(technique.id)
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{t.downloads.title}</h2>
        <p className="text-sm sm:text-base text-muted-foreground">{t.downloads.subtitle}</p>
      </div>

      {downloadedTechniques.length === 0 ? (
        <div className="text-center py-12 sm:py-16 px-4">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-muted/50 backdrop-blur-sm mb-3 sm:mb-4 border border-border/50">
            <DownloadSimple className="w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2">
            {t.downloads.noDownloadsTitle}
          </h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            {t.downloads.noDownloadsDesc}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {downloadedTechniques.map((technique) => (
            <TechniqueCard
              key={technique.id}
              technique={technique}
              language={language}
              isBookmarked={bookmarkedIds.includes(technique.id)}
              onToggleBookmark={() => onToggleBookmark(technique.id)}
              onClick={() => onTechniqueClick(technique)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
