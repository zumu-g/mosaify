/**
 * Generate an SVG watermark overlay with repeating diagonal "MOSAIFY" text.
 */
export function generateWatermark(width: number, height: number): string {
  const fontSize = Math.max(24, Math.round(width / 20));
  const spacing = fontSize * 4;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <defs>
    <pattern id="wm" width="${spacing}" height="${spacing}" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
      <text x="${spacing / 2}" y="${spacing / 2}"
        font-family="Arial, sans-serif"
        font-size="${fontSize}"
        font-weight="bold"
        fill="white"
        fill-opacity="0.15"
        text-anchor="middle"
        dominant-baseline="middle">MOSAIFY</text>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#wm)"/>
</svg>`;
}
