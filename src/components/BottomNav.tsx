import { House, DownloadSimple, Sparkle, User } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

type TabType = 'home' | 'downloads' | 'ai' | 'profile';

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
    { id: 'profile' as TabType, label: t.tabs.profile, icon: User },
  ];

  return (
    <nav className="fixed bottom-6 left-4 right-4 bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/5 z-50 rounded-2xl safe-area-inset-bottom">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-around h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all touch-manipulation min-w-0 relative",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary/70"
                )}
              >
                <div className={cn(
                  "absolute -top-3 w-1 h-1 rounded-full bg-primary transition-all duration-300",
                  isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
                )} />
                <Icon 
                  className={cn(
                    "w-6 h-6 transition-all duration-300",
                    isActive && "scale-110"
                  )}
                  weight={isActive ? 'fill' : 'regular'} 
                />
                <span className={cn(
                  "text-[10px] font-medium transition-all duration-300",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 hidden sm:block"
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
