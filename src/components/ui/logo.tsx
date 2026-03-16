'use client';

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 40, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Mosaify logo"
    >
      <rect x="1" y="1" width="46" height="46" rx="6" fill="#f3efe8" stroke="#d6c8b5" strokeWidth="1.5" />
      <rect x="3" y="3" width="42" height="42" rx="4.5" fill="#faf8f5" />

      {/* Tessera "M" */}
      <rect x="8" y="10" width="5.5" height="5.5" rx="0.5" fill="#c75b39" />
      <rect x="8" y="16.5" width="5.5" height="5.5" rx="0.5" fill="#b04a2e" />
      <rect x="8" y="23" width="5.5" height="5.5" rx="0.5" fill="#c75b39" />
      <rect x="8" y="29.5" width="5.5" height="5.5" rx="0.5" fill="#b04a2e" />
      <rect x="8" y="36" width="5.5" height="5.5" rx="0.5" fill="#c75b39" />

      <rect x="14.5" y="16.5" width="5.5" height="5.5" rx="0.5" fill="#d4a853" />
      <rect x="21" y="23" width="5.5" height="5.5" rx="0.5" fill="#7a8b6f" />
      <rect x="27.5" y="16.5" width="5.5" height="5.5" rx="0.5" fill="#d4a853" />

      <rect x="34" y="10" width="5.5" height="5.5" rx="0.5" fill="#c75b39" />
      <rect x="34" y="16.5" width="5.5" height="5.5" rx="0.5" fill="#b04a2e" />
      <rect x="34" y="23" width="5.5" height="5.5" rx="0.5" fill="#c75b39" />
      <rect x="34" y="29.5" width="5.5" height="5.5" rx="0.5" fill="#b04a2e" />
      <rect x="34" y="36" width="5.5" height="5.5" rx="0.5" fill="#c75b39" />

      <rect x="5" y="5" width="3" height="3" rx="0.3" fill="#d4a853" opacity="0.5" />
      <rect x="40" y="5" width="3" height="3" rx="0.3" fill="#d4a853" opacity="0.5" />
      <rect x="5" y="40" width="3" height="3" rx="0.3" fill="#d4a853" opacity="0.5" />
      <rect x="40" y="40" width="3" height="3" rx="0.3" fill="#d4a853" opacity="0.5" />
    </svg>
  );
}

export function LogoWithText({ size = 40, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Logo size={size} />
      <span className="font-heading text-xl tracking-tight gold-shimmer">
        Mosaify
      </span>
    </div>
  );
}
