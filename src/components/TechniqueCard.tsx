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
      className="relative cursor-pointer transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 group bg-card/50 backdrop-blur-sm border-border/50"
      onClick={onClick}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
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

      <CardHeader>
        <div className="flex items-start gap-2 mb-2">
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
        <CardTitle className="text-lg leading-tight">{title}</CardTitle>
        {technique.timeRequired && (
          <CardDescription className="flex items-center gap-1 text-xs mt-2">
            <Clock className="w-3 h-3" />
            {technique.timeRequired}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
