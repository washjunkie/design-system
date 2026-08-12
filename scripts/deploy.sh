#!/usr/bin/env bash
#
# Publish design.washjunkie.com on the home lab.
#
# There is no build step here and that is deliberate: tokens/dist IS committed
# (it is the artifact web/ vendors), and the showcase is plain HTML against
# ../css, ../tokens/dist and ../assets. A fresh checkout is already the site.
# The token audit that WOULD justify a build step runs in CI, before this.
#
# The workflow has already reset the checkout to origin/main, so everything
# below is a statement about what is actually on disk.
set -euo pipefail

cd "$(dirname "$0")/.."

EXPECTED_SHA="${1:-}"
PORT=3055
URL=https://design.washjunkie.com/showcase/

# Colon, not hyphen — every app on this host is named that way.
echo "--- restarting ---"
pm2 reload washjunkie:design --update-env
pm2 save 2>/dev/null || true

echo "--- deployed commit ---"
git rev-parse HEAD
git log -1 --pretty='%s'

# A deploy that did not move must not report success. The landing repo learned
# this the hard way: its equivalent assertion sat in a workflow block that the
# server's shell refused to parse, so it never once ran.
if [ -n "$EXPECTED_SHA" ] && [ "$(git rev-parse HEAD)" != "$EXPECTED_SHA" ]; then
  echo "checkout is $(git rev-parse HEAD), not the pushed commit $EXPECTED_SHA"
  exit 1
fi

# "pm2 says online" and "the site serves" are different claims — a crash-looping
# process reports online between restarts. Checked locally first for a fast,
# unambiguous signal.
echo "--- health (origin) ---"
for attempt in $(seq 1 10); do
  code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 "http://127.0.0.1:${PORT}/showcase/" || true)"
  if [ "$code" = "200" ]; then
    echo "127.0.0.1:${PORT}/showcase/ → 200"
    break
  fi
  if [ "$attempt" = "10" ]; then
    echo "not serving on ${PORT} after 30s (last: ${code:-no response})."
    pm2 logs washjunkie:design --lines 40 --nostream || true
    exit 1
  fi
  sleep 3
done

# Then through the public URL, which is the only thing that also proves nginx
# still points at this process and the Cloudflare Tunnel is up. This hairpins
# out to Cloudflare and back, so it tests the whole path rather than a port.
echo "--- health (public) ---"
for attempt in $(seq 1 10); do
  code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "$URL" || true)"
  if [ "$code" = "200" ]; then
    echo "$URL → 200"
    break
  fi
  if [ "$attempt" = "10" ]; then
    echo "$URL is not serving after ~60s (last: ${code:-no response})."
    exit 1
  fi
  sleep 6
done

# The showcase is only meaningful if the assets it references resolve — it
# links the real stylesheets on purpose, so that a broken token build shows up
# as a broken page rather than a passing test.
echo "--- assets ---"
for asset in /tokens/dist/wj-tokens.css /css/wj-material.css /css/wj-components.css /assets/wj-wordmark.svg; do
  code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "https://design.washjunkie.com${asset}" || true)"
  printf '%-34s %s\n' "$asset" "$code"
  [ "$code" = "200" ] || { echo "asset missing — the showcase would render unstyled"; exit 1; }
done

echo "--- deployed ---"
