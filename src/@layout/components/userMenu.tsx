'use client';

import {
  IconUserFilled,
  IconCrown,
  IconHistory,
  IconArchive,
  IconLogs,
  IconLogout,
} from '@tabler/icons-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Muted, Small } from '@/components/ui/typography';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export function UserMenu() {
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
        <div className="flex flex-col w-[260px]">
          <div className="flex items-center gap-2 p-3">
            <Avatar size="sm">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <IconUserFilled size={20} />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Small className="text-sm">User Name</Small>
              <Muted className="text-xs">user@gmail.com</Muted>
            </div>
          </div>

          <div className="flex flex-col gap-1 px-1 pb-2">
            <DropdownMenuItem className="cursor-pointer">
              <IconCrown />
              Subscription
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <IconLogs />
              Credit History
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <IconArchive />
              My Prompt
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <IconHistory />
              Order History
            </DropdownMenuItem>
          </div>
          <div className="px-2">
            <Separator />
          </div>
          <div className="px-1 pt-2 pb-2">
            <DropdownMenuItem className="cursor-pointer">
              <IconLogout />
              Logout
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
