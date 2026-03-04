'use client';

import {
  IconCrown,
  IconInvoice,
  IconCurrencyEthereum,
  IconLogs,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Large } from '@/components/ui/typography';
import { Progress } from '@/components/ui/progress';

const plans = [
  {
    name: 'Free',
    price: 0,
    credits: 100,
    features: [
      '100 credits / month',
      'Access to basic prompts',
      'Standard support',
    ],
    current: false,
  },
  {
    name: 'Pro',
    price: 9.9,
    credits: 2000,
    features: [
      '2,000 credits / month',
      'Access to all prompts',
      'Priority support',
      'Advanced AI models',
    ],
    current: true,
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 49.9,
    credits: 20000,
    features: [
      '20,000 credits / month',
      'Unlimited prompt access',
      'Dedicated support',
      'Custom AI model fine-tuning',
      'Team management',
    ],
    current: false,
  },
];

const transactions = [
  {
    id: 'TXN-001',
    type: 'earn',
    amount: 500,
    description: 'Monthly Pro plan top-up',
    date: 'Mar 1, 2026',
    balance: 1240,
    expired: 'Mar 12, 2026, 05:22:48',
  },
  {
    id: 'TXN-005',
    type: 'spend',
    amount: -40,
    description: 'Video Generation ',
    date: 'Feb 20, 2026',
    balance: 830,
  },
  {
    id: 'TXN-006',
    type: 'spend',
    amount: -20,
    description: 'Image Generation ',
    date: 'Feb 18, 2026',
    balance: 630,
  },
  {
    id: 'TXN-007',
    type: 'earn',
    amount: 2000,
    description: 'Sign-up bonus',
    date: 'Feb 1, 2026',
    balance: 650,
  },
];

const subscription = [
  {
    id: 'sb-001',
    amount: 680,
    description: 'Monthly Pro plan',
    date: 'Mar 1, 2026',
    expired: 'Mar 12, 2026, 05:22:48',
  },
];

export default function SubscriptionPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* <div className="mb-8">
        <h1 className="text-2xl font-bold">Subscription</h1>
        <p className="text-muted-foreground mt-1">
          Manage your plan and billing information.
        </p>
      </div> */}

      <div className="bg-card p-2 rounded-xl">
        <p className="text-xs text-muted-foreground font-bold mb-1 px-2 flex items-center gap-1">
          <IconCrown size={16} className="text-primary" />
          SUBSCRIPTION
        </p>
        <div className="flex bg-secondary p-3 rounded-xl justify-between items-center">
          {/* <div className="flex bg-primary/20 p-3 rounded-xl justify-between items-center"> */}
          <div className="flex">
            <div className="flex flex-col">
              <Large>Free Plan</Large>
              <p className="text-xs text-muted-foreground">
                Renews on Apr 1, 2026
              </p>
            </div>
          </div>

          <Button>Upgrade Plan</Button>
        </div>
      </div>

      <div className="bg-card p-2 rounded-xl">
        <p className="text-xs text-muted-foreground font-bold mb-1 px-2 flex items-center gap-1">
          <IconCurrencyEthereum size={16} className="text-primary" />
          CREDITS
        </p>
        <div className="flex flex-col bg-secondary p-3 rounded-xl items-center">
          <div className="flex w-full items-center justify-between mb-3">
            <div className="flex">
              <div className="flex flex-col">
                <p className="text-xs text-muted-foreground">
                  Monthly credits left
                </p>
                <p>
                  <span className="text-lg font-semibold">450 </span>
                  <span className="text-lg font-semibold text-muted-foreground">
                    / 2,000
                  </span>
                </p>
              </div>
            </div>
            <Button>Buy Credits</Button>
          </div>
          <Progress value={66} id="credits" />
        </div>
      </div>

      <div className="bg-card p-2 rounded-xl">
        <p className="text-xs text-muted-foreground font-bold mb-1 px-2 flex items-center gap-1">
          <IconInvoice size={16} className="text-primary" />
          SUBSCRIPTION HISTORY
        </p>

        <div className="flex bg-secondary p-3 rounded-xl">
          <div className="flex flex-col gap-4 w-full">
            {subscription.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{item.description}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <div className="flex flex-col self-start">
                  <div className="text-sm font-semibold text-right">
                    {item.amount}
                  </div>
                  <p className="text-xs text-muted-foreground text-right">
                    {item.expired
                      ? 'Expiration Time: Mar 12, 2026, 05:22:48'
                      : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card p-2 rounded-xl mb-6">
        <p className="text-xs text-muted-foreground font-bold mb-1 px-2 flex items-center gap-1">
          <IconLogs size={16} className="text-primary" />
          CREDITS ACTIVITY
        </p>

        <div className="flex bg-secondary p-3 rounded-xl">
          <div className="flex flex-col gap-4 w-full">
            {transactions.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{item.description}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <div className="flex flex-col self-start">
                  <div
                    className={cn(
                      'text-sm font-semibold text-right',
                      item.type === 'earn'
                        ? 'text-green-500'
                        : 'text-destructive',
                    )}
                  >
                    {item.type === 'earn' ? '+' : ''}
                    {item.amount}
                  </div>
                  <p className="text-xs text-muted-foreground text-right">
                    {item.expired
                      ? 'Expiration Time: Mar 12, 2026, 05:22:48'
                      : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current plan summary */}
      {/* <div className="rounded-xl border border-border bg-primary/5 p-5 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
            <IconCrown size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Plan</p>
            <p className="font-semibold">Pro Plan</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Credits remaining</p>
            <div className="flex items-center gap-1 justify-end">
              <IconCurrencyEthereum size={16} className="text-primary" />
              <span className="font-semibold">1,240 / 2,000</span>
            </div>
          </div>
          <Separator orientation="vertical" className="h-10" />
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Renews on</p>
            <p className="font-semibold">Apr 1, 2026</p>
          </div>
        </div>
      </div> */}

      {/* Plans */}

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              'relative rounded-xl border p-5 flex flex-col gap-4',
              plan.highlight
                ? 'border-primary bg-primary/5'
                : 'border-border bg-background',
            )}
          >
            {plan.highlight && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-3">
                Current Plan
              </Badge>
            )}
            <div>
              <p className="font-semibold text-base">{plan.name}</p>
              <div className="flex items-end gap-1 mt-1">
                <span className="text-2xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground text-sm mb-0.5">
                  / month
                </span>
              </div>
            </div>
            <ul className="flex flex-col gap-2 flex-1">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <IconCheck size={16} className="text-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={
                plan.current
                  ? 'outline'
                  : plan.highlight
                    ? 'default'
                    : 'outline'
              }
              className="w-full"
              disabled={plan.current}
            >
              {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
            </Button>
          </div>
        ))}
      </div> */}
    </div>
  );
}
