import { describe, it, expect } from 'vitest';
import { getPricingTier, formatPrice, PRICING_TIERS, STYLE_CONFIGS } from '../constants';

describe('getPricingTier', () => {
  it('returns the correct tier for standard', () => {
    const tier = getPricingTier('standard');
    expect(tier).toBeDefined();
    expect(tier!.tier).toBe('standard');
    expect(tier!.price).toBe(199);
  });

  it('returns the correct tier for large', () => {
    const tier = getPricingTier('large');
    expect(tier).toBeDefined();
    expect(tier!.maxDimension).toBe(2048);
  });

  it('returns the correct tier for ultra', () => {
    const tier = getPricingTier('ultra');
    expect(tier).toBeDefined();
    expect(tier!.price).toBe(1999);
  });

  it('returns undefined for invalid tier', () => {
    expect(getPricingTier('mega')).toBeUndefined();
  });
});

describe('formatPrice', () => {
  it('formats cents to dollars', () => {
    expect(formatPrice(199)).toBe('$1.99');
    expect(formatPrice(1999)).toBe('$19.99');
    expect(formatPrice(0)).toBe('$0.00');
  });
});

describe('PRICING_TIERS', () => {
  it('has 3 tiers', () => {
    expect(PRICING_TIERS).toHaveLength(3);
  });

  it('tiers are in ascending price order', () => {
    for (let i = 1; i < PRICING_TIERS.length; i++) {
      expect(PRICING_TIERS[i].price).toBeGreaterThan(PRICING_TIERS[i - 1].price);
    }
  });
});

describe('STYLE_CONFIGS', () => {
  it('has 4 styles', () => {
    expect(STYLE_CONFIGS).toHaveLength(4);
  });

  it('each has a label, description, and style', () => {
    for (const config of STYLE_CONFIGS) {
      expect(config.label).toBeTruthy();
      expect(config.description).toBeTruthy();
      expect(config.style).toBeTruthy();
    }
  });
});
