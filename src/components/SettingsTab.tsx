import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Language, languageNames } from '@/lib/translations';
import { Globe, Trash, Database, Crown, User, SignOut, Camera, Key } from '@phosphor-icons/react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { User as UserType } from '@/lib/types';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface SettingsTabProps {
  language: Language;
  t: any;
  bookmarksCount: number;
  downloadsCount: number;
  user: UserType | null;
  onLanguageChange: (lang: Language) => void;
  onClearBookmarks: () => void;
  onClearDownloads: () => void;
  onClearAllData: () => void;
  onSignOut: () => void;
  onUpgradeClick: () => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  onAvatarChange: (url: string) => void;
}

export function SettingsTab({
  language,
  t,
  bookmarksCount,
  downloadsCount,
  user,
  onLanguageChange,
  onClearBookmarks,
  onClearDownloads,
  onClearAllData,
  onSignOut,
  onUpgradeClick,
  apiKey,
  onApiKeyChange,
  onAvatarChange,
}: SettingsTabProps) {
  const [avatarUrlInput, setAvatarUrlInput] = useState(user?.avatarUrl || '');
  const [apiKeyInput, setApiKeyInput] = useState(apiKey || '');

  useEffect(() => {
    setAvatarUrlInput(user?.avatarUrl || '');
  }, [user?.avatarUrl]);

  useEffect(() => {
    setApiKeyInput(apiKey || '');
  }, [apiKey]);

  const handleClearBookmarks = () => {
    onClearBookmarks();
    toast.success(t.settings.cleared);
  };

  const handleClearDownloads = () => {
    onClearDownloads();
    toast.success(t.settings.cleared);
  };

  const handleClearAllData = () => {
    onClearAllData();
    toast.success(t.settings.cleared);
  };

  const handleSaveAvatar = () => {
    onAvatarChange(avatarUrlInput);
    toast.success(t.settings.avatarUpdated || 'Avatar updated successfully');
  };

  const handleSaveApiKey = () => {
    onApiKeyChange(apiKeyInput);
    toast.success(t.ai?.apiKeySaved || 'API key saved');
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="space-y-4 sm:space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{t.settings.title}</h2>
        <p className="text-sm sm:text-base text-muted-foreground">{t.settings.subtitle}</p>
      </div>

      {user && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <CardTitle>{t.settings.account}</CardTitle>
            </div>
            <CardDescription>{t.settings.accountDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-primary/20 flex-shrink-0">
                <AvatarImage src={user.avatarUrl || undefined} alt={user.name} />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-lg sm:text-xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 w-full space-y-2">
                <Label htmlFor="avatar-url" className="text-sm font-medium flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  {t.settings.avatarUrl || 'Avatar URL'}
                </Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    id="avatar-url"
                    type="url"
                    value={avatarUrlInput}
                    onChange={(e) => setAvatarUrlInput(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="flex-1"
                  />
                  <Button onClick={handleSaveAvatar} size="sm" className="w-full sm:w-auto">
                    {t.settings.save || 'Save'}
                  </Button>
                </div>
              </div>
            </div>

            <Separator className="bg-border/50" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground break-all">{user.email}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={onSignOut} className="gap-2 w-full sm:w-auto">
                <SignOut className="w-4 h-4" />
                {t.auth.signOut}
              </Button>
            </div>

            <Separator className="bg-border/50" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-medium">{t.subscription.yourPlan}</p>
                <p className="text-sm text-muted-foreground">
                  {user.subscriptionTier === 'premium' ? t.subscription.premium : t.subscription.free}
                </p>
              </div>
              {user.subscriptionTier === 'premium' ? (
                <Badge className="bg-accent text-accent-foreground gap-1 w-fit">
                  <Crown className="w-3 h-3" weight="fill" />
                  {t.subscription.premium}
                </Badge>
              ) : (
                <Button variant="outline" size="sm" onClick={onUpgradeClick} className="gap-2 w-full sm:w-auto">
                  <Crown className="w-4 h-4" />
                  {t.subscription.upgradeToPremium}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <CardTitle>{t.settings.language}</CardTitle>
          </div>
          <CardDescription>{t.settings.languageDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <LanguageSelector language={language} onLanguageChange={onLanguageChange} />
          <p className="text-xs text-muted-foreground mt-2">
            {languageNames[language]} · {t.settings.languageDesc}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            <CardTitle>{t.settings.storage}</CardTitle>
          </div>
          <CardDescription>{t.settings.storageDesc}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1">
              <p className="font-medium">{t.bookmarks}</p>
              <p className="text-sm text-muted-foreground">
                {bookmarksCount} {t.settings.bookmarksCount}
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 w-full sm:w-auto"
                  disabled={bookmarksCount === 0}
                >
                  <Trash className="w-4 h-4" />
                  {t.settings.clearBookmarks}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-card/95 backdrop-blur-xl border-border/50 max-w-[calc(100vw-2rem)] sm:max-w-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle>{t.settings.confirmClear}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t.settings.confirmClearBookmarks}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearBookmarks}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <Separator className="bg-border/50" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1">
              <p className="font-medium">{t.downloads.title}</p>
              <p className="text-sm text-muted-foreground">
                {downloadsCount} {t.settings.downloadsCount}
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 w-full sm:w-auto"
                  disabled={downloadsCount === 0}
                >
                  <Trash className="w-4 h-4" />
                  {t.settings.clearDownloads}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-card/95 backdrop-blur-xl border-border/50 max-w-[calc(100vw-2rem)] sm:max-w-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle>{t.settings.confirmClear}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t.settings.confirmClearDownloads}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearDownloads}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <Separator className="bg-border/50" />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full gap-2"
                disabled={bookmarksCount === 0 && downloadsCount === 0}
              >
                <Trash className="w-4 h-4" />
                {t.settings.clearAllData}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card/95 backdrop-blur-xl border-border/50 max-w-[calc(100vw-2rem)] sm:max-w-lg">
              <AlertDialogHeader>
                <AlertDialogTitle>{t.settings.confirmClear}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t.settings.confirmClearAll}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearAllData} className="bg-destructive text-destructive-foreground">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
