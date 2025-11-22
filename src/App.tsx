import { useState, useEffect } from 'react';
import { useKV } from '@github/spark/hooks';
import { App as CapacitorApp } from '@capacitor/app';
import { AnimatePresence, motion } from 'framer-motion';
import { HomeTab } from '@/components/HomeTab';
import { DownloadsTab } from '@/components/DownloadsTab';
import { AITab } from '@/components/AITab';
import { BottomNav } from '@/components/BottomNav';
import { TechniqueDialog } from '@/components/TechniqueDialog';
import { AuthDialog } from '@/components/AuthDialog';
import { SettingsDialog } from '@/components/SettingsDialog';
import { ProfileTab } from '@/components/ProfileTab';
import { Toaster } from '@/components/ui/sonner';
// ...existing code...
import { SurvivalTechnique } from '@/lib/types';
import { translations, Language } from '@/lib/translations';
import { toast } from 'sonner';
import { useSupabase } from '@/hooks/useSupabase';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useDownloads } from '@/hooks/useDownloads';
import { useRevenueCat } from '@/hooks/useRevenueCat';
import { useTechniques } from '@/hooks/useTechniques';

type TabType = 'home' | 'downloads' | 'ai' | 'profile';

const tabOrder: TabType[] = ['ai', 'home', 'downloads', 'profile'];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute' as const,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    position: 'relative' as const,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute' as const,
  })
};

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [direction, setDirection] = useState(0);
  const [selectedTechnique, setSelectedTechnique] = useState<SurvivalTechnique | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [settingsDefaultTab, setSettingsDefaultTab] = useState<'settings' | 'plans'>('settings');
  const [localLanguage, setLocalLanguage] = useKV<Language>('app-language', 'fr');
  
  // Swipe navigation state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handleTabChange = (newTab: TabType) => {
    const currentIndex = tabOrder.indexOf(activeTab);
    const newIndex = tabOrder.indexOf(newTab);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(newTab);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Next tab (Swipe Left -> Move to Right Tab)
      const currentIndex = tabOrder.indexOf(activeTab);
      if (currentIndex < tabOrder.length - 1) {
        setDirection(1);
        setActiveTab(tabOrder[currentIndex + 1]);
      }
    }
    
    if (isRightSwipe) {
      // Previous tab (Swipe Right -> Move to Left Tab)
      const currentIndex = tabOrder.indexOf(activeTab);
      if (currentIndex > 0) {
        setDirection(-1);
        setActiveTab(tabOrder[currentIndex - 1]);
      }
    }
  };

  const { user, updateProfile, signOut, isSupabaseReady, client } = useSupabase();
  const { bookmarks, toggleBookmark, clearBookmarks, resetLocalState: resetBookmarks } = useBookmarks(user?.id);
  const { downloads, offlineContent, toggleDownload, clearDownloads, resetLocalState: resetDownloads } = useDownloads(user?.id);
  useRevenueCat(user ?? null);

  const language = (user?.language as Language) || localLanguage || 'en';
  const t = translations[language];
  
  const { techniques, isLoading: techniquesLoading } = useTechniques(language, downloads);

  useEffect(() => {
    CapacitorApp.addListener('appUrlOpen', async ({ url }) => {
      console.log('App opened with URL:', url);
      
      // Handle both hash (fragment) and query params
      let accessToken, refreshToken;
      
      // 1. Try hash (standard Supabase redirect)
      const hashIndex = url.indexOf('#');
      if (hashIndex !== -1) {
        const params = new URLSearchParams(url.substring(hashIndex + 1));
        accessToken = params.get('access_token');
        refreshToken = params.get('refresh_token');
      }

      // 2. If not in hash, try query params (fallback)
      if (!accessToken) {
        const queryIndex = url.indexOf('?');
        if (queryIndex !== -1) {
          const params = new URLSearchParams(url.substring(queryIndex + 1));
          accessToken = params.get('access_token');
          refreshToken = params.get('refresh_token');
        }
      }

      if (accessToken && refreshToken) {
          const { error } = await client?.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
          }) ?? {};
          
          if (error) {
            console.error('Error setting session:', error);
            toast.error('Erreur de connexion via le lien');
          } else {
            console.log('Session restored from Deep Link');
            toast.success('Compte vérifié avec succès !');
            // Close any open dialogs
            setAuthDialogOpen(false);
          }
      }
    });
  }, [client]);

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

  const handleDownloadToggle = async (technique: SurvivalTechnique) => {
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
      await toggleDownload(technique);
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
      const userId = user?.id;
      await signOut();
      
      // Clear local state on sign out to prevent data leak to non-logged in user
      resetBookmarks();
      resetDownloads();
      
      // Clear AI data for this user
      if (userId) {
        localStorage.removeItem(`ai-conversations-${userId}`);
        localStorage.removeItem(`current-conversation-id-${userId}`);
        localStorage.removeItem(`ai-quota-${userId}`);
      }

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

    // TODO: Implement real payment flow with RevenueCat
    // For now, we simulate a successful payment
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

  const handleAvatarChange = (avatarUrl: string) => {
    if (!user) {
      return;
    }
    updateProfile({ avatarUrl }).catch((error) => console.error('Failed to update avatar', error));
  };

  return (
    <div 
      className="min-h-screen pb-20 safe-area-inset-bottom"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Toaster />
      
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 overflow-x-hidden relative min-h-[80vh]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeTab}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", ease: "easeInOut", duration: 0.3 },
              opacity: { duration: 0.2 }
            }}
            className="w-full"
          >
            {activeTab === 'home' && (
              <HomeTab
                language={language}
                t={t}
                user={user || null}
                bookmarkedIds={bookmarks}
                onToggleBookmark={handleBookmarkToggle}
                onTechniqueClick={handleTechniqueClick}
                onUpgradeClick={handleUpgradeClick}
                onDownloadsClick={() => handleTabChange('downloads')}
                techniques={techniques}
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
                techniques={techniques}
                offlineContent={offlineContent}
              />
            )}

            {activeTab === 'ai' && (
              <AITab
                t={t}
                user={user || null}
                onUpgradeClick={handleUpgradeClick}
              />
            )}

            {activeTab === 'profile' && (
              <div className="flex justify-center">
                <ProfileTab
                  language={language}
                  t={t}
                  user={user || null}
                  bookmarksCount={bookmarks.length}
                  downloadsCount={downloads.length}
                  onLanguageChange={handleLanguageChange}
                  onSignOut={handleSignOut}
                  onSignIn={() => setAuthDialogOpen(true)}
                  onUpgradeToPremium={handleUpgrade}
                  onClearBookmarks={handleClearBookmarks}
                  onClearDownloads={handleClearDownloads}
                  onClearAllData={handleClearAllData}
                  onAvatarChange={handleAvatarChange}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        t={t} 
      />

      <TechniqueDialog
        technique={selectedTechnique}
        language={language}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        isDownloaded={downloads.includes(selectedTechnique?.id || '')}
        onToggleDownload={handleDownloadToggle}
        isBookmarked={bookmarks.includes(selectedTechnique?.id || '')}
        onToggleBookmark={handleBookmarkToggle}
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
        onAvatarChange={handleAvatarChange}
      />
    </div>
  );
}

export default App;
