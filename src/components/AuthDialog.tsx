import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Translations } from '@/lib/translations';
import { User } from '@/lib/types';
import { GoogleLogo } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignIn: (user: User) => void;
  t: Translations;
}

export function AuthDialog({ open, onOpenChange, onSignIn, t }: AuthDialogProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || (isSignUp && !name)) {
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      email,
      name: isSignUp ? name : email.split('@')[0],
      subscriptionTier: 'free',
    };

    onSignIn(user);
    toast.success(t.auth.signInSuccess);
    onOpenChange(false);
    
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleGoogleSignIn = () => {
    const user: User = {
      id: Date.now().toString(),
      email: 'user@google.com',
      name: 'Google User',
      subscriptionTier: 'free',
    };

    onSignIn(user);
    toast.success(t.auth.signInSuccess);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isSignUp ? t.auth.createAccount : t.auth.welcomeBack}
          </DialogTitle>
          <DialogDescription>
            {isSignUp ? t.auth.noAccount : t.auth.alreadyHaveAccount}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full gap-3"
            onClick={handleGoogleSignIn}
          >
            <GoogleLogo size={20} weight="bold" />
            {t.auth.continueWithGoogle}
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
                <Label htmlFor="name">{t.auth.name}</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignUp}
                  placeholder={t.auth.name}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">{t.auth.email}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t.auth.email}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t.auth.password}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={t.auth.password}
              />
            </div>
            
            <Button type="submit" className="w-full">
              {isSignUp ? t.auth.signUp : t.auth.signIn}
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? t.auth.alreadyHaveAccount : t.auth.noAccount}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
