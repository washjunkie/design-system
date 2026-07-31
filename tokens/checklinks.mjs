#!/usr/bin/env node
/**
 * Relative-link checker for the documentation.
 *
 * A design system's docs are mostly cross-references; a broken one sends
 * somebody to guess instead of to the answer. Cheap to check, so check it.
 *
 *   node tokens/checklinks.mjs      non-zero exit on any dead link
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.name.startsWith('.') || e.name === 'node_modules') return [];
    const p = join(dir, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : [];
  });

const LINK = /\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
let checked = 0;
const dead = [];

for (const file of walk(ROOT)) {
  const src = readFileSync(file, 'utf8');
  for (const [, href] of src.matchAll(LINK)) {
    // External, anchors, and mailto are somebody else's problem.
    if (/^(https?:|mailto:|#)/.test(href)) continue;
    const target = resolve(dirname(file), href.split('#')[0]);
    checked++;
    if (!existsSync(target)) dead.push(`${relative(ROOT, file)}  →  ${href}`);
  }
}

console.log(`\n  ${checked} relative links checked across the docs`);
if (dead.length) {
  console.log(`\n  ✗ ${dead.length} dead:\n`);
  dead.forEach((d) => console.log(`    ${d}`));
  console.log();
  process.exit(1);
}
console.log('  ✓ all resolve\n');
