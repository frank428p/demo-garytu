import { Slider } from '../ui/slider';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

const MOCK_DATA = [
  {
    uuid: '',
    url: '',
    thumbnail_url: '',
    file_type: 'VIDEO',
  },
];

export function AssetsPanel() {
  return (
    <div className="bg-card/60 rounded-xl  max-h-[calc(100vh-56px-12px)] h-full">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <ToggleGroup
            type="single"
            size="sm"
            variant="segmented"
            defaultValue="16:9"
          >
            {(['All', 'Images', 'Videos'] as const).map((resolution) => (
              <ToggleGroupItem
                key={resolution}
                value={resolution}
                className="px-5 h-7"
              >
                {resolution}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <Slider
            defaultValue={[1]}
            max={4}
            min={1}
            step={1}
            className="w-full max-w-[150px]"
          />
        </div>
      </div>
    </div>
  );
}
