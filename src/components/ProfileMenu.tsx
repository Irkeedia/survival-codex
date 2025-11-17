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
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <User className="w-5 h-5" />
        <span className="hidden sm:inline">{t.auth.signIn}</span>
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
          <Avatar className="w-10 h-10 border-2 border-primary/20 cursor-pointer hover:border-primary/40 transition-colors">
            <AvatarImage src={avatarUrl || undefined} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center gap-3 p-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src={avatarUrl || undefined} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onPlansClick} className="cursor-pointer">
          <Crown className="w-4 h-4 mr-2" />
          {user.subscriptionTier === 'premium' ? t.subscription.premium : t.subscription.viewPlans}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSettingsClick} className="cursor-pointer">
          <Gear className="w-4 h-4 mr-2" />
          {t.tabs.settings}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut} className="cursor-pointer text-destructive">
          <SignOut className="w-4 h-4 mr-2" />
          {t.auth.signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
