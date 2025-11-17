import { SurvivalTechnique } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookmarkSimple, Clock } from '@phosphor-icons/react';
import { categoryColors, categoryLabels } from '@/lib/data';
import { cn } from '@/lib/utils';

interface TechniqueCardProps {
  technique: SurvivalTechnique;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onClick: () => void;
}

export function TechniqueCard({ technique, isBookmarked, onToggleBookmark, onClick }: TechniqueCardProps) {
  return (
    <Card 
      className="relative cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 group"
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
            className={cn("text-xs", categoryColors[technique.category])}
          >
            {categoryLabels[technique.category]}
          </Badge>
          <Badge 
            variant="secondary" 
            className="text-xs capitalize"
          >
            {technique.difficulty}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-tight">{technique.title}</CardTitle>
        {technique.timeRequired && (
          <CardDescription className="flex items-center gap-1 text-xs mt-2">
            <Clock className="w-3 h-3" />
            {technique.timeRequired}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {technique.description}
        </p>
      </CardContent>
    </Card>
  );
}
