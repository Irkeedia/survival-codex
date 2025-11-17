import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Translations } from '@/lib/translations';
import { Check, Crown } from '@phosphor-icons/react';

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpgrade: () => void;
  t: Translations;
}

export function UpgradeDialog({ open, onOpenChange, onUpgrade, t }: UpgradeDialogProps) {
  const features = [
    t.subscription.unlimitedDownloads,
    t.subscription.aiAssistant,
    t.subscription.offlineAccess,
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Crown className="text-accent" size={32} weight="fill" />
            <DialogTitle className="text-2xl">{t.subscription.upgradeToPremium}</DialogTitle>
          </div>
          <DialogDescription>
            {t.subscription.upgradeMessage}
          </DialogDescription>
        </DialogHeader>
        
        <Card className="p-6 space-y-4 bg-card/50 border-accent/20">
          <h3 className="font-semibold text-lg">{t.subscription.premiumFeatures}</h3>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="text-accent mt-0.5 flex-shrink-0" size={20} weight="bold" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </Card>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.settings.confirmClear}
          </Button>
          <Button 
            onClick={() => {
              onUpgrade();
              onOpenChange(false);
            }}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Crown size={18} weight="fill" />
            {t.subscription.subscribeNow}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
