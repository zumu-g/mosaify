'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MosaicStyle } from '@/types';
import { DEFAULT_TILE_SIZES } from '@/lib/constants';

interface TileSizeSliderProps {
  value: number;
  onChange: (value: number) => void;
  style: MosaicStyle;
}

function TilePreview({ size, style }: { size: number; style: MosaicStyle }) {
  const viewBox = 64;
  const tiles: React.ReactNode[] = [];
  const colors = ['#8b5cf6', '#a78bfa', '#7c3aed', '#c4b5fd'];

  // Normalize tile size to SVG space: map 4–64 range to fill the preview nicely
  const scaledSize = Math.max(4, Math.round((size / 64) * 28));
  let colorIdx = 0;

  if (style === 'circle') {
    const r = scaledSize / 2;
    for (let y = r; y < viewBox; y += scaledSize + 1) {
      for (let x = r; x < viewBox; x += scaledSize + 1) {
        tiles.push(
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={r * 0.9}
            fill={colors[colorIdx++ % colors.length]}
          />
        );
      }
    }
  } else if (style === 'diamond') {
    const half = scaledSize / 2;
    for (let y = half; y < viewBox; y += scaledSize + 1) {
      for (let x = half; x < viewBox; x += scaledSize + 1) {
        tiles.push(
          <polygon
            key={`${x}-${y}`}
            points={`${x},${y - half} ${x + half},${y} ${x},${y + half} ${x - half},${y}`}
            fill={colors[colorIdx++ % colors.length]}
          />
        );
      }
    }
  } else if (style === 'hex') {
    const h = scaledSize;
    const w = scaledSize * 0.866;
    let row = 0;
    for (let y = h / 2; y < viewBox; y += h * 0.75 + 1) {
      const offset = row % 2 === 1 ? w / 2 : 0;
      for (let x = w / 2 + offset; x < viewBox; x += w + 1) {
        const r = h / 2;
        const pts = Array.from({ length: 6 }, (_, i) => {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          return `${x + r * Math.cos(angle)},${y + r * Math.sin(angle)}`;
        }).join(' ');
        tiles.push(
          <polygon
            key={`${x}-${y}`}
            points={pts}
            fill={colors[colorIdx++ % colors.length]}
          />
        );
      }
      row++;
    }
  } else {
    // pixel-grid
    for (let y = 0; y < viewBox; y += scaledSize + 1) {
      for (let x = 0; x < viewBox; x += scaledSize + 1) {
        tiles.push(
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={scaledSize}
            height={scaledSize}
            rx={1}
            fill={colors[colorIdx++ % colors.length]}
          />
        );
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${viewBox} ${viewBox}`}
      className="h-12 w-12 rounded-md border border-gray-200 bg-gray-100"
    >
      {tiles}
    </svg>
  );
}

export function TileSizeSlider({ value, onChange, style }: TileSizeSliderProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDefault = value === DEFAULT_TILE_SIZES[style];

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="space-y-3"
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TilePreview size={value} style={style} />
          <div>
            <span className="text-sm font-semibold text-gray-900">
              {value}px
            </span>
            <p className="text-xs text-gray-500">
              {value <= 10
                ? 'Fine detail'
                : value <= 24
                  ? 'Balanced'
                  : value <= 44
                    ? 'Chunky'
                    : 'Bold tiles'}
            </p>
          </div>
        </div>
        {!isDefault && (
          <button
            type="button"
            onClick={() => onChange(DEFAULT_TILE_SIZES[style])}
            className="text-xs font-medium text-brand-600 transition-colors duration-200 hover:text-brand-800"
          >
            Reset to default
          </button>
        )}
      </div>

      {/* Slider */}
      <div className="space-y-1">
        <input
          type="range"
          min={4}
          max={64}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-brand-600 transition-all duration-200 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-600 [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-110"
        />
        <div className="flex justify-between text-[10px] text-gray-400">
          <span>Fine detail</span>
          <span>Bold tiles</span>
        </div>
      </div>
    </motion.div>
  );
}
