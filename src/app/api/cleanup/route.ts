import { NextRequest, NextResponse } from 'next/server';
import { list, del } from '@vercel/blob';

export async function GET(request: NextRequest) {
  // Only allow Vercel Cron or requests with the correct secret
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000); // 48 hours ago
    const { blobs } = await list({ prefix: 'mosaics/' });

    let deleted = 0;

    for (const blob of blobs) {
      // Check metadata files for unpaid mosaics
      if (blob.pathname.endsWith('-meta.json')) {
        const uploadedAt = new Date(blob.uploadedAt);
        if (uploadedAt < cutoff) {
          // Fetch metadata to check payment status
          try {
            const response = await fetch(blob.url, { cache: 'no-store' });
            const metadata = await response.json();

            if (!metadata.paid) {
              // Delete all related blobs for this mosaic
              const id = blob.pathname
                .replace('mosaics/', '')
                .replace('-meta.json', '');

              const { blobs: related } = await list({
                prefix: `mosaics/${id}`,
              });

              for (const relatedBlob of related) {
                await del(relatedBlob.url);
                deleted++;
              }
            }
          } catch {
            // Skip blobs we can't parse
          }
        }
      }
    }

    return NextResponse.json({ deleted, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 });
  }
}
