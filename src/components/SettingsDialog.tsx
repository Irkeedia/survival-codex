import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SettingsTab } from '@/components/SettingsTab';
import { PlansTab } from '@/components/PlansTab';
import { User } from '@/lib/types';
import { Language } from '@/lib/translations';
import { Gear, Crown } from '@phosphor-icons/react';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'settings' | 'plans';
  language: Language;
  t: any;
  bookmarksCount: number;
  downloadsCount: number;
  user: User | null;
  onLanguageChange: (lang: Language) => void;
  onClearBookmarks: () => void;
  onClearDownloads: () => void;
  onClearAllData: () => void;
  onSignOut: () => void;
  onUpgradeToPremium: () => void;
  onSignUpClick: () => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

export function SettingsDialog({
  open,
  onOpenChange,
  defaultTab = 'settings',
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
  onUpgradeToPremium,
  onSignUpClick,
  apiKey,
  onApiKeyChange,
}: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {activeTab === 'settings' ? t.tabs.settings : t.subscription.choosePlan}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'settings' | 'plans')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Gear className="w-4 h-4" />
              {t.tabs.settings}
            </TabsTrigger>
            <TabsTrigger value="plans" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Plans
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings" className="mt-6">
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
              onUpgradeClick={() => setActiveTab('plans')}
              apiKey={apiKey}
              onApiKeyChange={onApiKeyChange}
            />
          </TabsContent>
          
          <TabsContent value="plans" className="mt-6">
            <PlansTab
              t={t}
              user={user}
              onSignUpClick={onSignUpClick}
              onUpgradeToPremium={onUpgradeToPremium}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
