'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import type { Swiper as SwiperType } from 'swiper';

import 'react-photo-view/dist/react-photo-view.css';
import { FreeMode, Thumbs } from 'swiper/modules';
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
    <div className="relative h-full w-full">
      {/* Blurred poster fills letterbox areas */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-50"
      />
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
        className="relative h-full w-full object-contain"
        onPointerDown={(e) => e.stopPropagation()}
        onError={(e) => {
          (e.currentTarget as HTMLVideoElement).style.display = 'none';
        }}
      />
    </div>
  );
}

function ThumbnailSliderInner({
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

  const renderSlides = () =>
    files.map((item, index) => (
      <SwiperSlide key={index} className="!h-full">
        {mediaType === 'VIDEO' ? (
          <VideoSlide
            src={item.url}
            poster={item.thumbnail_url}
            isActive={index === activeIndex}
          />
        ) : (
          <PhotoView src={item.url}>
            <div className="relative h-full w-full">
              {/* Blurred background fills letterbox areas */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-50"
              />
              <Image
                src={item.url}
                alt={`Slide ${index + 1}`}
                fill
                className="relative cursor-zoom-in object-contain"
                sizes="(min-width: 768px) 100vw, 100vw"
              />
            </div>
          </PhotoView>
        )}
      </SwiperSlide>
    ));

  return (
    <div className="w-full [&_.swiper-button-next]:text-white [&_.swiper-button-next]:w-6 [&_.swiper-button-next]:h-6 [&_.swiper-button-prev]:text-white [&_.swiper-button-prev]:w-6 [&_.swiper-button-prev]:h-6 [&_.swiper-button-next:after]:text-2xl [&_.swiper-button-prev:after]:text-2xl">
      <div className="space-y-2">
        {/* 主圖：mobile 全出血，desktop 全寬，16:9 高度自動 */}
        <div className="relative -mx-4 w-[calc(100%+2rem)] lg:mx-0 lg:w-full h-[min(56.25vw,540px)] overflow-hidden lg:rounded-2xl">
          <PhotoProvider>
            <Swiper
              {...mainSwiperProps}
              className="absolute inset-0 h-full w-full"
            >
              {renderSlides()}
            </Swiper>
          </PhotoProvider>
        </div>

        {/* 縮圖列 */}
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          spaceBetween={6}
          slidesPerView={5}
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
                className="block w-full rounded-md object-cover aspect-video opacity-50 [.swiper-slide-thumb-active_&]:opacity-100"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
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
