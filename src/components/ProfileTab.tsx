import { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Crown, User, SignOut, Globe, CaretRight, ArrowLeft, SignIn, Gear, Camera } from '@phosphor-icons/react';
import { Language, languageNames } from '@/lib/translations';
import { User as UserType } from '@/lib/types';
import { PlansTab } from '@/components/PlansTab';
import { SettingsTab } from '@/components/SettingsTab';
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
  bookmarksCount: number;
  downloadsCount: number;
  onLanguageChange: (lang: Language) => void;
  onSignOut: () => void;
  onSignIn: () => void;
  onUpgradeToPremium: () => void;
  onClearBookmarks: () => void;
  onClearDownloads: () => void;
  onClearAllData: () => void;
  onAvatarChange: (url: string) => void;
}

export function ProfileTab({
  user,
  t,
  language,
  bookmarksCount,
  downloadsCount,
  onLanguageChange,
  onSignOut,
  onSignIn,
  onUpgradeToPremium,
  onClearBookmarks,
  onClearDownloads,
  onClearAllData,
  onAvatarChange,
}: ProfileTabProps) {
  const [view, setView] = useState<'menu' | 'plans' | 'settings'>('menu');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const handleAvatarClick = () => {
    if (user) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onAvatarChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

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

  if (view === 'settings') {
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
        <SettingsTab
          language={language}
          t={t}
          bookmarksCount={bookmarksCount}
          downloadsCount={downloadsCount}
          user={user}
          onLanguageChange={onLanguageChange}
          onClearBookmarks={onClearBookmarks}
          onClearDownloads={onClearDownloads}
          onClearAllData={onClearAllData}
          onSignOut={onSignOut}
          onUpgradeClick={() => setView('plans')}
          onAvatarChange={onAvatarChange}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-left duration-300 pt-12 pb-24">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center space-y-4 pt-4">
        <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
          <Avatar className="w-24 h-24 border-4 border-card shadow-xl transition-transform group-hover:scale-105">
            <AvatarImage src={user?.avatarUrl || undefined} alt={user?.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
              {user ? getInitials(user.name) : <User weight="bold" />}
            </AvatarFallback>
          </Avatar>
          {user && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-8 h-8 text-white" weight="fill" />
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        
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
            <button 
              onClick={() => setView('plans')} 
              className="text-primary text-sm hover:underline font-medium"
            >
              {t.auth.signIn}
            </button>
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

          {/* Settings Item */}
          <button
            onClick={() => setView('settings')}
            className="w-full flex items-center justify-between p-4 hover:bg-accent/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Gear className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-medium">{t.tabs.settings}</p>
                <p className="text-xs text-muted-foreground">{t.settings.subtitle}</p>
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

