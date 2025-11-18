import { useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { HomeTab } from '@/components/HomeTab';
import { DownloadsTab } from '@/components/DownloadsTab';
import { AITab } from '@/components/AITab';
import { BottomNav } from '@/components/BottomNav';
import { ProfileMenu } from '@/components/ProfileMenu';
import { TechniqueDialog } from '@/components/TechniqueDialog';
import { AuthDialog } from '@/components/AuthDialog';
import { SettingsDialog } from '@/components/SettingsDialog';
import { SurvivalTechnique } from '@/lib/types';
import { translations, Language } from '@/lib/translations';
import { toast } from 'sonner';
import { useSupabase } from '@/hooks/useSupabase';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useDownloads } from '@/hooks/useDownloads';

type TabType = 'home' | 'downloads' | 'ai';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedTechnique, setSelectedTechnique] = useState<SurvivalTechnique | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [settingsDefaultTab, setSettingsDefaultTab] = useState<'settings' | 'plans'>('settings');
  const [localLanguage, setLocalLanguage] = useKV<Language>('app-language', 'en');
  const [localApiKey, setLocalApiKey] = useKV<string>('openai-api-key', '');

  const { user, updateProfile, signOut, isSupabaseReady } = useSupabase();
  const { bookmarks, toggleBookmark, clearBookmarks } = useBookmarks(user?.id);
  const { downloads, toggleDownload, clearDownloads } = useDownloads(user?.id);

  const language = (user?.language as Language) || localLanguage || 'en';
  const apiKey = user?.apiKey || localApiKey || '';
  const t = translations[language];

  const requireSignIn = () => {
    toast.error(t.auth.signIn);
    setAuthDialogOpen(true);
  };

  const handleTechniqueClick = (technique: SurvivalTechnique) => {
    setSelectedTechnique(technique);
    setDialogOpen(true);
  };

  const handleBookmarkToggle = async (id: string) => {
    if (isSupabaseReady && !user) {
      requireSignIn();
      return;
    }

    try {
      await toggleBookmark(id);
    } catch (error) {
      console.error('Failed to update bookmark', error);
      toast.error(t.settings.storageDesc);
    }
  };

  const handleDownloadToggle = async (id: string) => {
    if (!user) {
      requireSignIn();
      return;
    }

    if (user.subscriptionTier !== 'premium') {
      toast.error(t.subscription.upgradeRequired);
      setSettingsDefaultTab('plans');
      setSettingsDialogOpen(true);
      return;
    }

    try {
      await toggleDownload(id);
    } catch (error) {
      console.error('Failed to update download', error);
      toast.error(t.settings.storageDesc);
    }
  };

  const handleClearBookmarks = async () => {
    try {
      await clearBookmarks();
    } catch (error) {
      console.error('Failed to clear bookmarks', error);
      toast.error(t.settings.storageDesc);
    }
  };

  const handleClearDownloads = async () => {
    try {
      await clearDownloads();
    } catch (error) {
      console.error('Failed to clear downloads', error);
      toast.error(t.settings.storageDesc);
    }
  };

  const handleClearAllData = async () => {
    await Promise.all([handleClearBookmarks(), handleClearDownloads()]);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success(t.auth.signOutSuccess);
      setSettingsDialogOpen(false);
    } catch (error) {
      console.error('Failed to sign out', error);
      toast.error('Unable to sign out right now');
    }
  };

  const handleUpgrade = async () => {
    if (!user) {
      requireSignIn();
      return;
    }

    try {
      await updateProfile({
        subscriptionTier: 'premium',
        subscriptionExpiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      });
      toast.success(t.subscription.paymentSuccess);
    } catch (error) {
      console.error('Failed to upgrade subscription', error);
      toast.error('Unable to upgrade now');
    }
  };

  const handleUpgradeClick = () => {
    setSettingsDefaultTab('plans');
    setSettingsDialogOpen(true);
  };

  const handleSettingsClick = () => {
    setSettingsDefaultTab('settings');
    setSettingsDialogOpen(true);
  };

  const handleLanguageChange = (lang: Language) => {
    setLocalLanguage(lang);
    if (user) {
      updateProfile({ language: lang }).catch((error) => console.error('Failed to update language', error));
    }
  };

  const handleApiKeyChange = (key: string) => {
    setLocalApiKey(key);
    if (user) {
      updateProfile({ apiKey: key }).catch((error) => console.error('Failed to update API key', error));
    }
  };

  const handleAvatarChange = (avatarUrl: string) => {
    if (!user) {
      return;
    }
    updateProfile({ avatarUrl }).catch((error) => console.error('Failed to update avatar', error));
  };

  return (
    <div className="min-h-screen pb-20 safe-area-inset-bottom">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-10 shadow-lg shadow-primary/5 safe-area-inset-top">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex items-start justify-between gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent truncate">
                {t.appTitle}
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
                {t.appSubtitle}
              </p>
            </div>
            <div className="flex-shrink-0">
              <ProfileMenu
                user={user || null}
                t={t}
                onSettingsClick={handleSettingsClick}
                onPlansClick={handleUpgradeClick}
                onSignInClick={() => setAuthDialogOpen(true)}
                onSignOut={handleSignOut}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        {activeTab === 'home' && (
          <HomeTab
            language={language}
            t={t}
            bookmarkedIds={bookmarks}
            onToggleBookmark={handleBookmarkToggle}
            onTechniqueClick={handleTechniqueClick}
          />
        )}

        {activeTab === 'downloads' && (
          <DownloadsTab
            language={language}
            t={t}
            downloadedIds={downloads}
            bookmarkedIds={bookmarks}
            onToggleBookmark={handleBookmarkToggle}
            onToggleDownload={handleDownloadToggle}
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
      </main>

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        t={t} 
      />

      <TechniqueDialog
        technique={selectedTechnique}
        language={language}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        isDownloaded={downloads.includes(selectedTechnique?.id || '')}
        onToggleDownload={handleDownloadToggle}
        user={user || null}
        onUpgradeClick={handleUpgradeClick}
      />

      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        t={t}
      />

      <SettingsDialog
        open={settingsDialogOpen}
        onOpenChange={setSettingsDialogOpen}
        defaultTab={settingsDefaultTab}
        language={language}
        t={t}
        bookmarksCount={bookmarks.length}
        downloadsCount={downloads.length}
        user={user || null}
        onLanguageChange={handleLanguageChange}
        onClearBookmarks={handleClearBookmarks}
        onClearDownloads={handleClearDownloads}
        onClearAllData={handleClearAllData}
        onSignOut={handleSignOut}
        onUpgradeToPremium={handleUpgrade}
        onSignUpClick={() => setAuthDialogOpen(true)}
        apiKey={apiKey}
        onApiKeyChange={handleApiKeyChange}
        onAvatarChange={handleAvatarChange}
      />
    </div>
  );
}

export default App;
