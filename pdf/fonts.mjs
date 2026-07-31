/**
 * Fetches the three brand typefaces once, caches the woff2 files next to this
 * script, and returns an `@font-face` block with each file inlined as a data
 * URI.
 *
 * Why inline rather than link:
 *
 * Headless Chrome rendering a `file://` document does not reliably fetch a
 * cross-origin stylesheet before it prints. The first build of this PDF came
 * out 80 pages set entirely in the fallback — Menlo was the only face embedded,
 * which is a monospace document pretending to be a brand guide. A data URI has
 * no fetch to lose the race with.
 *
 * It also makes the build work offline after the first run, and it is what
 * `docs/04-typography.md` already instructs for the product: self-host them.
 * A brand guide that depends on Google's CDN to look like itself is a brand
 * guide with a single point of failure.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const CACHE = join(HERE, 'fonts');

/* Weights the document actually sets. Fetching the full variable range would
   quadruple the file for faces nothing uses. */
const FAMILIES = [
  { css: 'Inter:wght@400;500;600;700', family: 'Inter' },
  { css: 'Outfit:wght@400;500;600;700', family: 'Outfit' },
  { css: 'JetBrains+Mono:wght@400;500', family: 'JetBrains Mono' },
];

/* Google serves woff2 only to a UA it believes supports it. Ask as Chrome. */
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const slug = (s) => s.replace(/[^a-z0-9]+/gi, '-').toLowerCase();

async function fetchCss(spec) {
  const url = `https://fonts.googleapis.com/css2?family=${spec}&display=swap`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

/**
 * Keeps only the latin and latin-ext subsets. The full Google response also
 * carries cyrillic, greek and vietnamese; none of them appear in this document
 * and each is another 20-40kb inlined into every copy of the PDF.
 */
function parseFaces(css) {
  const blocks = css.split('@font-face').slice(1);
  return blocks
    .map((b) => {
      const subset = /\/\*\s*([a-z-]+)\s*\*\//.exec(css.slice(0, css.indexOf(b)))?.[1];
      const url = /src:\s*url\(([^)]+)\)/.exec(b)?.[1];
      const weight = /font-weight:\s*(\d+)/.exec(b)?.[1] ?? '400';
      const style = /font-style:\s*([a-z]+)/.exec(b)?.[1] ?? 'normal';
      const family = /font-family:\s*'([^']+)'/.exec(b)?.[1];
      const range = /unicode-range:\s*([^;]+);/.exec(b)?.[1];
      return { subset, url, weight, style, family, range };
    })
    .filter((f) => f.url && f.family);
}

async function cached(url, name) {
  const path = join(CACHE, name);
  if (existsSync(path)) return readFileSync(path);
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  mkdirSync(CACHE, { recursive: true });
  writeFileSync(path, buf);
  return buf;
}

export async function inlineFontFaces({ quiet = false } = {}) {
  mkdirSync(CACHE, { recursive: true });
  const out = [];
  let bytes = 0;

  for (const fam of FAMILIES) {
    let css;
    try {
      css = await fetchCss(fam.css);
    } catch (e) {
      // A cached build must still work with the network down.
      const fallback = join(CACHE, `${slug(fam.family)}.css`);
      if (!existsSync(fallback)) throw e;
      css = readFileSync(fallback, 'utf8');
    }
    writeFileSync(join(CACHE, `${slug(fam.family)}.css`), css);

    /* Google emits one @font-face per subset per weight, with a `/* latin *\/`
       comment before each. Track the most recent comment as we walk. */
    const faces = [];
    const re = /\/\*\s*([a-z0-9-]+)\s*\*\/\s*@font-face\s*{([^}]+)}/g;
    let m;
    while ((m = re.exec(css))) faces.push({ subset: m[1], block: m[2] });

    const wanted = faces.filter((f) => f.subset === 'latin' || f.subset === 'latin-ext');
    const use = wanted.length ? wanted : faces;

    for (const f of use) {
      const url = /src:\s*url\(([^)]+)\)/.exec(f.block)?.[1];
      if (!url) continue;
      const weight = /font-weight:\s*(?:\d+\s+)?(\d+)/.exec(f.block)?.[1] ?? '400';
      const range = /unicode-range:\s*([^;]+);/.exec(f.block)?.[1];
      const name = `${slug(fam.family)}-${weight}-${f.subset}.woff2`;
      const buf = await cached(url, name);
      bytes += buf.length;
      out.push(`@font-face{font-family:'${fam.family}';font-style:normal;font-weight:${weight};font-display:block;src:url(data:font/woff2;base64,${buf.toString('base64')}) format('woff2');${range ? `unicode-range:${range};` : ''}}`);
    }
  }

  if (!quiet) console.log(`  ✓ ${out.length} font faces inlined  ${(bytes / 1024).toFixed(0)}kb`);
  return out.join('\n');
}
