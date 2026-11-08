/**
 * Platform icons, built from the splash mark.
 *
 *     node tokens/icons.mjs
 *
 * Two constructions, one pairing. The field is accent teal `#007e84` and the
 * mark is white — the reversed default in
 * `docs/00-brand-guide/03-identity-system.md`, and the only field that still
 * reads on both a white tab strip and a black one (4.86:1 and 4.32:1). A white
 * mark on brand teal is 2.26:1 and is not used.
 *
 *   · Tab favicon (`icon.svg`, `favicon.ico` at 16 / 32 / 48). The browser
 *     shows the whole square, so the mark is optically larger than the mask
 *     number: height 0.40 × the side, on a rounded square of radius 0.22 ×
 *     the side. 0.34 × 16px is under the droplet's floor.
 *   · Home-screen and PWA icons (`apple-icon.png`, `icon-192.png`,
 *     `icon-512.png`). Mark height 0.34 × the side, full-bleed, square
 *     corners, no alpha. iOS rounds once; a second radius leaves a halo.
 *     The mark's ink stays inside the maskable 0.8 circle. The script
 *     measures that off the 512 raster and exits non-zero if it doesn't.
 *
 * Rasters are Chrome at the target pixel size, the same renderer a tab will
 * use, with the mark's origin snapped to the pixel grid. They are not a
 * downscale of the 512.
 *
 * Copies land in every surface's `src/app/` so Next's file convention emits
 * the `<link>` tags. A layout that also sets `metadata.icons` replaces those
 * and must not point the tab back at the bare mark.
 */
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const PLATFORM = join(ROOT, '..');
const MARK_SVG = join(ROOT, 'assets/wj-mark.svg');
const OUT = join(ROOT, 'assets/icons');

const MARK_W = 100.78;
const MARK_H = 49.9;
const FIELD = '#007e84';
const MARK = '#ffffff';
const FAVICON_RATIO = 0.40;
const FAVICON_RADIUS = 0.22;
const APP_RATIO = 0.34;

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
].find((p) => {
  try {
    readFileSync(p);
    return true;
  } catch {
    return false;
  }
});

const paths = [...readFileSync(MARK_SVG, 'utf8').matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
if (paths.length !== 5) {
  console.error(`expected 5 mark paths, found ${paths.length}`);
  process.exit(1);
}

/** @param {number} size @param {number} ratio @param {number} radiusRatio @param {boolean} snap */
function iconSvg(size, ratio, radiusRatio, snap) {
  const h = size * ratio;
  const w = h * (MARK_W / MARK_H);
  const scale = h / MARK_H;
  let tx = (size - w) / 2;
  let ty = (size - h) / 2;
  if (snap) {
    tx = Math.round(tx);
    ty = Math.round(ty);
  }
  const rx = (radiusRatio * size).toFixed(3);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <title>Wash Junkie</title>
  <rect width="${size}" height="${size}" rx="${rx}" fill="${FIELD}"/>
  <g fill="${MARK}" transform="translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${scale.toFixed(6)})">
    ${paths.map((d) => `<path d="${d}"/>`).join('\n    ')}
  </g>
</svg>
`;
}

function ico(images) {
  const count = images.length;
  const header = Buffer.alloc(6 + count * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  let offset = header.length;
  const parts = [header];
  images.forEach(({ size, png }, i) => {
    const at = 6 + i * 16;
    header[at] = size >= 256 ? 0 : size;
    header[at + 1] = size >= 256 ? 0 : size;
    header.writeUInt16LE(1, at + 4);
    header.writeUInt16LE(32, at + 6);
    header.writeUInt32LE(png.length, at + 8);
    header.writeUInt32LE(offset, at + 12);
    offset += png.length;
    parts.push(png);
  });
  return Buffer.concat(parts);
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let err = '';
    child.stderr.on('data', (d) => {
      err += d;
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited ${code}\n${err.slice(-2000)}`));
    });
  });
}

if (!CHROME) {
  console.error('no Chrome / Chromium / Edge to rasterise with');
  process.exit(1);
}

const faviconSvg = iconSvg(32, FAVICON_RATIO, FAVICON_RADIUS, false);
const appSvg = iconSvg(512, APP_RATIO, 0, false);

const slots = [
  { name: 'favicon-16.png', size: 16, kind: 'favicon' },
  { name: 'favicon-32.png', size: 32, kind: 'favicon' },
  { name: 'favicon-48.png', size: 48, kind: 'favicon' },
  { name: 'apple-icon.png', size: 180, kind: 'app' },
  { name: 'icon-192.png', size: 192, kind: 'app' },
  { name: 'icon-512.png', size: 512, kind: 'app' },
];

const work = join(tmpdir(), 'wj-icons');
rmSync(work, { recursive: true, force: true });
mkdirSync(work, { recursive: true });

let x = 0;
const placed = slots.map((slot) => {
  const svg =
    slot.kind === 'favicon'
      ? iconSvg(slot.size, FAVICON_RATIO, FAVICON_RADIUS, true)
      : iconSvg(slot.size, APP_RATIO, 0, true);
  const file = join(work, `${slot.size}.svg`);
  writeFileSync(file, svg);
  const at = { ...slot, x, file };
  x += slot.size;
  return at;
});

const html = `<!doctype html><html><head><style>
  html,body{margin:0;background:transparent;overflow:hidden}
  img{position:absolute;top:0;display:block}
</style></head><body>
${placed.map((s) => `<img width="${s.size}" height="${s.size}" style="left:${s.x}px" src="${s.file}">`).join('\n')}
</body></html>`;
writeFileSync(join(work, 'sheet.html'), html);

// A transparent page background keeps the squircle's corners transparent.
// Chrome's screenshot of that page is RGBA.
const sheet = join(work, 'sheet.png');
await run(CHROME, [
  '--headless',
  '--disable-gpu',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  `--window-size=${x},${512}`,
  `--screenshot=${sheet}`,
  '--default-background-color=00000000',
  `file://${join(work, 'sheet.html')}`,
]);

const cropPy = `
from PIL import Image
import json, sys
sheet = Image.open(sys.argv[1])
if sheet.mode != 'RGBA':
    raise SystemExit(f"expected an RGBA screenshot, got {sheet.mode}")
slots = json.loads(sys.argv[2])
out = sys.argv[3]
FIELD = (0, 126, 132)
report = []
for s in slots:
    size = s['size']
    tile = sheet.crop((s['x'], 0, s['x'] + size, size))
    # Near-zero alpha carries garbage RGB. Drop it.
    px = tile.load()
    farthest = 0
    ink = 0
    cx = cy = (size - 1) / 2
    for y in range(size):
        for x in range(size):
            r, g, b, a = px[x, y]
            if a < 8:
                px[x, y] = (0, 0, 0, 0)
                continue
            if r > 180 and a > 128:
                ink += 1
                d = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5
                if d > farthest:
                    farthest = d
    corners = [tile.getpixel(p) for p in ((0, 0), (size - 1, 0), (0, size - 1), (size - 1, size - 1))]
    if s['kind'] == 'app':
        # Full bleed and no alpha, so iOS does not composite a halo under its own mask.
        for c in corners:
            if abs(c[0] - FIELD[0]) > 12 or abs(c[1] - FIELD[1]) > 12 or c[3] < 250:
                raise SystemExit(f"{s['name']} corner is not opaque field: {corners}")
        flat = Image.new('RGB', (size, size), FIELD)
        flat.paste(tile, mask=tile.getchannel('A'))
        flat.save(f"{out}/{s['name']}", 'PNG')
    else:
        if any(c[3] > 40 for c in corners):
            raise SystemExit(f"{s['name']} rounded corner is opaque: {corners}")
        tile.save(f"{out}/{s['name']}", 'PNG')
    if s['name'] == 'icon-512.png':
        report.append({'ink': ink, 'farthest': round(farthest, 2), 'overSide': round(farthest / size, 4)})
print(json.dumps(report))
`;
writeFileSync(join(work, 'crop.py'), cropPy);

const py = spawn('python3', [join(work, 'crop.py'), sheet, JSON.stringify(placed), work], {
  stdio: ['ignore', 'pipe', 'pipe'],
});
let pyOut = '';
let pyErr = '';
py.stdout.on('data', (d) => {
  pyOut += d;
});
py.stderr.on('data', (d) => {
  pyErr += d;
});
const pyCode = await new Promise((resolve) => py.on('close', resolve));
if (pyCode !== 0) {
  console.error(pyErr || pyOut);
  process.exit(pyCode || 1);
}
const measured = JSON.parse(pyOut);
const mask = measured[0];
// maskable safe circle is diameter 0.8 × side, so radius 0.4 × side.
if (mask.overSide >= 0.4) {
  console.error(`mark reaches ${mask.overSide} of the side; maskable allows 0.4`);
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'favicon.svg'), faviconSvg);
writeFileSync(join(OUT, 'app-icon.svg'), appSvg);

const png = (name) => readFileSync(join(work, name));
for (const slot of slots) {
  writeFileSync(join(OUT, slot.name), png(slot.name));
}
const icoBuf = ico([
  { size: 16, png: png('favicon-16.png') },
  { size: 32, png: png('favicon-32.png') },
  { size: 48, png: png('favicon-48.png') },
]);
writeFileSync(join(OUT, 'favicon.ico'), icoBuf);

const surfaces = ['web', 'landing', 'admin', 'agent', 'blog', 'support'];
for (const surface of surfaces) {
  const app = join(PLATFORM, surface, 'src/app');
  copyFileSync(join(OUT, 'favicon.svg'), join(app, 'icon.svg'));
  copyFileSync(join(OUT, 'favicon.ico'), join(app, 'favicon.ico'));
  copyFileSync(join(OUT, 'apple-icon.png'), join(app, 'apple-icon.png'));
}
copyFileSync(join(OUT, 'icon-192.png'), join(PLATFORM, 'web/public/icon-192.png'));
copyFileSync(join(OUT, 'icon-512.png'), join(PLATFORM, 'web/public/icon-512.png'));

console.log(`mask radius ${mask.overSide} × side (${mask.ink} white pixels)`);
console.log(`wrote ${OUT} and copied into ${surfaces.join(', ')}`);
