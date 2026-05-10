interface Props {
  /** 0.0 ~ 1.0 */
  value: number;
  className?: string;
}

export function ProgressBar({ value, className = '' }: Props) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div className={`h-1.5 bg-gray/15 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-primary rounded-full transition-[width] duration-300 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
