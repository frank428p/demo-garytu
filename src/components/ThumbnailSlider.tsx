'use client';

import Image from 'next/image';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import type { Swiper as SwiperType } from 'swiper';
import {
  MediaPlayer,
  MediaProvider,
  useMediaRemote,
  useMediaState,
} from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';

import 'react-photo-view/dist/react-photo-view.css';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { FreeMode, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useBreakpoint } from '@/@core/hooks/useBreakpoint';
import { MediaType } from '@/@core/types/index';
import { PromptFile } from '@/@core/types/prompt';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function VideoDurationBadge({ src }: { src: string }) {
  const [duration, setDuration] = useState<number | null>(null);
  return (
    <>
      {/* preload="metadata" only fetches headers, not full video */}
      <video
        src={src}
        preload="metadata"
        className="hidden"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />
      {duration != null && (
        <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 py-0.5 text-[10px] font-medium text-white leading-none">
          {formatDuration(duration)}
        </span>
      )}
    </>
  );
}

function VideoPlayController({ isActive }: { isActive: boolean }) {
  const remote = useMediaRemote();
  const canPlay = useMediaState('canPlay');

  useEffect(() => {
    if (!canPlay) return;
    if (isActive) {
      remote.play();
    } else {
      remote.pause();
    }
  }, [isActive, canPlay, remote]);
  return null;
}

function VideoSlide({
  src,
  poster,
  isActive,
}: {
  src: string;
  poster: string;
  isActive: boolean;
}) {
  return (
    <MediaPlayer
      src={src}
      playsInline
      loop
      muted
      autoPlay={isActive}
      className="group !border-none relative h-full w-full max-h-[640px] overflow-hidden rounded-lg bg-black text-white"
    >
      <VideoPlayController isActive={isActive} />

      {/* 背景 */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 blur-2xl"
        style={poster ? { backgroundImage: `url(${poster})` } : undefined}
      />
      <div className="absolute inset-0 bg-black/45" />

      {/* 左右影院漸層 */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-black/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-black/80 to-transparent" />

      {/* 影片畫面 */}
      <div className="absolute w-full h-full flex items-center justify-center overflow-hidden">
        <div className="relative h-full">
          <MediaProvider className="absolute inset-0 flex items-center justify-center media-player-fill" />
        </div>
      </div>

      {/* DefaultVideoLayout 必須是 MediaPlayer 的直接子元素 */}
      <DefaultVideoLayout
        icons={defaultLayoutIcons}
        slots={{
          settingsMenu: null,
          googleCastButton: null,
          pipButton: null,
        }}
      />
    </MediaPlayer>
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

  const handleSlideChange = useCallback(
    (swiper: SwiperType) => setActiveIndex(swiper.activeIndex),
    [],
  );

  const mainSwiperProps = useMemo(
    () => ({
      modules: [FreeMode, Thumbs],
      spaceBetween: 10,
      thumbs: { swiper: thumbsSwiper },
      onSlideChange: handleSlideChange,
      noSwipingSelector: '[data-media-player]',
    }),
    [thumbsSwiper, handleSlideChange],
  );

  const renderSlides = () =>
    files.map((item, index) => (
      <SwiperSlide key={index} className="!h-full">
        {mediaType === 'VIDEO' ? (
          <div
            className="h-full w-full"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <VideoSlide
              src={item.url}
              poster={item.thumbnail_url}
              isActive={index === activeIndex}
            />
          </div>
        ) : (
          <PhotoView src={item.url}>
            <div className="relative h-full w-full">
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
    <div className="w-full max-w-full overflow-hidden [&_.swiper-button-next]:text-white [&_.swiper-button-next]:w-6 [&_.swiper-button-next]:h-6 [&_.swiper-button-prev]:text-white [&_.swiper-button-prev]:w-6 [&_.swiper-button-prev]:h-6 [&_.swiper-button-next:after]:text-2xl [&_.swiper-button-prev:after]:text-2xl">
      {!isMobile ? (
        <div
          className="grid gap-6 h-[min(56.25vw,520px)] max-h-[520px]"
          style={{ gridTemplateColumns: '100px minmax(0, 1fr)' }}
        >
          {/* 左側縮圖：absolute 貼滿父容器高度 */}
          <div className="w-25 h-full">
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[FreeMode, Thumbs]}
              direction="vertical"
              spaceBetween={8}
              slidesPerView="auto"
              freeMode
              watchSlidesProgress
              style={{
                height: '100%',
                overflowX: 'visible',
                overflowY: 'clip',
              }}
              className=""
            >
              {files.map((item, index) => (
                <SwiperSlide key={index} className="!h-auto z-5">
                  <div className="thumb-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.thumbnail_url}
                      alt={`Thumbnail ${index + 1}`}
                    />
                    {mediaType === 'VIDEO' && (
                      <VideoDurationBadge src={item.url} />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 主圖：grid 第 2 欄，決定父容器高度 */}
          <div
            className="min-w-0 h-full max-h-[520px]"
            style={{ gridColumn: 2 }}
          >
            <PhotoProvider>
              <Swiper
                {...mainSwiperProps}
                className="rounded-lg h-full border border-border border-[2px]"
              >
                {renderSlides()}
              </Swiper>
            </PhotoProvider>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {/* 主圖 */}
          <div className="aspect-video">
            <PhotoProvider>
              <Swiper {...mainSwiperProps} className="rounded-lg h-full">
                {renderSlides()}
              </Swiper>
            </PhotoProvider>
          </div>

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
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.thumbnail_url}
                    alt={`Thumbnail ${index + 1}`}
                    className="block w-full h-20 rounded-md object-cover aspect-square opacity-50 [.swiper-slide-thumb-active_&]:opacity-100"
                  />
                  {mediaType === 'VIDEO' && (
                    <VideoDurationBadge src={item.url} />
                  )}
                </div>
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
