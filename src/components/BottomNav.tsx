import { House, DownloadSimple, Gear } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

type TabType = 'home' | 'downloads' | 'settings';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  t: any;
}

export function BottomNav({ activeTab, onTabChange, t }: BottomNavProps) {
  const tabs = [
    { id: 'home' as TabType, label: t.tabs.home, icon: House },
    { id: 'downloads' as TabType, label: t.tabs.downloads, icon: DownloadSimple },
    { id: 'settings' as TabType, label: t.tabs.settings, icon: Gear },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/50 z-50 safe-area-inset-bottom">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all",
                  "hover:bg-accent/10",
                  isActive && "text-primary"
                )}
              >
                <Icon 
                  className="w-6 h-6" 
                  weight={isActive ? 'fill' : 'regular'} 
                />
                <span className={cn(
                  "text-xs font-medium",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
