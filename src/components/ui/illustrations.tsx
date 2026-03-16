'use client';

import { motion, useReducedMotion, useAnimation } from 'framer-motion';

interface IllustrationProps {
  className?: string;
}

/**
 * Step 1: Camera/photo — animated when scrolled into view
 */
export function IllustrationUpload({ className = '' }: IllustrationProps) {
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimation();

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 120 120"
      className={className}
      onViewportEnter={() => controls.start('visible')}
      viewport={{ once: true, margin: '-40px' }}
    >
      {/* Camera body */}
      <motion.path
        d="M22 42c-1 0-3 1.5-3 3.5v38c0 2.5 1.8 4 4 4h74c2 0 3.5-1.5 3.5-4V45.5c0-2-1.5-3.5-3.5-3.5H22z"
        stroke="#8f3a24" strokeWidth="2.5" fill="#fef7f0"
        variants={{
          hidden: { x: -20, opacity: 0 },
          visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
        }}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={controls}
      />
      {/* Top bump */}
      <motion.path
        d="M42 42V35c0-1.5 1-3 3-3h30c2 0 3 1.5 3 3v7"
        stroke="#8f3a24" strokeWidth="2.5" fill="#f3efe8"
        variants={{
          hidden: { y: -10, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { delay: 0.15, duration: 0.3, ease: 'easeOut' } },
        }}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={controls}
      />
      {/* Lens outer */}
      <motion.circle
        cx="60" cy="62" r="16" stroke="#c75b39" strokeWidth="2.5" fill="#fdecd8"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { delay: 0.2, duration: 0.35, ease: 'easeOut' } },
        }}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={controls}
        style={{ transformOrigin: '60px 62px' }}
      />
      {/* Lens inner */}
      <motion.circle
        cx="60" cy="62" r="9" stroke="#c75b39" strokeWidth="2" fill="#f9d4ae"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { delay: 0.3, duration: 0.3, ease: 'easeOut' } },
        }}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={controls}
        style={{ transformOrigin: '60px 62px' }}
      />
      {/* Lens shine */}
      <path d="M54 56c1.5-2 4-3.5 7-3.5" stroke="#d4a853" strokeWidth="1.5" />
      {/* Flash */}
      <motion.circle
        cx="82" cy="49" r="3" fill="#d4a853"
        variants={{
          hidden: { scale: 0 },
          visible: { scale: 1, transition: { delay: 0.35, duration: 0.2, type: 'spring', stiffness: 400 } },
        }}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={controls}
        style={{ transformOrigin: '82px 49px' }}
      />
      {/* Photo sliding out */}
      <motion.g
        transform="rotate(-8, 88, 80)"
        variants={{
          hidden: { x: -15, opacity: 0 },
          visible: { x: 0, opacity: 1, transition: { delay: 0.4, duration: 0.3, ease: 'easeOut' } },
        }}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={controls}
      >
        <rect x="78" y="70" width="24" height="20" rx="1.5" fill="white" stroke="#b8a78f" strokeWidth="1.5" />
        <path d="M80 84l5-5 4 3 5-7 6 9H80z" fill="#7a8b6f" opacity="0.5" />
        <circle cx="86" cy="77" r="2" fill="#d4a853" opacity="0.6" />
      </motion.g>
      {/* Sparkles */}
      <motion.g
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { delay: 0.5, duration: 0.2, type: 'spring', stiffness: 500 } },
        }}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={controls}
        style={{ transformOrigin: '32px 34px' }}
      >
        <path d="M30 34l2-4 2 4M32 32l-4 2 4 2" stroke="#d4a853" strokeWidth="1.2" />
      </motion.g>
      <motion.g
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { delay: 0.55, duration: 0.2, type: 'spring', stiffness: 500 } },
        }}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={controls}
        style={{ transformOrigin: '91px 32px' }}
      >
        <path d="M90 32l1.5-3 1.5 3M91.5 31l-3 1.5 3 1.5" stroke="#d4a853" strokeWidth="1" />
      </motion.g>
    </motion.svg>
  );
}

/**
 * Step 2: Mosaic tiles being placed
 */
export function IllustrationStyle({ className = '' }: IllustrationProps) {
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimation();

  const placedTiles = [
    { x: 22, y: 58, w: 14, h: 14, fill: '#c75b39', rot: 1, delay: 0.1 },
    { x: 38, y: 57, w: 14, h: 14, fill: '#d4a853', rot: -1, delay: 0.15 },
    { x: 54, y: 58, w: 14, h: 14, fill: '#7a8b6f', rot: 0.5, delay: 0.2 },
    { x: 70, y: 57, w: 14, h: 14, fill: '#b04a2e', rot: -0.5, delay: 0.25 },
    { x: 22, y: 74, w: 14, h: 14, fill: '#d4a853', rot: -0.5, delay: 0.3 },
    { x: 38, y: 75, w: 14, h: 14, fill: '#7a8b6f', rot: 1, delay: 0.35 },
    { x: 54, y: 74, w: 14, h: 14, fill: '#c75b39', rot: -1, delay: 0.4 },
    { x: 70, y: 75, w: 14, h: 14, fill: '#d4a853', rot: 0, delay: 0.45 },
  ];

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 120 120"
      className={className}
      onViewportEnter={() => controls.start('visible')}
      viewport={{ once: true, margin: '-40px' }}
    >
      {/* Board */}
      <rect x="15" y="50" width="90" height="55" rx="4" fill="#f3efe8" stroke="#b8a78f" strokeWidth="2" />

      {/* Tiles appearing one by one */}
      {placedTiles.map((t, i) => (
        <motion.rect
          key={i}
          x={t.x} y={t.y} width={t.w} height={t.h} rx="1" fill={t.fill}
          transform={`rotate(${t.rot}, ${t.x + t.w/2}, ${t.y + t.h/2})`}
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: { opacity: 1, scale: 1, transition: { delay: t.delay, duration: 0.2, ease: 'easeOut' } },
          }}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          animate={controls}
          style={{ transformOrigin: `${t.x + t.w/2}px ${t.y + t.h/2}px` }}
        />
      ))}

      {/* Empty spots */}
      <rect x="86" y="58" width="14" height="14" rx="1" stroke="#d6c8b5" strokeWidth="1.5" strokeDasharray="3 2" />
      <rect x="86" y="74" width="14" height="14" rx="1" stroke="#d6c8b5" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Floating tile */}
      <motion.g
        transform="rotate(-12, 50, 35)"
        variants={{
          hidden: { y: -20, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { delay: 0.5, duration: 0.3, type: 'spring', stiffness: 200, damping: 12 } },
        }}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={controls}
      >
        <rect x="43" y="28" width="14" height="14" rx="1" fill="#e8954a" stroke="#8f3a24" strokeWidth="1.5" />
        <path d="M42 46l-2 4" stroke="#b8a78f" strokeWidth="1" />
        <path d="M58 46l2 4" stroke="#b8a78f" strokeWidth="1" />
      </motion.g>

      {/* Palette */}
      <circle cx="98" cy="38" r="10" fill="#fef7f0" stroke="#b8a78f" strokeWidth="1.5" />
      <circle cx="94" cy="35" r="2.5" fill="#c75b39" />
      <circle cx="101" cy="34" r="2.5" fill="#d4a853" />
      <circle cx="97" cy="41" r="2.5" fill="#7a8b6f" />
    </motion.svg>
  );
}

/**
 * Step 3: Framed artwork with download arrow
 */
export function IllustrationDownload({ className = '' }: IllustrationProps) {
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimation();

  const frameTiles = [
    { x: 27, y: 23, fill: '#fdecd8' }, { x: 38, y: 23, fill: '#f9d4ae' },
    { x: 49, y: 23, fill: '#fdecd8' }, { x: 60, y: 23, fill: '#f9d4ae' },
    { x: 71, y: 23, fill: '#d4a853' }, { x: 82, y: 23, fill: '#f9d4ae' },
    { x: 27, y: 34, fill: '#7a8b6f' }, { x: 38, y: 34, fill: '#5e6e55' },
    { x: 49, y: 34, fill: '#7a8b6f' }, { x: 60, y: 34, fill: '#5e6e55' },
    { x: 71, y: 34, fill: '#a8b98c' }, { x: 82, y: 34, fill: '#7a8b6f' },
    { x: 27, y: 45, fill: '#c75b39' }, { x: 38, y: 45, fill: '#b04a2e' },
    { x: 49, y: 45, fill: '#c75b39' }, { x: 60, y: 45, fill: '#e8954a' },
    { x: 71, y: 45, fill: '#b04a2e' }, { x: 82, y: 45, fill: '#c75b39' },
    { x: 27, y: 56, fill: '#8f3a24' }, { x: 38, y: 56, fill: '#c75b39' },
    { x: 49, y: 56, fill: '#b04a2e' }, { x: 60, y: 56, fill: '#c75b39' },
    { x: 71, y: 56, fill: '#8f3a24' }, { x: 82, y: 56, fill: '#b04a2e' },
  ];

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 120 120"
      className={className}
      onViewportEnter={() => controls.start('visible')}
      viewport={{ once: true, margin: '-40px' }}
    >
      {/* Frame */}
      <motion.rect
        x="18" y="14" width="84" height="72" rx="3" fill="#d6c8b5" stroke="#8f3a24" strokeWidth="2.5"
        variants={{
          hidden: { y: 15, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
        }}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={controls}
      />
      <motion.rect
        x="24" y="20" width="72" height="60" rx="1.5" fill="#faf8f5" stroke="#b8a78f" strokeWidth="1.5"
        variants={{
          hidden: { y: 15, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { delay: 0.1, duration: 0.35, ease: 'easeOut' } },
        }}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={controls}
      />

      {/* Mosaic tiles inside frame — build row by row */}
      {frameTiles.map((t, i) => (
        <motion.rect
          key={i}
          x={t.x} y={t.y} width="10" height="10" rx="0.5" fill={t.fill}
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { delay: 0.2 + i * 0.02, duration: 0.15, ease: 'easeOut' },
            },
          }}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          animate={controls}
          style={{ transformOrigin: `${t.x + 5}px ${t.y + 5}px` }}
        />
      ))}

      {/* Download arrow */}
      <motion.g
        variants={{
          hidden: { y: -10, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { delay: 0.7, duration: 0.3, type: 'spring', stiffness: 200, damping: 15 } },
        }}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={controls}
      >
        <path d="M60 92v16" stroke="#8f3a24" strokeWidth="2.5" />
        <path d="M53 102l7 7 7-7" stroke="#8f3a24" strokeWidth="2.5" />
      </motion.g>

      {/* Sparkles */}
      <path d="M14 30l2-4 2 4M16 28l-4 2 4 2" stroke="#d4a853" strokeWidth="1.2" />
      <path d="M104 20l1.5-3 1.5 3M105.5 19l-3 1.5 3 1.5" stroke="#d4a853" strokeWidth="1" />

      {/* HD badge */}
      <motion.g
        variants={{
          hidden: { scale: 0 },
          visible: { scale: 1, transition: { delay: 0.75, duration: 0.25, type: 'spring', stiffness: 400 } },
        }}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={controls}
        style={{ transformOrigin: '98px 78px' }}
      >
        <circle cx="98" cy="78" r="9" fill="#c75b39" stroke="#8f3a24" strokeWidth="1.5" />
        <text x="98" y="82" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white" fontFamily="sans-serif">HD</text>
      </motion.g>
    </motion.svg>
  );
}

/**
 * Mosaic border divider — tiles cascade in on scroll
 */
export function MosaicBorder({ className = '' }: IllustrationProps) {
  const prefersReducedMotion = useReducedMotion();
  const tileColors = [
    '#c75b39', '#d4a853', '#7a8b6f', '#b04a2e', '#e8954a', '#d4a853',
    '#8f3a24', '#7a8b6f', '#c75b39', '#d4a853', '#b04a2e', '#7a8b6f',
  ];
  const topColors = tileColors;
  const midColors = tileColors.map((_, i) => i % 4 === 0 ? '#d4a853' : '#7a8b6f');
  const botColors = [...tileColors].reverse();

  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <motion.svg
        viewBox="0 0 240 30"
        preserveAspectRatio="none"
        className="h-[30px] w-full"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10px' }}
      >
        <rect width="240" height="30" fill="#d6c8b5" />
        {topColors.map((color, i) => (
          <motion.rect
            key={`t${i}`}
            x={i * 20 + 1} y={1} width={18} height={8} rx={0.5}
            fill={color} opacity={0.8}
            variants={{
              hidden: prefersReducedMotion ? { opacity: 0.8 } : { opacity: 0, y: -6 },
              visible: { opacity: 0.8, y: 0, transition: { delay: i * 0.03, duration: 0.2, ease: 'easeOut' } },
            }}
          />
        ))}
        {midColors.map((color, i) => (
          <motion.rect
            key={`m${i}`}
            x={i * 20 + 1} y={11} width={18} height={8} rx={0.5}
            fill={color} opacity={0.7}
            variants={{
              hidden: prefersReducedMotion ? { opacity: 0.7 } : { opacity: 0, y: -4 },
              visible: { opacity: 0.7, y: 0, transition: { delay: 0.15 + i * 0.03, duration: 0.2, ease: 'easeOut' } },
            }}
          />
        ))}
        {botColors.map((color, i) => (
          <motion.rect
            key={`b${i}`}
            x={i * 20 + 1} y={21} width={18} height={8} rx={0.5}
            fill={color} opacity={0.8}
            variants={{
              hidden: prefersReducedMotion ? { opacity: 0.8 } : { opacity: 0, y: -2 },
              visible: { opacity: 0.8, y: 0, transition: { delay: 0.3 + i * 0.03, duration: 0.2, ease: 'easeOut' } },
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
}

/**
 * Classical scroll — decorative vine motif flanking headings
 */
export function ClassicalScroll({ className = '' }: IllustrationProps) {
  return (
    <svg viewBox="0 0 120 20" className={`h-4 w-24 ${className}`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M10 10 C20 4, 30 4, 40 10 S60 16, 70 10 S90 4, 100 10"
        stroke="#d4a853"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
        strokeLinecap="round"
      />
      <ellipse cx="40" cy="8" rx="3" ry="5" fill="#7a8b6f" opacity="0.2" transform="rotate(-20 40 8)" />
      <ellipse cx="70" cy="12" rx="3" ry="5" fill="#7a8b6f" opacity="0.2" transform="rotate(20 70 12)" />
    </svg>
  );
}

/**
 * Simple mosaic divider — smaller, for inline use
 */
export function MosaicDivider({ className = '' }: IllustrationProps) {
  const colors = ['#c75b39', '#d4a853', '#7a8b6f', '#b04a2e', '#e8954a', '#d4a853', '#8f3a24', '#7a8b6f', '#c75b39', '#d4a853', '#b04a2e', '#7a8b6f'];
  return (
    <div className={`flex justify-center ${className}`}>
      <svg viewBox="0 0 240 12" className="h-3 w-60" xmlns="http://www.w3.org/2000/svg">
        {colors.map((color, i) => (
          <rect key={i} x={i * 20} y="1" width="18" height="10" rx="1" fill={color} opacity={0.7 + (i % 3) * 0.1} />
        ))}
      </svg>
    </div>
  );
}
