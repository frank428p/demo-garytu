'use client';

import { H2, H4, Muted } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { IconShoppingCart } from '@tabler/icons-react';
import AspectRatioBox from '@/components/AspectRatioBox';

type PromptDetailViewProps = {
  id: string;
  aspectRatio?: number;
};

const PromptDetailView = ({ id, aspectRatio = 1 }: PromptDetailViewProps) => {
  const photoIndex = parseInt(id, 10);
  const src =
    photoIndex >= 1 && photoIndex <= 14
      ? `/images/gallery/${photoIndex}.jpeg`
      : '/images/gallery/1.jpeg';

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* Image — aspect-ratio + max-h + max-w 讓瀏覽器自動算出最佳尺寸 */}
      <div className="flex min-w-0 flex-1 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`Prompt #${id}`}
          style={{ aspectRatio }}
          className="max-h-[calc(95vh-6rem)] w-auto max-w-full rounded-lg object-contain"
        />
      </div>

      {/* <AspectRatioBox ratio="16:9" /> */}

      {/* Info */}
      <div className="w-full space-y-4 md:w-[450px] p-[24px] md:shrink-0">
        <H2>Prompt #{id}</H2>
        <H4>NT$ 1,500</H4>
        <Muted>
          A beautifully crafted AI-generated artwork using advanced prompt
          engineering techniques.
        </Muted>

        <div className="space-y-2"></div>

        <div className="flex gap-2">
          <Button className="w-full">Buy now</Button>
          <Button variant="secondary" className="w-full">
            <IconShoppingCart className="h-4 w-4" />
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
