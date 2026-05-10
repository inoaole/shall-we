import { type TextareaHTMLAttributes, forwardRef } from 'react';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  helper?: string;
  error?: string;
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ helper, error, label, className = '', rows = 4, ...rest }, ref) => (
    <div className="space-y-1.5">
      {label && <label className="block text-body-14 text-ink font-medium">{label}</label>}
      <textarea
        ref={ref}
        rows={rows}
        className={`w-full px-4 py-3 rounded-md bg-white border-[1.5px] text-body-14 text-ink placeholder:text-gray/70 focus:outline-none resize-y min-h-[120px] transition-colors leading-relaxed ${
          error
            ? 'border-danger focus:border-danger'
            : 'border-gray/25 focus:border-primary'
        } ${className}`}
        {...rest}
      />
      {(error || helper) && (
        <p className={`text-body-12 ${error ? 'text-danger' : 'text-gray'}`}>
          {error || helper}
        </p>
      )}
    </div>
  )
);

Textarea.displayName = 'Textarea';
