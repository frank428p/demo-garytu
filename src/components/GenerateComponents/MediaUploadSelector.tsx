import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { FrameUploader } from './FrameUploader';

export function MediaUploadSelector() {
  return (
    <>
      <div className="flex flex-col gap-2 p-2 bg-card rounded-xl">
        <ToggleGroup type="single" variant="segmented" defaultValue="16:9">
          {(['Elements', 'Frames'] as const).map((resolution) => (
            <ToggleGroupItem key={resolution} value={resolution}>
              {resolution}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <FrameUploader
          label="Add consistent element"
          description="Character, person or object"
          required
          multiple
        />
        {/* <div className="flex gap-2">
          <FrameUploader label="Add a start frame" required />
          <FrameUploader label="Add an end frame" />
        </div> */}
      </div>
    </>
  );
}
