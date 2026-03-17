import { NextRequest, NextResponse } from 'next/server';
import type { MediaType, AspectRatioType } from '@/@core/types';

export interface PromptItem {
  id: string;
  src: string;
  poster?: string;
  width: number;
  height: number;
  aspectRatio: AspectRatioType;
  mediaType: MediaType;
  title: string;
  username: string;
  avatar: string;
  views: number;
  likes: number;
  price: number;
  createdAt: string;
}

export interface PromptsResponse {
  data: PromptItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

const TITLES = [
  'The Conspiracy Theory', 'Scrap', 'Have Fun!', 'The Bind', 'In Despair',
  'Blade.', 'Sorry, Mom', 'Down to Earth', "360's Night", 'Neon Shadows',
  'Final Protocol', 'Iron Drift', 'Phantom Signal', 'Last Stand', 'Heist',
  'Zero Hour', 'The Fall', 'Rogue Circuit', 'Eclipse', 'Aftermath',
  'Crimson Dawn', 'Silent Storm', 'Vertigo', 'The Override', 'Static Dreams',
  'Cold Signal', 'Depth Charge', 'Mirror Break', 'Pulse', 'Distant Fire',
  'Glass Horizon', 'Dark Matter', 'Shift', 'Binary', 'The Drift',
  'Open Circuit', 'Frequency', 'The Descent', 'Breach', 'Fracture',
];

const USERNAMES = [
  'baroque_tea', 'colormestadic', 'craneofilms', 'adriansuarez', 'jaemin_yoo',
  'paperwolf', 'myrzakhan', 'sethadvit', 'sceneerr', 'voidframe',
  'lenscraft', 'neonreel', 'ghostcut', 'arcvision', 'pixelwave',
  'silkmotion', 'duskframe', 'luminos', 'staticbloom', 'motionhex',
];

const MEDIA_POOL: Pick<PromptItem, 'src' | 'poster' | 'width' | 'height' | 'aspectRatio' | 'mediaType'>[] = [
  { src: '/images/gallery/1-to-1_1.jpg', width: 1024, height: 1024, aspectRatio: '1:1', mediaType: 'image' },
  { src: '/images/gallery/1-to-1_2.jpg', width: 1024, height: 1024, aspectRatio: '1:1', mediaType: 'image' },
  { src: '/images/gallery/1-to-1_3.jpg', width: 1024, height: 1024, aspectRatio: '1:1', mediaType: 'image' },
  { src: '/images/gallery/9-to-16_1.jpg', width: 1040, height: 1572, aspectRatio: '9:16', mediaType: 'image' },
  { src: '/images/gallery/16-to-9_1.jpg', width: 5440, height: 3072, aspectRatio: '16:9', mediaType: 'image' },
  { src: '/images/gallery/16-to-9_2.jpg', width: 1376, height: 768, aspectRatio: '16:9', mediaType: 'image' },
  { src: '/images/gallery/1-to-1_1.mp4', poster: '/images/gallery/1-to-1-cover_1.avif', width: 1440, height: 1440, aspectRatio: '1:1', mediaType: 'video' },
  { src: '/images/gallery/1-to-1_2.mp4', poster: '/images/gallery/1-to-1-cover_2.avif', width: 1440, height: 1440, aspectRatio: '1:1', mediaType: 'video' },
  { src: '/images/gallery/16-to-9_1.mp4', poster: '/images/gallery/16-to-9-cover_1.avif', width: 1344, height: 768, aspectRatio: '16:9', mediaType: 'video' },
  { src: '/images/gallery/16-to-9_2.mp4', poster: '/images/gallery/16-to-9-cover_2.avif', width: 1344, height: 768, aspectRatio: '16:9', mediaType: 'video' },
  { src: '/images/gallery/9-to-16_1.mp4', poster: '/images/gallery/9-to-16-cover_1.avif', width: 1080, height: 1920, aspectRatio: '9:16', mediaType: 'video' },
  { src: '/images/gallery/9-to-16_2.mp4', poster: '/images/gallery/9-to-16-cover_2.avif', width: 1080, height: 1920, aspectRatio: '9:16', mediaType: 'video' },
];

const TOTAL_ITEMS = 80;

// Deterministic seeded "random" for consistent mock data across requests
function seededRand(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateItem(index: number): PromptItem {
  const media = MEDIA_POOL[index % MEDIA_POOL.length];
  const titleIndex = index % TITLES.length;
  const usernameIndex = index % USERNAMES.length;
  const avatarNum = String((index % 9) + 1).padStart(2, '0');

  const views = Math.floor(seededRand(index * 3 + 1) * 120000) + 5000;
  const likes = Math.floor(seededRand(index * 3 + 2) * 1500) + 100;
  const price = [500, 800, 1000, 1200, 1500, 2000][index % 6];

  const baseDate = new Date('2024-01-01');
  baseDate.setDate(baseDate.getDate() + index * 3);

  return {
    id: String(index + 1),
    ...media,
    title: TITLES[titleIndex],
    username: USERNAMES[usernameIndex],
    avatar: `/images/gallery/img-${avatarNum}.jpg`,
    views,
    likes,
    price,
    createdAt: baseDate.toISOString(),
  };
}

const ALL_ITEMS: PromptItem[] = Array.from({ length: TOTAL_ITEMS }, (_, i) => generateItem(i));

type SortKey = 'trending' | 'newest' | 'liked' | 'viewed';

function sortItems(items: PromptItem[], sort: SortKey): PromptItem[] {
  const sorted = [...items];
  switch (sort) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'liked':
      return sorted.sort((a, b) => b.likes - a.likes);
    case 'viewed':
      return sorted.sort((a, b) => b.views - a.views);
    case 'trending':
    default:
      return sorted.sort((a, b) => (b.views * 0.4 + b.likes * 0.6) - (a.views * 0.4 + a.likes * 0.6));
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
  const limit = Math.min(40, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)));
  const sort = (searchParams.get('sort') ?? 'trending') as SortKey;
  const mediaType = searchParams.get('mediaType') as MediaType | null;

  let items = sortItems(ALL_ITEMS, sort);

  if (mediaType) {
    items = items.filter((item) => item.mediaType === mediaType);
  }

  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = items.slice(start, start + limit);

  const response: PromptsResponse = {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
    },
  };

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return NextResponse.json(response);
}
