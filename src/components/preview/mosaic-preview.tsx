'use client';

import { Spinner } from '@/components/ui/spinner';

interface MosaicPreviewProps {
  previewUrl: string | null;
  loading: boolean;
  error: string | null;
}

export function MosaicPreview({ previewUrl, loading, error }: MosaicPreviewProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
      {loading && (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 p-8">
          <Spinner size="lg" />
          <p className="text-sm font-medium text-gray-600">
            Generating your mosaic...
          </p>
        </div>
      )}

      {error && !loading && (
        <div className="flex min-h-[300px] items-center justify-center p-8">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {previewUrl && !loading && (
        <img
          src={previewUrl}
          alt="Mosaic preview (watermarked)"
          className="w-full"
        />
      )}

      {!previewUrl && !loading && !error && (
        <div className="flex min-h-[300px] items-center justify-center p-8">
          <p className="text-sm text-gray-500">
            Select a style and size, then click &ldquo;Generate Preview&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
