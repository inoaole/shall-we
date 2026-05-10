interface Props {
  label: string;
  selected: boolean;
  onClick: () => void;
}

/**
 * Pill-style selector used for challenge duration choices (3일 / 7일 / 2주 / ...).
 * Lays out in a 2-column grid externally.
 */
export function PeriodPill({ label, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`h-12 rounded-md border text-subtitle-16 transition-colors ${
        selected
          ? 'bg-bg-green-tint border-primary border-[1.5px] text-primary'
          : 'bg-white border-gray/30 text-ink'
      }`}
    >
      {label}
    </button>
  );
}
