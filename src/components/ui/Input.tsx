import { type InputHTMLAttributes, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  helper?: string;
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ helper, error, label, className = '', ...rest }, ref) => (
    <div className="space-y-1">
      {label && <label className="block text-body-14 text-ink">{label}</label>}
      <input
        ref={ref}
        className={`w-full h-12 px-4 rounded-md bg-white border text-body-14 text-ink placeholder:text-gray focus:outline-none focus:border-primary ${
          error ? 'border-red-500' : 'border-gray/30'
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
