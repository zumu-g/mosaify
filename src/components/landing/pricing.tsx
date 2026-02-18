import { PRICING_TIERS, formatPrice } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';

export function Pricing() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Simple Pricing
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-gray-600">
          Pay per mosaic. No subscriptions, no hidden fees.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PRICING_TIERS.map((tier, i) => (
            <div
              key={tier.tier}
              className={`rounded-2xl border p-8 text-center transition-shadow hover:shadow-lg ${
                i === 1
                  ? 'border-brand-500 ring-2 ring-brand-200'
                  : 'border-gray-200'
              }`}
            >
              {i === 1 && (
                <Badge variant="brand">Most Popular</Badge>
              )}
              <h3 className="mt-3 text-xl font-bold text-gray-900">
                {tier.label}
              </h3>
              <p className="mt-4 text-4xl font-bold text-brand-700">
                {formatPrice(tier.price)}
              </p>
              <p className="mt-2 text-sm text-gray-500">per mosaic</p>
              <p className="mt-4 text-sm text-gray-600">
                Up to {tier.maxDimension} &times; {tier.maxDimension}px
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
