'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { PRICING_TIERS, formatPrice } from '@/lib/constants';
import { SizeTier } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SizeSelectorProps {
  selected: SizeTier;
  onSelect: (tier: SizeTier) => void;
}

export function SizeSelector({ selected, onSelect }: SizeSelectorProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-3">
      {PRICING_TIERS.map((tier, i) => (
        <motion.div
          key={tier.tier}
          initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: i * 0.06 }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        >
          <Card
            selected={selected === tier.tier}
            className="cursor-pointer !p-4"
            onClick={() => onSelect(tier.tier)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                    selected === tier.tier
                      ? 'border-brand-500'
                      : 'border-gray-300'
                  }`}
                >
                  {selected === tier.tier && (
                    <motion.div
                      className="h-2.5 w-2.5 rounded-full bg-brand-500"
                      initial={prefersReducedMotion ? false : { scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">
                      {tier.label}
                    </span>
                    {i === 1 && <Badge variant="brand">Popular</Badge>}
                  </div>
                  <p className="text-xs text-gray-500">
                    Up to {tier.maxDimension} &times; {tier.maxDimension}px
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-brand-700">
                {formatPrice(tier.price)}
              </span>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
