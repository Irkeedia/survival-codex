import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Language, languageNames } from '@/lib/translations';
import { Globe, Trash, Database } from '@phosphor-icons/react';
import { LanguageSelector } from '@/components/LanguageSelector';
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
  onLanguageChange: (lang: Language) => void;
  onClearBookmarks: () => void;
  onClearDownloads: () => void;
  onClearAllData: () => void;
}

export function SettingsTab({ 
  language, 
  t, 
  bookmarksCount,
  downloadsCount,
  onLanguageChange,
  onClearBookmarks,
  onClearDownloads,
  onClearAllData
}: SettingsTabProps) {
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

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t.settings.title}</h2>
        <p className="text-muted-foreground">{t.settings.subtitle}</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <CardTitle>{t.settings.language}</CardTitle>
          </div>
          <CardDescription>{t.settings.languageDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <LanguageSelector 
            language={language} 
            onLanguageChange={onLanguageChange} 
          />
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
          <div className="flex items-center justify-between">
            <div>
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
                  className="gap-2"
                  disabled={bookmarksCount === 0}
                >
                  <Trash className="w-4 h-4" />
                  {t.settings.clearBookmarks}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-card/95 backdrop-blur-xl border-border/50">
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

          <div className="flex items-center justify-between">
            <div>
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
                  className="gap-2"
                  disabled={downloadsCount === 0}
                >
                  <Trash className="w-4 h-4" />
                  {t.settings.clearDownloads}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-card/95 backdrop-blur-xl border-border/50">
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
            <AlertDialogContent className="bg-card/95 backdrop-blur-xl border-border/50">
              <AlertDialogHeader>
                <AlertDialogTitle>{t.settings.confirmClear}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t.settings.confirmClearAll}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleClearAllData}
                  className="bg-destructive text-destructive-foreground"
                >
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
