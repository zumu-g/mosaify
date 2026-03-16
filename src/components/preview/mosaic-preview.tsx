'use client';

import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Spinner } from '@/components/ui/spinner';

interface MosaicPreviewProps {
  previewUrl: string | null;
  loading: boolean;
  error: string | null;
  originalUrl?: string;
}

export function MosaicPreview({ previewUrl, loading, error, originalUrl }: MosaicPreviewProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            className="flex min-h-[300px] flex-col items-center justify-center gap-4 p-8"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Spinner size="lg" />
            <p className="text-sm font-medium text-gray-600">
              Generating your mosaic...
            </p>
          </motion.div>
        )}

        {error && !loading && (
          <motion.div
            key="error"
            className="flex min-h-[300px] items-center justify-center p-8"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-red-600">{error}</p>
          </motion.div>
        )}

        {previewUrl && !loading && (
          <motion.div
            key="preview"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Image
              src={previewUrl}
              alt="Mosaic preview (watermarked)"
              className="w-full"
              width={1024}
              height={1024}
              unoptimized
            />
          </motion.div>
        )}

        {!previewUrl && !loading && !error && (
          <motion.div
            key="empty"
            className="flex min-h-[300px] flex-col items-center justify-center gap-4 p-8"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {originalUrl ? (
              <>
                <Image
                  src={originalUrl}
                  alt="Your uploaded photo"
                  className="max-h-[400px] w-auto rounded-lg object-contain shadow-sm"
                  width={600}
                  height={600}
                  unoptimized
                />
                <p className="text-sm text-gray-500">
                  Your uploaded photo — choose a style and click <strong>&ldquo;Generate Preview&rdquo;</strong> below
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500">
                Select a style and size, then click &ldquo;Generate Preview&rdquo;
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
