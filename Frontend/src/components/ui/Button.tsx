import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const buttonVariants = {
  default: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-sm',
  secondary: 'bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC]',
  ghost: 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]',
  danger: 'bg-[#EF4444] text-white hover:bg-red-600',
  success: 'bg-[#22C55E] text-white hover:bg-green-600',
} as const;

const buttonSizes = {
  sm: 'h-8 px-3 text-xs',
  default: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'h-10 w-10',
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
