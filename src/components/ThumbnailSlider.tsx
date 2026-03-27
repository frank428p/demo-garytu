'use client';

import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useBreakpoint } from '@/@core/hooks/useBreakpoint';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Image from 'next/image';

const images = [
  '/images/gallery/1-to-1_1.jpg',
  '/images/gallery/1-to-1_2.jpg',
  '/images/gallery/1-to-1_1.jpg',
  '/images/gallery/1-to-1_2.jpg',
  '/images/gallery/1-to-1_1.jpg',
  '/images/gallery/1-to-1_2.jpg',
  '/images/gallery/1-to-1_1.jpg',
  '/images/gallery/1-to-1_1.jpg',
  '/images/gallery/1-to-1_1.jpg',
  '/images/gallery/1-to-1_1.jpg',
  '/images/gallery/1-to-1_1.jpg',
  '/images/gallery/1-to-1_1.jpg',
  '/images/gallery/1-to-1_1.jpg',
];

function ThumbnailSliderInner({ isDesktop }: { isDesktop: boolean }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="w-full max-w-full overflow-hidden [&_.swiper-button-next]:text-white [&_.swiper-button-next]:w-6 [&_.swiper-button-next]:h-6 [&_.swiper-button-prev]:text-white [&_.swiper-button-prev]:w-6 [&_.swiper-button-prev]:h-6 [&_.swiper-button-next:after]:text-2xl [&_.swiper-button-prev:after]:text-2xl">
      {isDesktop ? (
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
              className="rounded-lg"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} className="!h-auto cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="block w-full rounded-md object-cover aspect-square opacity-50 [.swiper-slide-thumb-active_&]:opacity-100"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 主圖：grid 第 2 欄，決定父容器高度 */}
          <div className="min-w-0" style={{ gridColumn: 2 }}>
            <Swiper
              modules={[FreeMode, Navigation, Thumbs]}
              spaceBetween={10}
              navigation
              thumbs={{ swiper: thumbsSwiper }}
              className="rounded-lg"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <Image
                    src={image}
                    alt={`Slide ${index + 1}`}
                    width={1120}
                    height={1120}
                    className="block w-full rounded-lg"
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {/* 主圖 */}
          <Swiper
            modules={[FreeMode, Navigation, Thumbs]}
            spaceBetween={10}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            className="rounded-lg"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="block w-full rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* lg 以下：下方水平縮圖 */}
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[FreeMode, Thumbs]}
            spaceBetween={8}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            className="w-full rounded-lg"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="block w-full rounded-md object-cover aspect-video opacity-50 [.swiper-slide-thumb-active_&]:opacity-100"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export function ThumbnailSlider() {
  const { isDesktop, isTablet, isMobile } = useBreakpoint();
  return (
    <ThumbnailSliderInner
      key={isDesktop || isTablet ? 'desktop' : 'mobile'}
      isDesktop={!!(isDesktop || isTablet)}
    />
  );
}
