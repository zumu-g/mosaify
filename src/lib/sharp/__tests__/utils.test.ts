import { describe, it, expect } from 'vitest';
import { getAverageColor, rgbToHex, type RGB } from '../utils';

describe('rgbToHex', () => {
  it('converts black', () => {
    expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe('#000000');
  });

  it('converts white', () => {
    expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe('#ffffff');
  });

  it('converts a mid-range color', () => {
    expect(rgbToHex({ r: 171, g: 205, b: 239 })).toBe('#abcdef');
  });

  it('pads single-digit hex values', () => {
    expect(rgbToHex({ r: 1, g: 2, b: 3 })).toBe('#010203');
  });
});

describe('getAverageColor', () => {
  function makePixels(width: number, height: number, color: RGB): Buffer {
    const buf = Buffer.alloc(width * height * 4);
    for (let i = 0; i < width * height; i++) {
      buf[i * 4] = color.r;
      buf[i * 4 + 1] = color.g;
      buf[i * 4 + 2] = color.b;
      buf[i * 4 + 3] = 255; // alpha
    }
    return buf;
  }

  it('returns the solid color for a uniform image', () => {
    const pixels = makePixels(4, 4, { r: 100, g: 150, b: 200 });
    const avg = getAverageColor(pixels, 4, 0, 0, 4, 4, 4);
    expect(avg).toEqual({ r: 100, g: 150, b: 200 });
  });

  it('averages two halves correctly', () => {
    // 2x1 image: left pixel red, right pixel blue
    const buf = Buffer.alloc(2 * 1 * 4);
    buf[0] = 255; buf[1] = 0; buf[2] = 0; buf[3] = 255;    // red
    buf[4] = 0;   buf[5] = 0; buf[6] = 255; buf[7] = 255;   // blue
    const avg = getAverageColor(buf, 2, 0, 0, 2, 1, 1);
    expect(avg).toEqual({ r: 128, g: 0, b: 128 });
  });

  it('handles sub-region within a larger image', () => {
    const pixels = makePixels(4, 4, { r: 50, g: 50, b: 50 });
    // Override a 2x2 region at (2,2) with white
    for (let py = 2; py < 4; py++) {
      for (let px = 2; px < 4; px++) {
        const idx = (py * 4 + px) * 4;
        pixels[idx] = 255;
        pixels[idx + 1] = 255;
        pixels[idx + 2] = 255;
      }
    }
    const avg = getAverageColor(pixels, 4, 2, 2, 2, 2, 4);
    expect(avg).toEqual({ r: 255, g: 255, b: 255 });
  });

  it('clamps tile to image boundaries', () => {
    const pixels = makePixels(3, 3, { r: 60, g: 60, b: 60 });
    // Request a 4x4 tile starting at (1,1) on a 3x3 image
    const avg = getAverageColor(pixels, 3, 1, 1, 4, 4, 3);
    expect(avg).toEqual({ r: 60, g: 60, b: 60 });
  });

  it('returns black for zero-area tile', () => {
    const pixels = makePixels(2, 2, { r: 100, g: 100, b: 100 });
    // Tile at position beyond the image
    const avg = getAverageColor(pixels, 2, 5, 5, 2, 2, 2);
    expect(avg).toEqual({ r: 0, g: 0, b: 0 });
  });
});
