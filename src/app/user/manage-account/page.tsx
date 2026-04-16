'use client';

import { useState } from 'react';
import {
  IconCamera,
  IconUserFilled,
  IconAlertCircle,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function ManageAccountPage() {
  const [name, setName] = useState('User Name');
  const [email] = useState('user@gmail.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Manage Account</h1>
        <p className="text-muted-foreground mt-1">
          Update your profile and account settings.
        </p>
      </div>

      {/* Avatar section */}
      <section className="mb-8">
        <h2 className="text-base font-semibold mb-4">Profile</h2>
        <div className="flex items-center gap-5">
          <div className="relative">
            <Avatar size="lg">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                <IconUserFilled size={28} />
              </AvatarFallback>
            </Avatar>
            {/* <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors">
              <IconCamera size={14} />
            </button> */}
          </div>
          <div>
            <p className="text-sm font-medium">User Name</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              username@gmail.com
            </p>
          </div>
        </div>
      </section>

      <Separator className="mb-8" />

      {/* Profile info */}
      <section className="mb-8">
        <h2 className="text-base font-semibold mb-4">Profile Information</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Display Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Email Address</label>
            <Input
              value={email}
              disabled
              className="opacity-60 cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">
              Contact support to change your email address.
            </p>
          </div>
          <div className="flex justify-end">
            <Button variant="default" size="sm">
              Save Changes
            </Button>
          </div>
        </div>
      </section>

      <Separator className="mb-8" />

      {/* Danger zone */}
      <section>
        <h2 className="text-base font-semibold mb-1">Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Permanently delete your account and all associated data.
        </p>
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <IconAlertCircle
              size={18}
              className="text-destructive mt-0.5 shrink-0"
            />
            <div>
              <p className="text-sm font-medium">Delete Account</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                This action cannot be undone. All your data will be permanently
                removed.
              </p>
            </div>
          </div>
          <Button variant="destructive" size="sm" className="shrink-0">
            Delete Account
          </Button>
        </div>
      </section>
    </div>
  );
}
