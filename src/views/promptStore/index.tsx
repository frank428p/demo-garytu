'use client';

import { useState } from 'react';
import { H2, H4 } from '@/components/ui/typography';
import { IconPhoto } from '@tabler/icons-react';
import { MasonryPhotoAlbum } from 'react-photo-album';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import PromptDetailView from '@/views/promptStore/detail';
import 'react-photo-album/masonry.css';

const photos = [
  { src: '/images/gallery/1.jpeg', width: 2150, height: 2150, id: '1' },
  { src: '/images/gallery/2.jpeg', width: 1064, height: 1066, id: '2' },
  { src: '/images/gallery/3.jpeg', width: 2752, height: 1536, id: '3' },
  { src: '/images/gallery/4.jpeg', width: 2150, height: 2150, id: '4' },
  { src: '/images/gallery/5.jpeg', width: 2150, height: 2150, id: '5' },
  { src: '/images/gallery/6.jpeg', width: 2150, height: 2150, id: '6' },
  { src: '/images/gallery/7.jpeg', width: 576, height: 617, id: '7' },
  { src: '/images/gallery/8.jpeg', width: 2048, height: 2048, id: '8' },
  { src: '/images/gallery/9.jpeg', width: 2150, height: 2150, id: '9' },
  { src: '/images/gallery/10.jpeg', width: 2048, height: 2048, id: '10' },
  { src: '/images/gallery/11.jpeg', width: 2048, height: 2048, id: '11' },
  { src: '/images/gallery/12.jpeg', width: 2150, height: 2150, id: '12' },
  { src: '/images/gallery/13.jpeg', width: 2752, height: 1536, id: '13' },
  { src: '/images/gallery/14.jpeg', width: 576, height: 1024, id: '14' },

  { src: '/images/gallery/9.jpeg', width: 2150, height: 2150, id: '15' },
  { src: '/images/gallery/7.jpeg', width: 576, height: 617, id: '16' },
  { src: '/images/gallery/2.jpeg', width: 1064, height: 1066, id: '17' },
  { src: '/images/gallery/14.jpeg', width: 576, height: 1024, id: '18' },
  { src: '/images/gallery/10.jpeg', width: 2048, height: 2048, id: '19' },
  { src: '/images/gallery/6.jpeg', width: 2150, height: 2150, id: '20' },
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
          photo: (_props, { photo, index, width, height }) => (
            <div
              key={index}
              onClick={() => handleOpen(photo.id)}
              style={{ width, height: 'auto' }}
              className="relative group cursor-pointer overflow-hidden rounded-xl border border-border bg-card block"
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <VisuallyHidden>
            <DialogTitle>Prompt #{selectedId}</DialogTitle>
          </VisuallyHidden>
          {selectedId && <PromptDetailView id={selectedId} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PromptStoreView;
