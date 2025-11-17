import { useState } from 'react';
import { User as UserType } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Gear, Crown, SignOut, User } from '@phosphor-icons/react';
import { useKV } from '@github/spark/hooks';

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
  const [avatarUrl, setAvatarUrl] = useKV<string>('user-avatar-url', '');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) {
    return (
      <button
        onClick={onSignInClick}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm sm:text-base touch-manipulation"
      >
        <User className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
        <span className="hidden sm:inline">{t.auth.signIn}</span>
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 sm:gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background touch-manipulation">
          <Avatar className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-primary/20 cursor-pointer hover:border-primary/40 transition-colors">
            <AvatarImage src={avatarUrl || undefined} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 sm:w-72">
        <div className="flex items-center gap-3 p-3">
          <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
            <AvatarImage src={avatarUrl || undefined} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1">
            <p className="text-sm sm:text-base font-semibold truncate">{user.name}</p>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onPlansClick} className="cursor-pointer py-3 touch-manipulation">
          <Crown className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
          <span className="text-sm sm:text-base">{user.subscriptionTier === 'premium' ? t.subscription.premium : t.subscription.viewPlans}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSettingsClick} className="cursor-pointer py-3 touch-manipulation">
          <Gear className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
          <span className="text-sm sm:text-base">{t.tabs.settings}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut} className="cursor-pointer text-destructive py-3 touch-manipulation">
          <SignOut className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
          <span className="text-sm sm:text-base">{t.auth.signOut}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
