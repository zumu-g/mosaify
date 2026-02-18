'use client';

import { useState, useCallback } from 'react';
import { MosaicStyle, SizeTier } from '@/types';

interface UseMosaicReturn {
  generating: boolean;
  error: string | null;
  mosaicId: string | null;
  previewUrl: string | null;
  generate: (
    imageId: string,
    imageUrl: string,
    style: MosaicStyle,
    sizeTier: SizeTier
  ) => Promise<void>;
  reset: () => void;
}

export function useMosaic(): UseMosaicReturn {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mosaicId, setMosaicId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const reset = useCallback(() => {
    setGenerating(false);
    setError(null);
    setMosaicId(null);
    setPreviewUrl(null);
  }, []);

  const generate = useCallback(
    async (
      imageId: string,
      imageUrl: string,
      style: MosaicStyle,
      sizeTier: SizeTier
    ) => {
      setGenerating(true);
      setError(null);
      setMosaicId(null);
      setPreviewUrl(null);

      try {
        const response = await fetch('/api/mosaic', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageId, imageUrl, style, sizeTier }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to generate mosaic');
        }

        const data = await response.json();
        setMosaicId(data.id);
        setPreviewUrl(data.previewUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Generation failed');
      } finally {
        setGenerating(false);
      }
    },
    []
  );

  return { generating, error, mosaicId, previewUrl, generate, reset };
}
