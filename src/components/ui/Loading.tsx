/**
 * Loading — 점 3개 인디케이터 (design.md §5.9).
 *
 * S1-A2 (eng review): NOT lazy-imported — used as React.Suspense fallback,
 * so it must be eagerly available to avoid chicken-and-egg lazy chain.
 */

interface Props {
  className?: string;
}

export function Loading({ className = '' }: Props) {
  return (
    <div className={`flex items-center justify-center gap-1.5 py-8 ${className}`} aria-label="로딩 중">
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '200ms' }} />
      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '400ms' }} />
    </div>
  );
}
