import { NextRequest, NextResponse } from 'next/server';
import { list } from '@vercel/blob';
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
    const { blobs } = await list({ prefix: `mosaics/${id}-preview` });
    if (blobs.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const imageResponse = await fetch(blobs[0].url);
    const imageBuffer = await imageResponse.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to serve image' }, { status: 500 });
  }
}
