import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
}

export function Card({ selected, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border bg-white p-6 transition-all ${
        selected
          ? 'border-brand-500 ring-2 ring-brand-200 shadow-lg'
          : 'border-gray-200 hover:border-brand-300 hover:shadow-md'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
