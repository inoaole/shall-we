import { type InputHTMLAttributes, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  helper?: string;
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ helper, error, label, className = '', ...rest }, ref) => (
    <div className="space-y-1.5">
      {label && <label className="block text-body-14 text-ink font-medium">{label}</label>}
      <input
        ref={ref}
        className={`w-full h-12 px-4 rounded-md bg-white border-[1.5px] text-body-14 text-ink placeholder:text-gray/70 focus:outline-none transition-colors ${
          error
            ? 'border-red-500 focus:border-red-500'
            : 'border-gray/25 focus:border-primary'
        } ${className}`}
        {...rest}
      />
      {(error || helper) && (
        <p className={`text-body-12 ${error ? 'text-red-500' : 'text-gray'}`}>
          {error || helper}
        </p>
      )}
    </div>
  )
);

Input.displayName = 'Input';
