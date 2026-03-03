'use client';

import { IconCrown, IconCheck, IconCurrencyEthereum } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Free',
    price: 0,
    credits: 100,
    features: ['100 credits / month', 'Access to basic prompts', 'Standard support'],
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

export default function SubscriptionPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Subscription</h1>
        <p className="text-muted-foreground mt-1">Manage your plan and billing information.</p>
      </div>

      {/* Current plan summary */}
      <div className="rounded-xl border border-border bg-primary/5 p-5 mb-8 flex items-center justify-between">
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
      </div>

      {/* Plans */}
      <h2 className="text-lg font-semibold mb-4">Available Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <span className="text-muted-foreground text-sm mb-0.5">/ month</span>
              </div>
            </div>
            <ul className="flex flex-col gap-2 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IconCheck size={16} className="text-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.current ? 'outline' : plan.highlight ? 'default' : 'outline'}
              className="w-full"
              disabled={plan.current}
            >
              {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
