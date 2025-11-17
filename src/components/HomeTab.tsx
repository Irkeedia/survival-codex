import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MagnifyingGlass, BookmarkSimple, X } from '@phosphor-icons/react';
import { TechniqueCard } from '@/components/TechniqueCard';
import { survivalTechniques } from '@/lib/data';
import { SurvivalTechnique, SurvivalCategory } from '@/lib/types';
import { Language } from '@/lib/translations';
import { techniqueTranslations } from '@/lib/techniqueTranslations';
import { cn } from '@/lib/utils';

interface HomeTabProps {
  language: Language;
  t: any;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onTechniqueClick: (technique: SurvivalTechnique) => void;
}

export function HomeTab({ 
  language, 
  t, 
  bookmarkedIds, 
  onToggleBookmark, 
  onTechniqueClick 
}: HomeTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SurvivalCategory | 'all'>('all');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const filteredTechniques = useMemo(() => {
    let filtered = survivalTechniques;

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

  const categories: Array<SurvivalCategory | 'all'> = ['all', 'shelter', 'water', 'fire', 'food', 'navigation', 'first-aid', 'signaling'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-card/50 backdrop-blur-sm border-border/50"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setSearchQuery('')}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        <Button
          variant={showBookmarksOnly ? 'default' : 'outline'}
          onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
          className="gap-2 bg-card/50 backdrop-blur-sm border-border/50"
        >
          <BookmarkSimple weight={showBookmarksOnly ? 'fill' : 'regular'} className="w-4 h-4" />
          {t.bookmarks} {bookmarkedIds.length > 0 && `(${bookmarkedIds.length})`}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            className={cn(
              "cursor-pointer transition-all hover:scale-105 capitalize backdrop-blur-sm",
              selectedCategory === category && "shadow-lg shadow-primary/20"
            )}
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'all' ? t.allCategories : t.categories[category]}
          </Badge>
        ))}
      </div>

      {filteredTechniques.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 backdrop-blur-sm mb-4 border border-border/50">
            {showBookmarksOnly ? (
              <BookmarkSimple className="w-8 h-8 text-muted-foreground" />
            ) : (
              <MagnifyingGlass className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {showBookmarksOnly ? t.noBookmarksTitle : t.noResultsTitle}
          </h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            {showBookmarksOnly ? t.noBookmarksDesc : t.noResultsDesc}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
}
