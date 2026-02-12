import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'images', 'gallery');

const images = [
  { name: 'img-01', w: 800, h: 1200, color: '#6366f1' },
  { name: 'img-02', w: 1200, h: 800, color: '#8b5cf6' },
  { name: 'img-03', w: 600, h: 600, color: '#ec4899' },
  { name: 'img-04', w: 1000, h: 1400, color: '#f43f5e' },
  { name: 'img-05', w: 1400, h: 900, color: '#f97316' },
  { name: 'img-06', w: 700, h: 1000, color: '#eab308' },
  { name: 'img-07', w: 900, h: 600, color: '#22c55e' },
  { name: 'img-08', w: 500, h: 800, color: '#14b8a6' },
  { name: 'img-09', w: 1100, h: 700, color: '#06b6d4' },
  { name: 'img-10', w: 800, h: 800, color: '#3b82f6' },
  { name: 'img-11', w: 600, h: 900, color: '#a855f7' },
  { name: 'img-12', w: 1300, h: 850, color: '#d946ef' },
  { name: 'img-13', w: 750, h: 1100, color: '#e11d48' },
  { name: 'img-14', w: 1000, h: 650, color: '#0ea5e9' },
  { name: 'img-15', w: 850, h: 1300, color: '#10b981' },
  { name: 'img-16', w: 1200, h: 750, color: '#f59e0b' },
  { name: 'img-17', w: 550, h: 700, color: '#84cc16' },
  { name: 'img-18', w: 950, h: 950, color: '#7c3aed' },
  { name: 'img-19', w: 1100, h: 1500, color: '#db2777' },
  { name: 'img-20', w: 1400, h: 800, color: '#0891b2' },
];

async function generate() {
  for (const img of images) {
    const svg = `<svg width="${img.w}" height="${img.h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${img.color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1e1b4b;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" />
      <text x="50%" y="50%" font-family="sans-serif" font-size="24" fill="rgba(255,255,255,0.6)" text-anchor="middle" dy=".3em">${img.w} × ${img.h}</text>
    </svg>`;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 80 })
      .toFile(path.join(outDir, `${img.name}.jpg`));

    console.log(`Generated ${img.name}.jpg (${img.w}x${img.h})`);
  }
  console.log('Done!');
}

generate();
