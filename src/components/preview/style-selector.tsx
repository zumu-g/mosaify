'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { STYLE_CONFIGS } from '@/lib/constants';
import { MosaicStyle } from '@/types';
import { Card } from '@/components/ui/card';

interface StyleSelectorProps {
  selected: MosaicStyle;
  onSelect: (style: MosaicStyle) => void;
}

const styleIcons: Record<MosaicStyle, React.ReactNode> = {
  'pixel-grid': (
    <svg viewBox="0 0 40 40" className="h-10 w-10">
      <rect x="2" y="2" width="16" height="16" fill="#8b5cf6" rx="1" />
      <rect x="22" y="2" width="16" height="16" fill="#a78bfa" rx="1" />
      <rect x="2" y="22" width="16" height="16" fill="#c4b5fd" rx="1" />
      <rect x="22" y="22" width="16" height="16" fill="#7c3aed" rx="1" />
    </svg>
  ),
  circle: (
    <svg viewBox="0 0 40 40" className="h-10 w-10">
      <circle cx="12" cy="12" r="8" fill="#8b5cf6" />
      <circle cx="28" cy="12" r="8" fill="#a78bfa" />
      <circle cx="12" cy="28" r="8" fill="#c4b5fd" />
      <circle cx="28" cy="28" r="8" fill="#7c3aed" />
    </svg>
  ),
  hex: (
    <svg viewBox="0 0 40 40" className="h-10 w-10">
      <polygon points="20,2 34,10 34,26 20,34 6,26 6,10" fill="#8b5cf6" />
    </svg>
  ),
  diamond: (
    <svg viewBox="0 0 40 40" className="h-10 w-10">
      <polygon points="20,2 38,20 20,38 2,20" fill="#8b5cf6" />
    </svg>
  ),
};

export function StyleSelector({ selected, onSelect }: StyleSelectorProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-4">
      {STYLE_CONFIGS.map((config, i) => (
        <motion.div
          key={config.style}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: i * 0.05 }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
        >
          <Card
            selected={selected === config.style}
            className="cursor-pointer"
            onClick={() => onSelect(config.style)}
          >
            <div className="flex flex-col items-center gap-3 text-center">
              {styleIcons[config.style]}
              <div>
                <p className="font-semibold text-gray-900">{config.label}</p>
                <p className="mt-1 text-xs text-gray-500">{config.description}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
