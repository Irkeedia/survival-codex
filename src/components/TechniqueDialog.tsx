import { SurvivalTechnique, User } from '@/lib/types';
import { Language, translations } from '@/lib/translations';
import { techniqueTranslations } from '@/lib/techniqueTranslations';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Clock, Warning, Lightbulb, DownloadSimple, Crown, Heart, CaretLeft } from '@phosphor-icons/react';
import { categoryColors } from '@/lib/data';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TechniqueDialogProps {
  technique: SurvivalTechnique | null;
  language: Language;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isDownloaded?: boolean;
  onToggleDownload?: (technique: SurvivalTechnique) => void | Promise<void>;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void | Promise<void>;
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
  isBookmarked = false,
  onToggleBookmark,
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

  const handleToggleDownload = async () => {
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
      try {
        await onToggleDownload(technique);
      } catch (error) {
        console.error('Download toggle failed', error);
        toast.error(t.settings.storageDesc);
        return;
      }
      if (isDownloaded) {
        toast.success(t.downloads.removeDownload);
      } else {
        toast.success(t.downloads.downloaded);
      }
    }
  };

  const handleToggleBookmark = async () => {
    if (onToggleBookmark) {
      await onToggleBookmark(technique.id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-screen h-screen max-w-full max-h-full bg-background p-0 rounded-none flex flex-col overflow-hidden border-0 [&>button]:hidden">
        {/* Custom Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50 safe-area-inset-top">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full hover:bg-muted/50"
            onClick={() => onOpenChange(false)}
          >
            <CaretLeft className="w-6 h-6" weight="bold" />
            <span className="sr-only">Close</span>
          </Button>

          <div className="flex items-center gap-2">
            {onToggleBookmark && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full hover:bg-muted/50 transition-colors",
                  isBookmarked && "text-red-500 hover:text-red-600 hover:bg-red-500/10"
                )}
                onClick={handleToggleBookmark}
              >
                <Heart className="w-6 h-6" weight={isBookmarked ? 'fill' : 'regular'} />
              </Button>
            )}
            
            {onToggleDownload && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full hover:bg-muted/50 transition-colors",
                  isDownloaded && "text-primary hover:text-primary hover:bg-primary/10"
                )}
                onClick={handleToggleDownload}
              >
                {canDownload ? (
                  <DownloadSimple className="w-6 h-6" weight={isDownloaded ? 'fill' : 'regular'} />
                ) : (
                  <Crown className="w-6 h-6 text-amber-500" weight="fill" />
                )}
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 pb-24 safe-area-inset-bottom">
            {/* Hero Section */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant="outline" 
                  className={cn("text-xs px-2.5 py-0.5 rounded-full border-0 bg-opacity-10", categoryColors[technique.category])}
                >
                  {t.categories[technique.category]}
                </Badge>
                <Badge 
                  variant="secondary" 
                  className="text-xs capitalize px-2.5 py-0.5 rounded-full bg-muted/50"
                >
                  {t.difficulty[technique.difficulty]}
                </Badge>
                {technique.timeRequired && (
                  <Badge variant="outline" className="text-xs px-2.5 py-0.5 rounded-full border-muted-foreground/20 text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{technique.timeRequired}</span>
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-foreground">
                {title}
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            <Separator className="bg-border/50" />

            {/* Steps Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                {t.steps}
              </h3>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center mt-0.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      {index + 1}
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed text-foreground/90 pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Warnings Section */}
            {warnings && warnings.length > 0 && (
              <div className="rounded-2xl bg-red-500/5 border border-red-500/10 p-6 space-y-4">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <Warning className="w-6 h-6" weight="fill" />
                  <h3 className="font-bold text-lg">{t.warnings}</h3>
                </div>
                <ul className="space-y-3">
                  {warnings.map((warning, index) => (
                    <li key={index} className="flex gap-3 text-red-900/80 dark:text-red-200/80">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                      <span className="text-base leading-relaxed">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tips Section */}
            {tips && tips.length > 0 && (
              <div className="rounded-2xl bg-amber-500/5 border border-amber-500/10 p-6 space-y-4">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <Lightbulb className="w-6 h-6" weight="fill" />
                  <h3 className="font-bold text-lg">{t.tips}</h3>
                </div>
                <ul className="space-y-3">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex gap-3 text-amber-900/80 dark:text-amber-200/80">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                      <span className="text-base leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
