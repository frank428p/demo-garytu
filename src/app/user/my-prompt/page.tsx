'use client';

import { useState } from 'react';
import {
  IconArchive,
  IconSearch,
  IconCurrencyEthereum,
  IconStar,
  IconStarFilled,
  IconDots,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const prompts = [
  {
    id: 1,
    title: 'SEO Article Writer',
    description:
      'Generate SEO-optimized long-form articles with proper keyword density and structure.',
    category: 'Writing',
    credits: 10,
    starred: true,
    usedAt: 'Feb 27, 2026',
  },
  {
    id: 2,
    title: 'Email Marketing Copy',
    description:
      'Write compelling email marketing campaigns with high open and click-through rates.',
    category: 'Marketing',
    credits: 20,
    starred: false,
    usedAt: 'Feb 18, 2026',
  },
  {
    id: 3,
    title: 'Product Description Generator',
    description:
      'Create detailed, persuasive product descriptions for e-commerce platforms.',
    category: 'E-commerce',
    credits: 15,
    starred: true,
    usedAt: 'Feb 10, 2026',
  },
  {
    id: 4,
    title: 'Social Media Caption Pack',
    description:
      'Generate engaging captions for Instagram, Twitter, and LinkedIn posts.',
    category: 'Social Media',
    credits: 8,
    starred: false,
    usedAt: 'Jan 30, 2026',
  },
  {
    id: 5,
    title: 'Code Review Assistant',
    description:
      'Analyze and provide constructive feedback on code quality, performance, and security.',
    category: 'Development',
    credits: 25,
    starred: false,
    usedAt: 'Jan 22, 2026',
  },
  {
    id: 6,
    title: 'Business Plan Template',
    description:
      'Create comprehensive business plans with market analysis, financials, and strategy.',
    category: 'Business',
    credits: 30,
    starred: true,
    usedAt: 'Jan 15, 2026',
  },
];

const categoryColors: Record<string, string> = {
  Writing: 'bg-blue-500/10 text-blue-500',
  Marketing: 'bg-purple-500/10 text-purple-500',
  'E-commerce': 'bg-orange-500/10 text-orange-500',
  'Social Media': 'bg-pink-500/10 text-pink-500',
  Development: 'bg-green-500/10 text-green-500',
  Business: 'bg-yellow-500/10 text-yellow-600',
};

export default function MyPromptPage() {
  const [search, setSearch] = useState('');
  const [starred, setStarred] = useState<Record<number, boolean>>(
    Object.fromEntries(prompts.map((p) => [p.id, p.starred])),
  );

  const filtered = prompts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">My Prompt</h1>
        <p className="text-muted-foreground mt-1">
          {`Prompts you've purchased and saved.`}
        </p>
      </div>

      {/* Search + filter bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <IconSearch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search prompts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {filtered.length} prompts
        </span>
      </div>

      {/* Prompt grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((prompt) => (
          <div
            key={prompt.id}
            className="rounded-xl border border-border bg-background p-5 flex flex-col gap-3 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{prompt.title}</p>
                <span
                  className={`inline-block mt-1 rounded-md px-2 py-0.5 text-xs font-medium ${categoryColors[prompt.category] ?? 'bg-muted text-muted-foreground'}`}
                >
                  {prompt.category}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() =>
                    setStarred((s) => ({ ...s, [prompt.id]: !s[prompt.id] }))
                  }
                  className="p-1 rounded hover:bg-accent transition-colors"
                >
                  {starred[prompt.id] ? (
                    <IconStarFilled size={16} className="text-yellow-400" />
                  ) : (
                    <IconStar size={16} className="text-muted-foreground" />
                  )}
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 rounded hover:bg-accent transition-colors">
                      <IconDots size={16} className="text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer">
                      Use Prompt
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {prompt.description}
            </p>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <IconCurrencyEthereum size={13} className="text-primary" />
                <span className="font-medium text-primary">
                  {prompt.credits}
                </span>
                <span>credits / use</span>
              </div>
              <span className="text-xs text-muted-foreground">
                Used {prompt.usedAt}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <IconArchive size={40} className="text-muted-foreground mb-3" />
          <p className="font-medium">No prompts found</p>
          <p className="text-sm text-muted-foreground mt-1">
            Try a different search term or browse the store.
          </p>
          <Button className="mt-4" variant="default">
            Browse Prompt Store
          </Button>
        </div>
      )}
    </div>
  );
}
