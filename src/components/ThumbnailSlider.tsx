'use client';

import { type MutableRefObject, useEffect } from 'react';
import {
  useKeenSlider,
  type KeenSliderPlugin,
  type KeenSliderInstance,
} from 'keen-slider/react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'keen-slider/keen-slider.min.css';
import 'react-photo-view/dist/react-photo-view.css';
import { cn } from '@/lib/utils';
import { MediaType } from '@/@core/types';

/** 容器尺寸變化時自動重算 slide 寬度 */
const ResizePlugin: KeenSliderPlugin = (slider) => {
  const observer = new ResizeObserver(() => {
    slider.update();
  });
  slider.on('created', () => {
    observer.observe(slider.container);
  });
  slider.on('destroyed', () => {
    observer.unobserve(slider.container);
  });
};

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>,
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove('active');
      });
    }
    function addActive(idx: number) {
      slider.slides[idx]?.classList.add('active');
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on('created', () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on('animationStarted', (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

type Slide = {
  src: string;
  thumbnail: string;
  alt?: string;
};

type ThumbnailSliderProps = {
  mediaType: MediaType;
  slides: Slide[];
  className?: string;
  aspectRatio?: string;
  thumbnailHeight?: string;
  thumbnailPerView?: number;
};

export default function ThumbnailSlider({
  mediaType,
  slides,
  className,
  aspectRatio,
  thumbnailHeight = 'h-[80px]',
  thumbnailPerView = 4,
}: ThumbnailSliderProps) {
  const cssAspectRatio = aspectRatio?.replace(':', '/');
  const maxH = 'calc(95vh - 10rem)';
  // 最大寬度 = min(100%, maxHeight × 寬高比)，確保高度碰上限時寬度同步縮減
  const [aw, ah] = (aspectRatio ?? '1:1').split(':').map(Number);
  const numericRatio = aw / ah;
  const mainSliderWidth = cssAspectRatio
    ? `min(100%, calc((95vh - 10rem) * ${numericRatio}))`
    : '100%';

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: { perView: 1 },
      renderMode: 'performance',
    },
    [ResizePlugin],
  );
  const [thumbnailRef, thumbnailInstanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      mode: 'free-snap',
      renderMode: 'performance',
      rubberband: false,
      drag: true,
      slides: {
        perView: thumbnailPerView,
        spacing: 8,
      },
    },
    [ThumbnailPlugin(instanceRef), ResizePlugin],
  );

  // Dialog 動畫結束後強制重算 slide 寬度（等 300ms 讓動畫完成）
  useEffect(() => {
    const timer = setTimeout(() => {
      instanceRef.current?.update();
      thumbnailInstanceRef.current?.update();
    }, 300);
    return () => clearTimeout(timer);
  }, [instanceRef, thumbnailInstanceRef]);

  return (
    <div
      className={cn('mx-auto', className)}
      style={{ width: mainSliderWidth }}
    >
      {/* Main slider */}
      {mediaType === 'IMAGE' && (
        <PhotoProvider>
          <div
            className="mx-auto overflow-hidden rounded-lg"
            style={{
              width: mainSliderWidth,
              aspectRatio: cssAspectRatio,
              maxHeight: maxH,
            }}
          >
            <div ref={sliderRef} className="keen-slider h-full">
              {slides.map((slide, i) => (
                <div key={i} className="keen-slider__slide !min-w-full h-full">
                  <PhotoView src={slide.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.src}
                      alt={slide.alt || `Slide ${i + 1}`}
                      className="h-full w-full cursor-zoom-in object-cover"
                    />
                  </PhotoView>
                </div>
              ))}
            </div>
          </div>
        </PhotoProvider>
      )}

      {mediaType === 'VIDEO' && (
        <div
          className="mx-auto overflow-hidden rounded-lg"
          style={{
            width: mainSliderWidth,
            aspectRatio: cssAspectRatio,
            maxHeight: maxH,
          }}
        >
          <div ref={sliderRef} className="keen-slider h-full">
            {slides.map((slide, i) => (
              <div
                key={i}
                className="keen-slider__slide !min-w-full h-full bg-black"
              >
                <video
                  src={slide.src}
                  poster={slide.thumbnail}
                  controls
                  controlsList="nodownload noremoteplayback"
                  disablePictureInPicture
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                  onPointerDown={(e) => e.stopPropagation()}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Thumbnail slider */}
      <div
        ref={thumbnailRef}
        className="keen-slider mt-2"
        style={{ overflow: 'clip', overflowClipMargin: '4px' }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={cn(
              'keen-slider__slide group relative cursor-pointer overflow-hidden rounded-md opacity-30 transition-[opacity] duration-200 [&.active]:opacity-100',
              thumbnailHeight,
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.thumbnail}
              alt={slide.alt || `Thumbnail ${i + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-md border-2 border-transparent group-[.active]:border-primary" />
          </div>
        ))}
      </div>
    </div>
  );
}
