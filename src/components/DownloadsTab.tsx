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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t.downloads.title}</h2>
        <p className="text-muted-foreground">{t.downloads.subtitle}</p>
      </div>

      {downloadedTechniques.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 backdrop-blur-sm mb-4 border border-border/50">
            <DownloadSimple className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {t.downloads.noDownloadsTitle}
          </h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            {t.downloads.noDownloadsDesc}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
