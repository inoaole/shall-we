/**
 * Loading — 점 3개 인디케이터 (design.md §5.9).
 *
 * S1-A2 (eng review): NOT lazy-imported — used as React.Suspense fallback,
 * so it must be eagerly available to avoid chicken-and-egg lazy chain.
 *
 * S1 polish: changed from animate-pulse to a custom 3-dot bounce
 * (pulse looked stuck; bounce reads as "active processing").
 */

interface Props {
  className?: string;
}

export function Loading({ className = '' }: Props) {
  return (
    <div
      className={`flex items-center justify-center gap-1.5 py-8 ${className}`}
      aria-label="로딩 중"
      role="status"
    >
      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms', animationDuration: '900ms' }} />
      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms', animationDuration: '900ms' }} />
      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms', animationDuration: '900ms' }} />
    </div>
  );
}
