import { useMemo } from 'react';
import { DownloadSimple, House, Drop, Fire, ForkKnife, Compass, FirstAid, Megaphone, Trash, BookOpen, Clock, Barbell } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SurvivalTechnique } from '@/lib/types';
import { Language } from '@/lib/translations';
import { techniqueTranslations } from '@/lib/techniqueTranslations';
import { cn } from '@/lib/utils';

interface DownloadsTabProps {
  language: Language;
  t: any;
  downloadedIds: string[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void | Promise<void>;
  onToggleDownload: (technique: SurvivalTechnique) => void | Promise<void>;
  onTechniqueClick: (technique: SurvivalTechnique) => void;
  techniques: SurvivalTechnique[];
  offlineContent: Record<string, SurvivalTechnique>;
}

export function DownloadsTab({ 
  language, 
  t, 
  downloadedIds, 
  onToggleDownload,
  onTechniqueClick,
  techniques,
  offlineContent
}: DownloadsTabProps) {
  const downloadedTechniques = useMemo(() => {
    return downloadedIds.map(id => {
      return offlineContent[id] || techniques.find(t => t.id === id);
    }).filter((t): t is SurvivalTechnique => !!t);
  }, [downloadedIds, offlineContent, techniques]);

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'shelter': return { icon: House, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' };
      case 'water': return { icon: Drop, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
      case 'fire': return { icon: Fire, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' };
      case 'food': return { icon: ForkKnife, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' };
      case 'navigation': return { icon: Compass, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' };
      case 'first-aid': return { icon: FirstAid, color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20' };
      case 'signaling': return { icon: Megaphone, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
      default: return { icon: DownloadSimple, color: 'text-gray-500', bg: 'bg-gray-500/10', border: 'border-gray-500/20' };
    }
  };

  return (
    <div className="space-y-8 pt-12 pb-32 px-4 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t.downloads.title}</h2>
        <p className="text-muted-foreground text-lg">{t.downloads.subtitle}</p>
      </div>

      {downloadedTechniques.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-muted/30 rounded-3xl border border-dashed border-muted-foreground/25">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center animate-pulse">
            <DownloadSimple className="w-10 h-10 text-muted-foreground" weight="duotone" />
          </div>
          <div className="space-y-2 max-w-md">
            <h3 className="text-xl font-semibold">
              {t.downloads.noDownloadsTitle}
            </h3>
            <p className="text-muted-foreground">
              {t.downloads.noDownloadsDesc}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {downloadedTechniques.map((technique) => {
            const { icon: Icon, color, bg, border } = getCategoryStyle(technique.category);
            const translation = techniqueTranslations[technique.id]?.[language];
            const title = translation?.title || technique.title;
            const categoryName = t.categories[technique.category];

            return (
              <Card 
                key={technique.id}
                className={cn(
                  "group relative overflow-hidden transition-all hover:shadow-md hover:border-primary/50 cursor-pointer flex flex-col",
                  border
                )}
                onClick={() => onTechniqueClick(technique)}
              >
                <div className={cn("absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 rounded-full opacity-20 blur-xl transition-all group-hover:opacity-30", bg.replace('/10', '/40'))} />
                
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <div className={cn("p-2.5 rounded-xl w-fit", bg)}>
                      <Icon weight="fill" className={cn("w-6 h-6", color)} />
                    </div>
                    <Badge variant="outline" className="capitalize font-normal bg-background/50 backdrop-blur-sm">
                      {categoryName}
                    </Badge>
                  </div>
                  <div className="space-y-1 pt-2">
                    <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 pb-4">
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    {technique.timeRequired && (
                      <div className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-md">
                        <Clock size={14} />
                        <span>{technique.timeRequired}</span>
                      </div>
                    )}
                    {technique.difficulty && (
                      <div className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-md">
                        <Barbell size={14} />
                        <span className="capitalize">{technique.difficulty}</span>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="pt-0 gap-2">
                  <Button 
                    className="flex-1 gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                    variant="ghost"
                  >
                    <BookOpen size={16} />
                    {t.common?.read || "Lire"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleDownload(technique);
                    }}
                  >
                    <Trash size={18} />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
