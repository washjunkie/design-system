#!/usr/bin/env node
/**
 * Checks the built PDF is actually the document we think it is.
 *
 *   node pdf/verify.mjs      non-zero exit on any failure
 *
 * This exists because of a real defect. The first build of the brand guide came
 * out 80 correct-looking pages set entirely in **Menlo** — Chrome's old headless
 * mode ignored all twenty inlined `@font-face` rules and silently fell back to a
 * monospace face. Nothing errored. The HTML was fine, the page count was right,
 * the file size was plausible, and the document was unusable.
 *
 * A PDF is opaque enough that "it built" tells you almost nothing, so every
 * check below is something that failure would have caught.
 */

import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateSync } from 'node:zlib';

const HERE = dirname(fileURLToPath(import.meta.url));
const PDF = join(HERE, 'dist/wash-junkie-brand-guide.pdf');

if (!existsSync(PDF)) {
  console.error('\n  ✗ No PDF. Run `node pdf/build.mjs` first.\n');
  process.exit(1);
}

const buf = readFileSync(PDF);
const fails = [];
const check = (label, ok, detail = '') => {
  console.log(`  ${ok ? '✓' : '✗'} ${label}${detail ? `  ${detail}` : ''}`);
  if (!ok) fails.push(label);
};

/* ---------- fonts ---------- */

/** Font names live both in the raw body and inside compressed object streams,
 *  depending on how the producer packed the file. Look in both. */
function fontNames(d) {
  const names = new Set();
  const grab = (b) => {
    for (const m of b.toString('latin1').matchAll(/\/(?:BaseFont|FontName)\s*\/([#A-Za-z0-9+\-]+)/g)) {
      // Chrome prefixes a six-letter subset tag: ABCDEF+Inter
      names.add(m[1].replace(/^[A-Z]{6}\+/, ''));
    }
  };
  grab(d);
  for (const m of d.toString('latin1').matchAll(/stream\r?\n/g)) {
    const start = m.index + m[0].length;
    const end = d.indexOf('endstream', start);
    if (end < 0) continue;
    try {
      grab(inflateSync(d.subarray(start, end)));
    } catch {
      /* not a flate stream — fine */
    }
  }
  return [...names];
}

const fonts = fontNames(buf);
const has = (needle) => fonts.some((f) => f.toLowerCase().includes(needle));

console.log('\nWash Junkie brand guide · PDF verification\n');
console.log(`  fonts embedded: ${fonts.join(', ') || '(none)'}\n`);

check('Outfit is embedded (display face)', has('outfit'));
check('Inter is embedded (text face)', has('inter'));
check('JetBrains Mono is embedded (numeric face)', has('jetbrains'));
check(
  'the document is NOT set in a fallback',
  !(fonts.length > 0 && fonts.every((f) => /menlo|courier|times|helvetica/i.test(f))),
  fonts.length ? '' : '(no fonts found at all)'
);

/* ---------- structure ---------- */

const pages = (buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
check('page count is plausible for the source', pages >= 40 && pages <= 200, `${pages} pages`);
check('file size is plausible', buf.length > 300 * 1024, `${(buf.length / 1024 / 1024).toFixed(2)} MB`);
check('PDF header intact', buf.subarray(0, 5).toString() === '%PDF-');
check('trailer intact', buf.subarray(-1024).toString('latin1').includes('%%EOF'));

/* ---------- content ---------- */

/*
 * Note on what is NOT checked here.
 *
 * A first version of this file searched the decompressed content streams for
 * phrases like "Brand Guide". That cannot work and reported false failures on a
 * perfectly good PDF: Chrome embeds *subset* fonts, so page text is written as
 * glyph indices into a private encoding, not as ASCII. Recovering the words
 * would mean parsing each font's ToUnicode CMap and reversing the mapping —
 * real work, and a second implementation of something poppler already does.
 *
 * So this section checks the things a structural reader can genuinely prove.
 * Each one below fails loudly if the document did not render.
 */

let streams = '';
for (const m of buf.toString('latin1').matchAll(/stream\r?\n/g)) {
  const start = m.index + m[0].length;
  const end = buf.indexOf('endstream', start);
  if (end < 0) continue;
  try {
    streams += inflateSync(buf.subarray(start, end)).toString('latin1');
  } catch {
    /* not a flate stream */
  }
}

/* Chrome turns every in-document href into a link annotation. The contents page
   alone contributes nine, and the chapters cross-reference each other heavily —
   so a low count means the markdown was not converted, or the link rewriting
   silently produced dead hrefs. */
const links = (buf.toString('latin1').match(/\/Subtype\s*\/Link/g) || []).length +
  (streams.match(/\/Subtype\s*\/Link/g) || []).length;
check('internal links rendered (contents + cross-references)', links >= 20, `${links} link annotations`);

/* Every embedded subset carries a ToUnicode CMap, which is also what makes the
   PDF searchable and copy-pasteable for a reader. */
const toUnicode = (buf.toString('latin1').match(/\/ToUnicode/g) || []).length +
  (streams.match(/\/ToUnicode/g) || []).length;
check('text is extractable (ToUnicode maps present)', toUnicode > 0, `${toUnicode} maps`);

/* The generated colour appendix paints the palette as swatches. Finding the
   brand teal as an actual non-stroking fill operator proves that section
   rendered — and proves it rendered in the right colour, which a text search
   never could. */
const fills = new Set((streams.match(/[\d.]+ [\d.]+ [\d.]+ rg/g) || []));
const near = (op, [r, g, b]) => {
  const [x, y, z] = op.split(' ').map(Number);
  return Math.abs(x - r) < 0.01 && Math.abs(y - g) < 0.01 && Math.abs(z - b) < 0.01;
};
const hasFill = (rgb) => [...fills].some((op) => near(op, rgb));

check('the colour appendix rendered its swatches', fills.size >= 40, `${fills.size} distinct fills`);
check('brand teal painted at the correct value', hasFill([0.172549, 0.745098, 0.772549]), '#2cbec5');
check('accent teal painted at the correct value', hasFill([0.0, 0.494118, 0.517647]), '#007e84');

console.log();
if (fails.length) {
  console.log(`  ${fails.length} check(s) failed:\n`);
  fails.forEach((f) => console.log(`    · ${f}`));
  console.log();
  process.exit(1);
}
console.log('  ✓ everything checks out\n');
