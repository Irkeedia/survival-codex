import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Translations } from '@/lib/translations';
import { User } from '@/lib/types';
import { Check, Crown, CreditCard, GoogleLogo } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { useBilling } from '@/hooks/useBilling';

interface PlansTabProps {
  t: Translations;
  user: User | null;
  onSignUpClick: () => void;
  onUpgradeToPremium: () => void;
}

type PaymentMethod = 'card' | 'paypal' | 'google' | null;

export function PlansTab({ t, user, onSignUpClick, onUpgradeToPremium }: PlansTabProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    billingAvailable,
    isReady,
    isInitializing,
    purchaseSubscription,
    restorePurchases,
    initializeBilling,
    syncingPurchases,
  } = useBilling(user);

  const freePlanFeatures = [
    t.subscription.basicContent,
    t.subscription.limitedDownloads,
    t.subscription.communitySupport,
  ];

  const premiumPlanFeatures = [
    t.subscription.unlimitedDownloads,
    t.subscription.aiAssistant,
    t.subscription.offlineAccess,
  ];

  const handlePremiumPayment = async () => {
    if (!user) {
      toast.error(t.auth.signIn);
      onSignUpClick();
      return;
    }

    if (!selectedPayment) {
      toast.error(t.subscription.paymentMethod);
      return;
    }

    setIsProcessing(true);
    try {
      if (selectedPayment === 'google') {
        if (!billingAvailable) {
          toast.error(t.subscription.billingUnavailable);
          return;
        }

        if (!isReady && !isInitializing) {
          const initialized = await initializeBilling();
          if (!initialized) {
            toast.error(t.subscription.billingUnavailable);
            return;
          }
        }

        await purchaseSubscription();
      } else {
        await new Promise(resolve => setTimeout(resolve, 2000));
        onUpgradeToPremium();
      }

      toast.success(t.subscription.paymentSuccess);
      setSelectedPayment(null);
    } catch (error) {
      console.error('Premium payment failed', error);
      toast.error(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRestore = async () => {
    if (!user) {
      toast.error(t.auth.signIn);
      onSignUpClick();
      return;
    }

    if (!billingAvailable) {
      toast.error(t.subscription.billingUnavailable);
      return;
    }

    setIsProcessing(true);
    try {
      await restorePurchases();
      toast.success(t.subscription.restoreSuccess);
    } catch (error) {
      console.error('Failed to restore purchases', error);
      toast.error(error instanceof Error ? error.message : 'Restore failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFreeSignUp = () => {
    if (user && user.subscriptionTier === 'free') {
      toast.info(t.subscription.currentPlan);
      return;
    }
    onSignUpClick();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
      <div className="text-center space-y-2 sm:space-y-3">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          {t.subscription.choosePlan}
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg">
          {t.subscription.upgradeMessage}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        <Card className="relative p-6 sm:p-8 space-y-4 sm:space-y-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold">{t.subscription.freePlan}</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold">€0</span>
              <span className="text-muted-foreground">{t.subscription.perMonth}</span>
            </div>
          </div>

          <Separator className="bg-border/50" />

          <ul className="space-y-3 sm:space-y-4">
            {freePlanFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="text-primary mt-0.5 flex-shrink-0" size={20} weight="bold" />
                <span className="text-foreground/80 text-sm sm:text-base">{feature}</span>
              </li>
            ))}
          </ul>

          {user?.subscriptionTier === 'free' ? (
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full" 
              disabled
            >
              {t.subscription.currentPlan}
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full" 
              onClick={handleFreeSignUp}
            >
              {user ? t.subscription.currentPlan : t.auth.signUp}
            </Button>
          )}
        </Card>

        <Card className="relative p-6 sm:p-8 space-y-4 sm:space-y-6 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 backdrop-blur-sm border-primary/50 hover:border-primary transition-all shadow-lg shadow-primary/10">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="bg-accent text-accent-foreground px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
              {t.subscription.popularPlan}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Crown className="text-accent" size={24} weight="fill" />
              <h3 className="text-xl sm:text-2xl font-bold">{t.subscription.premiumPlan}</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold">€9.99</span>
              <span className="text-muted-foreground">{t.subscription.perMonth}</span>
            </div>
          </div>

          <Separator className="bg-primary/20" />

          <ul className="space-y-3 sm:space-y-4">
            {premiumPlanFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="text-accent mt-0.5 flex-shrink-0" size={20} weight="bold" />
                <span className="text-foreground text-sm sm:text-base">{feature}</span>
              </li>
            ))}
          </ul>

          {user?.subscriptionTier === 'premium' ? (
            <div className="space-y-3 sm:space-y-4">
              <Button 
                size="lg" 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90" 
                disabled
              >
                <Crown size={20} weight="fill" />
                {t.subscription.currentPlan}
              </Button>
              {user.subscriptionExpiryDate && (
                <p className="text-center text-xs sm:text-sm text-muted-foreground">
                  {t.subscription.activeUntil}: {new Date(user.subscriptionExpiryDate).toLocaleDateString()}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-3">
                <p className="text-xs sm:text-sm font-semibold text-center text-muted-foreground">
                  {t.subscription.paymentMethod}
                </p>
                
                <div className="grid gap-2">
                  <Button
                    variant={selectedPayment === 'card' ? 'default' : 'outline'}
                    size="lg"
                    className="w-full justify-start gap-3 text-sm sm:text-base"
                    onClick={() => setSelectedPayment('card')}
                  >
                    <CreditCard size={18} className="flex-shrink-0" />
                    <span className="truncate">{t.subscription.payWithCard}</span>
                  </Button>
                  
                  <Button
                    variant={selectedPayment === 'paypal' ? 'default' : 'outline'}
                    size="lg"
                    className="w-full justify-start gap-3 text-sm sm:text-base"
                    onClick={() => setSelectedPayment('paypal')}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 0 1-.794.679H7.72a.483.483 0 0 1-.477-.558L7.418 21h1.518l.95-6.02h1.385c4.678 0 7.75-2.203 8.796-6.502z"/>
                      <path d="M2.197 21.99a.483.483 0 0 1-.474-.558L4.184 4.43a.966.966 0 0 1 .953-.806h6.283c2.024 0 3.558.417 4.556 1.24.44.363.752.79.96 1.254a5.478 5.478 0 0 1 .485 1.503c.011.095.02.193.028.291.007.098.013.198.017.297L17.467 8.209c.003.092.005.186.005.28 0 2.012-.76 3.568-2.301 4.672-1.425 1.021-3.453 1.547-6.05 1.547h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 0 1-.794.679H2.197z"/>
                    </svg>
                    <span className="truncate">{t.subscription.payWithPaypal}</span>
                  </Button>
                  
                  <Button
                    variant={selectedPayment === 'google' ? 'default' : 'outline'}
                    size="lg"
                    className="w-full justify-start gap-3 text-sm sm:text-base"
                    onClick={() => setSelectedPayment('google')}
                    disabled={!billingAvailable}
                    title={!billingAvailable ? t.subscription.billingUnavailable : undefined}
                  >
                    <GoogleLogo size={18} className="flex-shrink-0" />
                    <span className="truncate">{t.subscription.payWithGoogle}</span>
                  </Button>
                </div>
              </div>

              {selectedPayment === 'google' && (
                <div className="space-y-2">
                  {!billingAvailable ? (
                    <p className="text-xs sm:text-sm text-destructive">
                      {t.subscription.billingUnavailable}
                    </p>
                  ) : (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={handleRestore}
                      disabled={isProcessing || syncingPurchases}
                    >
                      {syncingPurchases ? (
                        <>
                          <div className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                          <span className="truncate">{t.subscription.restoringPurchases}</span>
                        </>
                      ) : (
                        <span className="truncate">{t.subscription.restorePurchases}</span>
                      )}
                    </Button>
                  )}
                </div>
              )}

              <Button 
                size="lg" 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={handlePremiumPayment}
                disabled={isProcessing || !selectedPayment}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    <span className="truncate">{t.subscription.processingPayment}</span>
                  </>
                ) : (
                  <>
                    <Crown size={20} weight="fill" />
                    <span className="truncate">{t.subscription.subscribeNow}</span>
                  </>
                )}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
