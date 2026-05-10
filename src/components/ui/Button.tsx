import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'social';
type Size = 'full' | 'pair-prev' | 'pair-next';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
}

const variantClass: Record<Variant, string> = {
  primary:   'bg-primary text-white disabled:bg-gray/40 disabled:text-white',
  secondary: 'bg-transparent text-primary border border-primary disabled:text-gray disabled:border-gray',
  social:    'bg-white text-ink border border-gray/30',
};

const sizeClass: Record<Size, string> = {
  'full':       'w-full h-13 rounded-md text-subtitle-16',
  'pair-prev':  'flex-[1] h-13 rounded-md text-subtitle-16',
  'pair-next':  'flex-[2] h-13 rounded-md text-subtitle-16',
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'primary', size = 'full', leftIcon, className = '', children, ...rest }, ref) => (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center gap-2 transition-colors ${variantClass[variant]} ${sizeClass[size]} ${className}`}
      {...rest}
    >
      {leftIcon}
      {children}
    </button>
  )
);

Button.displayName = 'Button';
