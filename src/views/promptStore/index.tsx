'use client';

import { useState } from 'react';
import { H2 } from '@/components/ui/typography';
import { MasonryPhotoAlbum } from 'react-photo-album';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import PromptDetailView from '@/views/promptStore/detail';
import 'react-photo-album/masonry.css';
import { AspectRatioType, MediaType } from '@/@core/types';

const photos = [
  {
    src: '/images/gallery/1-to-1_1.jpg',
    width: 1024,
    height: 1024,
    id: '1',
    aspectRatio: '1:1',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/1-to-1_2.jpg',
    width: 1024,
    height: 1024,
    id: '2',
    aspectRatio: '1:1',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/1-to-1_3.jpg',
    width: 1024,
    height: 1024,
    id: '3',
    aspectRatio: '1:1',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/9-to-16_1.jpg',
    width: 3072,
    height: 5440,
    id: '4',
    aspectRatio: '9:16',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/16-to-9_1.jpg',
    width: 5440,
    height: 3072,
    id: '5',
    aspectRatio: '16:9',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/16-to-9_2.jpg',
    width: 1376,
    height: 768,
    id: '6',
    aspectRatio: '16:9',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/1-to-1_1.mp4',
    poster: '/images/gallery/1-to-1-cover_1.avif',
    width: 1440,
    height: 1440,
    id: '7',
    aspectRatio: '1:1',
    mediaType: 'video',
  },
  {
    src: '/images/gallery/9-to-16_1.jpg',
    width: 3072,
    height: 5440,
    id: '8',
    aspectRatio: '9:16',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/1-to-1_2.jpg',
    width: 1024,
    height: 1024,
    id: '9',
    aspectRatio: '1:1',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/16-to-9_1.mp4',
    poster: '/images/gallery/16-to-9-cover_1.avif',
    width: 1344,
    height: 768,
    id: '10',
    aspectRatio: '16:9',
    mediaType: 'video',
  },
  {
    src: '/images/gallery/16-to-9_1.jpg',
    width: 5440,
    height: 3072,
    id: '11',
    aspectRatio: '16:9',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/1-to-1_3.jpg',
    width: 1024,
    height: 1024,
    id: '12',
    aspectRatio: '1:1',
    mediaType: 'image',
  },
  {
    src: '/images/gallery/9-to-16_2.mp4',
    poster: '/images/gallery/9-to-16-cover_2.avif',
    width: 1080,
    height: 1920,
    id: '13',
    aspectRatio: '9:16',
    mediaType: 'video',
  },
  {
    src: '/images/gallery/9-to-16_1.jpg',
    width: 3072,
    height: 5440,
    id: '14',
    aspectRatio: '9:16',
    mediaType: 'image',
  },

  {
    src: '/images/gallery/1-to-1_1.mp4',
    poster: '/images/gallery/1-to-1-cover_1.avif',
    width: 1440,
    height: 1440,
    id: '15',
    aspectRatio: '1:1',
    mediaType: 'video',
  },

  {
    src: '/images/gallery/1-to-1_2.mp4',
    poster: '/images/gallery/1-to-1-cover_2.avif',
    width: 1440,
    height: 1440,
    id: '16',
    aspectRatio: '1:1',
    mediaType: 'video',
  },

  {
    src: '/images/gallery/16-to-9_1.mp4',
    poster: '/images/gallery/16-to-9-cover_1.avif',
    width: 1344,
    height: 768,
    id: '17',
    aspectRatio: '16:9',
    mediaType: 'video',
  },
  {
    src: '/images/gallery/16-to-9_2.mp4',
    poster: '/images/gallery/16-to-9-cover_2.avif',
    width: 1344,
    height: 768,
    id: '18',
    aspectRatio: '16:9',
    mediaType: 'video',
  },
  {
    src: '/images/gallery/9-to-16_1.mp4',
    poster: '/images/gallery/9-to-16-cover_1.avif',
    width: 1080,
    height: 1920,
    id: '19',
    aspectRatio: '9:16',
    mediaType: 'video',
  },
  {
    src: '/images/gallery/9-to-16_2.mp4',
    poster: '/images/gallery/9-to-16-cover_2.avif',
    width: 1080,
    height: 1920,
    id: '20',
    aspectRatio: '9:16',
    mediaType: 'video',
  },
];

type PromptStoreViewProps = {
  initialSelectedId?: string;
};

const PromptStoreView = ({ initialSelectedId }: PromptStoreViewProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(
    initialSelectedId ?? null,
  );

  const handleOpen = (id: string) => {
    setSelectedId(id);
    window.history.pushState(null, '', `/toolkit/store/${id}`);
  };

  const handleClose = () => {
    setSelectedId(null);
    window.history.pushState(null, '', '/toolkit/store');
  };

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
          photo: (_props, { photo: media, index, width, height }) => (
            <div
              key={index}
              onClick={() => handleOpen(media.id)}
              style={{ width, height: 'auto' }}
              className="relative group cursor-pointer overflow-hidden rounded-xl border border-border bg-card block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {media.mediaType === 'image' && (
                <img
                  src={media.src}
                  alt={`AI Artwork ${index + 1}`}
                  width={width}
                  height={height}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-100"
                />
              )}

              {media.mediaType === 'video' && (
                <video
                  src={media.src}
                  poster={media.poster}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full object-cover"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                />
              )}
              {media.mediaType === 'video' && (
                <div className="absolute top-3 right-3 z-[1] flex items-center h-6 px-2 py-1 rounded bg-black/50 text-white text-xs font-bold pointer-events-none">
                  Video
                </div>
              )}
            </div>
          ),
        }}
      />

      <Dialog
        open={selectedId !== null}
        onOpenChange={(open) => {
          if (!open) handleClose();
        }}
      >
        <DialogContent className="p-0 max-w-[80vw]">
          <VisuallyHidden>
            <DialogTitle></DialogTitle>
          </VisuallyHidden>

          {selectedId && (
            <PromptDetailView
              id={selectedId}
              mediaType={(() => {
                const photo = photos.find((p) => p.id === selectedId);
                return photo?.mediaType as MediaType;
              })()}
              aspectRatio={(() => {
                const photo = photos.find((p) => p.id === selectedId);
                return photo?.aspectRatio as AspectRatioType;
              })()}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PromptStoreView;
