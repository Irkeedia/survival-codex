import { SurvivalTechnique } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, Warning, Lightbulb } from '@phosphor-icons/react';
import { categoryColors, categoryLabels } from '@/lib/data';
import { cn } from '@/lib/utils';

interface TechniqueDialogProps {
  technique: SurvivalTechnique | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TechniqueDialog({ technique, open, onOpenChange }: TechniqueDialogProps) {
  if (!technique) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <div className="flex items-start gap-2 mb-2">
            <Badge 
              variant="outline" 
              className={cn("text-xs", categoryColors[technique.category])}
            >
              {categoryLabels[technique.category]}
            </Badge>
            <Badge 
              variant="secondary" 
              className="text-xs capitalize"
            >
              {technique.difficulty}
            </Badge>
            {technique.timeRequired && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {technique.timeRequired}
              </Badge>
            )}
          </div>
          <DialogTitle className="text-2xl">{technique.title}</DialogTitle>
          <DialogDescription className="text-base">
            {technique.description}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(85vh-180px)] pr-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Steps</h3>
              <ol className="space-y-3">
                {technique.steps.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {technique.warnings && technique.warnings.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Warning className="w-5 h-5 text-destructive" weight="fill" />
                    <h3 className="font-semibold text-lg">Warnings</h3>
                  </div>
                  <ul className="space-y-2">
                    {technique.warnings.map((warning, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-destructive mt-1">•</span>
                        <span className="text-sm leading-relaxed">{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {technique.tips && technique.tips.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-accent" weight="fill" />
                    <h3 className="font-semibold text-lg">Tips</h3>
                  </div>
                  <ul className="space-y-2">
                    {technique.tips.map((tip, index) => (
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
