#!/usr/bin/env node
/**
 * Generate packages/react/src/logo-paths.ts from the source SVGs.
 *
 *   node tokens/logo-paths.mjs           rewrite the generated file
 *   node tokens/logo-paths.mjs --check   fail if it has drifted (CI)
 *
 * ## Why this exists
 *
 * The path data used to be lifted out of the SVGs by hand. At some point three
 * of the wordmark's fourteen paths were lost, and the mark rendered as
 * "wash jun" — on the operator console, in every email, on the favicon — for
 * weeks. Nothing caught it: the SVG still had a valid viewBox, the component
 * still sized itself correctly from the ratio, and the artwork still looked
 * deliberate. It just stopped three glyphs early.
 *
 * So the file is generated, and `--check` fails the build if the generated
 * output and the SVGs disagree. The COVERAGE assertion below is the part that
 * would actually have caught the original bug: it measures how far the path
 * data reaches across the viewBox, and a wordmark whose ink stops at 80% of its
 * own box is not a wordmark, it is a truncated one.
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(root, 'packages/react/src/logo-paths.ts');

const SOURCES = {
  wordmark: { file: 'assets/wj-wordmark.svg', viewBox: '0 0 325.06 56.01' },
  mark: { file: 'assets/wj-mark.svg', viewBox: '0 0 100.78 49.9' },
};

/** Every `d` attribute, in document order. */
const extractPaths = (svg) =>
  [...svg.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);

/**
 * How far the ink actually reaches across the box, 0–1.
 *
 * A crude scan of the absolute coordinates in the path data rather than a real
 * bounding box — no DOM here, and precision is not the point. Catching "the
 * last glyphs are missing" is, and for that a rough right-hand extent is
 * plenty: the failure mode is dramatic (80% vs 96%), never marginal.
 */
function horizontalCoverage(paths, viewBox) {
  const width = Number(viewBox.split(' ')[2]);
  let maxX = 0;
  for (const d of paths) {
    // Absolute commands only (M/L/C/S/Q/T/A, uppercase): relative deltas would
    // need real path arithmetic to place, and absolute starts alone are enough
    // to see where the last glyph begins.
    for (const m of d.matchAll(/[MLCSQTA]\s*(-?[\d.]+)/g)) {
      const x = Number(m[1]);
      if (Number.isFinite(x)) maxX = Math.max(maxX, x);
    }
  }
  return maxX / width;
}

/** The wordmark must fill at least this much of its own viewBox. The real
 *  artwork reaches ~0.94; the truncated version reached 0.80. */
const MIN_COVERAGE = 0.9;

const block = (paths) => paths.map((d) => `  "${d}",`).join('\n');

async function build() {
  const parsed = {};

  for (const [name, source] of Object.entries(SOURCES)) {
    const svg = await readFile(path.join(root, source.file), 'utf8');
    const paths = extractPaths(svg);

    if (paths.length === 0) {
      throw new Error(`${source.file} contains no <path> elements.`);
    }

    const coverage = horizontalCoverage(paths, source.viewBox);
    if (name === 'wordmark' && coverage < MIN_COVERAGE) {
      throw new Error(
        `${source.file}: path data only reaches ${(coverage * 100).toFixed(1)}% ` +
          `across its viewBox (expected ≥ ${MIN_COVERAGE * 100}%).\n` +
          `The artwork is cut short — glyphs are missing, or the viewBox is wrong.`,
      );
    }

    parsed[name] = { paths, coverage };
  }

  const body = `/* Brand artwork, extracted verbatim from the source SVGs. Path data only — the
 * components in logo.tsx decide colour, size, and semantics.
 * GENERATED from assets/wj-wordmark.svg + assets/wj-mark.svg.
 *
 * Regenerate with \`node tokens/logo-paths.mjs\`. Do NOT hand-edit or hand-trim:
 * a previous pass dropped the last three glyphs of the wordmark, so every
 * surface rendered "wash jun" for weeks without anyone noticing — the artwork
 * still filled its box, it just stopped early. */

/** Full lock-up: splash mark + \`wash junkie\` wordmark. viewBox ${SOURCES.wordmark.viewBox} */
export const WORDMARK_PATHS = [
${block(parsed.wordmark.paths)}
] as const;

/** Splash mark alone. viewBox ${SOURCES.mark.viewBox} */
export const MARK_PATHS = [
${block(parsed.mark.paths)}
] as const;

export const WORDMARK_VIEWBOX = '${SOURCES.wordmark.viewBox}';
export const MARK_VIEWBOX = '${SOURCES.mark.viewBox}';
export const WORDMARK_RATIO = 325.06 / 56.01;
export const MARK_RATIO = 100.78 / 49.9;
`;

  return { body, parsed };
}

const { body, parsed } = await build();
const check = process.argv.includes('--check');
const current = await readFile(OUT, 'utf8').catch(() => null);

if (check) {
  if (current !== body) {
    console.error('logo-paths.ts is out of date with the source SVGs.');
    console.error('Run `node tokens/logo-paths.mjs` and commit the result.');
    process.exit(1);
  }
  console.log(
    `Logo paths in sync — wordmark ${parsed.wordmark.paths.length} paths, ` +
      `${(parsed.wordmark.coverage * 100).toFixed(1)}% coverage.`,
  );
} else {
  await writeFile(OUT, body);
  console.log(
    `Wrote logo-paths.ts — wordmark ${parsed.wordmark.paths.length} paths ` +
      `(${(parsed.wordmark.coverage * 100).toFixed(1)}% coverage), ` +
      `mark ${parsed.mark.paths.length} paths.`,
  );
}
