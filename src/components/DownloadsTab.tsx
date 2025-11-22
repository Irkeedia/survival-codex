import { DownloadSimple, House, Drop, Fire, ForkKnife, Compass, FirstAid, Megaphone, Trash } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { survivalTechniques } from '@/lib/data';
import { SurvivalTechnique } from '@/lib/types';
import { Language } from '@/lib/translations';
import { techniqueTranslations } from '@/lib/techniqueTranslations';

interface DownloadsTabProps {
  language: Language;
  t: any;
  downloadedIds: string[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void | Promise<void>;
  onToggleDownload: (id: string) => void | Promise<void>;
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'shelter': return { icon: House, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' };
      case 'water': return { icon: Drop, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' };
      case 'fire': return { icon: Fire, color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' };
      case 'food': return { icon: ForkKnife, color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' };
      case 'navigation': return { icon: Compass, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' };
      case 'first-aid': return { icon: FirstAid, color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' };
      case 'signaling': return { icon: Megaphone, color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' };
      default: return { icon: DownloadSimple, color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' };
    }
  };

  return (
    <div className="space-y-6 pt-12 pb-24">
      <div className="px-1">
        <h2 className="text-2xl font-bold mb-2">{t.downloads.title}</h2>
        <p className="text-muted-foreground">{t.downloads.subtitle}</p>
      </div>

      {downloadedTechniques.length === 0 ? (
        <div className="text-center py-16 px-4">
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
        <div className="space-y-3">
          {downloadedTechniques.map((technique) => {
            const { icon: Icon, color } = getCategoryIcon(technique.category);
            const translation = techniqueTranslations[technique.id]?.[language];
            const title = translation?.title || technique.title;
            const categoryName = t.categories[technique.category];

            return (
              <div
                key={technique.id}
                onClick={() => onTechniqueClick(technique)}
                className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border/50 shadow-sm active:scale-[0.99] transition-all cursor-pointer hover:bg-accent/5"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon weight="fill" className="w-6 h-6" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base truncate">{title}</h3>
                  <p className="text-xs text-muted-foreground truncate">{categoryName}</p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleDownload(technique.id);
                  }}
                >
                  <Trash className="w-5 h-5" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
