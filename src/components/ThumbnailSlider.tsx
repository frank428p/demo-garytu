'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import type { Swiper as SwiperType } from 'swiper';

import 'react-photo-view/dist/react-photo-view.css';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useBreakpoint } from '@/@core/hooks/useBreakpoint';
import { MediaType } from '@/@core/types/index';
import { PromptFile } from '@/@core/types/prompt';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

function VideoSlide({
  src,
  poster,
  isActive,
}: {
  src: string;
  poster: string;
  isActive: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  // Sync play/pause with active state via ref
  const handleRef = (el: HTMLVideoElement | null) => {
    (ref as { current: HTMLVideoElement | null }).current = el;
    if (!el) return;
    if (isActive) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  return (
    <video
      ref={handleRef}
      src={src}
      poster={poster}
      controls
      controlsList="nodownload noremoteplayback"
      disablePictureInPicture
      loop
      muted
      playsInline
      preload="metadata"
      className="h-full w-full object-contain"
      onPointerDown={(e) => e.stopPropagation()}
      onError={(e) => {
        (e.currentTarget as HTMLVideoElement).style.display = 'none';
      }}
    />
  );
}

function ThumbnailSliderInner({
  isMobile,
  mediaType,
  files,
}: {
  isMobile: boolean;
  mediaType: MediaType;
  files: PromptFile[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const mainSwiperProps = {
    modules: [FreeMode, Thumbs],
    spaceBetween: 10,
    thumbs: { swiper: thumbsSwiper },
    onSlideChange: (swiper: SwiperType) => setActiveIndex(swiper.activeIndex),
  };

  const renderSlides = (rounded: string) =>
    files.map((item, index) => (
      <SwiperSlide key={index}>
        {mediaType === 'VIDEO' ? (
          <VideoSlide
            src={item.url}
            poster={item.thumbnail_url}
            isActive={index === activeIndex}
          />
        ) : (
          <PhotoView src={item.url}>
            <Image
              src={item.url}
              alt={`Slide ${index + 1}`}
              width={1120}
              height={1120}
              className={`block w-full cursor-zoom-in ${rounded}`}
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          </PhotoView>
        )}
      </SwiperSlide>
    ));

  return (
    <div className="w-full max-w-full overflow-hidden [&_.swiper-button-next]:text-white [&_.swiper-button-next]:w-6 [&_.swiper-button-next]:h-6 [&_.swiper-button-prev]:text-white [&_.swiper-button-prev]:w-6 [&_.swiper-button-prev]:h-6 [&_.swiper-button-next:after]:text-2xl [&_.swiper-button-prev:after]:text-2xl">
      {!isMobile ? (
        <div
          className="relative grid gap-4"
          style={{ gridTemplateColumns: '5rem minmax(0, 1fr)' }}
        >
          {/* 左側縮圖：absolute 貼滿父容器高度 */}
          <div className="absolute top-0 left-0 w-20 h-full overflow-hidden">
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[FreeMode, Thumbs]}
              direction="vertical"
              spaceBetween={8}
              slidesPerView="auto"
              freeMode
              watchSlidesProgress
              style={{ height: '100%' }}
              className="rounded-xl"
            >
              {files.map((item, index) => (
                <SwiperSlide key={index} className="!h-auto cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.thumbnail_url}
                    alt={`Thumbnail ${index + 1}`}
                    className="block w-full rounded-xl object-cover aspect-square opacity-50 [.swiper-slide-thumb-active_&]:opacity-100"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 主圖：grid 第 2 欄，決定父容器高度 */}
          <div className="min-w-0" style={{ gridColumn: 2 }}>
            <PhotoProvider>
              <Swiper {...mainSwiperProps} className="rounded-3xl">
                {renderSlides('!rounded-xl')}
              </Swiper>
            </PhotoProvider>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {/* 主圖 */}
          <PhotoProvider>
            <Swiper {...mainSwiperProps} className="rounded-lg">
              {renderSlides('!rounded-xl')}
            </Swiper>
          </PhotoProvider>

          {/* 下方水平縮圖 */}
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[FreeMode, Thumbs]}
            spaceBetween={8}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            className="w-full rounded-xl"
          >
            {files.map((item, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.thumbnail_url}
                  alt={`Thumbnail ${index + 1}`}
                  className="block w-full rounded-md object-cover aspect-square opacity-50 [.swiper-slide-thumb-active_&]:opacity-100"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export function ThumbnailSlider({
  mediaType,
  files,
}: {
  mediaType: MediaType;
  files: PromptFile[];
}) {
  const { isMobile } = useBreakpoint();
  return (
    <ThumbnailSliderInner
      key={isMobile ? 'mobile' : 'desktop'}
      isMobile={isMobile}
      mediaType={mediaType}
      files={files}
    />
  );
}

const a = {
  'zh-TW': '',
};
