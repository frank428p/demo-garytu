'use client';

import { H2, H4, Muted } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { IconShoppingCart } from '@tabler/icons-react';

type PromptDetailViewProps = {
  id: string;
};

const PromptDetailView = ({ id }: PromptDetailViewProps) => {
  // TODO: fetch real data by id
  const photoIndex = parseInt(id, 10);
  const src =
    photoIndex >= 1 && photoIndex <= 14
      ? `/images/gallery/${photoIndex}.jpeg`
      : '/images/gallery/1.jpeg';

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* Image — 高度不超過視窗，寬度填滿剩餘空間，按比例縮放 */}
      <div className="flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`Prompt #${id}`}
          className="max-h-[calc(100vh-8rem)] w-full rounded-lg object-contain"
        />
      </div>

      {/* Info */}
      <div className="w-full space-y-4 md:w-80 md:shrink-0">
        <H2>Prompt #{id}</H2>
        <Muted>
          A beautifully crafted AI-generated artwork using advanced prompt
          engineering techniques.
        </Muted>

        <div className="space-y-2">
          <H4>NT$ 1,500</H4>
          <Button className="w-full">
            <IconShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>

        <div className="space-y-2 rounded-lg border border-border p-4">
          <p className="text-sm font-medium">Details</p>
          <div className="text-sm text-muted-foreground">
            <p>Category: AI Art</p>
            <p>Type: Video</p>
            <p>Creator: Creator {((photoIndex - 1) % 5) + 1}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptDetailView;
