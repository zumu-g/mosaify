'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface DownloadCardProps {
  mosaicId: string;
  style: string;
  sizeTier: string;
}

export function DownloadCard({ mosaicId, style, sizeTier }: DownloadCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
        initial={prefersReducedMotion ? false : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
      >
        <motion.svg
          className="h-8 w-8 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          initial={prefersReducedMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
            initial={prefersReducedMotion ? {} : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          />
        </motion.svg>
      </motion.div>

      <motion.h2
        className="mt-4 text-2xl font-bold text-gray-900"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        Payment Successful!
      </motion.h2>
      <motion.p
        className="mt-2 text-sm text-gray-600"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        Your {style} mosaic ({sizeTier}) is ready to download.
      </motion.p>

      <motion.a
        href={`/api/images/download/${mosaicId}`}
        className="mt-6 block"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Button size="lg" className="w-full">
          Download High-Res Mosaic
        </Button>
      </motion.a>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Link
          href="/"
          className="mt-4 inline-block text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          Create Another Mosaic
        </Link>
      </motion.div>
    </motion.div>
  );
}
