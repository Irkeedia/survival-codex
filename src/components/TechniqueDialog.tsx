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
      <DialogContent className="max-w-2xl max-h-[85vh] bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex items-start gap-2 flex-wrap">
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
                  <Clock className="w-3 h-3" />
                  {technique.timeRequired}
                </Badge>
              )}
            </div>
            {onToggleDownload && (
              <Button
                variant={isDownloaded ? 'secondary' : 'default'}
                size="sm"
                className={cn(
                  "gap-2 flex-shrink-0",
                  !canDownload && "bg-accent text-accent-foreground hover:bg-accent/90"
                )}
                onClick={handleToggleDownload}
              >
                {!canDownload ? (
                  <>
                    <Crown className="w-4 h-4" weight="fill" />
                    {t.subscription.premium}
                  </>
                ) : (
                  <>
                    <DownloadSimple 
                      className="w-4 h-4" 
                      weight={isDownloaded ? 'fill' : 'regular'} 
                    />
                    {isDownloaded ? t.downloads.removeDownload : t.downloads.downloadTechnique}
                  </>
                )}
              </Button>
            )}
          </div>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(85vh-220px)] pr-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">{t.steps}</h3>
              <ol className="space-y-3">
                {steps.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {warnings && warnings.length > 0 && (
              <>
                <Separator className="bg-border/50" />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Warning className="w-5 h-5 text-destructive" weight="fill" />
                    <h3 className="font-semibold text-lg">{t.warnings}</h3>
                  </div>
                  <ul className="space-y-2">
                    {warnings.map((warning, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-destructive mt-1">•</span>
                        <span className="text-sm leading-relaxed">{warning}</span>
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
                    <Lightbulb className="w-5 h-5 text-accent" weight="fill" />
                    <h3 className="font-semibold text-lg">{t.tips}</h3>
                  </div>
                  <ul className="space-y-2">
                    {tips.map((tip, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-sm leading-relaxed">{tip}</span>
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
