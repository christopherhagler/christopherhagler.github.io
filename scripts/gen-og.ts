/* ---------------------------------------------------------------------------
   Generates a per-post Open Graph card (1200x630 PNG) into public/posts/og/.
   Run locally with `npm run og` after adding/retitling a post, then commit the
   PNGs. Kept out of the CI build on purpose so the deploy has no native-image
   dependency.
   --------------------------------------------------------------------------- */

import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { POSTS } from '../src/app/content';

const OUT = 'public/posts/og';
mkdirSync(OUT, { recursive: true });

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function wrap(text: string, max = 20): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(' ')) {
    if ((line + ' ' + word).trim().length > max) {
      if (line) lines.push(line);
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}

function card(title: string, meta: string): string {
  const lines = wrap(title);
  const startY = 300 - (lines.length - 1) * 45;
  const tspans = lines
    .map((l, i) => `<tspan x="90" dy="${i === 0 ? 0 : 90}">${esc(l)}</tspan>`)
    .join('');

  // Faint concentric radar rings + sweep, off to the right.
  const rings = [140, 250, 360, 470]
    .map((r) => `<circle cx="1040" cy="315" r="${r}" fill="none" stroke="#22d3ee" stroke-opacity="0.10"/>`)
    .join('');

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#22d3ee"/>
      <stop offset="0.55" stop-color="#a855f7"/>
      <stop offset="1" stop-color="#f472b6"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.1" r="0.9">
      <stop offset="0" stop-color="#a855f7" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#a855f7" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#07070b"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  ${rings}
  <line x1="1040" y1="315" x2="1380" y2="150" stroke="#22d3ee" stroke-opacity="0.35" stroke-width="3"/>
  <rect x="90" y="120" width="120" height="9" rx="4" fill="url(#g)"/>
  <text x="90" y="${startY}" font-family="Helvetica, Arial, sans-serif" font-size="78" font-weight="700" fill="#eef0f6">${tspans}</text>
  <text x="90" y="540" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="600" fill="#9aa0b4">${esc(meta)}</text>
  <text x="90" y="585" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="600" fill="#22d3ee">christopherhagler.github.io</text>
</svg>`;
}

async function main(): Promise<void> {
  for (const post of POSTS) {
    const svg = card(post.title, `Christopher Hagler  ·  ${post.date}  ·  ${post.minutes} min read`);
    const file = join(OUT, `${post.slug}.png`);
    await sharp(Buffer.from(svg)).png().toFile(file);
    console.log('OG image →', file);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
