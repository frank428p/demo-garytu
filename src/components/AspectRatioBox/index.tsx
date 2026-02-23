import React from 'react';

type AspectRatioBoxProps = {
  ratio: string; // e.g. "1:1" | "16:9" | "9:16"
  maxSize?: number; // 長邊最大 px，預設 20
  className?: string;
};

function parseRatio(ratio: string) {
  const [wStr, hStr] = ratio.split(':');
  const w = Number(wStr);
  const h = Number(hStr);

  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
    throw new Error(`Invalid ratio: "${ratio}". Expected format like "16:9".`);
  }

  return { w, h };
}

function getFittedSize(ratio: string, maxSize: number) {
  const { w, h } = parseRatio(ratio);
  const scale = maxSize / Math.max(w, h);

  return {
    width: w * scale,
    height: h * scale,
  };
}

export default function AspectRatioBox({
  ratio,
  maxSize = 20,
  className = '',
}: AspectRatioBoxProps) {
  const { width, height } = getFittedSize(ratio, maxSize);

  return (
    <div
      className={`border border-gray-400 bg-transparent rounded-[2px] ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      title={`${ratio} (${width.toFixed(2)} x ${height.toFixed(2)} px)`}
    />
  );
}
