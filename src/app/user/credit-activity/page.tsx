'use client';

import {
  IconCurrencyEthereum,
  IconArrowUp,
  IconArrowDown,
} from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

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

export default function CreditHistoryPage() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Credit Activity</h1>
        <p className="text-muted-foreground mt-1">
          Track your credit usage and earnings.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground mb-1">Current Balance</p>
          <div className="flex items-center gap-1">
            <IconCurrencyEthereum size={18} className="text-primary" />
            <span className="text-xl font-bold">1,240</span>
          </div>
        </div>
        {/* <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground mb-1">
            Earned This Month
          </p>
          <div className="flex items-center gap-1">
            <IconCurrencyEthereum size={18} className="text-green-500" />
            <span className="text-xl font-bold text-green-500">500</span>
          </div>
        </div> */}
        {/* <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground mb-1">Spent This Month</p>
          <div className="flex items-center gap-1">
            <IconCurrencyEthereum size={18} className="text-destructive" />
            <span className="text-xl font-bold text-destructive">110</span>
          </div>
        </div> */}
      </div>

      {/* Transactions table */}
      <Card>
        {/* <CardHeader></CardHeader> */}
        <CardContent className="px-6 py-2">
          {transactions.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3"
            >
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
        </CardContent>
      </Card>
      {/* <div className="rounded-xl border border-border overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 bg-muted/40 text-xs font-medium text-muted-foreground">
          <span>Description</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Balance</span>
          <span className="text-right">Date</span>
        </div>
        <div className="divide-y divide-border">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-4 items-center"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                    tx.type === 'earn'
                      ? 'bg-green-500/10'
                      : 'bg-destructive/10',
                  )}
                >
                  {tx.type === 'earn' ? (
                    <IconArrowDown size={14} className="text-green-500" />
                  ) : (
                    <IconArrowUp size={14} className="text-destructive" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">{tx.id}</p>
                </div>
              </div>
              <div
                className={cn(
                  'text-sm font-semibold text-right',
                  tx.type === 'earn' ? 'text-green-500' : 'text-destructive',
                )}
              >
                {tx.type === 'earn' ? '+' : ''}
                {tx.amount}
              </div>
              <div className="flex items-center gap-0.5 justify-end text-sm text-muted-foreground">
                <IconCurrencyEthereum size={13} />
                {tx.balance}
              </div>
              <span className="text-sm text-muted-foreground text-right whitespace-nowrap">
                {tx.date}
              </span>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
