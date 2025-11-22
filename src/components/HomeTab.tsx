import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { MagnifyingGlass, BookmarkSimple, X, Crown, DownloadSimple, Fire, Drop, House, FirstAid, Compass, Megaphone, ForkKnife, ArrowLeft, Heartbeat, Syringe, ShieldWarning, Radioactive, Wrench, Target } from '@phosphor-icons/react';
import { TechniqueCard } from '@/components/TechniqueCard';
import { SurvivalTechnique, SurvivalCategory, User } from '@/lib/types';
import { Language } from '@/lib/translations';
import { techniqueTranslations } from '@/lib/techniqueTranslations';
import { cn } from '@/lib/utils';

interface HomeTabProps {
  language: Language;
  t: any;
  user: User | null;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void | Promise<void>;
  onTechniqueClick: (technique: SurvivalTechnique) => void;
  onUpgradeClick: () => void;
  onDownloadsClick: () => void;
  techniques: SurvivalTechnique[];
}

export function HomeTab({ 
  language, 
  t, 
  user,
  bookmarkedIds, 
  onToggleBookmark, 
  onTechniqueClick,
  onUpgradeClick,
  onDownloadsClick,
  techniques
}: HomeTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SurvivalCategory | 'all'>('all');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const filteredTechniques = useMemo(() => {
    let filtered = techniques;

    if (showBookmarksOnly) {
      filtered = filtered.filter(t => bookmarkedIds.includes(t.id));
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(technique => {
        const translation = techniqueTranslations[technique.id]?.[language];
        if (translation) {
          return (
            translation.title.toLowerCase().includes(query) ||
            translation.description.toLowerCase().includes(query) ||
            t.categories[technique.category].toLowerCase().includes(query)
          );
        }
        return (
          technique.title.toLowerCase().includes(query) ||
          technique.description.toLowerCase().includes(query) ||
          technique.category.toLowerCase().includes(query)
        );
      });
    }

    return filtered;
  }, [searchQuery, selectedCategory, showBookmarksOnly, bookmarkedIds, language, t.categories]);

  const categories: Array<{ id: SurvivalCategory; icon: any; color: string }> = [
    { id: 'santé_urgence', icon: Heartbeat, color: 'text-white' },
    { id: 'santé_soins', icon: FirstAid, color: 'text-white' },
    { id: 'santé_chirurgie', icon: Syringe, color: 'text-white' },
    { id: 'nucléaire_protection', icon: ShieldWarning, color: 'text-white' },
    { id: 'nucléaire_décontamination', icon: Radioactive, color: 'text-white' },
    { id: 'ingénierie_lowtech', icon: Wrench, color: 'text-white' },
    { id: 'défense_tactique', icon: Target, color: 'text-white' },
  ];

  const getFirstName = (name: string) => name.split(' ')[0];

  // Category Detail View
  if (selectedCategory !== 'all') {
    return (
      <div className="space-y-6 pb-24 pt-12 animate-in slide-in-from-right duration-300">
        {/* Simple Navbar for Category View */}
        <div className="flex items-center gap-4 sticky top-0 bg-background/80 backdrop-blur-md py-4 z-20 -mx-4 px-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSelectedCategory('all')}
            className="rounded-full hover:bg-accent/10"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2 className="text-2xl font-bold capitalize">
            {t.categories[selectedCategory]}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredTechniques.map((technique) => (
            <TechniqueCard
              key={technique.id}
              technique={technique}
              language={language}
              isBookmarked={bookmarkedIds.includes(technique.id)}
              onToggleBookmark={() => onToggleBookmark(technique.id)}
              onClick={() => onTechniqueClick(technique)}
            />
          ))}
        </div>
      </div>
    );
  }

  // Main Home View
  return (
    <div className="space-y-8 pb-24 pt-12">
      {/* Header Section */}
      <div className="space-y-1 pt-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Hello, {user ? getFirstName(user.name) : 'Survivor'}!
        </h1>
        <p className="text-muted-foreground text-lg">
          {t.ai?.subtitle || 'Ready for adventure?'}
        </p>
      </div>

      {/* Promo / Stats Card */}
      <div className="relative overflow-hidden rounded-3xl">
        {user?.subscriptionTier === 'premium' ? (
          <div 
            className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-lg shadow-blue-500/20 cursor-pointer transition-transform active:scale-[0.98]"
            onClick={onDownloadsClick}
          >
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">{t.downloads?.title}</h3>
                <p className="text-blue-100 text-sm mb-4 max-w-[200px]">
                  {t.subscription?.offlineAccess}
                </p>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md"
                >
                  <DownloadSimple className="w-4 h-4 mr-2" />
                  {t.downloads?.downloaded}
                </Button>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                <DownloadSimple weight="fill" className="w-8 h-8 text-white" />
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
          </div>
        ) : (
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 text-white shadow-lg shadow-orange-500/20 cursor-pointer transition-transform active:scale-[0.98]" onClick={onUpgradeClick}>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">{t.subscription?.upgradeToPremium}</h3>
                <p className="text-orange-50 text-sm mb-4 max-w-[200px]">
                  {t.subscription?.upgradeMessage}
                </p>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="bg-white text-orange-600 hover:bg-white/90 border-0 shadow-sm"
                >
                  <Crown weight="fill" className="w-4 h-4 mr-2" />
                  {t.subscription?.premium}
                </Button>
              </div>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                <Crown weight="fill" className="w-8 h-8 text-white" />
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
          </div>
        )}
      </div>

      {/* Categories Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{t.allCategories}</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "flex flex-col items-center justify-center p-6 rounded-3xl transition-all duration-300 border border-transparent",
                  "bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:scale-[1.02] active:scale-95",
                )}
              >
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-3 bg-white/20 backdrop-blur-sm", cat.color)}>
                  <Icon weight="fill" className="w-6 h-6" />
                </div>
                <span className="font-medium text-sm text-center text-white">
                  {t.categories[cat.id]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
        <div className="relative flex items-center bg-white border border-gray-100 rounded-2xl shadow-sm h-14 px-4 transition-all focus-within:shadow-md">
          <MagnifyingGlass className="w-5 h-5 text-gray-400 mr-3" />
          <Input
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 bg-transparent h-full text-base p-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-gray-100 rounded-full"
              onClick={() => setSearchQuery('')}
            >
              <X className="w-4 h-4 text-gray-500" />
            </Button>
          )}
        </div>
      </div>

      {/* Search Results (only if searching) */}
      {searchQuery && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              Search Results
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredTechniques.length} results
            </span>
          </div>

          {filteredTechniques.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <MagnifyingGlass className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{t.noResultsTitle}</h3>
              <p className="text-gray-500">{t.noResultsDesc}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredTechniques.map((technique) => (
                <TechniqueCard
                  key={technique.id}
                  technique={technique}
                  language={language}
                  isBookmarked={bookmarkedIds.includes(technique.id)}
                  onToggleBookmark={() => onToggleBookmark(technique.id)}
                  onClick={() => onTechniqueClick(technique)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
