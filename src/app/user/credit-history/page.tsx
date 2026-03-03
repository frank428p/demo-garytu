'use client';

import { IconCurrencyEthereum, IconArrowUp, IconArrowDown } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const transactions = [
  {
    id: 'TXN-001',
    type: 'earn',
    amount: 500,
    description: 'Monthly Pro plan top-up',
    date: 'Mar 1, 2026',
    balance: 1240,
  },
  {
    id: 'TXN-002',
    type: 'spend',
    amount: -30,
    description: 'Image Generation × 3',
    date: 'Feb 28, 2026',
    balance: 740,
  },
  {
    id: 'TXN-003',
    type: 'spend',
    amount: -10,
    description: 'Prompt: SEO Article Writer',
    date: 'Feb 27, 2026',
    balance: 770,
  },
  {
    id: 'TXN-004',
    type: 'spend',
    amount: -50,
    description: 'Video Generation × 1',
    date: 'Feb 25, 2026',
    balance: 780,
  },
  {
    id: 'TXN-005',
    type: 'earn',
    amount: 200,
    description: 'Referral bonus',
    date: 'Feb 20, 2026',
    balance: 830,
  },
  {
    id: 'TXN-006',
    type: 'spend',
    amount: -20,
    description: 'Prompt: Email Marketing Copy',
    date: 'Feb 18, 2026',
    balance: 630,
  },
  {
    id: 'TXN-007',
    type: 'earn',
    amount: 2000,
    description: 'Monthly Pro plan top-up',
    date: 'Feb 1, 2026',
    balance: 650,
  },
];

export default function CreditHistoryPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Credit History</h1>
        <p className="text-muted-foreground mt-1">Track your credit usage and earnings.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground mb-1">Current Balance</p>
          <div className="flex items-center gap-1">
            <IconCurrencyEthereum size={18} className="text-primary" />
            <span className="text-xl font-bold">1,240</span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground mb-1">Earned This Month</p>
          <div className="flex items-center gap-1">
            <IconCurrencyEthereum size={18} className="text-green-500" />
            <span className="text-xl font-bold text-green-500">500</span>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground mb-1">Spent This Month</p>
          <div className="flex items-center gap-1">
            <IconCurrencyEthereum size={18} className="text-destructive" />
            <span className="text-xl font-bold text-destructive">110</span>
          </div>
        </div>
      </div>

      {/* Transactions table */}
      <div className="rounded-xl border border-border overflow-hidden">
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
                    tx.type === 'earn' ? 'bg-green-500/10' : 'bg-destructive/10',
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
                {tx.type === 'earn' ? '+' : ''}{tx.amount}
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
      </div>
    </div>
  );
}
