'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { LogoWithText } from '@/components/ui/logo';

export function Navbar() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.nav
      className="sticky top-0 z-50 border-b-2 border-stone-300/60 bg-stone-50/95 px-6 py-3 backdrop-blur-md"
      initial={prefersReducedMotion ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Subtle gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/" aria-label="Mosaify home">
          <LogoWithText size={32} />
        </Link>
        <div className="flex items-center gap-6">
          <a
            href="#how-it-works"
            className="hidden text-sm font-medium text-stone-600 transition-colors duration-200 hover:text-brand-600 sm:block"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className="hidden text-sm font-medium text-stone-600 transition-colors duration-200 hover:text-brand-600 sm:block"
          >
            Pricing
          </a>
          <a
            href="#hero-upload"
            className="rounded-lg bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md"
            style={{ boxShadow: '0 2px 8px -2px rgba(176,74,46,0.4)' }}
          >
            Get Started
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
