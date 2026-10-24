// Lists which of the 168 wireframed screens have a route with data.screenId.
// Usage: node tools/screen-coverage.mjs [--strict]   (--strict fails when any screen is missing; use from Phase 12)
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const strict = process.argv.includes('--strict') || process.env.SCREENS_STRICT === '1';

const candidateWireframeDirs = [
  path.resolve(__dirname, '../docs/wireframes/screens'),
  path.resolve(process.cwd(), 'docs/wireframes/screens'),
  path.resolve(process.cwd(), '../parentpath-kit/docs/wireframes/screens'),
];
const wireframeDir = candidateWireframeDirs.find((dir) => existsSync(dir));
if (!wireframeDir) {
  console.error('Cannot locate docs/wireframes/screens');
  process.exit(1);
}

const wireframes = readdirSync(wireframeDir)
  .filter((f) => f.endsWith('.html'))
  .map((f) => f.replace(/\.html$/, ''))
  .sort();

const candidateSrcDirs = [
  path.resolve(process.cwd(), 'src'),
  path.resolve(__dirname, '../../parentpath/src'),
  path.resolve(process.cwd(), 'parentpath/src'),
];
const srcDir = candidateSrcDirs.find((dir) => existsSync(dir));

const found = new Set();
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(ts|html)$/.test(name)) {
      for (const m of readFileSync(full, 'utf8').matchAll(/screenId:\s*['"]([A-Z]{3}-SCR-[A-Z]?\d+)['"]/g)) {
        found.add(m[1]);
      }
    }
  }
};
if (srcDir) {
  walk(srcDir);
}

const missing = wireframes.filter((id) => !found.has(id));
const unknown = [...found].filter((id) => !wireframes.includes(id));
console.log(`Screens implemented: ${wireframes.length - missing.length} / ${wireframes.length}`);
if (unknown.length) console.log(`Unknown screen IDs in code: ${unknown.join(', ')}`);
if (missing.length) console.log(`Missing: ${missing.join(', ')}`);
process.exit((strict && missing.length) || unknown.length ? 1 : 0);
