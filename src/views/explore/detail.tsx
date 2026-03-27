'use client';

import { Button } from '@/components/ui/button';
import {
  IconShoppingCart,
  IconShieldCheck,
  IconDownload,
} from '@tabler/icons-react';
// import ThumbnailSlider from '@/components/ThumbnailSlider';
import { MediaType, AspectRatioType } from '@/@core/types';
import { useMemo } from 'react';
import { useCart } from '@/@core/provider/cartContext';
import { useRouter } from 'next/navigation';
import { RouterUrl } from '@/@core/constants/routerUrl';

type PromptDetailViewProps = {
  id: string;
  mediaType: MediaType;
  aspectRatio?: AspectRatioType;
};

const PRODUCT_NAME = 'Cinematic Portrait Lighting Pack';
const PRODUCT_PRICE = 1500;

const PromptDetailView = ({
  id,
  mediaType = 'IMAGE',
  aspectRatio = '1:1',
}: PromptDetailViewProps) => {
  const { addItem, items } = useCart();
  const router = useRouter();
  const inCart = items.some((item) => item.id === id);

  const sliderMedia = useMemo(() => {
    console.log('', mediaType, aspectRatio);
    if (mediaType === 'IMAGE') {
      switch (aspectRatio) {
        case '1:1':
          return [
            {
              src: '/images/gallery/1-to-1_1.jpg',
              thumbnail: '/images/gallery/1-to-1_1.jpg',
            },
            {
              src: '/images/gallery/1-to-1_2.jpg',
              thumbnail: '/images/gallery/1-to-1_2.jpg',
            },
            {
              src: '/images/gallery/1-to-1_3.jpg',
              thumbnail: '/images/gallery/1-to-1_3.jpg',
            },
          ];
        case '16:9':
          return [
            {
              src: '/images/gallery/16-to-9_1.jpg',
              thumbnail: '/images/gallery/16-to-9_1.jpg',
            },
            {
              src: '/images/gallery/16-to-9_2.jpg',
              thumbnail: '/images/gallery/16-to-9_2.jpg',
            },
            {
              src: '/images/gallery/16-to-9_1.jpg',
              thumbnail: '/images/gallery/16-to-9_1.jpg',
            },
          ];
        case '9:16':
          return [
            {
              src: '/images/gallery/9-to-16_1.jpg',
              thumbnail: '/images/gallery/9-to-16_1.jpg',
            },
            {
              src: '/images/gallery/9-to-16_1.jpg',
              thumbnail: '/images/gallery/9-to-16_1.jpg',
            },
            {
              src: '/images/gallery/9-to-16_1.jpg',
              thumbnail: '/images/gallery/9-to-16_1.jpg',
            },
          ];
        default:
          return [];
      }
    }

    if (mediaType === 'VIDEO') {
      switch (aspectRatio) {
        case '1:1':
          return [
            {
              src: '/images/gallery/1-to-1_1.mp4',
              thumbnail: '/images/gallery/1-to-1-cover_1.avif',
            },
            {
              src: '/images/gallery/1-to-1_2.mp4',
              thumbnail: '/images/gallery/1-to-1-cover_2.avif',
            },
          ];
        case '16:9':
          return [
            {
              src: '/images/gallery/16-to-9_1.mp4',
              thumbnail: '/images/gallery/16-to-9-cover_1.avif',
            },
            {
              src: '/images/gallery/16-to-9_2.mp4',
              thumbnail: '/images/gallery/16-to-9-cover_2.avif',
            },
          ];
        case '9:16':
          return [
            {
              src: '/images/gallery/9-to-16_1.mp4',
              thumbnail: '/images/gallery/9-to-16-cover_1.avif',
            },
            {
              src: '/images/gallery/9-to-16_2.mp4',
              thumbnail: '/images/gallery/9-to-16-cover_2.avif',
            },
          ];
        default:
          return [];
      }
    }

    return [];
  }, [aspectRatio, mediaType]);

  return (
    <div className="flex flex-col gap-6 p-6 md:flex-row">
      {/* Image slider */}
      <div className="flex min-w-0 flex-1 items-center justify-center">
        {/* <ThumbnailSlider
          mediaType={mediaType}
          slides={sliderMedia}
          aspectRatio={aspectRatio}
        /> */}
      </div>

      {/* Info panel */}
      <div className="flex w-full flex-col gap-5 md:w-[380px] md:shrink-0">
        {/* Category badges */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
            AI Prompt
          </span>
          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            Instant Download
          </span>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-xl font-bold leading-snug">{PRODUCT_NAME}</h2>
          <p className="mt-1 text-xs text-muted-foreground">#{id}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2.5">
          <span className="text-3xl font-bold tracking-tight">
            NT$&nbsp;{PRODUCT_PRICE.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            NT$&nbsp;2,000
          </span>
          <span className="rounded bg-destructive/15 px-1.5 py-0.5 text-xs font-bold text-destructive">
            -25%
          </span>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          A professionally engineered AI prompt pack for generating cinematic
          portrait lighting. Includes 10+ style variations optimized for
          Firefly, Midjourney, and Stable Diffusion.
        </p>

        <div className="h-px bg-border" />

        {/* Compatible with */}
        <div className="space-y-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Compatible with
          </p>
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width={22}
              height={22}
              src="/images/fake/adobe-ai.png"
              alt="Adobe Illustrator"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width={22}
              height={22}
              src="/images/fake/adobe-ps.png"
              alt="Adobe Photoshop"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width={22}
              height={22}
              src="/images/fake/adobe-id.png"
              alt="Adobe InDesign"
            />
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* CTA buttons */}
        <div className="flex flex-col gap-2.5">
          <Button
            size="lg"
            className="w-full font-semibold"
            onClick={() => {
              addItem({
                id,
                name: PRODUCT_NAME,
                price: PRODUCT_PRICE,
                mediaType,
                thumbnail: sliderMedia[0]?.thumbnail ?? '',
              });
              router.push(RouterUrl.Cart);
            }}
          >
            Buy Now
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            disabled={inCart}
            onClick={() =>
              addItem({
                id,
                name: PRODUCT_NAME,
                price: PRODUCT_PRICE,
                mediaType,
                thumbnail: sliderMedia[0]?.thumbnail ?? '',
              })
            }
          >
            <IconShoppingCart className="h-4 w-4" />
            {inCart ? 'Added to Cart' : 'Add to Cart'}
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <IconShieldCheck size={14} />
            Secure checkout
          </span>
          <span className="flex items-center gap-1.5">
            <IconDownload size={14} />
            Instant access
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromptDetailView;
