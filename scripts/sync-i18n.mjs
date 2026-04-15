import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const ROOT = process.cwd();
const SCAN_DIR = join(ROOT, 'src');
const EN_PATH = join(ROOT, 'i18n/common/en.json');
const ZH_PATH = join(ROOT, 'i18n/common/zh-TW.json');
const EXCLUDE_DIRS = new Set(['node_modules', '.next', 'dist', '.git']);

// Collect all .ts / .tsx files
function collectFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    if (EXCLUDE_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...collectFiles(full));
    } else if (['.ts', '.tsx'].includes(extname(entry))) {
      results.push(full);
    }
  }
  return results;
}

// Extract keys from t('xxx') or t("xxx")
// Skips dynamic expressions like t(`...`) or t(variable)
function extractKeys(content) {
  const keys = new Set();
  const regex = /\bt\(\s*(['"])([^'"]+)\1\s*[),]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    keys.add(match[2]);
  }
  return keys;
}

// Read JSON safely
function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch {
    return {};
  }
}

// Write JSON preserving existing key order, new keys appended at the end
function writeJson(path, obj) {
  writeFileSync(path, JSON.stringify(obj, null, 2) + '\n', 'utf-8');
}

// Main
const files = collectFiles(SCAN_DIR);
const allKeys = new Set();

for (const file of files) {
  const content = readFileSync(file, 'utf-8');
  for (const key of extractKeys(content)) {
    allKeys.add(key);
  }
}

const en = readJson(EN_PATH);
const zh = readJson(ZH_PATH);

let added = 0;
for (const key of allKeys) {
  if (!(key in en)) {
    en[key] = key;
    zh[key] = key;
    added++;
    console.log(`  + ${key}`);
  }
}

writeJson(EN_PATH, en);
writeJson(ZH_PATH, zh);

console.log(`\nScanned ${files.length} files, found ${allKeys.size} keys, added ${added} new keys.`);
