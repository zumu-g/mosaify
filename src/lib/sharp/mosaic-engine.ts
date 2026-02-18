import sharp from 'sharp';
import { MosaicStyle, SizeTier } from '@/types';
import { DEFAULT_TILE_SIZES, PRICING_TIERS } from '@/lib/constants';
import { generatePixelGridSvg } from './algorithms/pixel-grid';
import { generateCircleSvg } from './algorithms/circle';
import { generateHexSvg } from './algorithms/hex';
import { generateDiamondSvg } from './algorithms/diamond';
import { generateWatermark } from './watermark';

interface MosaicResult {
  preview: Buffer;
  fullRes: Buffer;
}

const algorithmMap: Record<
  MosaicStyle,
  (pixels: Buffer, w: number, h: number, ts: number) => string
> = {
  'pixel-grid': generatePixelGridSvg,
  circle: generateCircleSvg,
  hex: generateHexSvg,
  diamond: generateDiamondSvg,
};

export async function generateMosaic(
  imageBuffer: Buffer,
  style: MosaicStyle,
  sizeTier: SizeTier,
  tileSize?: number
): Promise<MosaicResult> {
  const tier = PRICING_TIERS.find((t) => t.tier === sizeTier);
  if (!tier) throw new Error(`Invalid size tier: ${sizeTier}`);

  const ts = tileSize ?? DEFAULT_TILE_SIZES[style];

  // Resize to target dimensions while maintaining aspect ratio
  const resized = sharp(imageBuffer).resize({
    width: tier.maxDimension,
    height: tier.maxDimension,
    fit: 'inside',
    withoutEnlargement: true,
  });

  const { data, info } = await resized
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;

  // Generate mosaic SVG
  const generateSvg = algorithmMap[style];
  const svgString = generateSvg(data, width, height, ts);
  const svgBuffer = Buffer.from(svgString);

  // Render the SVG to a PNG (full resolution)
  const fullRes = await sharp(svgBuffer)
    .resize(width, height)
    .png()
    .toBuffer();

  // Generate watermarked preview
  const watermarkSvg = generateWatermark(width, height);
  const preview = await sharp(fullRes)
    .composite([
      {
        input: Buffer.from(watermarkSvg),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toBuffer();

  return { preview, fullRes };
}
