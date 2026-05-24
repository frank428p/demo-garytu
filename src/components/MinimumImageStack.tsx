import { cn } from '@/lib/utils';

interface MinimumImageStackProps {
  images: [string] | [string, string] | [string, string, string];
  size?: number;
  className?: string;
}

const ROTATIONS = [0, 10, -10] as const;

export function MinimumImageStack({
  images,
  size = 64,
  className,
}: MinimumImageStackProps) {
  return (
    <div
      className={cn('relative', className)}
      style={{ width: size, height: size }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 overflow-hidden rounded-sm border-1 border-white shadow-md"
          style={{
            transform: `rotate(${ROTATIONS[i]}deg)`,
            zIndex: i + 1,
          }}
        >
          <img src={src} alt="" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}
