'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  IllustrationUpload,
  IllustrationStyle,
  IllustrationDownload,
  MosaicBorder,
  ClassicalScroll,
} from '@/components/ui/illustrations';

const steps = [
  {
    title: 'Upload your photo',
    description: 'Drop any JPG, PNG, or WebP image. No account needed — just drag and go.',
    illustration: IllustrationUpload,
  },
  {
    title: 'Pick your style',
    description: 'Choose from four mosaic styles and a size tier. Preview it instantly for free.',
    illustration: IllustrationStyle,
  },
  {
    title: 'Download the artwork',
    description: 'Happy with the result? Purchase and download your high-res mosaic in seconds.',
    illustration: IllustrationDownload,
  },
];

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="bg-tessera px-6 py-20">
      {/* Warm glow overlay — subtle */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(254,247,240,0.3) 0%, rgba(243,239,232,0.1) 60%, transparent 100%)',
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="flex items-center justify-center gap-4">
          <ClassicalScroll className="scale-x-[-1] hidden sm:block" />
          <motion.h2
            className="font-heading text-center text-3xl text-stone-900 sm:text-4xl"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            Simple as one, two, three
          </motion.h2>
          <ClassicalScroll className="hidden sm:block" />
        </div>
        <motion.p
          className="mx-auto mt-4 max-w-md text-center text-base leading-relaxed text-stone-500"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
        >
          No design skills required. The whole process takes under a minute.
        </motion.p>

        <div className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
          {steps.map((step, i) => {
            const Illustration = step.illustration;
            return (
              <motion.div
                key={step.title}
                className="flex flex-col items-center text-center"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.1 }}
              >
                <motion.div
                  className="mb-5 w-28 sm:w-32"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05, rotate: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Illustration className="h-auto w-full" />
                </motion.div>

                {/* Tile-shaped step number */}
                <span
                  className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-sm bg-brand-500 text-sm font-bold text-white"
                  style={{
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 4px -1px rgba(61,43,31,0.2)',
                  }}
                >
                  {i + 1}
                </span>

                <h3 className="font-heading text-xl text-stone-900">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-stone-500">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16">
          <MosaicBorder />
        </div>
      </div>
    </section>
  );
}
