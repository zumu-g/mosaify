'use client';

import { useRouter } from 'next/navigation';
import { Dropzone } from '@/components/upload/dropzone';
import { UploadResult } from '@/types';

export function Hero() {
  const router = useRouter();

  const handleUploadComplete = (result: UploadResult) => {
    const params = new URLSearchParams({
      imageId: result.id,
      imageUrl: result.url,
      width: String(result.width),
      height: String(result.height),
    });
    router.push(`/preview?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 px-6 py-24 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-brand-400 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-brand-500 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Transform Photos into{' '}
          <span className="bg-gradient-to-r from-brand-300 to-brand-100 bg-clip-text text-transparent">
            Mosaic Art
          </span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-brand-200">
          Upload any photo and instantly generate stunning mosaic artwork.
          Choose from 4 unique styles, preview for free, and download in
          high resolution.
        </p>

        <div className="mx-auto mt-10 max-w-xl">
          <Dropzone onUploadComplete={handleUploadComplete} />
        </div>
      </div>
    </section>
  );
}
