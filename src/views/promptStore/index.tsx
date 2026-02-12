'use client';

import { H2, H4 } from '@/components/ui/typography';
import { IconPhoto } from '@tabler/icons-react';
import { MasonryPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/masonry.css';

const photos = [
  { src: '/images/gallery/1.jpeg', width: 2150, height: 2150 },
  { src: '/images/gallery/2.jpeg', width: 1064, height: 1066 },
  { src: '/images/gallery/3.jpeg', width: 2752, height: 1536 },
  { src: '/images/gallery/4.jpeg', width: 2150, height: 2150 },
  { src: '/images/gallery/5.jpeg', width: 2150, height: 2150 },
  { src: '/images/gallery/6.jpeg', width: 2150, height: 2150 },
  { src: '/images/gallery/7.jpeg', width: 576, height: 617 },
  { src: '/images/gallery/8.jpeg', width: 2048, height: 2048 },
  { src: '/images/gallery/9.jpeg', width: 2150, height: 2150 },
  { src: '/images/gallery/10.jpeg', width: 2048, height: 2048 },
  { src: '/images/gallery/11.jpeg', width: 2048, height: 2048 },
  { src: '/images/gallery/12.jpeg', width: 2150, height: 2150 },
  { src: '/images/gallery/13.jpeg', width: 2752, height: 1536 },
  { src: '/images/gallery/14.jpeg', width: 576, height: 1024 },

  { src: '/images/gallery/9.jpeg', width: 2150, height: 2150 },
  { src: '/images/gallery/7.jpeg', width: 576, height: 617 },
  { src: '/images/gallery/2.jpeg', width: 1064, height: 1066 },
  { src: '/images/gallery/14.jpeg', width: 576, height: 1024 },
  { src: '/images/gallery/10.jpeg', width: 2048, height: 2048 },
  { src: '/images/gallery/6.jpeg', width: 2150, height: 2150 },
];

const PromptStoreView = () => {
  return (
    <div className="py-6">
      <H2 className="mb-6">Prompt Store</H2>
      <MasonryPhotoAlbum
        photos={photos}
        columns={(containerWidth) => {
          if (containerWidth < 640) return 2;
          if (containerWidth < 1024) return 3;
          if (containerWidth < 1280) return 4;
          return 5;
        }}
        spacing={8}
        render={{
          photo: (_props, { photo, index, width, height }) => (
            <div
              key={index}
              style={{ width, height: 'auto' }}
              className="relative group cursor-pointer overflow-hidden rounded-xl border border-border bg-card"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={`AI Artwork ${index + 1}`}
                width={width}
                height={height}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-100"
              />

              <div className="absolute text-xs font-bold top-3 right-3 z-[1] flex items-center h-6 px-2 py-1 rounded bg-black/50 text-white pointer-events-none">
                {/* <IconPhoto size={16} /> */}
                Video
              </div>

              {/* <div className="absolute inset-x-0 bottom-0  px-3 pb-3">
                <H4>NT$ 1,500</H4>
              </div> */}
              {/* <div className="p-3">
                <p className="text-sm font-medium text-card-foreground">
                  AI Artwork
                </p>
                <p className="mt-1 text-xs text-muted-foreground">by Creator</p>
              </div> */}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default PromptStoreView;
