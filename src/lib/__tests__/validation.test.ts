import { describe, it, expect } from 'vitest';
import {
  mosaicSchema,
  checkoutSchema,
  uploadSchema,
  isValidId,
  isValidSessionId,
} from '../validation';

describe('isValidId', () => {
  it('accepts a valid nanoid', () => {
    expect(isValidId('abc123XYZ_-a')).toBe(true);
  });

  it('rejects too-short IDs', () => {
    expect(isValidId('abc')).toBe(false);
  });

  it('rejects too-long IDs', () => {
    expect(isValidId('a'.repeat(22))).toBe(false);
  });

  it('rejects IDs with special characters', () => {
    expect(isValidId('abc!@#$%^&*()')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(isValidId('')).toBe(false);
  });
});

describe('isValidSessionId', () => {
  it('accepts test session IDs', () => {
    expect(isValidSessionId('cs_test_a1b2c3d4e5f6g7h8i9j0')).toBe(true);
  });

  it('accepts live session IDs', () => {
    expect(isValidSessionId('cs_live_a1b2c3d4e5f6g7h8i9j0')).toBe(true);
  });

  it('rejects invalid prefixes', () => {
    expect(isValidSessionId('cs_fake_a1b2c3d4e5f6g7h8i9j0')).toBe(false);
  });

  it('rejects random strings', () => {
    expect(isValidSessionId('random-string')).toBe(false);
  });
});

describe('uploadSchema', () => {
  it('accepts valid input', () => {
    const result = uploadSchema.safeParse({
      filename: 'photo.jpg',
      contentType: 'image/jpeg',
    });
    expect(result.success).toBe(true);
  });

  it('rejects unsupported content type', () => {
    const result = uploadSchema.safeParse({
      filename: 'file.gif',
      contentType: 'image/gif',
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty filename', () => {
    const result = uploadSchema.safeParse({
      filename: '',
      contentType: 'image/png',
    });
    expect(result.success).toBe(false);
  });
});

describe('mosaicSchema', () => {
  const validInput = {
    imageId: 'abc123XYZ_-a',
    imageUrl: 'https://xyz.public.blob.vercel-storage.com/image.png',
    style: 'pixel-grid' as const,
    sizeTier: 'large' as const,
  };

  it('accepts valid input', () => {
    expect(mosaicSchema.safeParse(validInput).success).toBe(true);
  });

  it('accepts optional tileSize', () => {
    expect(
      mosaicSchema.safeParse({ ...validInput, tileSize: 16 }).success
    ).toBe(true);
  });

  it('rejects tileSize below 4', () => {
    expect(
      mosaicSchema.safeParse({ ...validInput, tileSize: 2 }).success
    ).toBe(false);
  });

  it('rejects tileSize above 64', () => {
    expect(
      mosaicSchema.safeParse({ ...validInput, tileSize: 100 }).success
    ).toBe(false);
  });

  it('rejects non-blob URLs', () => {
    expect(
      mosaicSchema.safeParse({
        ...validInput,
        imageUrl: 'https://evil.com/image.png',
      }).success
    ).toBe(false);
  });

  it('rejects invalid style', () => {
    expect(
      mosaicSchema.safeParse({ ...validInput, style: 'mosaic' }).success
    ).toBe(false);
  });

  it('rejects invalid sizeTier', () => {
    expect(
      mosaicSchema.safeParse({ ...validInput, sizeTier: 'mega' }).success
    ).toBe(false);
  });
});

describe('checkoutSchema', () => {
  const validInput = {
    imageId: 'abc123XYZ_-a',
    style: 'circle' as const,
    sizeTier: 'ultra' as const,
    previewUrl: 'https://xyz.public.blob.vercel-storage.com/preview.png',
  };

  it('accepts valid input', () => {
    expect(checkoutSchema.safeParse(validInput).success).toBe(true);
  });

  it('rejects non-blob previewUrl', () => {
    expect(
      checkoutSchema.safeParse({
        ...validInput,
        previewUrl: 'https://attacker.com/image.png',
      }).success
    ).toBe(false);
  });
});
