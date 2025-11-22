import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Crown, User, SignOut, Globe, CaretRight, ArrowLeft, SignIn } from '@phosphor-icons/react';
import { Language, languageNames } from '@/lib/translations';
import { User as UserType } from '@/lib/types';
import { PlansTab } from '@/components/PlansTab';
import { LanguageSelector } from '@/components/LanguageSelector';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileTabProps {
  user: UserType | null;
  t: any;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onSignOut: () => void;
  onSignIn: () => void;
  onUpgradeToPremium: () => void;
}

export function ProfileTab({
  user,
  t,
  language,
  onLanguageChange,
  onSignOut,
  onSignIn,
  onUpgradeToPremium,
}: ProfileTabProps) {
  const [view, setView] = useState<'menu' | 'plans'>('menu');

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  if (view === 'plans') {
    return (
      <div className="space-y-4 animate-in slide-in-from-right duration-300 pt-12 pb-24">
        <Button 
          variant="ghost" 
          onClick={() => setView('menu')}
          className="gap-2 pl-0 hover:bg-transparent hover:text-primary"
        >
          <ArrowLeft className="w-5 h-5" />
          {t.settings.account}
        </Button>
        <PlansTab 
          t={t} 
          user={user} 
          onSignUpClick={onSignIn} 
          onUpgradeToPremium={onUpgradeToPremium} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-left duration-300 pt-12 pb-24">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center space-y-4 pt-4">
        <Avatar className="w-24 h-24 border-4 border-card shadow-xl">
          <AvatarImage src={user?.avatarUrl || undefined} alt={user?.name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
            {user ? getInitials(user.name) : <User weight="bold" />}
          </AvatarFallback>
        </Avatar>
        
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold">
            {user ? user.name : t.auth.noAccount}
          </h2>
          {user ? (
            <Badge variant={user.subscriptionTier === 'premium' ? 'default' : 'secondary'} className="mt-1">
              {user.subscriptionTier === 'premium' ? (
                <span className="flex items-center gap-1">
                  <Crown weight="fill" className="w-3 h-3 text-amber-400" />
                  {t.subscription.premium}
                </span>
              ) : (
                t.subscription.free
              )}
            </Badge>
          ) : (
            <p className="text-muted-foreground text-sm">{t.auth.signIn}</p>
          )}
        </div>
      </div>

      {/* Menu List */}
      <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="divide-y divide-border/50">
          {/* Plan Item */}
          <button
            onClick={() => setView('plans')}
            className="w-full flex items-center justify-between p-4 hover:bg-accent/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Crown className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-medium">{t.subscription.yourPlan}</p>
                <p className="text-xs text-muted-foreground">
                  {user?.subscriptionTier === 'premium' ? t.subscription.premium : t.subscription.free}
                </p>
              </div>
            </div>
            <CaretRight className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Language Item */}
          <div className="w-full flex items-center justify-between p-4 hover:bg-accent/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
                <Globe className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-medium">{t.settings.language}</p>
                <p className="text-xs text-muted-foreground">{languageNames[language]}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  {language.toUpperCase()}
                  <CaretRight className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Object.entries(languageNames).map(([code, name]) => (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => onLanguageChange(code as Language)}
                    className="justify-between"
                  >
                    {name}
                    {language === code && <Crown className="w-3 h-3 opacity-0" />} {/* Spacer */}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Auth Item */}
          {user ? (
            <button
              onClick={onSignOut}
              className="w-full flex items-center justify-between p-4 hover:bg-red-500/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-red-500/10 text-red-500 group-hover:bg-red-500/20 transition-colors">
                  <SignOut className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-red-500">{t.auth.signOut}</p>
                </div>
              </div>
            </button>
          ) : (
            <button
              onClick={onSignIn}
              className="w-full flex items-center justify-between p-4 hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <SignIn className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{t.auth.signIn}</p>
                </div>
              </div>
              <CaretRight className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
