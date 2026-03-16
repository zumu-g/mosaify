'use client';

import { type HTMLMotionProps, motion, useReducedMotion } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  selected?: boolean;
}

export function Card({ selected, className = '', children, ...props }: CardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`rounded-2xl border bg-white p-6 transition-colors duration-200 ${
        selected
          ? 'border-brand-500 ring-2 ring-brand-200 shadow-lg'
          : 'border-gray-200 hover:border-brand-300 hover:shadow-md'
      } ${className}`}
      whileHover={prefersReducedMotion ? {} : { y: -2 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
