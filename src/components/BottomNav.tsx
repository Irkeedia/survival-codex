import { House, DownloadSimple, Sparkle } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

type TabType = 'home' | 'downloads' | 'ai';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  t: any;
}

export function BottomNav({ activeTab, onTabChange, t }: BottomNavProps) {
  const tabs = [
    { id: 'ai' as TabType, label: t.tabs.ai, icon: Sparkle },
    { id: 'home' as TabType, label: t.tabs.home, icon: House },
    { id: 'downloads' as TabType, label: t.tabs.downloads, icon: DownloadSimple },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border/50 z-50 safe-area-inset-bottom">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-around h-16 sm:h-18">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 sm:gap-1 flex-1 h-full transition-all touch-manipulation min-w-0",
                  "active:bg-accent/20 sm:hover:bg-accent/10",
                  isActive && "text-primary"
                )}
              >
                <Icon 
                  className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" 
                  weight={isActive ? 'fill' : 'regular'} 
                />
                <span className={cn(
                  "text-[10px] sm:text-xs font-medium truncate max-w-full px-1",
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
