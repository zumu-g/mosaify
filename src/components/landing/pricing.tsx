'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { PRICING_TIERS, formatPrice } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { ClassicalScroll } from '@/components/ui/illustrations';

export function Pricing() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="pricing" className="bg-stone-50 px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-center gap-4">
          <ClassicalScroll className="scale-x-[-1] hidden sm:block" />
          <motion.h2
            className="font-heading text-center text-3xl text-stone-900 sm:text-4xl"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            Pay per mosaic
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
          No subscriptions, no hidden fees. Preview for free — only pay when
          you love the result.
        </motion.p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PRICING_TIERS.map((tier, i) => (
            <motion.div
              key={tier.tier}
              className={`relative flex flex-col overflow-hidden rounded-2xl bg-white p-8 text-center ${
                i === 1 ? 'ring-2 ring-gold-400/60' : ''
              }`}
              style={{
                background: 'linear-gradient(145deg, #f3efe8 0%, #ede5d8 30%, #f0eae0 60%, #e8ddd0 100%)',
                boxShadow: i === 1
                  ? '0 0 0 1px rgba(212,168,83,0.2), 0 4px 24px -4px rgba(212,168,83,0.15), 0 12px 40px -8px rgba(61,43,31,0.12)'
                  : '0 2px 8px -2px rgba(61,43,31,0.12), 0 8px 24px -4px rgba(61,43,31,0.08)',
              }}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i === 1 ? 0 : i === 0 ? 0.08 : 0.16 }}
              whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
            >
              {/* Top tile strip */}
              <div className="absolute left-0 right-0 top-0 flex h-1.5 gap-[1px]" aria-hidden="true">
                {Array.from({ length: 24 }).map((_, j) => (
                  <div
                    key={j}
                    className="flex-1"
                    style={{
                      backgroundColor: i === 1
                        ? ['#d4a853', '#e8c864', '#d4a853', '#c49a42'][j % 4]
                        : ['#c75b39', '#d4a853', '#7a8b6f', '#b04a2e'][j % 4],
                      opacity: 0.5 + (j % 3) * 0.15,
                    }}
                  />
                ))}
              </div>

              {/* Gold leaf corner on popular */}
              {i === 1 && (
                <div className="absolute -right-1 -top-1 h-12 w-12 overflow-hidden" aria-hidden="true">
                  <div
                    className="absolute right-0 top-0 h-16 w-16 rotate-45 translate-x-6 -translate-y-6"
                    style={{
                      background: 'linear-gradient(135deg, #d4a853 0%, #e8c864 50%, #d4a853 100%)',
                    }}
                  />
                </div>
              )}

              {i === 1 && (
                <Badge variant="brand" className="self-center">Most Popular</Badge>
              )}
              <h3 className={`${i === 1 ? 'mt-2' : 'mt-0'} font-heading text-xl text-stone-900`}>
                {tier.label}
              </h3>
              <p className="mt-4 font-heading text-4xl text-brand-600">
                {formatPrice(tier.price)}
              </p>
              <p className="mt-1 text-sm text-stone-400">one-time</p>
              <p className="mt-4 text-sm text-stone-600">
                Up to {tier.maxDimension} &times; {tier.maxDimension}px
              </p>

              <a
                href="#hero-upload"
                className={`mt-6 inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  i === 1
                    ? 'bg-brand-600 text-white hover:-translate-y-0.5 hover:bg-brand-700'
                    : 'border-2 border-stone-300 text-stone-700 hover:border-gold-400 hover:text-stone-900'
                }`}
                style={i === 1 ? { boxShadow: '0 2px 8px -2px rgba(176,74,46,0.4)' } : {}}
              >
                Get started
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
