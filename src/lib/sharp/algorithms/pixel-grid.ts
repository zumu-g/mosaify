import { getAverageColor, rgbToHex } from '../utils';

export function generatePixelGridSvg(
  pixels: Buffer,
  width: number,
  height: number,
  tileSize: number
): string {
  const cols = Math.ceil(width / tileSize);
  const rows = Math.ceil(height / tileSize);
  const rects: string[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * tileSize;
      const y = row * tileSize;
      const color = getAverageColor(pixels, width, x, y, tileSize, tileSize, height);
      rects.push(
        `<rect x="${x}" y="${y}" width="${tileSize}" height="${tileSize}" fill="${rgbToHex(color)}"/>`
      );
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${rects.join('')}</svg>`;
}
