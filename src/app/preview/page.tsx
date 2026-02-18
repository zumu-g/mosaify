'use client';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { MosaicStyle, SizeTier } from '@/types';
import { StyleSelector } from '@/components/preview/style-selector';
import { SizeSelector } from '@/components/preview/size-selector';
import { MosaicPreview } from '@/components/preview/mosaic-preview';
import { CheckoutButton } from '@/components/preview/checkout-button';
import { Button } from '@/components/ui/button';
import { useMosaic } from '@/hooks/use-mosaic';
import Link from 'next/link';

function PreviewContent() {
  const searchParams = useSearchParams();
  const imageId = searchParams.get('imageId') || '';
  const imageUrl = searchParams.get('imageUrl') || '';

  const [style, setStyle] = useState<MosaicStyle>('pixel-grid');
  const [sizeTier, setSizeTier] = useState<SizeTier>('large');

  const { generating, error, mosaicId, previewUrl, generate } = useMosaic();

  const handleGenerate = () => {
    if (!imageId || !imageUrl) return;
    generate(imageId, imageUrl, style, sizeTier);
  };

  if (!imageId || !imageUrl) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
        <p className="text-gray-600">No image selected.</p>
        <Link href="/">
          <Button variant="secondary">Go back to upload</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-xl font-bold text-brand-700">
            Mosaify
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              Start Over
            </Button>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left: Preview area */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Preview Your Mosaic
            </h1>
            <MosaicPreview
              previewUrl={previewUrl}
              loading={generating}
              error={error}
            />
          </div>

          {/* Right: Controls */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Style
              </h2>
              <StyleSelector selected={style} onSelect={setStyle} />
            </div>

            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Size & Price
              </h2>
              <SizeSelector selected={sizeTier} onSelect={setSizeTier} />
            </div>

            <Button
              size="lg"
              className="w-full"
              variant="secondary"
              onClick={handleGenerate}
              disabled={generating}
            >
              {generating ? 'Generating...' : 'Generate Preview'}
            </Button>

            <CheckoutButton
              imageId={imageId}
              mosaicId={mosaicId}
              style={style}
              sizeTier={sizeTier}
              previewUrl={previewUrl}
              disabled={!mosaicId || generating}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      }
    >
      <PreviewContent />
    </Suspense>
  );
}
