import { useState, useMemo } from 'react';
import { useKV } from '@github/spark/hooks';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MagnifyingGlass, BookmarkSimple, X } from '@phosphor-icons/react';
import { TechniqueCard } from '@/components/TechniqueCard';
import { TechniqueDialog } from '@/components/TechniqueDialog';
import { survivalTechniques, categoryLabels } from '@/lib/data';
import { SurvivalTechnique, SurvivalCategory } from '@/lib/types';
import { cn } from '@/lib/utils';

function App() {
  const [bookmarkedIds, setBookmarkedIds] = useKV<string[]>('bookmarked-techniques', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SurvivalCategory | 'all'>('all');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<SurvivalTechnique | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const filteredTechniques = useMemo(() => {
    let filtered = survivalTechniques;
    const currentBookmarks = bookmarkedIds || [];

    if (showBookmarksOnly) {
      filtered = filtered.filter(t => currentBookmarks.includes(t.id));
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory, showBookmarksOnly, bookmarkedIds]);

  const handleTechniqueClick = (technique: SurvivalTechnique) => {
    setSelectedTechnique(technique);
    setDialogOpen(true);
  };

  const categories: Array<SurvivalCategory | 'all'> = ['all', 'shelter', 'water', 'fire', 'food', 'navigation', 'first-aid', 'signaling'];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
            Survival Codex
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Essential wilderness survival techniques and knowledge
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search techniques..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
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
              className="gap-2"
            >
              <BookmarkSimple weight={showBookmarksOnly ? 'fill' : 'regular'} className="w-4 h-4" />
              Bookmarks {(bookmarkedIds?.length || 0) > 0 && `(${bookmarkedIds?.length || 0})`}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={cn(
                  "cursor-pointer transition-all hover:scale-105 capitalize",
                  selectedCategory === category && "shadow-sm"
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All Categories' : categoryLabels[category]}
              </Badge>
            ))}
          </div>

          {filteredTechniques.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                {showBookmarksOnly ? (
                  <BookmarkSimple className="w-8 h-8 text-muted-foreground" />
                ) : (
                  <MagnifyingGlass className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {showBookmarksOnly ? 'No bookmarks yet' : 'No techniques found'}
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                {showBookmarksOnly 
                  ? 'Start bookmarking techniques to save them for quick access later.'
                  : 'Try adjusting your search or filters to find what you\'re looking for.'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTechniques.map((technique) => (
                <TechniqueCard
                  key={technique.id}
                  technique={technique}
                  isBookmarked={bookmarkedIds?.includes(technique.id) || false}
                  onToggleBookmark={() => toggleBookmark(technique.id)}
                  onClick={() => handleTechniqueClick(technique)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <TechniqueDialog
        technique={selectedTechnique}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}

export default App;