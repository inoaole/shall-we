/**
 * DotPagination — 인트로 carousel 진행 표시 (Figma 40000613:595).
 *
 * current는 1-based.
 */
interface Props {
  current: number;
  total: number;
  className?: string;
}

export function DotPagination({ current, total, className = '' }: Props) {
  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      role="tablist"
      aria-label={`${current}/${total} 단계`}
    >
      {Array.from({ length: total }).map((_, i) => {
        const active = i + 1 === current;
        return (
          <span
            key={i}
            role="tab"
            aria-selected={active}
            className={`h-2 rounded-full transition-all ${
              active ? 'w-5 bg-primary' : 'w-2 bg-gray/25'
            }`}
          />
        );
      })}
    </div>
  );
}
