export type MosaicStyle = 'pixel-grid' | 'circle' | 'hex' | 'diamond';

export type SizeTier = 'standard' | 'large' | 'ultra';

export interface MosaicJob {
  id: string;
  originalUrl: string;
  previewUrl: string | null;
  fullResUrl: string | null;
  style: MosaicStyle;
  sizeTier: SizeTier;
  width: number;
  height: number;
  paid: boolean;
  createdAt: string;
}

export interface UploadResult {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface StyleConfig {
  label: string;
  description: string;
  style: MosaicStyle;
}

export interface PricingTier {
  tier: SizeTier;
  label: string;
  maxDimension: number;
  price: number;
  priceId?: string;
}
