import VideoGenerate from '@/components/VideoGenerate';

const VideoGenerateView = () => {
  return (
    <div className="flex gap-4 pt-4">
      <div className="w-[480px] shrink-0">
        <VideoGenerate />
      </div>
      <div className="flex-1">
        <div className="bg-card p-4 rounded-lg"></div>
      </div>
    </div>
  );
};

export default VideoGenerateView;
