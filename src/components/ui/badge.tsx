interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'gray' | 'green';
}

const variantClasses = {
  brand: 'bg-brand-100 text-brand-700',
  gray: 'bg-gray-100 text-gray-700',
  green: 'bg-green-100 text-green-700',
};

export function Badge({ children, variant = 'brand' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
