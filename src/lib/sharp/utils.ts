export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Compute the average color of a rectangular region within RGBA pixel data.
 */
export function getAverageColor(
  pixels: Buffer,
  imageWidth: number,
  x: number,
  y: number,
  tileWidth: number,
  tileHeight: number,
  totalHeight: number
): RGB {
  let rSum = 0;
  let gSum = 0;
  let bSum = 0;
  let count = 0;

  const x2 = Math.min(x + tileWidth, imageWidth);
  const y2 = Math.min(y + tileHeight, totalHeight);

  for (let py = y; py < y2; py++) {
    for (let px = x; px < x2; px++) {
      const idx = (py * imageWidth + px) * 4;
      rSum += pixels[idx];
      gSum += pixels[idx + 1];
      bSum += pixels[idx + 2];
      count++;
    }
  }

  if (count === 0) return { r: 0, g: 0, b: 0 };

  return {
    r: Math.round(rSum / count),
    g: Math.round(gSum / count),
    b: Math.round(bSum / count),
  };
}

export function rgbToHex(color: RGB): string {
  const toHex = (v: number) => v.toString(16).padStart(2, '0');
  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
}
