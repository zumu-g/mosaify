import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { list } from '@vercel/blob';
import { getJsonData, uploadJson } from '@/lib/storage';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  try {
    const event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const imageId = session.metadata?.imageId;

      if (imageId) {
        // Update metadata to mark as paid
        const { blobs } = await list({ prefix: `mosaics/${imageId}-meta` });
        if (blobs.length > 0) {
          const metadata = await getJsonData(blobs[0].url);
          if (metadata) {
            await uploadJson(`mosaics/${imageId}-meta.json`, {
              ...metadata,
              paid: true,
              stripeSessionId: session.id,
              paidAt: new Date().toISOString(),
            });
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook verification failed' },
      { status: 400 }
    );
  }
}
