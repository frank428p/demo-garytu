import { useBreakpoint } from '@/@core/hooks/useBreakpoint';
import { AssetsPanel } from '@/components/Assets/AssetsPanel';
import VideoGenerate from '@/components/VideoGenerate';

const VideoGenerateView = () => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  return (
    <div className="flex gap-4 h-full">
      <div className="w-full lg:w-[360px] shrink-0">
        <VideoGenerate />
      </div>
      {isDesktop && (
        <div className="flex-1">
          <AssetsPanel />
          {/* <div className="bg-card p-4 rounded-3xl max-h-[calc(100vh-56px-12px)] h-full"></div> */}
        </div>
      )}
    </div>
  );
};

export default VideoGenerateView;
