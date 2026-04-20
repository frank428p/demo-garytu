import { copyFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = join(__dirname, '../node_modules/@embedpdf/pdfium/dist/pdfium.wasm');
const dest = join(__dirname, '../public/pdfium.wasm');

mkdirSync(join(__dirname, '../public'), { recursive: true });
copyFileSync(src, dest);
console.log('✓ pdfium.wasm copied to public/');
