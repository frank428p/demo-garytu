'use client';

import { useState } from 'react';
import { H2 } from '@/components/ui/typography';
import { MasonryPhotoAlbum } from 'react-photo-album';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import PromptDetailView from '@/views/explore/detail';
import 'react-photo-album/masonry.css';
import { AspectRatioType, MediaType } from '@/@core/types';
import { photos } from './photos';

type ExploreViewProps = {
  initialSelectedId?: string;
};

const ExploreView = ({ initialSelectedId }: ExploreViewProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(
    initialSelectedId ?? null,
  );

  const handleOpen = (id: string) => {
    setSelectedId(id);
    window.history.pushState(null, '', `/toolkit/explore/${id}`);
  };

  const handleClose = () => {
    setSelectedId(null);
    window.history.pushState(null, '', '/toolkit/explore');
  };

  const selectedPhoto = selectedId ? photos.find((p) => p.id === selectedId) : null;

  return (
    <div className="py-6">
      <H2 className="mb-6">Explore</H2>
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
              className="relative group cursor-pointer overflow-hidden rounded-xl border border-none bg-card block"
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
              mediaType={selectedPhoto?.mediaType as MediaType}
              aspectRatio={selectedPhoto?.aspectRatio as AspectRatioType}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExploreView;
