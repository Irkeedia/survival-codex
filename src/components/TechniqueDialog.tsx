import { SurvivalTechnique, User } from '@/lib/types';
import { Language, translations } from '@/lib/translations';
import { techniqueTranslations } from '@/lib/techniqueTranslations';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, Warning, Lightbulb, DownloadSimple, Crown } from '@phosphor-icons/react';
import { categoryColors } from '@/lib/data';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TechniqueDialogProps {
  technique: SurvivalTechnique | null;
  language: Language;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isDownloaded?: boolean;
  onToggleDownload?: (id: string) => void;
  user: User | null;
  onUpgradeClick: () => void;
}

export function TechniqueDialog({ 
  technique, 
  language, 
  open, 
  onOpenChange, 
  isDownloaded = false, 
  onToggleDownload,
  user,
  onUpgradeClick,
}: TechniqueDialogProps) {
  if (!technique) return null;

  const t = translations[language];
  const translation = techniqueTranslations[technique.id]?.[language];
  
  const title = translation?.title || technique.title;
  const description = translation?.description || technique.description;
  const steps = translation?.steps || technique.steps;
  const warnings = translation?.warnings || technique.warnings;
  const tips = translation?.tips || technique.tips;

  const canDownload = user?.subscriptionTier === 'premium';

  const handleToggleDownload = () => {
    if (!user) {
      toast.error(t.auth.signIn);
      return;
    }

    if (!canDownload) {
      toast.error(t.subscription.upgradeRequired, {
        description: t.subscription.upgradeMessage,
      });
      onUpgradeClick();
      return;
    }

    if (onToggleDownload) {
      onToggleDownload(technique.id);
      if (isDownloaded) {
        toast.success(t.downloads.removeDownload);
      } else {
        toast.success(t.downloads.downloaded);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-screen h-screen max-w-full max-h-full bg-card/95 backdrop-blur-xl border-0 p-0 rounded-none flex flex-col overflow-hidden">
        <div className="p-4 sm:p-6 pt-12 sm:pt-6 flex-shrink-0">
          <DialogHeader>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-3">
              <div className="flex items-start gap-1.5 sm:gap-2 flex-wrap">
                <Badge 
                  variant="outline" 
                  className={cn("text-xs backdrop-blur-sm", categoryColors[technique.category])}
                >
                  {t.categories[technique.category]}
                </Badge>
                <Badge 
                  variant="secondary" 
                  className="text-xs capitalize backdrop-blur-sm"
                >
                  {t.difficulty[technique.difficulty]}
                </Badge>
                {technique.timeRequired && (
                  <Badge variant="outline" className="text-xs flex items-center gap-1 backdrop-blur-sm">
                    <Clock className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{technique.timeRequired}</span>
                  </Badge>
                )}
              </div>
              {onToggleDownload && (
                <Button
                  variant={isDownloaded ? 'secondary' : 'default'}
                  size="sm"
                  className={cn(
                    "gap-2 flex-shrink-0 w-full sm:w-auto touch-manipulation h-9 sm:h-8",
                    !canDownload && "bg-accent text-accent-foreground hover:bg-accent/90"
                  )}
                  onClick={handleToggleDownload}
                >
                  {!canDownload ? (
                    <>
                      <Crown className="w-4 h-4 flex-shrink-0" weight="fill" />
                      <span className="text-sm">{t.subscription.premium}</span>
                    </>
                  ) : (
                    <>
                      <DownloadSimple 
                        className="w-4 h-4 flex-shrink-0" 
                        weight={isDownloaded ? 'fill' : 'regular'} 
                      />
                      <span className="text-sm truncate">{isDownloaded ? t.downloads.removeDownload : t.downloads.downloadTechnique}</span>
                    </>
                  )}
                </Button>
              )}
            </div>
            <DialogTitle className="text-xl sm:text-2xl leading-tight">{title}</DialogTitle>
            <DialogDescription className="text-sm sm:text-base leading-relaxed">
              {description}
            </DialogDescription>
          </DialogHeader>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-5 sm:space-y-6">
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-3">{t.steps}</h3>
              <ol className="space-y-3 sm:space-y-4">
                {steps.map((step, index) => (
                  <li key={index} className="flex gap-2.5 sm:gap-3">
                    <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sm sm:text-base leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {warnings && warnings.length > 0 && (
              <>
                <Separator className="bg-border/50" />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Warning className="w-5 h-5 text-destructive flex-shrink-0" weight="fill" />
                    <h3 className="font-semibold text-base sm:text-lg">{t.warnings}</h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {warnings.map((warning, index) => (
                      <li key={index} className="flex gap-2 sm:gap-2.5">
                        <span className="text-destructive mt-1 flex-shrink-0">•</span>
                        <span className="text-sm sm:text-base leading-relaxed">{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {tips && tips.length > 0 && (
              <>
                <Separator className="bg-border/50" />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-accent flex-shrink-0" weight="fill" />
                    <h3 className="font-semibold text-base sm:text-lg">{t.tips}</h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {tips.map((tip, index) => (
                      <li key={index} className="flex gap-2 sm:gap-2.5">
                        <span className="text-accent mt-1 flex-shrink-0">•</span>
                        <span className="text-sm sm:text-base leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
