'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { MosaicStyle, SizeTier } from '@/types';
import { StyleSelector } from '@/components/preview/style-selector';
import { SizeSelector } from '@/components/preview/size-selector';
import { TileSizeSlider } from '@/components/preview/tile-size-slider';
import { MosaicPreview } from '@/components/preview/mosaic-preview';
import { CheckoutButton } from '@/components/preview/checkout-button';
import { Button } from '@/components/ui/button';
import { useMosaic } from '@/hooks/use-mosaic';
import { DEFAULT_TILE_SIZES } from '@/lib/constants';
import Link from 'next/link';
import { LogoWithText } from '@/components/ui/logo';

function PreviewContent() {
  const searchParams = useSearchParams();
  const imageId = searchParams.get('imageId') || '';
  const imageUrl = searchParams.get('imageUrl') || '';

  const [style, setStyle] = useState<MosaicStyle>('pixel-grid');
  const [sizeTier, setSizeTier] = useState<SizeTier>('large');
  const [tileSize, setTileSize] = useState<number>(DEFAULT_TILE_SIZES['pixel-grid']);

  useEffect(() => {
    setTileSize(DEFAULT_TILE_SIZES[style]);
  }, [style]);

  const { generating, error, mosaicId, previewUrl, generate } = useMosaic();

  const handleGenerate = () => {
    if (!imageId || !imageUrl) return;
    generate(imageId, imageUrl, style, sizeTier, tileSize);
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
      <header className="border-b border-stone-200 bg-stone-50 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/">
            <LogoWithText size={28} />
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
              originalUrl={imageUrl}
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

            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Tile Size
              </h2>
              <TileSizeSlider
                value={tileSize}
                onChange={setTileSize}
                style={style}
              />
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
