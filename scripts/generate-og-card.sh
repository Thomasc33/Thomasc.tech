#!/usr/bin/env bash
# Renders scripts/seo/og-card.html to public/og-card.png at exactly 1200x630,
# the size Open Graph and Twitter summary_large_image expect.
#
# Uses the local Chrome install rather than adding a Puppeteer dependency —
# this only needs to run when the card design changes.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE="$ROOT/scripts/seo/og-card.html"
OUTPUT="$ROOT/public/og-card.png"

CHROME="${CHROME_BIN:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

if [ ! -f "$CHROME" ]; then
  echo "Chrome not found at: $CHROME" >&2
  echo "Set CHROME_BIN to your Chrome/Chromium binary and retry." >&2
  exit 1
fi

if [ ! -f "$SOURCE" ]; then
  echo "Card source missing: $SOURCE" >&2
  exit 1
fi

"$CHROME" \
  --headless \
  --disable-gpu \
  --hide-scrollbars \
  --force-device-scale-factor=1 \
  --window-size=1200,630 \
  --virtual-time-budget=6000 \
  --screenshot="$OUTPUT" \
  "file://$SOURCE" >/dev/null 2>&1

if [ ! -f "$OUTPUT" ]; then
  echo "Chrome produced no output at $OUTPUT" >&2
  exit 1
fi

echo "Wrote $OUTPUT"
command -v sips >/dev/null 2>&1 && sips -g pixelWidth -g pixelHeight "$OUTPUT" | tail -2
