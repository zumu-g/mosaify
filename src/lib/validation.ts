import { z } from 'zod';

export const uploadSchema = z.object({
  filename: z.string().min(1),
  contentType: z.enum(['image/jpeg', 'image/png', 'image/webp']),
});

export const mosaicSchema = z.object({
  imageId: z.string().min(1),
  imageUrl: z.string().url(),
  style: z.enum(['pixel-grid', 'circle', 'hex', 'diamond']),
  sizeTier: z.enum(['standard', 'large', 'ultra']),
  tileSize: z.number().int().min(4).max(64).optional(),
});

export const checkoutSchema = z.object({
  imageId: z.string().min(1),
  style: z.enum(['pixel-grid', 'circle', 'hex', 'diamond']),
  sizeTier: z.enum(['standard', 'large', 'ultra']),
  previewUrl: z.string().url(),
});
