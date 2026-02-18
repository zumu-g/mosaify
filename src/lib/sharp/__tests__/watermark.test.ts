import { describe, it, expect } from 'vitest';
import { generateWatermark } from '../watermark';

describe('generateWatermark', () => {
  it('returns a valid SVG', () => {
    const svg = generateWatermark(800, 600);
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('width="800"');
    expect(svg).toContain('height="600"');
  });

  it('contains MOSAIFY text', () => {
    const svg = generateWatermark(800, 600);
    expect(svg).toContain('MOSAIFY');
  });

  it('uses a semi-transparent fill', () => {
    const svg = generateWatermark(800, 600);
    expect(svg).toContain('fill-opacity="0.15"');
  });

  it('scales font size with image width', () => {
    const small = generateWatermark(200, 200);
    const large = generateWatermark(2000, 2000);
    const smallFontMatch = small.match(/font-size="(\d+)"/);
    const largeFontMatch = large.match(/font-size="(\d+)"/);
    expect(Number(largeFontMatch![1])).toBeGreaterThan(
      Number(smallFontMatch![1])
    );
  });
});
