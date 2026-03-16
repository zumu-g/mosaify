'use client';

import { useCallback, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useUpload } from '@/hooks/use-upload';
import { UploadResult } from '@/types';

interface DropzoneProps {
  onUploadComplete: (result: UploadResult) => void;
}

export function Dropzone({ onUploadComplete }: DropzoneProps) {
  const { uploading, progress, error, uploadFile } = useUpload();
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleFile = useCallback(
    async (file: File) => {
      const result = await uploadFile(file);
      if (result) {
        onUploadComplete(result);
      }
    },
    [uploadFile, onUploadComplete]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = () => inputRef.current?.click();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <motion.div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative cursor-pointer overflow-hidden rounded-xl p-10 text-center transition-all duration-300 ${
        isDragging ? 'ring-2 ring-gold-400 ring-offset-2 ring-offset-stone-50' : 'hover:ring-1 hover:ring-gold-400/50 hover:ring-offset-1 hover:ring-offset-stone-50'
      } ${uploading ? 'pointer-events-none' : ''}`}
      style={{
        background: 'linear-gradient(145deg, #f3efe8 0%, #ede5d8 30%, #f0eae0 60%, #e8ddd0 100%)',
        boxShadow: isDragging
          ? '0 0 0 1px rgba(212,168,83,0.3), inset 0 2px 4px rgba(61,43,31,0.06), 0 8px 32px -4px rgba(61,43,31,0.15)'
          : 'inset 0 2px 4px rgba(61,43,31,0.06), 0 4px 16px -2px rgba(61,43,31,0.1), 0 1px 3px rgba(61,43,31,0.08)',
      }}
      whileHover={prefersReducedMotion || uploading ? {} : { scale: 1.01, y: -2 }}
      whileTap={prefersReducedMotion || uploading ? {} : { scale: 0.99 }}
      transition={{ duration: 0.2 }}
    >
      {/* Corner tessera accents */}
      <div className="absolute left-3 top-3 flex gap-0.5" aria-hidden="true">
        <div className="h-2 w-2 rounded-[1px] bg-brand-400/30" />
        <div className="h-2 w-2 rounded-[1px] bg-gold-400/30" />
      </div>
      <div className="absolute right-3 top-3 flex gap-0.5" aria-hidden="true">
        <div className="h-2 w-2 rounded-[1px] bg-gold-400/30" />
        <div className="h-2 w-2 rounded-[1px] bg-sage-400/30" />
      </div>
      <div className="absolute bottom-3 left-3 flex gap-0.5" aria-hidden="true">
        <div className="h-2 w-2 rounded-[1px] bg-sage-400/30" />
        <div className="h-2 w-2 rounded-[1px] bg-brand-400/30" />
      </div>
      <div className="absolute bottom-3 right-3 flex gap-0.5" aria-hidden="true">
        <div className="h-2 w-2 rounded-[1px] bg-brand-400/30" />
        <div className="h-2 w-2 rounded-[1px] bg-gold-400/30" />
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        className="hidden"
      />

      <div className="relative z-10 flex flex-col items-center gap-4">
        {uploading ? (
          <>
            {/* Spinning mosaic spinner */}
            <div className="relative flex h-20 w-20 items-center justify-center">
              {/* Outer spinning ring */}
              <motion.svg
                className="absolute inset-0 h-20 w-20"
                viewBox="0 0 80 80"
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <circle
                  cx="40" cy="40" r="36"
                  fill="none"
                  stroke="url(#spinnerGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="180 90"
                />
                <defs>
                  <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#b04a2e" />
                    <stop offset="50%" stopColor="#d4a853" />
                    <stop offset="100%" stopColor="#b04a2e" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Inner mosaic tiles that pulse */}
              <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none">
                <motion.rect
                  x="4" y="4" width="11" height="11" rx="1"
                  fill="#b04a2e"
                  animate={prefersReducedMotion ? {} : { opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
                />
                <motion.rect
                  x="17" y="4" width="11" height="11" rx="1"
                  fill="#d4a853"
                  animate={prefersReducedMotion ? {} : { opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                />
                <motion.rect
                  x="4" y="17" width="11" height="11" rx="1"
                  fill="#7a8b6f"
                  animate={prefersReducedMotion ? {} : { opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                />
                <motion.rect
                  x="17" y="17" width="11" height="11" rx="1"
                  fill="#b04a2e"
                  animate={prefersReducedMotion ? {} : { opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
                />
              </svg>
            </div>

            <div className="flex flex-col items-center gap-2">
              <p className="font-heading text-lg text-stone-800">
                Crafting your mosaic…
              </p>
              <p className="text-sm text-stone-500">
                {progress < 100 ? `${Math.round(progress)}% uploaded` : 'Processing…'}
              </p>
              {/* Progress bar */}
              <div className="mt-1 h-1.5 w-56 overflow-hidden rounded-full bg-stone-200/80">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #b04a2e, #d4a853, #b04a2e)',
                    backgroundSize: '200% 100%',
                  }}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${progress}%`,
                    backgroundPosition: ['0% 0%', '100% 0%'],
                  }}
                  transition={{
                    width: { duration: 0.3, ease: 'easeOut' },
                    backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' },
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <motion.div
              className="rounded-xl bg-brand-100/60 p-4 ring-1 ring-brand-200/30"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {/* Mosaic tile icon with arrow */}
              <svg
                className="h-8 w-8 text-brand-600"
                fill="none"
                viewBox="0 0 32 32"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="6" y="6" width="20" height="20" rx="2" strokeDasharray="4 2" />
                <rect x="8" y="8" width="7" height="7" rx="0.5" fill="currentColor" opacity="0.15" />
                <rect x="17" y="8" width="7" height="7" rx="0.5" fill="currentColor" opacity="0.1" />
                <rect x="8" y="17" width="7" height="7" rx="0.5" fill="currentColor" opacity="0.1" />
                <rect x="17" y="17" width="7" height="7" rx="0.5" fill="currentColor" opacity="0.15" />
                <path d="M16 2v8m0 0l-3-3m3 3l3-3" />
              </svg>
            </motion.div>
            <div>
              <p className="font-heading text-lg text-stone-800">
                Place your photo on the workbench
              </p>
              <p className="mt-1 text-sm text-stone-500">
                Drag and drop or click to browse — JPG, PNG, WebP up to 10 MB
              </p>
            </div>
          </>
        )}

        {error && (
          <motion.p
            className="text-sm font-medium text-red-600"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
