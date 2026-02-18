import { MosaicStyle, PricingTier, StyleConfig } from '@/types';

export const PRICING_TIERS: PricingTier[] = [
  { tier: 'standard', label: 'Standard', maxDimension: 1024, price: 199 },
  { tier: 'large', label: 'Large', maxDimension: 2048, price: 699 },
  { tier: 'ultra', label: 'Ultra', maxDimension: 4096, price: 1999 },
];

export const STYLE_CONFIGS: StyleConfig[] = [
  {
    label: 'Pixel Grid',
    description: 'Classic square tiles in a clean grid pattern',
    style: 'pixel-grid',
  },
  {
    label: 'Circle',
    description: 'Circular dots on a dark background',
    style: 'circle',
  },
  {
    label: 'Hexagon',
    description: 'Honeycomb-style hexagonal tiles',
    style: 'hex',
  },
  {
    label: 'Diamond',
    description: 'Diamond-shaped tiles in an offset pattern',
    style: 'diamond',
  },
];

export const DEFAULT_TILE_SIZES: Record<MosaicStyle, number> = {
  'pixel-grid': 16,
  circle: 14,
  hex: 18,
  diamond: 20,
};

export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function getPricingTier(tier: string): PricingTier | undefined {
  return PRICING_TIERS.find((t) => t.tier === tier);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
