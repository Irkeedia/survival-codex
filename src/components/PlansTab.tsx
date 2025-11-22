import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Translations } from '@/lib/translations';
import { User } from '@/lib/types';
import { Check, Crown, CreditCard, GoogleLogo, Sparkle } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { useBilling } from '@/hooks/useBilling';
import { cn } from '@/lib/utils';

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
    t.subscription.limitedAI,
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
    <div className="max-w-5xl mx-auto space-y-8 pb-32">
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-amber-500 to-primary bg-clip-text text-transparent animate-gradient-x">
          {t.subscription.choosePlan}
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
          {t.subscription.upgradeMessage}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start relative">
        {/* Free Plan Card */}
        <Card className="relative p-6 sm:p-8 space-y-6 bg-card/30 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:z-10">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground/80">{t.subscription.freePlan}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">€0</span>
              <span className="text-muted-foreground text-sm">{t.subscription.perMonth}</span>
            </div>
          </div>

          <Separator className="bg-border/30" />

          <ul className="space-y-4">
            {freePlanFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 group">
                <div className="p-1 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Check size={14} weight="bold" />
                </div>
                <span className="text-foreground/70 text-sm sm:text-base">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4">
            {user?.subscriptionTier === 'free' ? (
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full bg-muted/50 text-muted-foreground hover:bg-muted/60" 
                disabled
              >
                {t.subscription.currentPlan}
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors" 
                onClick={handleFreeSignUp}
              >
                {user ? t.subscription.currentPlan : t.auth.signUp}
              </Button>
            )}
          </div>
        </Card>

        {/* Premium Plan Card */}
        <div className="relative group">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/20 flex items-center gap-1.5">
              <Sparkle weight="fill" className="w-3 h-3" />
              {t.subscription.popularPlan}
            </div>
          </div>

          <Card className="relative z-10 p-6 sm:p-8 space-y-6 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-900/90 backdrop-blur-xl border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 shadow-2xl shadow-amber-500/10 hover:-translate-y-1 hover:z-20 overflow-hidden">
            {/* Decorative background effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            
            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-2 text-amber-500">
                <Crown size={28} weight="fill" className="drop-shadow-lg" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">{t.subscription.premiumPlan}</h3>
              </div>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-5xl font-bold tracking-tight">€9.99</span>
                <span className="text-white/60 text-sm">{t.subscription.perMonth}</span>
              </div>
            </div>

            <Separator className="bg-white/10" />

            <ul className="space-y-4 relative z-10">
              {premiumPlanFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <div className="p-1 rounded-full bg-amber-500/20 text-amber-500 group-hover:bg-amber-500/30 transition-colors shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                    <Check size={14} weight="bold" />
                  </div>
                  <span className="text-white/90 text-sm sm:text-base font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 relative z-10">
              {user?.subscriptionTier === 'premium' ? (
                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-md" 
                    disabled
                  >
                    <Crown size={20} weight="fill" className="mr-2 text-amber-500" />
                    {t.subscription.currentPlan}
                  </Button>
                  {user.subscriptionExpiryDate && (
                    <p className="text-center text-xs text-white/40">
                      {t.subscription.activeUntil}: {new Date(user.subscriptionExpiryDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/5">
                    <p className="text-xs font-semibold text-center text-white/60 uppercase tracking-wider">
                      {t.subscription.paymentMethod}
                    </p>
                    
                    <div className="grid gap-2">
                      <Button
                        variant="ghost"
                        size="lg"
                        className={cn(
                          "w-full justify-start gap-3 text-sm h-12 transition-all duration-200",
                          selectedPayment === 'card' 
                            ? "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20" 
                            : "bg-white/5 text-white hover:bg-white/10 hover:text-white"
                        )}
                        onClick={() => setSelectedPayment('card')}
                      >
                        <CreditCard size={20} className="flex-shrink-0" />
                        <span className="truncate font-medium">{t.subscription.payWithCard}</span>
                        {selectedPayment === 'card' && <Check weight="bold" className="ml-auto" />}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="lg"
                        className={cn(
                          "w-full justify-start gap-3 text-sm h-12 transition-all duration-200",
                          selectedPayment === 'paypal' 
                            ? "bg-[#0070BA] text-white hover:bg-[#005ea6] shadow-lg shadow-blue-500/20" 
                            : "bg-white/5 text-white hover:bg-white/10 hover:text-white"
                        )}
                        onClick={() => setSelectedPayment('paypal')}
                      >
                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 0 1-.794.679H7.72a.483.483 0 0 1-.477-.558L7.418 21h1.518l.95-6.02h1.385c4.678 0 7.75-2.203 8.796-6.502z"/>
                          <path d="M2.197 21.99a.483.483 0 0 1-.474-.558L4.184 4.43a.966.966 0 0 1 .953-.806h6.283c2.024 0 3.558.417 4.556 1.24.44.363.752.79.96 1.254a5.478 5.478 0 0 1 .485 1.503c.011.095.02.193.028.291.007.098.013.198.017.297L17.467 8.209c.003.092.005.186.005.28 0 2.012-.76 3.568-2.301 4.672-1.425 1.021-3.453 1.547-6.05 1.547h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 0 1-.794.679H2.197z"/>
                        </svg>
                        <span className="truncate font-medium">{t.subscription.payWithPaypal}</span>
                        {selectedPayment === 'paypal' && <Check weight="bold" className="ml-auto" />}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="lg"
                        className={cn(
                          "w-full justify-start gap-3 text-sm h-12 transition-all duration-200",
                          selectedPayment === 'google' 
                            ? "bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10" 
                            : "bg-white/5 text-white hover:bg-white/10 hover:text-white"
                        )}
                        onClick={() => setSelectedPayment('google')}
                        disabled={!billingAvailable}
                        title={!billingAvailable ? t.subscription.billingUnavailable : undefined}
                      >
                        <GoogleLogo size={20} className="flex-shrink-0" />
                        <span className="truncate font-medium">{t.subscription.payWithGoogle}</span>
                        {selectedPayment === 'google' && <Check weight="bold" className="ml-auto" />}
                      </Button>
                    </div>
                  </div>

                  {selectedPayment === 'google' && (
                    <div className="space-y-2">
                      {!billingAvailable ? (
                        <p className="text-xs sm:text-sm text-red-400 text-center">
                          {t.subscription.billingUnavailable}
                        </p>
                      ) : (
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full flex items-center justify-center gap-2 border-white/20 text-white hover:bg-white/10 hover:text-white"
                          onClick={handleRestore}
                          disabled={isProcessing || syncingPurchases}
                        >
                          {syncingPurchases ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                    className={cn(
                      "w-full h-14 text-lg font-bold transition-all duration-300 shadow-lg",
                      selectedPayment 
                        ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02]" 
                        : "bg-white/10 text-white/50 cursor-not-allowed"
                    )}
                    onClick={handlePremiumPayment}
                    disabled={isProcessing || !selectedPayment}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        <span className="truncate">{t.subscription.processingPayment}</span>
                      </>
                    ) : (
                      <>
                        <Crown size={24} weight="fill" className="mr-2" />
                        <span className="truncate">{t.subscription.subscribeNow}</span>
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
