'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { MosaicStyle, SizeTier } from '@/types';

interface CheckoutButtonProps {
  imageId: string;
  mosaicId: string | null;
  style: MosaicStyle;
  sizeTier: SizeTier;
  previewUrl: string | null;
  disabled?: boolean;
}

export function CheckoutButton({
  imageId,
  mosaicId,
  style,
  sizeTier,
  previewUrl,
  disabled,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!mosaicId || !previewUrl) return;
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageId: mosaicId,
          style,
          sizeTier,
          previewUrl,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      className="w-full"
      disabled={disabled || !mosaicId || loading}
      onClick={handleCheckout}
    >
      {loading ? (
        <>
          <Spinner size="sm" className="mr-2 !text-white" />
          Redirecting to checkout...
        </>
      ) : (
        'Purchase & Download'
      )}
    </Button>
  );
}
