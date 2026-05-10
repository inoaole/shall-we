import { type TextareaHTMLAttributes, forwardRef } from 'react';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  helper?: string;
  error?: string;
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ helper, error, label, className = '', rows = 4, ...rest }, ref) => (
    <div className="space-y-1">
      {label && <label className="block text-body-14 text-ink">{label}</label>}
      <textarea
        ref={ref}
        rows={rows}
        className={`w-full px-4 py-3 rounded-md bg-white border text-body-14 text-ink placeholder:text-gray focus:outline-none focus:border-primary resize-y min-h-[120px] ${
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

Textarea.displayName = 'Textarea';
