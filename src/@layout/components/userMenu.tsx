'use client';

import {
  IconUserFilled,
  IconCrown,
  IconHistory,
  IconArchive,
  IconLogs,
  IconLogout,
  IconSettings,
} from '@tabler/icons-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Muted, Small } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { RouterUrl } from '@/@core/constants/routerUrl';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/@core/store/authAtoms';
import { useLogout } from '@/@core/useQuery/useAuth';

export function UserMenu() {
  const user = useAtomValue(userAtom);
  const logout = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar size="sm">
          <AvatarFallback className="bg-primary text-primary-foreground cursor-pointer">
            <IconUserFilled size={20} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-2">
        <div className="flex flex-col w-[280px]">
          <div className="flex items-center gap-2 p-3 relative">
            <div className="absolute top-3 right-3 bg-primary/10 py-1 px-3 border border-primary rounded-md text-primary">
              <Small className="text-xs">Pro</Small>
            </div>
            <Avatar size="sm">
              {user?.image && (
                <AvatarImage src={user.image} alt={user.name ?? ''} />
              )}
              <AvatarFallback className="bg-primary text-primary-foreground">
                <IconUserFilled size={20} />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Small className="text-sm">{user?.name}</Small>
              <Muted className="text-xs">{user?.email}</Muted>
            </div>
          </div>

          <div className="flex flex-col gap-1 px-1 pb-2">
            <DropdownMenuItem asChild>
              <Link
                href={RouterUrl.UserSubscription}
                className="cursor-pointer"
              >
                <IconCrown />
                Subscription
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={RouterUrl.UserMyPrompt} className="cursor-pointer">
                <IconArchive />
                My Prompt
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={RouterUrl.UserOrderHistory}
                className="cursor-pointer"
              >
                <IconHistory />
                Order History
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={RouterUrl.UserManageAccount}
                className="cursor-pointer"
              >
                <IconSettings />
                Manage Account
              </Link>
            </DropdownMenuItem>
          </div>
          <div className="px-2">
            <Separator />
          </div>
          <div className="px-1 pt-2 pb-2">
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>
              <IconLogout />
              Logout
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
