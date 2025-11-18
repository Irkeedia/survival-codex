import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Translations } from '@/lib/translations';
import { useSupabase } from '@/hooks/useSupabase';
import { GoogleLogo } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  t: Translations;
}

export function AuthDialog({ open, onOpenChange, t }: AuthDialogProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, isSupabaseReady } = useSupabase();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || (isSignUp && !name)) {
      return;
    }

    setIsSubmitting(true);

    const action = isSignUp
      ? () => signUpWithEmail({ email, password, name })
      : () => signInWithEmail({ email, password });

    action()
      .then(() => {
        toast.success(t.auth.signInSuccess);
        onOpenChange(false);
        setEmail('');
        setPassword('');
        setName('');
      })
      .catch((error) => {
        console.error('Authentication failed', error);
        toast.error(error?.message || 'Authentication failed');
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
      toast.success(t.auth.signInSuccess);
      onOpenChange(false);
    } catch (error) {
      console.error('Google sign-in failed', error);
      toast.error('Unable to sign in with Google');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">
            {isSignUp ? t.auth.createAccount : t.auth.welcomeBack}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {isSignUp ? t.auth.noAccount : t.auth.alreadyHaveAccount}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full gap-3 h-11 touch-manipulation"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
          >
            <GoogleLogo size={20} weight="bold" className="flex-shrink-0" />
            <span className="truncate text-sm sm:text-base">{t.auth.continueWithGoogle}</span>
          </Button>

          <div className="relative">
            <Separator className="my-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-card px-2 text-xs text-muted-foreground">
                {t.auth.orContinueWith}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm">{t.auth.name}</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignUp}
                  placeholder={t.auth.name}
                  className="h-11 text-base"
                  disabled={isSubmitting}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">{t.auth.email}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t.auth.email}
                className="h-11 text-base"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm">{t.auth.password}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={t.auth.password}
                className="h-11 text-base"
                disabled={isSubmitting}
              />
            </div>
            
            <Button type="submit" className="w-full h-11 touch-manipulation text-sm sm:text-base" disabled={isSubmitting}>
              {isSignUp ? t.auth.signUp : t.auth.signIn}
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              className="w-full h-10 touch-manipulation text-sm"
              onClick={() => setIsSignUp(!isSignUp)}
              disabled={isSubmitting}
            >
              {isSignUp ? t.auth.alreadyHaveAccount : t.auth.noAccount}
            </Button>
          </form>
          {!isSupabaseReady && (
            <p className="text-xs text-muted-foreground text-center">
              Supabase is not configured yet. The demo account will be stored locally.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
