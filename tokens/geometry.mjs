/**
 * Feature geometry — the two ratios the whole physical guide stands on.
 *
 * Every millimetre in `06-physical-applications.md`, every process floor in
 * `03-identity-system.md`, and every lock-up minimum in `10-merchandise.md`
 * divides by the numbers this script measures. They were originally measured
 * once, by hand, and written into a markdown table; `03 #10` recorded that
 * nothing reproduced them. That made a redraw of the artwork silently
 * invalidate the measured spine of three chapters — the failure mode being
 * that nobody would notice, because a stale ratio still looks like a number.
 *
 * So this exists to make the artwork and the documentation checkable against
 * each other:
 *
 *     node tokens/geometry.mjs            # measure, print the table
 *     node tokens/geometry.mjs --check    # measure AND diff against the docs
 *
 * `--check` parses the committed figures straight out of the markdown rather
 * than a side-car JSON, deliberately: a side-car would let the doc and the
 * artwork drift while the check stayed green, which is the exact failure this
 * is here to prevent. The doc IS the expectation.
 *
 * METHOD (from `03 · The geometry that governs reproduction`, which is now the
 * specification for this file rather than a description of a lost afternoon):
 *
 *   1. rasterise the SVG at 2400px HEIGHT, alpha only
 *   2. threshold alpha > 127 → ink
 *   3. 3-4 chamfer distance transform over ink, and again over background
 *   4. read the 5th-percentile RIDGE width in each
 *
 * Ridge, not raw distance: the distance transform's local maxima are the medial
 * axis, so a ridge value is the half-width of the stroke or gap at its own
 * narrowest. Sampling every pixel instead would drown the measurement in the
 * shallow values near every edge, which is a property of edges, not of strokes.
 *
 * 5th percentile, not minimum: the artwork has tapered terminals and drawn-to-
 * touch pinch points that genuinely go to zero. A minimum measures those and
 * reports that the logo cannot be printed at any size. The percentile measures
 * the thinnest SUSTAINED feature, which is what a process floor actually needs.
 * The excluded tail is reported below the table so the exclusion stays visible
 * instead of becoming a quiet fudge. It is printed as a 1st percentile, because
 * the true minimum is always a single raster pixel — that number measures the
 * rasteriser, not the artwork, and printing it would be theatre.
 *
 * NOT REPRODUCED HERE, so `--check` does not cover them: 03's prose bullets
 * quote a 0.037 taper and 0.005 / 0.017 pinch points. Those came from reading
 * individual named features off the artwork, which is a different measurement
 * from a percentile over the whole ridge population. They are still hand
 * figures. Treat this script as covering the table, and only the table.
 *
 * Rasterising is Chrome's job — the same headless Chrome the PDF build uses,
 * and for the same reason: it is the only renderer here that resolves an SVG
 * exactly as a browser will. The measurement itself runs in the page and comes
 * back through `--dump-dom`, so this file needs no image decoder and no
 * dependencies.
 */
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const RASTER_HEIGHT = 2400;
const PERCENTILE = 5;

/**
 * What this check is actually for, and the honest reason it is not tighter.
 *
 * It guards against a REDRAW — artwork replaced, strokes re-weighted, the
 * splash redrawn — which moves these ratios by whole percentage points. It is
 * not a claim that the figures are correct to the third decimal, and the
 * tolerance is set from two real sources of disagreement rather than picked to
 * make the run go green:
 *
 *   · Raster quantisation. One chamfer unit is 1/3600 of the height ≈ 0.00028,
 *     and both the threshold and the medial axis land between pixels.
 *
 *   · Ridge plateaus. `ridgeStats` accepts a pixel whose value merely TIES its
 *     neighbours, because a chamfer transform is full of flat runs and a strict
 *     local maximum would miss most of a straight stroke's spine entirely. The
 *     cost is that a plateau contributes its whole run to the population, which
 *     biases the percentile slightly LOW. That is the direction this script's
 *     numbers sit relative to the hand-measured ones, and it is the expected
 *     direction — so the ~0.002 residual is a property of ridge extraction, not
 *     evidence that the table is wrong.
 *
 * Hence: this script CONFIRMS 03's table to the resolution the method supports.
 * It does not replace it, and nobody should rewrite those figures to the third
 * decimal on the strength of one rasteriser.
 */
const TOLERANCE = 0.003;

const SUBJECTS = [
  { key: 'Lock-up', file: 'assets/wj-wordmark.svg' },
  { key: 'Mark', file: 'assets/wj-mark.svg' },
];

/* ---------------------------------------------------------------- rasterise */

const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
];

const findChrome = () => {
  for (const c of CHROME_CANDIDATES) {
    try {
      readFileSync(c);
      return c;
    } catch {
      /* next */
    }
  }
  return null;
};

/**
 * Runs in the page, not in node. Kept as a string so it can be inlined into the
 * temp document without a bundler.
 */
const PAGE_SCRIPT = String.raw`
const H = ${RASTER_HEIGHT};
const PCT = ${PERCENTILE};

/* 3-4 chamfer: an orthogonal step costs 3 and a diagonal 4, so 3 units ≈ 1px.
   Two sequential sweeps (forward then backward) are exact for this kernel. */
const chamfer = (mask, w, h, want) => {
  const INF = 0x7fff;
  const d = new Uint16Array(w * h);
  for (let i = 0; i < d.length; i++) d[i] = mask[i] === want ? INF : 0;
  const at = (x, y) => (x < 0 || y < 0 || x >= w || y >= h ? INF : d[y * w + x]);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (d[i] === 0) continue;
      let v = d[i];
      const a = at(x - 1, y) + 3, b = at(x, y - 1) + 3;
      const c = at(x - 1, y - 1) + 4, e = at(x + 1, y - 1) + 4;
      if (a < v) v = a; if (b < v) v = b; if (c < v) v = c; if (e < v) v = e;
      d[i] = v;
    }
  }
  for (let y = h - 1; y >= 0; y--) {
    for (let x = w - 1; x >= 0; x--) {
      const i = y * w + x;
      if (d[i] === 0) continue;
      let v = d[i];
      const a = at(x + 1, y) + 3, b = at(x, y + 1) + 3;
      const c = at(x + 1, y + 1) + 4, e = at(x - 1, y + 1) + 4;
      if (a < v) v = a; if (b < v) v = b; if (c < v) v = c; if (e < v) v = e;
      d[i] = v;
    }
  }
  return d;
};

/* Ridge = a local maximum of the distance transform, i.e. the medial axis.
   Histogram rather than an array of samples: the lock-up is ~33M pixels and the
   ridge population runs to millions, but chamfer values are small integers, so
   a histogram is exact here AND bounded. */
const ridgeStats = (d, w, h) => {
  const hist = new Uint32Array(8192);
  let n = 0;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const v = d[i];
      if (v === 0) continue;
      if (
        v >= d[i - 1] && v >= d[i + 1] && v >= d[i - w] && v >= d[i + w] &&
        v >= d[i - w - 1] && v >= d[i - w + 1] && v >= d[i + w - 1] && v >= d[i + w + 1]
      ) { hist[Math.min(v, 8191)]++; n++; }
    }
  }
  if (!n) return null;
  const pick = (p) => {
    const target = n * p / 100;
    let acc = 0;
    for (let v = 0; v < hist.length; v++) {
      acc += hist[v];
      if (acc >= target) return v;
    }
    return hist.length - 1;
  };
  /* chamfer units → px (÷3), half-width → full width (×2) → ratio of height */
  const toRatio = (u) => (u / 3) * 2 / H;
  return { p: toRatio(pick(PCT)), tail: toRatio(pick(1)), n };
};

const measure = (dataUri, vbW, vbH) => new Promise((resolve, reject) => {
  const img = new Image();
  img.onerror = () => reject(new Error('SVG failed to decode'));
  img.onload = () => {
    const w = Math.round(H * (vbW / vbH));
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = H;
    const ctx = cv.getContext('2d', { willReadFrequently: true });
    ctx.clearRect(0, 0, w, H);
    ctx.drawImage(img, 0, 0, w, H);
    const px = ctx.getImageData(0, 0, w, H).data;
    const mask = new Uint8Array(w * H);
    for (let i = 0, j = 3; i < mask.length; i++, j += 4) mask[i] = px[j] > 127 ? 1 : 0;
    let ink = 0;
    for (let i = 0; i < mask.length; i++) ink += mask[i];
    if (!ink) return reject(new Error('rasterised to nothing'));
    const stroke = ridgeStats(chamfer(mask, w, H, 1), w, H);
    const gap = ridgeStats(chamfer(mask, w, H, 0), w, H);
    resolve({ w, h: H, stroke, gap });
  };
  img.src = dataUri;
});

(async () => {
  const out = {};
  try {
    for (const s of SUBJECTS) out[s.key] = await measure(s.uri, s.vbW, s.vbH);
    document.title = 'ok';
  } catch (e) {
    out.__error = String(e && e.message || e);
    document.title = 'err';
  }
  const el = document.createElement('pre');
  el.id = 'result';
  el.textContent = JSON.stringify(out);
  document.body.appendChild(el);
})();
`;

const viewBoxOf = (svg) => {
  const m = svg.match(/viewBox\s*=\s*"([\d.\-\s]+)"/);
  if (!m) throw new Error('no viewBox');
  const [, , w, h] = m[1].trim().split(/\s+/).map(Number);
  return { w, h };
};

const rasteriseAndMeasure = async () => {
  const chrome = findChrome();
  if (!chrome) {
    console.error('Chrome not found. Looked in:');
    for (const c of CHROME_CANDIDATES) console.error('  ' + c);
    process.exit(2);
  }

  const subjects = SUBJECTS.map((s) => {
    const svg = readFileSync(join(ROOT, s.file), 'utf8');
    const { w, h } = viewBoxOf(svg);
    return {
      key: s.key,
      vbW: w,
      vbH: h,
      /* base64, not encodeURIComponent: the artwork contains `#` in its fill
         colours, which terminates a plain-text data URI at the fragment. */
      uri: 'data:image/svg+xml;base64,' + Buffer.from(svg, 'utf8').toString('base64'),
    };
  });

  const html = `<!doctype html><meta charset="utf-8"><title>measuring</title><body>
<script>const SUBJECTS = ${JSON.stringify(subjects)};</script>
<script>${PAGE_SCRIPT}</script>`;

  const dir = mkdtempSync(join(tmpdir(), 'wj-geom-'));
  const page = join(dir, 'measure.html');
  writeFileSync(page, html);

/*
 * Chrome is spawned, watched, and KILLED once its output exists — its exit is
 * deliberately not the success signal, because with a fresh `--user-data-dir`
 * this Chrome never exits. It does the work, writes the output, and then sits
 * there forever. Measured on a trivial one-line page: isolated profile hangs
 * indefinitely; the default profile returns in ~4s. None of the usual
 * remedies help — `--no-first-run`, a `First Run` sentinel, `--profile-directory`,
 * `--use-mock-keychain`, `--no-zygote`, `--disable-background-networking`.
 *
 * The fix is NOT to drop the isolated profile: that would run a build script
 * against the user's real Chrome profile, which is worse than a slow build. So
 * poll for the artifact, then kill. Fast AND safe.
 */
  const args = [
    // `--headless=new` is not cosmetic: old headless rasterises SVG through a
    // different path and is not the renderer anything ships to.
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    // Its own throwaway profile. Without this Chrome uses the REAL default
    // profile, locking it against the user's own browser.
    `--user-data-dir=${join(dir, 'profile')}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-background-networking',
    '--virtual-time-budget=60000',
    '--dump-dom',
    pathToFileURL(page).href,
  ];

  const dom = await new Promise((resolve, reject) => {
    const child = spawn(chrome, args, { stdio: ['ignore', 'pipe', 'ignore'] });
    let buf = '';
    let settled = false;
    const finish = (fn, v) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      child.kill('SIGKILL');
      fn(v);
    };
    const timer = setTimeout(
      () => finish(reject, new Error('Chrome produced no measurement within 180s')),
      180_000,
    );
    child.stdout.on('data', (d) => {
      buf += d;
      // `#result` is appended last, so its closing tag means the run is done.
      if (buf.includes('<pre id="result">') && buf.includes('</pre>')) finish(resolve, buf);
    });
    child.on('error', (e) => finish(reject, e));
    child.on('close', () => finish(resolve, buf));
  });

  const m = dom.match(/<pre id="result">([\s\S]*?)<\/pre>/);
  if (!m) throw new Error('measurement produced no result (Chrome dump had no #result)');
  const parsed = JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
  if (parsed.__error) throw new Error('in-page measurement failed: ' + parsed.__error);
  return parsed;
};

/* -------------------------------------------------------- documented figures */

const DOC = join(ROOT, 'docs/00-brand-guide/03-identity-system.md');

const readDocumented = () => {
  const md = readFileSync(DOC, 'utf8');
  const out = {};
  for (const key of SUBJECTS.map((s) => s.key)) {
    const row = md.match(
      new RegExp(`^\\|\\s*\\*\\*${key}\\*\\*\\s*\\|\\s*\\*\\*([\\d.]+)\\s*×\\s*height\\*\\*\\s*\\|\\s*\\*\\*([\\d.]+)\\s*×\\s*height\\*\\*`, 'm'),
    );
    if (!row) throw new Error(`no documented row for ${key} in 03`);
    out[key] = { stroke: Number(row[1]), gap: Number(row[2]) };
  }
  return out;
};

/* ------------------------------------------------------------------- report */

const fmt = (n) => n.toFixed(3);

const run = async () => {
  const check = process.argv.includes('--check');
  const measured = await rasteriseAndMeasure();

  console.log(`\n  Feature geometry — measured at ${RASTER_HEIGHT}px height, ${PERCENTILE}th-percentile ridge\n`);
  console.log('              thinnest sustained ink   tightest true separation');
  for (const { key } of SUBJECTS) {
    const r = measured[key];
    console.log(
      `  ${key.padEnd(10)}  ${(fmt(r.stroke.p) + ' × height').padEnd(23)}` +
      `${fmt(r.gap.p)} × height`,
    );
  }
  console.log('\n  The tail the percentile excludes (1st percentile, not the minimum —');
  console.log('  the minimum is always one raster pixel, which measures the raster):');
  for (const { key } of SUBJECTS) {
    const r = measured[key];
    console.log(
      `  ${key.padEnd(10)}  ink ${fmt(r.stroke.tail)} × height` +
      `   ·  gap ${fmt(r.gap.tail)} × height`,
    );
  }

  if (!check) {
    console.log('\n  Run with --check to diff these against 03.\n');
    return;
  }

  const documented = readDocumented();
  const problems = [];
  for (const { key } of SUBJECTS) {
    for (const [field, label] of [['stroke', 'ink stroke'], ['gap', 'separation']]) {
      const got = measured[key][field].p;
      const want = documented[key][field];
      if (Math.abs(got - want) > TOLERANCE) {
        problems.push(
          `  ✗ ${key} ${label}: 03 says ${want} × height, artwork measures ${fmt(got)} × height`,
        );
      }
    }
  }

  if (problems.length) {
    console.error('\n  Documented geometry does not match the artwork:\n');
    for (const p of problems) console.error(p);
    console.error(
      '\n  Either the artwork was redrawn and 03 was not updated, or 03 was edited\n' +
      '  by hand. Fix whichever is wrong — every physical minimum in 03, 06 and 10\n' +
      '  divides by these two numbers.\n',
    );
    process.exit(1);
  }

  console.log(`\n  ✓ 03's documented geometry matches the artwork (±${TOLERANCE})\n`);
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await run();

export { rasteriseAndMeasure, readDocumented };
