import { getAverageColor, rgbToHex } from '../utils';

function diamondPoints(cx: number, cy: number, halfW: number, halfH: number): string {
  return [
    `${cx},${cy - halfH}`,
    `${cx + halfW},${cy}`,
    `${cx},${cy + halfH}`,
    `${cx - halfW},${cy}`,
  ].join(' ');
}

export function generateDiamondSvg(
  pixels: Buffer,
  width: number,
  height: number,
  tileSize: number
): string {
  const halfW = tileSize / 2;
  const halfH = tileSize / 2;

  const cols = Math.ceil(width / tileSize) + 1;
  const rows = Math.ceil(height / halfH) + 1;
  const polygons: string[] = [];

  for (let row = 0; row < rows; row++) {
    const isOddRow = row % 2 === 1;
    const xOffset = isOddRow ? halfW : 0;

    for (let col = 0; col < cols; col++) {
      const cx = col * tileSize + xOffset;
      const cy = row * halfH;

      const sampleX = Math.max(0, Math.floor(cx - halfW));
      const sampleY = Math.max(0, Math.floor(cy - halfH));
      const color = getAverageColor(
        pixels,
        width,
        sampleX,
        sampleY,
        tileSize,
        tileSize,
        height
      );

      polygons.push(
        `<polygon points="${diamondPoints(cx, cy, halfW, halfH)}" fill="${rgbToHex(color)}"/>`
      );
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="#f5f3ff"/>${polygons.join('')}</svg>`;
}
