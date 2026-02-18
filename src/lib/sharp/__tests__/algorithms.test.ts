import { describe, it, expect } from 'vitest';
import { generatePixelGridSvg } from '../algorithms/pixel-grid';
import { generateCircleSvg } from '../algorithms/circle';
import { generateHexSvg } from '../algorithms/hex';
import { generateDiamondSvg } from '../algorithms/diamond';

function makeRedPixels(width: number, height: number): Buffer {
  const buf = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    buf[i * 4] = 255;     // R
    buf[i * 4 + 1] = 0;   // G
    buf[i * 4 + 2] = 0;   // B
    buf[i * 4 + 3] = 255; // A
  }
  return buf;
}

describe('generatePixelGridSvg', () => {
  it('returns a valid SVG string', () => {
    const svg = generatePixelGridSvg(makeRedPixels(4, 4), 4, 4, 2);
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('width="4"');
    expect(svg).toContain('height="4"');
  });

  it('generates the correct number of rects', () => {
    const svg = generatePixelGridSvg(makeRedPixels(8, 8), 8, 8, 4);
    // 8/4 = 2 cols, 2 rows = 4 rects
    const rectCount = (svg.match(/<rect /g) || []).length;
    expect(rectCount).toBe(4);
  });

  it('uses the correct fill color for solid red', () => {
    const svg = generatePixelGridSvg(makeRedPixels(4, 4), 4, 4, 4);
    expect(svg).toContain('fill="#ff0000"');
  });
});

describe('generateCircleSvg', () => {
  it('returns a valid SVG with background rect', () => {
    const svg = generateCircleSvg(makeRedPixels(4, 4), 4, 4, 2);
    expect(svg).toContain('<svg');
    expect(svg).toContain('fill="#111111"');
  });

  it('generates circles not rects', () => {
    const svg = generateCircleSvg(makeRedPixels(4, 4), 4, 4, 2);
    expect(svg).toContain('<circle');
    // Should not have mosaic rects (only the background rect)
    const circleCount = (svg.match(/<circle /g) || []).length;
    expect(circleCount).toBe(4); // 2x2 grid
  });
});

describe('generateHexSvg', () => {
  it('returns a valid SVG string', () => {
    const svg = generateHexSvg(makeRedPixels(6, 6), 6, 6, 3);
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
  });

  it('generates polygon elements', () => {
    const svg = generateHexSvg(makeRedPixels(6, 6), 6, 6, 3);
    expect(svg).toContain('<polygon');
  });
});

describe('generateDiamondSvg', () => {
  it('returns a valid SVG string', () => {
    const svg = generateDiamondSvg(makeRedPixels(8, 8), 8, 8, 4);
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
  });

  it('generates polygon elements', () => {
    const svg = generateDiamondSvg(makeRedPixels(8, 8), 8, 8, 4);
    expect(svg).toContain('<polygon');
  });
});
