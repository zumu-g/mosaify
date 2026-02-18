import { getAverageColor, rgbToHex } from '../utils';

function hexPoints(cx: number, cy: number, size: number): string {
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const px = cx + size * Math.cos(angle);
    const py = cy + size * Math.sin(angle);
    points.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }
  return points.join(' ');
}

export function generateHexSvg(
  pixels: Buffer,
  width: number,
  height: number,
  tileSize: number
): string {
  const hexSize = tileSize / 2;
  const hexWidth = Math.sqrt(3) * hexSize;
  const hexHeight = 2 * hexSize;
  const rowHeight = hexHeight * 0.75;

  const cols = Math.ceil(width / hexWidth) + 1;
  const rows = Math.ceil(height / rowHeight) + 1;
  const polygons: string[] = [];

  for (let row = 0; row < rows; row++) {
    const isOddRow = row % 2 === 1;
    const xOffset = isOddRow ? hexWidth / 2 : 0;

    for (let col = 0; col < cols; col++) {
      const cx = col * hexWidth + xOffset + hexWidth / 2;
      const cy = row * rowHeight + hexSize;

      // Sample area around the hex center
      const sampleX = Math.max(0, Math.floor(cx - hexSize));
      const sampleY = Math.max(0, Math.floor(cy - hexSize));
      const color = getAverageColor(
        pixels,
        width,
        sampleX,
        sampleY,
        Math.ceil(hexWidth),
        Math.ceil(hexHeight * 0.75),
        height
      );

      polygons.push(
        `<polygon points="${hexPoints(cx, cy, hexSize)}" fill="${rgbToHex(color)}"/>`
      );
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="#f5f3ff"/>${polygons.join('')}</svg>`;
}
