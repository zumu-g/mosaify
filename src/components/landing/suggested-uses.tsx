'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface UseCase {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function WallArtIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="24" height="18" rx="1.5" />
      <path d="M4 19l6-5 4 3 6-6 8 8" />
      <circle cx="11" cy="13" r="2" />
      <line x1="10" y1="24" x2="10" y2="28" />
      <line x1="22" y1="24" x2="22" y2="28" />
    </svg>
  );
}

function SocialMediaIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="5" width="22" height="22" rx="5" />
      <circle cx="16" cy="16" r="5.5" />
      <circle cx="23" cy="9" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="14" width="24" height="14" rx="1.5" />
      <rect x="2" y="10" width="28" height="4" rx="1" />
      <line x1="16" y1="10" x2="16" y2="28" />
      <path d="M16 10c0 0-2-6-6-6s-4 3 0 6" />
      <path d="M16 10c0 0 2-6 6-6s4 3 0 6" />
    </svg>
  );
}

function BrandingIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="26" height="20" rx="2" />
      <circle cx="16" cy="16" r="6" />
      <path d="M13 16l2 2 4-4" />
    </svg>
  );
}

function EventIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
      <path d="M8 26c0-4 3.5-6 8-6s8 2 8 6" />
    </svg>
  );
}

function DigitalDesignIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="26" height="18" rx="2" />
      <line x1="8" y1="28" x2="24" y2="28" />
      <line x1="16" y1="22" x2="16" y2="28" />
      <rect x="7" y="8" width="8" height="6" rx="0.5" />
      <line x1="18" y1="9" x2="25" y2="9" />
      <line x1="18" y1="12" x2="23" y2="12" />
      <line x1="18" y1="15" x2="25" y2="15" />
    </svg>
  );
}

const useCases: UseCase[] = [
  {
    title: 'Wall Art',
    description: 'Print large-scale mosaic art for your home or office',
    icon: <WallArtIcon />,
  },
  {
    title: 'Social Media',
    description: 'Stand out with unique mosaic profile pictures and posts',
    icon: <SocialMediaIcon />,
  },
  {
    title: 'Gifts',
    description: 'Create personalized mosaic prints for friends and family',
    icon: <GiftIcon />,
  },
  {
    title: 'Business Branding',
    description: 'Transform logos and product photos into eye-catching mosaics',
    icon: <BrandingIcon />,
  },
  {
    title: 'Event Decor',
    description: 'Wedding photos, party decorations, and event memorabilia',
    icon: <EventIcon />,
  },
  {
    title: 'Digital Design',
    description: 'Use mosaic textures in presentations, websites, and more',
    icon: <DigitalDesignIcon />,
  },
];

export function SuggestedUses() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-stone-50 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="font-heading text-center text-3xl text-stone-900 sm:text-4xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          What will you create?
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-lg text-center text-base leading-relaxed text-stone-500"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
        >
          From wall art to social media, mosaic transformations bring a unique
          touch to everything you make.
        </motion.p>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase, i) => (
            <motion.div
              key={useCase.title}
              className="surface-stone group rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
                delay: i * 0.07,
              }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-500 transition-colors duration-200 group-hover:bg-brand-100">
                {useCase.icon}
              </div>
              <h3 className="font-heading text-lg text-stone-900">
                {useCase.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-500">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
