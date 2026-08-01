#!/usr/bin/env node
/**
 * Builds the combined Wash Junkie brand guide as a single PDF.
 *
 *   node pdf/build.mjs            → pdf/dist/wash-junkie-brand-guide.pdf
 *   node pdf/build.mjs --html     → stop after the HTML, for debugging in a browser
 *
 * The pipeline, and why each step is what it is:
 *
 *   markdown  →  HTML      python-markdown, which is on every macOS with the
 *                          extensions we need (tables, fenced code, attr_list).
 *                          No npm install, so this runs on a fresh clone.
 *
 *   HTML      →  PDF       headless Chrome. It is the only renderer on this
 *                          machine that implements `@page`, running heads via
 *                          `position: fixed`, and `break-inside: avoid` well
 *                          enough for a document with this many tables.
 *
 * The document is typeset with **the design system's own tokens** — the same
 * `wj-tokens.css` the product loads. A brand guide set in something other than
 * the brand's typography would be evidence against itself. Print-specific
 * overrides live in `print.css`, and they are overrides, not a second system.
 *
 * The generated colour appendix is the part markdown cannot express: swatches,
 * a live contrast matrix, and the production table are computed from the token
 * source at build time, so the PDF cannot drift from the palette the way a
 * pasted screenshot would.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, statSync } from 'node:fs';
import { execFileSync, spawn } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { palette, BRAND_MARK, FAMILIES } from '../tokens/palette.mjs';
import { contrast, bestInk } from '../tokens/color.mjs';
import { toCMYK, tac, printRisk, oneBit } from '../tokens/print.mjs';
import { inlineFontFaces } from './fonts.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const BG = join(ROOT, 'docs/00-brand-guide');
const DIST = join(HERE, 'dist');

/* ------------------------------------------------------------------ *
 * Document order
 * ------------------------------------------------------------------ */

const CHAPTERS = [
  { n: '1', file: '01-strategy.md', title: 'Strategy', blurb: 'Positioning, personality, audiences, and the multi-vertical question' },
  { n: '2', file: '02-verbal-identity.md', title: 'Verbal identity', blurb: 'Voice, tone, naming, and the words we agree on' },
  { n: '3', file: '03-identity-system.md', title: 'Identity system', blurb: 'The marks, their floors, and how they are allowed to appear' },
  { n: '4', file: '04-colour-and-materials.md', title: 'Colour & materials', blurb: 'Colour once it leaves the screen' },
  { n: '5', file: '05-art-direction.md', title: 'Art direction', blurb: 'Photography, illustration, and the splash as a motif' },
  { n: '6', file: '06-physical-applications.md', title: 'Physical applications', blurb: 'Vans, signage, uniforms, bags, receipts' },
  { n: '7', file: '07-digital-and-social.md', title: 'Digital & social', blurb: 'Everything owned and paid that is not the product' },
  { n: '8', file: '08-usage-and-legal.md', title: 'Usage, requests & assets', blurb: 'Who may use the brand, and how to ask' },
  { n: '9', file: '09-brand-representation.md', title: 'Brand representation', blurb: 'Who may act as Wash Junkie, and what they may promise' },
  { n: '10', file: '10-merchandise.md', title: 'Merchandise', blurb: 'What earns the mark, and what gets refused' },
];

/* ------------------------------------------------------------------ *
 * Markdown → HTML
 * ------------------------------------------------------------------ */

/**
 * Shells out to python-markdown rather than shipping a hand-rolled parser.
 * These documents lean hard on tables and nested lists, and a naive regex
 * converter mangles exactly those — which are the parts worth printing.
 */
function md2html(source) {
  return execFileSync(
    'python3',
    [
      '-c',
      `import sys, markdown
sys.stdout.write(markdown.markdown(
  sys.stdin.read(),
  extensions=['tables', 'fenced_code', 'attr_list', 'sane_lists', 'md_in_html'],
  output_format='html5',
))`,
    ],
    { input: source, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }
  );
}

/** Strip the italic subtitle line each chapter opens with — the PDF gives it a
 *  designed chapter divider instead, and printing both reads as a stutter. */
function splitFrontMatter(src) {
  const lines = src.split('\n');
  const h1 = lines.findIndex((l) => l.startsWith('# '));
  const rest = lines.slice(h1 + 1);
  // The subtitle is the first italic block after the H1.
  let subtitle = '';
  let i = 0;
  while (i < rest.length && rest[i].trim() === '') i++;
  if (rest[i]?.startsWith('*') && !rest[i].startsWith('**')) {
    const start = i;
    while (i < rest.length && rest[i].trim() !== '') i++;
    subtitle = rest
      .slice(start, i)
      .join(' ')
      .replace(/^\*|\*$/g, '')
      .trim();
    rest.splice(start, i - start);
  }
  return { title: lines[h1].slice(2).trim(), subtitle, body: rest.join('\n') };
}

/**
 * Rewrites cross-document links into intra-PDF anchors. In a bound document a
 * link to `04-colour-and-materials.md` is a dead reference; the reader needs
 * "Colour & materials" and a chapter number they can turn to.
 */
function rewriteLinks(html) {
  const byFile = new Map(CHAPTERS.map((c) => [c.file, c]));
  return html
    // sibling chapters
    .replace(/href="(\d\d-[a-z-]+\.md)(#[^"]*)?"/g, (m, file, hash) => {
      const c = byFile.get(file);
      return c ? `href="#ch-${c.n}" class="xref" data-ch="${c.n}"` : m;
    })
    .replace(/href="README\.md"/g, 'href="#contents" class="xref"')
    // system docs live outside this PDF — mark them as external, keep the text
    .replace(/href="\.\.\/([0-9]{2}-[a-z-]+\.md)(#[^"]*)?"/g, (m, file) => `href="#" class="xref-ext" title="Design system · ${file}"`)
    .replace(/href="\.\.\/\.\.\/([^"]*)"/g, () => 'href="#" class="xref-ext"');
}

/* ------------------------------------------------------------------ *
 * Generated colour appendix
 * ------------------------------------------------------------------ */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Everything in this appendix is computed from `tokens/palette.mjs` at build
 * time. A pasted screenshot of a palette goes stale silently; this cannot.
 */
function colourAppendix() {
  const ramps = Object.keys(FAMILIES)
    .map((f) => {
      const cells = palette.light[f]
        .map(
          (hex, i) =>
            `<div class="ap-sw" style="background:${hex};color:${bestInk(hex)}"><span>${i + 1}</span><em>${hex}</em></div>`
        )
        .join('');
      return `<div class="ap-ramp"><h4>${FAMILIES[f].label} <small>hue ${FAMILIES[f].hue}°</small></h4><div class="ap-row">${cells}</div></div>`;
    })
    .join('');

  const PROD = [
    ['Brand mark', BRAND_MARK],
    ['Accent teal', palette.light.aqua[8]],
    ['Ink', palette.light.slate[11]],
    ['Paper', palette.light.slate[0]],
    ['Success', palette.light.moss[8]],
    ['Warning', palette.light.sun[8]],
    ['Danger', palette.light.ember[8]],
    ['Info', palette.light.tide[8]],
  ];

  const prodRows = PROD.map(([name, hex]) => {
    const c = toCMYK(hex);
    const r = printRisk(hex);
    return `<tr>
      <td><span class="ap-chip" style="background:${hex}"></span> ${name}</td>
      <td class="mono">${hex}</td>
      <td class="mono">C${c.c} M${c.m} Y${c.y} K${c.k}</td>
      <td class="mono">${tac(c)}%</td>
      <td class="risk-${r.level}">${r.level}</td>
      <td class="mono">${oneBit(hex).becomes}</td>
    </tr>`;
  }).join('');

  /* The matrix the physical half of the guide is built on. */
  const FIELDS = [
    ['Brand teal', BRAND_MARK],
    ['Accent teal', palette.light.aqua[8]],
    ['Ink', palette.light.slate[11]],
    ['Paper', palette.light.slate[0]],
  ];
  const MARKS = [
    ['White', '#ffffff'],
    ['Ink', palette.light.slate[11]],
    ['Brand teal', BRAND_MARK],
  ];

  const matrixRows = FIELDS.map(([fname, field]) => {
    const cells = MARKS.map(([mname, mark]) => {
      const r = contrast(mark, field);
      const cls = r >= 4.5 ? 'pass' : r >= 3 ? 'graphics' : 'fail';
      const verdict = r >= 4.5 ? 'type + graphics' : r >= 3 ? 'graphics only' : 'fails';
      return `<td class="mx ${cls}">
        <div class="mx-swatch" style="background:${field}"><span style="color:${mark}">wash junkie</span></div>
        <strong>${r.toFixed(2)}:1</strong><em>${verdict}</em></td>`;
    }).join('');
    return `<tr><th scope="row">${fname}<br><span class="mono">${field}</span></th>${cells}</tr>`;
  }).join('');

  /* Greyscale collision — the 1-bit and thermal constraint. */
  const SEM = [
    ['Success', palette.light.moss[8]],
    ['Warning', palette.light.sun[8]],
    ['Danger', palette.light.ember[8]],
    ['Info', palette.light.tide[8]],
  ];
  const pairs = [];
  for (let i = 0; i < SEM.length; i++)
    for (let j = i + 1; j < SEM.length; j++)
      pairs.push([SEM[i], SEM[j], contrast(SEM[i][1], SEM[j][1])]);
  pairs.sort((a, b) => a[2] - b[2]);

  const greyRows = pairs
    .map(
      ([a, b, r]) =>
        `<tr><td><span class="ap-chip" style="background:${a[1]}"></span> ${a[0]}</td>
             <td><span class="ap-chip" style="background:${b[1]}"></span> ${b[0]}</td>
             <td class="mono">${r.toFixed(2)}:1</td>
             <td>${r < 1.5 ? '<strong>indistinguishable in greyscale</strong>' : r < 3 ? 'weak' : 'holds'}</td></tr>`
    )
    .join('');

  return `
<section class="chapter appendix" id="appendix-colour">
  <div class="chapter-divider">
    <span class="ch-num">Appendix A</span>
    <h1>Colour specification</h1>
    <p class="ch-blurb">Generated from the token source at build time — this appendix cannot drift from the palette.</p>
  </div>

  <h2>The ramps</h2>
  <p>Six families, twelve steps, generated in OKLCH. Step numbers mean the same
  thing in every family. Shown here in the light theme; the dark ladder is in the
  design system.</p>
  <div class="ap-ramps">${ramps}</div>

  <h2>Production colour</h2>
  <p class="warn-block"><strong>CMYK below is the naive algebraic conversion.</strong>
  It knows nothing about ink, paper, dot gain, or GCR. It is a starting point for
  a conversation with a printer, never a specification. Match a spot colour
  against a physical book under D50, and get a wet proof on the actual substrate.</p>
  <table class="ap-table">
    <thead><tr><th>Colour</th><th>Hex</th><th>CMYK (naive)</th><th>TAC</th><th>Print risk</th><th>1-bit</th></tr></thead>
    <tbody>${prodRows}</tbody>
  </table>

  <h2>Which mark on which field</h2>
  <p>Measured contrast of a mark against a field. <strong>3:1 is the floor for a
  non-text graphic; 4.5:1 is the floor for type.</strong> This is the table every
  physical application in Chapter 6 is derived from.</p>
  <table class="ap-matrix">
    <thead><tr><th></th>${MARKS.map(([n]) => `<th>${n} mark</th>`).join('')}</tr></thead>
    <tbody>${matrixRows}</tbody>
  </table>

  <h2>The semantic colours collapse in greyscale</h2>
  <p>Contrast between the status colours themselves. A thermal receipt, a
  photocopy, and a single-colour print all reduce these to one grey — which is
  why status is never colour alone.</p>
  <table class="ap-table">
    <thead><tr><th>Colour</th><th>Against</th><th>Contrast</th><th>In greyscale</th></tr></thead>
    <tbody>${greyRows}</tbody>
  </table>
</section>`;
}

/* ------------------------------------------------------------------ *
 * Assembly
 * ------------------------------------------------------------------ */

const MARK_SVG = readFileSync(join(ROOT, 'assets/wj-mark.svg'), 'utf8')
  .replace(/<\?xml[^>]*\?>/, '')
  .replace(/fill:#2cbec5/g, 'fill:currentColor')
  .replace(/\.cls-1\{[^}]*\}/g, '.cls-1{fill:currentColor;}');

async function build() {
  const fontFaces = await inlineFontFaces();
  const chapters = CHAPTERS.map((c) => {
    const raw = readFileSync(join(BG, c.file), 'utf8');
    const { title, subtitle, body } = splitFrontMatter(raw);
    const html = rewriteLinks(md2html(body));
    return { ...c, title, subtitle, html };
  });

  const contents = chapters
    .map(
      (c) => `<li><a href="#ch-${c.n}">
        <span class="toc-n">${c.n}</span>
        <span class="toc-t"><strong>${esc(c.title)}</strong><em>${esc(c.blurb)}</em></span>
      </a></li>`
    )
    .join('');

  const chapterHtml = chapters
    .map(
      (c) => `
<section class="chapter" id="ch-${c.n}">
  <div class="chapter-divider">
    <span class="ch-num">Chapter ${c.n}</span>
    <h1>${esc(c.title)}</h1>
    ${c.subtitle ? `<p class="ch-blurb">${esc(c.subtitle)}</p>` : ''}
  </div>
  ${c.html}
</section>`
    )
    .join('\n');

  const css = readFileSync(join(HERE, 'print.css'), 'utf8');
  const tokens = readFileSync(join(ROOT, 'tokens/dist/wj-tokens.css'), 'utf8');

  return `<!doctype html>
<html lang="en" data-wj-theme="light" data-wj-register="operator">
<head>
<meta charset="utf-8">
<title>Wash Junkie · Brand Guide</title>
<style>${fontFaces}</style>
<style>${tokens}</style>
<style>${css}</style>
</head>
<body>

<!-- Running head. A fixed-position element repeats on every printed page in Chrome. -->
<div class="running-head" aria-hidden="true">
  <span class="rh-mark">${MARK_SVG}</span>
  <span class="rh-title">Wash Junkie · Brand Guide</span>
</div>

<section class="cover">
  <div class="cover-mark">${MARK_SVG}</div>
  <p class="cover-eyebrow">Wash Junkie</p>
  <h1 class="cover-title">Brand<br>Guide</h1>
  <p class="cover-sub">The identity layer. For anyone representing Wash Junkie
  anywhere a person can see it — a van, a shopfront, a laundry bag, a deck, an ad.</p>
  <div class="cover-meta">
    <div><span>Version</span><strong>1.0</strong></div>
    <div><span>Chapters</span><strong>${CHAPTERS.length} + appendix</strong></div>
    <div><span>Companion</span><strong>Design system</strong></div>
  </div>
  <p class="cover-foot">Colour, contrast, and every measured figure in this document are
  generated from the design system's token source. Where a specification requires a
  supplier match nobody has made yet, it says <strong>TO SPECIFY</strong> and gives the
  method rather than a number.</p>
</section>

<section class="contents" id="contents">
  <h1>Contents</h1>
  <ol class="toc">${contents}
    <li><a href="#appendix-colour"><span class="toc-n">A</span><span class="toc-t"><strong>Colour specification</strong><em>Ramps, production values, and the contrast matrix — generated</em></span></a></li>
  </ol>

  <div class="callout-set">
    <h2>The three facts that cause the most damage when missed</h2>
    <div class="callout">
      <span class="callout-n">1</span>
      <div><strong>A white mark on brand teal is not legible.</strong>
      <code>#2cbec5</code> carries white at <strong>${contrast('#ffffff', BRAND_MARK).toFixed(2)}:1</strong> — below the
      3:1 floor for a non-text graphic. Put the mark in ink on brand teal
      (${contrast(palette.light.slate[11], BRAND_MARK).toFixed(2)}:1), or use the deeper accent teal
      <code>${palette.light.aqua[8]}</code> as the field (${contrast('#ffffff', palette.light.aqua[8]).toFixed(2)}:1).</div>
    </div>
    <div class="callout">
      <span class="callout-n">2</span>
      <div><strong>The brand teal is in the hardest region for process ink.</strong>
      Saturated cyan-green above 60% lightness is the largest part of sRGB that
      offset CMYK cannot reach. Anything where the teal is the hero needs a spot
      colour and a wet proof.</div>
    </div>
    <div class="callout">
      <span class="callout-n">3</span>
      <div><strong>On a provider's premises, the provider's brand leads.</strong>
      Wash Junkie endorses; it does not take over a shopfront — the same principle
      as the in-product white-label rule, in a different medium.</div>
    </div>
  </div>
</section>

${chapterHtml}
${colourAppendix()}

<section class="colophon">
  <div class="colophon-mark">${MARK_SVG}</div>
  <h2>Colophon</h2>
  <p>Set in <strong>Outfit</strong> (display) and <strong>Inter</strong> (text), with
  <strong>JetBrains Mono</strong> for figures — the same three faces the product uses.
  Typeset with the design system's own tokens, so this document is an instance of the
  system it describes rather than a picture of it.</p>
  <p>Generated by <code>pdf/build.mjs</code> from the nine markdown sources in
  <code>docs/00-brand-guide/</code>. To change anything here, change the markdown and
  rebuild — this PDF is an output, not a source.</p>
</section>

</body>
</html>`;
}

/* ------------------------------------------------------------------ *
 * Render
 * ------------------------------------------------------------------ */

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
].find((p) => existsSync(p));

mkdirSync(DIST, { recursive: true });
const htmlPath = join(DIST, 'brand-guide.html');
writeFileSync(htmlPath, await build());
console.log(`  ✓ ${htmlPath}`);

if (process.argv.includes('--html')) {
  console.log('\n  --html given; stopping before the PDF.\n');
  process.exit(0);
}

if (!CHROME) {
  console.error('\n  ✗ No Chromium-family browser found. The HTML is written — open it and print to PDF.\n');
  process.exit(1);
}

const pdfPath = join(DIST, 'wash-junkie-brand-guide.pdf');
// A throwaway profile: without it Chrome may attach to a running instance and
// return before the render finishes, producing a truncated or empty file.
const profile = join(DIST, '.chrome-profile');
rmSync(profile, { recursive: true, force: true });

/*
 * Chrome is spawned, watched, and KILLED once the PDF is written — its EXIT is
 * deliberately not the success signal, because with a fresh `--user-data-dir`
 * this Chrome never exits. It renders, writes the file, and then sits there.
 * Measured against a trivial one-line page: isolated profile hangs
 * indefinitely, default profile returns in ~4s, and none of the usual remedies
 * change it — `--no-first-run`, a `First Run` sentinel, `--profile-directory`,
 * `--use-mock-keychain`, `--no-zygote`, `--disable-background-networking`.
 *
 * Dropping the isolated profile would "fix" this by running the build against
 * the user's REAL Chrome profile, which is worse than a slow build. So: watch
 * for the file, wait for its size to stop moving, then kill.
 */
const child = spawn(
  CHROME,
  [
    // `--headless=new` is not cosmetic here. Old headless ships its own
    // cut-down font stack and ignored all twenty inlined @font-face rules: the
    // first build of this document came out 80 pages with Menlo as the only
    // embedded face — a monospace brand guide. The same HTML in a real browser
    // resolves Outfit and Inter correctly, which is how the fault was isolated.
    // `pdf/verify.mjs` now fails the build if the brand faces are missing, so
    // this cannot regress silently.
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--user-data-dir=${profile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-background-networking',
    '--no-pdf-header-footer',
    // Data URIs need no network, but the faces still have to decode before the
    // first paint the printer sees.
    '--virtual-time-budget=20000',
    `--print-to-pdf=${pdfPath}`,
    `file://${htmlPath}`,
  ],
  { stdio: ['ignore', 'ignore', 'ignore'] },
);

/* Sync sleep, so this stays a straight-line script. */
const sleepSync = (ms) => {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
};

const DEADLINE = 240_000;
const t0 = Date.now();
let last = -1;
let stable = 0;
for (;;) {
  sleepSync(500);
  const size = existsSync(pdfPath) ? statSync(pdfPath).size : -1;
  // Two consecutive identical non-zero sizes means the writer is finished.
  if (size > 0 && size === last) {
    if (++stable >= 2) break;
  } else {
    stable = 0;
  }
  last = size;
  if (Date.now() - t0 > DEADLINE) {
    child.kill('SIGKILL');
    throw new Error(`Chrome did not produce a PDF within ${DEADLINE / 1000}s`);
  }
}
child.kill('SIGKILL');

rmSync(profile, { recursive: true, force: true });

const bytes = readFileSync(pdfPath).length;
console.log(`  ✓ ${pdfPath}  ${(bytes / 1024 / 1024).toFixed(2)} MB`);
console.log();
