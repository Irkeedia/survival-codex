import { useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { HomeTab } from '@/components/HomeTab';
import { DownloadsTab } from '@/components/DownloadsTab';
import { AITab } from '@/components/AITab';
import { PlansTab } from '@/components/PlansTab';
import { SettingsTab } from '@/components/SettingsTab';
import { BottomNav } from '@/components/BottomNav';
import { TechniqueDialog } from '@/components/TechniqueDialog';
import { AuthDialog } from '@/components/AuthDialog';
import { UpgradeDialog } from '@/components/UpgradeDialog';
import { SurvivalTechnique, User } from '@/lib/types';
import { translations, Language } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { SignIn, Crown } from '@phosphor-icons/react';
import { toast } from 'sonner';

type TabType = 'home' | 'downloads' | 'ai' | 'plans' | 'settings';

function App() {
  const [bookmarkedIds, setBookmarkedIds] = useKV<string[]>('bookmarked-techniques', []);
  const [downloadedIds, setDownloadedIds] = useKV<string[]>('downloaded-techniques', []);
  const [language, setLanguage] = useKV<Language>('app-language', 'en');
  const [user, setUser] = useKV<User | null>('current-user', null);
  const [apiKey, setApiKey] = useKV<string>('openai-api-key', '');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedTechnique, setSelectedTechnique] = useState<SurvivalTechnique | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);

  const t = translations[language || 'en'];

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((current) => {
      const currentIds = current || [];
      if (currentIds.includes(id)) {
        return currentIds.filter(bookmarkId => bookmarkId !== id);
      } else {
        return [...currentIds, id];
      }
    });
  };

  const toggleDownload = (id: string) => {
    if (!user) {
      toast.error(t.auth.signIn);
      setAuthDialogOpen(true);
      return;
    }

    if (user.subscriptionTier !== 'premium') {
      setActiveTab('plans');
      return;
    }

    setDownloadedIds((current) => {
      const currentIds = current || [];
      if (currentIds.includes(id)) {
        return currentIds.filter(downloadId => downloadId !== id);
      } else {
        return [...currentIds, id];
      }
    });
  };

  const handleTechniqueClick = (technique: SurvivalTechnique) => {
    setSelectedTechnique(technique);
    setDialogOpen(true);
  };

  const handleClearBookmarks = () => {
    setBookmarkedIds([]);
  };

  const handleClearDownloads = () => {
    setDownloadedIds([]);
  };

  const handleClearAllData = () => {
    setBookmarkedIds([]);
    setDownloadedIds([]);
  };

  const handleSignIn = (newUser: User) => {
    setUser(newUser);
  };

  const handleSignOut = () => {
    setUser(null);
    toast.success(t.auth.signOutSuccess);
  };

  const handleUpgrade = () => {
    if (user) {
      const upgradedUser: User = {
        ...user,
        subscriptionTier: 'premium',
        subscriptionExpiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      };
      setUser(upgradedUser);
      toast.success(t.subscription.paymentSuccess);
    }
  };

  const handleUpgradeClick = () => {
    setActiveTab('plans');
    if (upgradeDialogOpen) {
      setUpgradeDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-10 shadow-lg shadow-primary/5">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {t.appTitle}
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">
                {t.appSubtitle}
              </p>
            </div>
            <div className="flex gap-2">
              {user ? (
                user.subscriptionTier === 'premium' ? (
                  <Button variant="outline" size="sm" className="gap-2">
                    <Crown className="w-4 h-4 text-accent" weight="fill" />
                    {t.subscription.premium}
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={handleUpgradeClick} className="gap-2">
                    <Crown className="w-4 h-4" />
                    {t.subscription.upgradeToPremium}
                  </Button>
                )
              ) : (
                <Button variant="outline" size="sm" onClick={() => setAuthDialogOpen(true)} className="gap-2">
                  <SignIn className="w-4 h-4" />
                  {t.auth.signIn}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <HomeTab
            language={language || 'en'}
            t={t}
            bookmarkedIds={bookmarkedIds || []}
            onToggleBookmark={toggleBookmark}
            onTechniqueClick={handleTechniqueClick}
          />
        )}

        {activeTab === 'downloads' && (
          <DownloadsTab
            language={language || 'en'}
            t={t}
            downloadedIds={downloadedIds || []}
            bookmarkedIds={bookmarkedIds || []}
            onToggleBookmark={toggleBookmark}
            onToggleDownload={toggleDownload}
            onTechniqueClick={handleTechniqueClick}
          />
        )}

        {activeTab === 'ai' && (
          <AITab
            t={t}
            user={user || null}
            onUpgradeClick={handleUpgradeClick}
          />
        )}

        {activeTab === 'plans' && (
          <PlansTab
            t={t}
            user={user || null}
            onSignUpClick={() => setAuthDialogOpen(true)}
            onUpgradeToPremium={handleUpgrade}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsTab
            language={language || 'en'}
            t={t}
            bookmarksCount={bookmarkedIds?.length || 0}
            downloadsCount={downloadedIds?.length || 0}
            user={user || null}
            onLanguageChange={setLanguage}
            onClearBookmarks={handleClearBookmarks}
            onClearDownloads={handleClearDownloads}
            onClearAllData={handleClearAllData}
            onSignOut={handleSignOut}
            onUpgradeClick={handleUpgradeClick}
            apiKey={apiKey || ''}
            onApiKeyChange={setApiKey}
          />
        )}
      </main>

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        t={t} 
      />

      <TechniqueDialog
        technique={selectedTechnique}
        language={language || 'en'}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        isDownloaded={downloadedIds?.includes(selectedTechnique?.id || '') || false}
        onToggleDownload={toggleDownload}
        user={user || null}
        onUpgradeClick={handleUpgradeClick}
      />

      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        onSignIn={handleSignIn}
        t={t}
      />

      <UpgradeDialog
        open={upgradeDialogOpen}
        onOpenChange={setUpgradeDialogOpen}
        onUpgrade={handleUpgrade}
        t={t}
      />
    </div>
  );
}

export default App;