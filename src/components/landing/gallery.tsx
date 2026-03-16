'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

interface ExampleProps {
  label: string;
  description: string;
  children: React.ReactNode;
}

function ExampleCard({ label, description, children }: ExampleProps) {
  return (
    <div
      className="group overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'linear-gradient(145deg, #f3efe8, #e8ddd0)',
        boxShadow: '0 2px 8px -2px rgba(61,43,31,0.12), 0 8px 24px -4px rgba(61,43,31,0.08)',
      }}
    >
      {/* Top tile strip */}
      <div className="flex h-1.5 w-full gap-[1px]" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="flex-1"
            style={{
              backgroundColor: ['#c75b39', '#d4a853', '#7a8b6f', '#b04a2e'][i % 4],
              opacity: 0.6 + (i % 3) * 0.15,
            }}
          />
        ))}
      </div>

      <div className="aspect-square overflow-hidden">
        {children}
      </div>

      {/* Bottom tile strip */}
      <div className="flex h-1 w-full gap-[1px]" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="flex-1"
            style={{
              backgroundColor: ['#d4a853', '#c75b39', '#b04a2e', '#7a8b6f'][i % 4],
              opacity: 0.4 + (i % 3) * 0.1,
            }}
          />
        ))}
      </div>

      <div className="p-5">
        <p className="font-heading text-base text-stone-900">{label}</p>
        <p className="mt-1 text-xs text-stone-500">{description}</p>
      </div>
    </div>
  );
}

/* Animated tile-by-tile reveal for each style */
/* Mona Lisa palette: warm skin tones, dark background, olive/umber shadows */
function AnimatedPixelGrid() {
  const prefersReducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const colors = [
    ['#3b3226','#4a3d2e','#3b3226','#5c4f3a','#3b3226','#4a3d2e','#5c4f3a','#3b3226'],
    ['#4a3d2e','#6b5d4a','#8b7355','#6b5d4a','#4a3d2e','#6b5d4a','#5c4f3a','#4a3d2e'],
    ['#3b3226','#7a6a52','#c9a87c','#d4b896','#b89970','#7a6a52','#4a3d2e','#3b3226'],
    ['#4a3d2e','#8b7355','#d4b896','#e2c9a0','#d4b896','#8b7355','#5c4f3a','#4a3d2e'],
    ['#3b3226','#7a6a52','#c9a87c','#d4b896','#c9a87c','#7a6a52','#4a3d2e','#3b3226'],
    ['#4a3d2e','#6b5d4a','#8b7355','#a38b6b','#8b7355','#6b5d4a','#4a3d2e','#3b3226'],
    ['#5c4f3a','#6b5d4a','#5c4f3a','#6b5d4a','#5c4f3a','#6b5d4a','#5c4f3a','#4a3d2e'],
    ['#3b3226','#4a3d2e','#5c4f3a','#4a3d2e','#3b3226','#4a3d2e','#3b3226','#3b3226'],
  ];
  return (
    <motion.svg
      viewBox="0 0 160 160" className="h-full w-full"
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, margin: '-40px' }}
    >
      {colors.map((row, y) =>
        row.map((color, x) => (
          <motion.rect
            key={`${x}-${y}`} x={x*20} y={y*20} width="19" height="19" rx="0.5" fill={color}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.15, delay: (y * 8 + x) * 0.02, ease: 'easeOut' }}
            style={{ transformOrigin: `${x*20+9.5}px ${y*20+9.5}px` }}
          />
        ))
      )}
    </motion.svg>
  );
}

/* Starry Night palette: deep blues, bright yellows, swirling white highlights */
function AnimatedCircles() {
  const prefersReducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const colors = [
    ['#1a237e','#1565c0','#1a237e','#fdd835','#ffeb3b','#1a237e','#1565c0','#1a237e'],
    ['#1565c0','#2196f3','#42a5f5','#fdd835','#fbc02d','#42a5f5','#1565c0','#1a237e'],
    ['#1a237e','#42a5f5','#64b5f6','#e8f5e9','#fff9c4','#64b5f6','#2196f3','#1565c0'],
    ['#1565c0','#2196f3','#fff9c4','#ffeb3b','#fdd835','#e8f5e9','#42a5f5','#1a237e'],
    ['#1a237e','#42a5f5','#64b5f6','#e8f5e9','#fff9c4','#42a5f5','#1565c0','#1a237e'],
    ['#1565c0','#2196f3','#1565c0','#42a5f5','#2196f3','#1565c0','#1a237e','#1565c0'],
    ['#1a237e','#283593','#1a237e','#1565c0','#283593','#1a237e','#283593','#1a237e'],
    ['#263238','#1a237e','#283593','#1a237e','#263238','#1a237e','#263238','#263238'],
  ];
  return (
    <motion.svg
      viewBox="0 0 160 160" className="h-full w-full"
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, margin: '-40px' }}
    >
      <rect width="160" height="160" fill="#0d1b2a" />
      {colors.map((row, y) =>
        row.map((color, x) => {
          const cx = x*20+10, cy = y*20+10;
          const dist = Math.sqrt((cx-80)**2 + (cy-80)**2);
          return (
            <motion.circle
              key={`${x}-${y}`} cx={cx} cy={cy} r="8" fill={color}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, r: 0 }}
              animate={inView ? { opacity: 1, r: 8 } : {}}
              transition={{ duration: 0.2, delay: dist * 0.003, ease: 'easeOut' }}
            />
          );
        })
      )}
    </motion.svg>
  );
}

/* Girl with a Pearl Earring palette: dark background, blue turban, luminous skin, gold earring */
function AnimatedHex() {
  const prefersReducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const colors = ['#1a1a1a','#2c3e50','#1a5276','#d4a853','#e8c9a0','#2c3e50'];
  const rows = 7, cols = 6, hexW = 28, hexH = 24;
  return (
    <motion.svg
      viewBox="0 0 168 168" className="h-full w-full"
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, margin: '-40px' }}
    >
      {Array.from({length: rows}).map((_, r) =>
        Array.from({length: cols}).map((_, c) => {
          const offsetX = r % 2 === 0 ? 0 : hexW / 2;
          const cx = c * hexW + offsetX + 14;
          const cy = r * hexH + 12;
          const color = colors[(r * cols + c) % colors.length];
          return (
            <motion.polygon
              key={`${r}-${c}`}
              points={`${cx},${cy-10} ${cx+9},${cy-5} ${cx+9},${cy+5} ${cx},${cy+10} ${cx-9},${cy+5} ${cx-9},${cy-5}`}
              fill={color}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.15, delay: r * 0.06 + c * 0.02, ease: 'easeOut' }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          );
        })
      )}
    </motion.svg>
  );
}

function AnimatedDiamond() {
  const prefersReducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const colors = ['#c75b39','#d4a853','#7a8b6f','#b04a2e','#e8954a','#8f3a24'];
  return (
    <motion.svg
      viewBox="0 0 160 160" className="h-full w-full"
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, margin: '-40px' }}
    >
      {Array.from({length: 8}).map((_, r) =>
        Array.from({length: 8}).map((_, c) => {
          const offsetX = r % 2 === 0 ? 0 : 10;
          const cx = c * 20 + offsetX + 10;
          const cy = r * 20 + 10;
          const color = colors[(r * 8 + c) % colors.length];
          const diag = r + c;
          return (
            <motion.polygon
              key={`${r}-${c}`}
              points={`${cx},${cy-9} ${cx+9},${cy} ${cx},${cy+9} ${cx-9},${cy}`}
              fill={color}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0, rotate: 45 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.2, delay: diag * 0.03, ease: 'easeOut' }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            />
          );
        })
      )}
    </motion.svg>
  );
}

/* "Your photo here" placeholder for the Diamond example */
function YourPhotoPlaceholder() {
  return (
    <svg viewBox="0 0 160 160" className="h-full w-full">
      <rect width="160" height="160" fill="#e8ddd0" />
      {/* Camera icon */}
      <rect x="52" y="58" width="56" height="42" rx="4" fill="none" stroke="#9a8b73" strokeWidth="2" />
      <circle cx="80" cy="79" r="12" fill="none" stroke="#9a8b73" strokeWidth="2" />
      <circle cx="80" cy="79" r="5" fill="#9a8b73" opacity="0.3" />
      <rect x="62" y="55" width="14" height="6" rx="2" fill="none" stroke="#9a8b73" strokeWidth="1.5" />
      {/* Plus icon */}
      <line x1="80" y1="110" x2="80" y2="124" stroke="#b8a78f" strokeWidth="2" strokeLinecap="round" />
      <line x1="73" y1="117" x2="87" y2="117" stroke="#b8a78f" strokeWidth="2" strokeLinecap="round" />
      {/* Text */}
      <text x="80" y="142" textAnchor="middle" fontSize="10" fill="#9a8b73" fontFamily="sans-serif">Your photo here</text>
    </svg>
  );
}

/* Arrow icon between before/after */
function TransformArrow() {
  return (
    <div className="flex items-center justify-center px-2">
      <svg className="h-6 w-6 text-gold-500 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14m-4-4 4 4-4 4" />
      </svg>
    </div>
  );
}

const artworks = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/400px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    alt: 'Mona Lisa by Leonardo da Vinci',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/400px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    alt: 'The Starry Night by Vincent van Gogh',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/400px-1665_Girl_with_a_Pearl_Earring.jpg',
    alt: 'Girl with a Pearl Earring by Johannes Vermeer',
  },
];

export function Gallery() {
  const prefersReducedMotion = useReducedMotion();

  const examples = [
    { label: 'Pixel Grid', description: 'Classic square tiles in a clean grid', component: <AnimatedPixelGrid />, artworkIndex: 0 },
    { label: 'Circle', description: 'Dots on dark background', component: <AnimatedCircles />, artworkIndex: 1 },
    { label: 'Hexagon', description: 'Honeycomb tessellation', component: <AnimatedHex />, artworkIndex: 2 },
    { label: 'Diamond', description: 'Offset diamond tiles', component: <AnimatedDiamond />, artworkIndex: -1 },
  ];

  return (
    <section className="bg-stone-50 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-center gap-4">
          <motion.h2
            className="font-heading text-center text-3xl text-stone-900 sm:text-4xl"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            See the transformation
          </motion.h2>
        </div>
        <motion.p
          className="mx-auto mt-4 max-w-lg text-center text-base leading-relaxed text-stone-500"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
        >
          Upload any photo and watch it transform into beautiful mosaic art.
          Every tile is color-sampled from the original image.
        </motion.p>

        {/* Before -> After showcase */}
        <div className="mt-14 space-y-10">
          {examples.map((ex, i) => (
            <motion.div
              key={ex.label}
              className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-0"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.08 }}
            >
              {/* Before: photo */}
              <div className="w-40 sm:w-48">
                <div
                  className="overflow-hidden rounded-xl"
                  style={{
                    boxShadow: '0 2px 8px -2px rgba(61,43,31,0.12), 0 8px 24px -4px rgba(61,43,31,0.08)',
                  }}
                >
                  <div className="aspect-square overflow-hidden">
                    {ex.artworkIndex >= 0 ? (
                      <Image
                        src={artworks[ex.artworkIndex].src}
                        alt={artworks[ex.artworkIndex].alt}
                        width={400}
                        height={400}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <YourPhotoPlaceholder />
                    )}
                  </div>
                </div>
                <p className="mt-2 text-center text-xs text-stone-400">
                  {ex.artworkIndex >= 0
                    ? artworks[ex.artworkIndex].alt
                    : 'Your photo'}
                </p>
              </div>

              <TransformArrow />

              {/* After: mosaic */}
              <div className="w-40 sm:w-48">
                <ExampleCard label={ex.label} description={ex.description}>
                  {ex.component}
                </ExampleCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
