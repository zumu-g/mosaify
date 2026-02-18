import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { mosaicSchema } from '@/lib/validation';
import { generateMosaic } from '@/lib/sharp/mosaic-engine';
import { uploadImage, uploadJson } from '@/lib/storage';

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = mosaicSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { imageUrl, style, sizeTier, tileSize } = parsed.data;

    // Fetch the original image from blob storage
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch source image' },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Generate mosaic (both preview + full-res)
    const { preview, fullRes } = await generateMosaic(
      imageBuffer,
      style,
      sizeTier,
      tileSize
    );

    const mosaicId = nanoid(12);

    // Upload both versions to blob storage
    const [previewResult, fullResResult] = await Promise.all([
      uploadImage(`mosaics/${mosaicId}-preview.png`, preview, 'image/png'),
      uploadImage(`mosaics/${mosaicId}-full.png`, fullRes, 'image/png'),
    ]);

    // Store metadata (payment status, etc.)
    await uploadJson(`mosaics/${mosaicId}-meta.json`, {
      id: mosaicId,
      style,
      sizeTier,
      previewUrl: previewResult.url,
      fullResUrl: fullResResult.url,
      paid: false,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      id: mosaicId,
      previewUrl: previewResult.url,
    });
  } catch (error) {
    console.error('Mosaic generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate mosaic' },
      { status: 500 }
    );
  }
}
