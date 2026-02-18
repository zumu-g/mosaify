import { z } from 'zod';

/** Only allow URLs from Vercel Blob storage */
const blobUrl = z.string().url().refine(
  (url) => {
    try {
      const { hostname } = new URL(url);
      return hostname.endsWith('.public.blob.vercel-storage.com');
    } catch {
      return false;
    }
  },
  { message: 'URL must be a Vercel Blob storage URL' }
);

/** Nanoid-format ID (alphanumeric + _-) */
const nanoidStr = z.string().regex(/^[A-Za-z0-9_-]{8,21}$/, 'Invalid ID format');

export const uploadSchema = z.object({
  filename: z.string().min(1).max(255),
  contentType: z.enum(['image/jpeg', 'image/png', 'image/webp']),
});

export const mosaicSchema = z.object({
  imageId: nanoidStr,
  imageUrl: blobUrl,
  style: z.enum(['pixel-grid', 'circle', 'hex', 'diamond']),
  sizeTier: z.enum(['standard', 'large', 'ultra']),
  tileSize: z.number().int().min(4).max(64).optional(),
});

export const checkoutSchema = z.object({
  imageId: nanoidStr,
  style: z.enum(['pixel-grid', 'circle', 'hex', 'diamond']),
  sizeTier: z.enum(['standard', 'large', 'ultra']),
  previewUrl: blobUrl,
});

/** Validate a route param ID (nanoid format) */
export function isValidId(id: string): boolean {
  return /^[A-Za-z0-9_-]{8,21}$/.test(id);
}

/** Validate a Stripe session ID format */
export function isValidSessionId(id: string): boolean {
  return /^cs_(test_|live_)[a-zA-Z0-9]{10,}$/.test(id);
}
