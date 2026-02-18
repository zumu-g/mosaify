import { getAverageColor, rgbToHex } from '../utils';

export function generateCircleSvg(
  pixels: Buffer,
  width: number,
  height: number,
  tileSize: number
): string {
  const cols = Math.ceil(width / tileSize);
  const rows = Math.ceil(height / tileSize);
  const radius = tileSize / 2 - 1;
  const circles: string[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * tileSize;
      const y = row * tileSize;
      const cx = x + tileSize / 2;
      const cy = y + tileSize / 2;
      const color = getAverageColor(pixels, width, x, y, tileSize, tileSize, height);
      circles.push(
        `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${rgbToHex(color)}"/>`
      );
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="#111111"/>${circles.join('')}</svg>`;
}
