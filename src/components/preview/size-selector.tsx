'use client';

import { PRICING_TIERS, formatPrice } from '@/lib/constants';
import { SizeTier } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SizeSelectorProps {
  selected: SizeTier;
  onSelect: (tier: SizeTier) => void;
}

export function SizeSelector({ selected, onSelect }: SizeSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      {PRICING_TIERS.map((tier, i) => (
        <Card
          key={tier.tier}
          selected={selected === tier.tier}
          className="cursor-pointer !p-4"
          onClick={() => onSelect(tier.tier)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  selected === tier.tier
                    ? 'border-brand-500'
                    : 'border-gray-300'
                }`}
              >
                {selected === tier.tier && (
                  <div className="h-2.5 w-2.5 rounded-full bg-brand-500" />
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
      ))}
    </div>
  );
}
