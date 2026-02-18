import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 402 });
    }

    return NextResponse.json({
      imageId: session.metadata?.imageId,
      style: session.metadata?.style,
      sizeTier: session.metadata?.sizeTier,
    });
  } catch {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }
}
