'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Logo } from '@/components/ui/logo';
import { MosaicBorder } from '@/components/ui/illustrations';

export function Footer() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.footer
      className="relative bg-stone-900 px-6 py-12 text-stone-300"
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Mosaic border at top */}
      <div className="absolute left-0 right-0 top-0">
        <MosaicBorder />
      </div>

      <div className="mx-auto max-w-5xl pt-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <div className="flex items-center gap-2.5">
              <Logo size={28} />
              <span className="font-heading text-lg text-stone-100">Mosaify</span>
            </div>
            <p className="text-sm italic text-stone-500">
              Create beauty, tile by tile.
            </p>
          </div>

          <div className="flex gap-6 text-sm text-stone-400">
            <a href="#how-it-works" className="transition-colors hover:text-gold-400">
              How It Works
            </a>
            <a href="#pricing" className="transition-colors hover:text-gold-400">
              Pricing
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 border-t border-stone-800 pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} Mosaify. All rights reserved.
          </p>
          <p className="text-xs text-stone-500">
            Photos processed securely &amp; deleted after 48 hours.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
