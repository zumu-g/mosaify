import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { checkoutSchema } from '@/lib/validation';
import { getPricingTier } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { imageId, style, sizeTier, previewUrl } = parsed.data;
    const tier = getPricingTier(sizeTier);

    if (!tier) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Mosaify — ${tier.label} Mosaic`,
              description: `${style} style, up to ${tier.maxDimension}px`,
              images: [previewUrl],
            },
            unit_amount: tier.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/preview?imageId=${imageId}&cancelled=true`,
      metadata: {
        imageId,
        style,
        sizeTier,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
