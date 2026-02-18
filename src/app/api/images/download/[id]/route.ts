import { NextRequest, NextResponse } from 'next/server';
import { list } from '@vercel/blob';
import { getJsonData } from '@/lib/storage';
import { isValidId } from '@/lib/validation';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isValidId(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    // Check payment status
    const { blobs: metaBlobs } = await list({ prefix: `mosaics/${id}-meta` });
    if (metaBlobs.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const metadata = await getJsonData(metaBlobs[0].url);
    if (!metadata || metadata.paid !== true) {
      return NextResponse.json(
        { error: 'Payment required' },
        { status: 403 }
      );
    }

    // Serve the full-res image
    const { blobs: imageBlobs } = await list({ prefix: `mosaics/${id}-full` });
    if (imageBlobs.length === 0) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const imageResponse = await fetch(imageBlobs[0].url);
    const imageBuffer = await imageResponse.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="mosaify-${id}.png"`,
        'Cache-Control': 'private, no-cache',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to serve image' }, { status: 500 });
  }
}
