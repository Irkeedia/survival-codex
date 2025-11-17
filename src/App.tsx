import { useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { HomeTab } from '@/components/HomeTab';
import { DownloadsTab } from '@/components/DownloadsTab';
import { SettingsTab } from '@/components/SettingsTab';
import { BottomNav } from '@/components/BottomNav';
import { TechniqueDialog } from '@/components/TechniqueDialog';
import { SurvivalTechnique } from '@/lib/types';
import { translations, Language } from '@/lib/translations';

type TabType = 'home' | 'downloads' | 'settings';

function App() {
  const [bookmarkedIds, setBookmarkedIds] = useKV<string[]>('bookmarked-techniques', []);
  const [downloadedIds, setDownloadedIds] = useKV<string[]>('downloaded-techniques', []);
  const [language, setLanguage] = useKV<Language>('app-language', 'en');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedTechnique, setSelectedTechnique] = useState<SurvivalTechnique | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

        {activeTab === 'settings' && (
          <SettingsTab
            language={language || 'en'}
            t={t}
            bookmarksCount={bookmarkedIds?.length || 0}
            downloadsCount={downloadedIds?.length || 0}
            onLanguageChange={setLanguage}
            onClearBookmarks={handleClearBookmarks}
            onClearDownloads={handleClearDownloads}
            onClearAllData={handleClearAllData}
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
      />
    </div>
  );
}

export default App;