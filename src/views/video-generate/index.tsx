import { useBreakpoint } from '@/@core/hooks/useBreakpoint';
import VideoGenerate from '@/components/VideoGenerate';

const VideoGenerateView = () => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  return (
    <div className="flex gap-4 h-full">
      <div className="w-full lg:w-[480px] shrink-0">
        <VideoGenerate />
      </div>
      {isDesktop && (
        <div className="flex-1">
          <div className="bg-card/60 p-4 rounded-3xl max-h-[calc(100vh-56px-12px)] h-full">
            {/* <img src="/images/gallery/1-to-1_1.jpg"></img> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGenerateView;
