import { SurvivalTechnique } from '@/lib/types';
import { Language, translations } from '@/lib/translations';
import { techniqueTranslations } from '@/lib/techniqueTranslations';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookmarkSimple, Clock } from '@phosphor-icons/react';
import { categoryColors } from '@/lib/data';
import { cn } from '@/lib/utils';

interface TechniqueCardProps {
  technique: SurvivalTechnique;
  language: Language;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onClick: () => void;
}

export function TechniqueCard({ technique, language, isBookmarked, onToggleBookmark, onClick }: TechniqueCardProps) {
  const t = translations[language];
  const translation = techniqueTranslations[technique.id]?.[language];
  
  const title = translation?.title || technique.title;
  const description = translation?.description || technique.description;
  
  return (
    <Card 
      className="relative cursor-pointer transition-all active:scale-[0.98] hover:shadow-xl hover:shadow-primary/10 sm:hover:-translate-y-1 group bg-card/50 backdrop-blur-sm border-border/50 touch-manipulation"
      onClick={onClick}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity h-9 w-9 touch-manipulation"
        onClick={(e) => {
          e.stopPropagation();
          onToggleBookmark();
        }}
      >
        <BookmarkSimple 
          weight={isBookmarked ? 'fill' : 'regular'} 
          className={cn(
            "w-5 h-5 transition-colors",
            isBookmarked ? "text-accent" : "text-muted-foreground"
          )}
        />
      </Button>

      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-start gap-1.5 sm:gap-2 mb-2 flex-wrap">
          <Badge 
            variant="outline" 
            className={cn("text-xs backdrop-blur-sm", categoryColors[technique.category])}
          >
            {t.categories[technique.category]}
          </Badge>
          <Badge 
            variant="secondary" 
            className="text-xs capitalize backdrop-blur-sm"
          >
            {t.difficulty[technique.difficulty]}
          </Badge>
        </div>
        <CardTitle className="text-base sm:text-lg leading-tight pr-8 sm:pr-0">{title}</CardTitle>
        {technique.timeRequired && (
          <CardDescription className="flex items-center gap-1 text-xs mt-1.5 sm:mt-2">
            <Clock className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{technique.timeRequired}</span>
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
