'use client';

import { IconUserFilled } from '@tabler/icons-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar size="sm">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <IconUserFilled size={20} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end"></DropdownMenuContent>
    </DropdownMenu>
  );
}
