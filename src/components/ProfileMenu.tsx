import { User as UserType } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Gear, Crown, SignOut, User, Sparkle } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface ProfileMenuProps {
  user: UserType | null;
  t: any;
  onSettingsClick: () => void;
  onPlansClick: () => void;
  onSignInClick: () => void;
  onSignOut: () => void;
}

export function ProfileMenu({
  user,
  t,
  onSettingsClick,
  onPlansClick,
  onSignInClick,
  onSignOut,
}: ProfileMenuProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarUrl = user?.avatarUrl || '';
  const isPremium = user?.subscriptionTier === 'premium';

  if (!user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="group relative outline-none">
            <div className="relative p-0.5 rounded-full transition-all duration-300 group-hover:scale-105 bg-gradient-to-tr from-muted/50 to-muted/10">
              <Avatar className="w-10 h-10 border-2 border-background">
                <AvatarFallback className="bg-muted text-muted-foreground font-bold">
                  <User weight="bold" />
                </AvatarFallback>
              </Avatar>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-72 p-2 bg-background/80 backdrop-blur-xl border-white/10 shadow-2xl rounded-2xl mt-2"
          sideOffset={8}
        >
          {/* Guest Header */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-muted/50 via-muted/30 to-transparent p-4 mb-2">
            <div className="flex items-center gap-3 relative z-10">
              <Avatar className="w-12 h-12 border-2 border-white/20 shadow-lg">
                <AvatarFallback className="bg-muted text-muted-foreground font-bold text-lg">
                  <User weight="bold" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-base truncate leading-tight">Guest User</span>
                <span className="text-xs text-muted-foreground truncate">Not signed in</span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-1">
            <DropdownMenuItem 
              onClick={onSignInClick}
              className="group flex items-center gap-3 p-3 rounded-xl cursor-pointer bg-primary/10 hover:bg-primary/20 transition-all duration-200 border border-primary/10"
            >
              <div className="p-2 rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <User weight="bold" className="w-4 h-4" />
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-medium text-sm text-foreground">{t.auth.signIn}</span>
                <span className="text-[10px] text-muted-foreground">
                  {t.auth.signUp}
                </span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-border/50 my-2" />

            <DropdownMenuItem 
              onClick={onPlansClick}
              className="group flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-muted/50 focus:bg-muted/50 transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-muted text-muted-foreground group-hover:bg-background group-hover:text-foreground transition-colors border border-transparent group-hover:border-border/50">
                <Crown weight="bold" className="w-4 h-4" />
              </div>
              <span className="font-medium text-sm">{t.subscription.viewPlans}</span>
            </DropdownMenuItem>

            <DropdownMenuItem 
              onClick={onSettingsClick}
              className="group flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-muted/50 focus:bg-muted/50 transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-muted text-muted-foreground group-hover:bg-background group-hover:text-foreground transition-colors border border-transparent group-hover:border-border/50">
                <Gear weight="bold" className="w-4 h-4" />
              </div>
              <span className="font-medium text-sm">{t.tabs.settings}</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group relative outline-none">
          <div className={cn(
            "relative p-0.5 rounded-full transition-all duration-300 group-hover:scale-105",
            isPremium 
              ? "bg-gradient-to-tr from-amber-300 via-yellow-500 to-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]" 
              : "bg-gradient-to-tr from-primary/50 to-primary/10"
          )}>
            <Avatar className="w-10 h-10 border-2 border-background">
              <AvatarImage src={avatarUrl || undefined} alt={user.name} className="object-cover" />
              <AvatarFallback className="bg-muted text-muted-foreground font-bold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            
            {/* Status Indicator */}
            <div className={cn(
              "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-background flex items-center justify-center",
              isPremium ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground"
            )}>
              {isPremium ? (
                <Crown weight="fill" className="w-2.5 h-2.5" />
              ) : (
                <User weight="bold" className="w-2.5 h-2.5" />
              )}
            </div>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        align="end" 
        className="w-72 p-2 bg-background/80 backdrop-blur-xl border-white/10 shadow-2xl rounded-2xl mt-2"
        sideOffset={8}
      >
        {/* User Header */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-4 mb-2">
          <div className="flex items-center gap-3 relative z-10">
            <Avatar className="w-12 h-12 border-2 border-white/20 shadow-lg">
              <AvatarImage src={avatarUrl || undefined} alt={user.name} />
              <AvatarFallback className="bg-primary/20 text-primary font-bold text-lg">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-base truncate leading-tight">{user.name}</span>
              <span className="text-xs text-muted-foreground truncate">{user.email}</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border",
                  isPremium 
                    ? "bg-amber-500/10 text-amber-600 border-amber-500/20" 
                    : "bg-muted text-muted-foreground border-border"
                )}>
                  {isPremium ? 'Premium' : 'Free Plan'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        </div>

        {/* Menu Items */}
        <div className="space-y-1">
          <DropdownMenuItem 
            onClick={onPlansClick}
            className={cn(
              "group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200",
              isPremium 
                ? "hover:bg-amber-500/10 focus:bg-amber-500/10" 
                : "bg-gradient-to-r from-primary/10 to-transparent hover:from-primary/20 focus:from-primary/20 border border-primary/10"
            )}
          >
            <div className={cn(
              "p-2 rounded-lg transition-colors",
              isPremium ? "bg-amber-500/20 text-amber-600" : "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
            )}>
              <Crown weight={isPremium ? "fill" : "bold"} className="w-4 h-4" />
            </div>
            <div className="flex flex-col flex-1">
              <span className={cn("font-medium text-sm", isPremium ? "text-amber-700 dark:text-amber-400" : "text-foreground")}>
                {isPremium ? t.subscription.premium : t.subscription.upgrade}
              </span>
              {!isPremium && (
                <span className="text-[10px] text-muted-foreground">
                  {t.subscription.unlockAll}
                </span>
              )}
            </div>
            {!isPremium && <Sparkle className="w-4 h-4 text-primary animate-pulse" weight="fill" />}
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-border/50 my-2" />

          <DropdownMenuItem 
            onClick={onSettingsClick}
            className="group flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-muted/50 focus:bg-muted/50 transition-all duration-200"
          >
            <div className="p-2 rounded-lg bg-muted text-muted-foreground group-hover:bg-background group-hover:text-foreground transition-colors border border-transparent group-hover:border-border/50">
              <Gear weight="bold" className="w-4 h-4" />
            </div>
            <span className="font-medium text-sm">{t.tabs.settings}</span>
          </DropdownMenuItem>

          <DropdownMenuItem 
            onClick={onSignOut}
            className="group flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-red-500/10 focus:bg-red-500/10 text-red-600 dark:text-red-400 transition-all duration-200 mt-1"
          >
            <div className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
              <SignOut weight="bold" className="w-4 h-4" />
            </div>
            <span className="font-medium text-sm">{t.auth.signOut}</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
