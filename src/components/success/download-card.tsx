'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface DownloadCardProps {
  mosaicId: string;
  style: string;
  sizeTier: string;
}

export function DownloadCard({ mosaicId, style, sizeTier }: DownloadCardProps) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg
          className="h-8 w-8 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="mt-4 text-2xl font-bold text-gray-900">
        Payment Successful!
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        Your {style} mosaic ({sizeTier}) is ready to download.
      </p>

      <a
        href={`/api/images/download/${mosaicId}`}
        className="mt-6 block"
      >
        <Button size="lg" className="w-full">
          Download High-Res Mosaic
        </Button>
      </a>

      <Link
        href="/"
        className="mt-4 inline-block text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        Create Another Mosaic
      </Link>
    </div>
  );
}
