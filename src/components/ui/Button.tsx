import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'social';
type Size = 'full' | 'pair-prev' | 'pair-next';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
}

const variantClass: Record<Variant, string> = {
  primary:   'bg-primary text-white shadow-sm hover:brightness-105 disabled:bg-gray/20 disabled:text-gray disabled:shadow-none',
  secondary: 'bg-white text-primary border-[1.5px] border-primary disabled:text-gray disabled:border-gray/30 disabled:bg-bg-gray',
  social:    'bg-white text-ink border-[1.5px] border-gray/25 shadow-sm hover:bg-bg-gray',
};

const sizeClass: Record<Size, string> = {
  'full':       'w-full h-13 rounded-lg text-subtitle-16',
  'pair-prev':  'flex-[1] h-13 rounded-lg text-subtitle-16',
  'pair-next':  'flex-[2] h-13 rounded-lg text-subtitle-16',
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'primary', size = 'full', leftIcon, className = '', children, ...rest }, ref) => (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.97] disabled:active:scale-100 ${variantClass[variant]} ${sizeClass[size]} ${className}`}
      {...rest}
    >
      {leftIcon}
      {children}
    </button>
  )
);

Button.displayName = 'Button';
