'use client';

import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Dropzone } from '@/components/upload/dropzone';
import { UploadResult } from '@/types';
import { MosaicBorder } from '@/components/ui/illustrations';

export function Hero() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

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
    <section
      id="hero-upload"
      className="relative overflow-hidden bg-tessera px-6 py-20 sm:py-28"
    >
      {/* Warm radial glow from center — subtle so text stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(254,247,240,0.4) 0%, rgba(243,239,232,0.15) 50%, transparent 100%)',
        }}
      />

      {/* Decorative mosaic tiles scattered in background */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.06]" aria-hidden="true">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mosaic-bg" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect x="5" y="5" width="12" height="12" rx="1" fill="#c75b39" />
              <rect x="22" y="22" width="12" height="12" rx="1" fill="#d4a853" />
              <rect x="44" y="8" width="12" height="12" rx="1" fill="#7a8b6f" />
              <rect x="8" y="44" width="12" height="12" rx="1" fill="#b04a2e" />
              <rect x="44" y="50" width="12" height="12" rx="1" fill="#d4a853" />
              <rect x="62" y="30" width="12" height="12" rx="1" fill="#c75b39" />
              <rect x="28" y="58" width="12" height="12" rx="1" fill="#7a8b6f" />
              <rect x="64" y="62" width="12" height="12" rx="1" fill="#8f3a24" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mosaic-bg)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Eyebrow with flanking lines */}
        <motion.p
          className="mb-5 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-500"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <span className="h-px w-8 bg-gold-400/60" />
          Photo Mosaic Generator
          <span className="h-px w-8 bg-gold-400/60" />
        </motion.p>

        <motion.h1
          className="font-heading text-5xl tracking-tight text-stone-900 sm:text-7xl"
          style={{ lineHeight: 1.1 }}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
        >
          Turn any photo into{' '}
          <span className="relative inline-block text-brand-600">
            handcrafted
            <span
              className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-sm"
              style={{
                background: 'linear-gradient(90deg, #d4a853 0%, #e8954a 40%, #d4a853 100%)',
              }}
            />
          </span>{' '}
          <br className="hidden sm:block" />
          mosaic art
        </motion.h1>

        <motion.p
          className="mt-6 text-lg leading-8 text-stone-600"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        >
          Upload a photo, pick a style — pixel grid, circle, hexagon, or
          diamond — and download a stunning high-res mosaic. Preview free,
          pay only for the final result.
        </motion.p>

        <motion.div
          className="mx-auto mt-10 max-w-xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
        >
          <Dropzone onUploadComplete={handleUploadComplete} />
        </motion.div>

        <motion.p
          className="mt-4 text-xs text-stone-400"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          No account needed. Your photo is processed securely and deleted after 48 hours.
        </motion.p>
      </div>

      {/* Mosaic border transition to next section */}
      <div className="mt-20">
        <MosaicBorder />
      </div>
    </section>
  );
}
