interface Props {
  label: string;
  selected: boolean;
  onClick: () => void;
}

/**
 * Chip selector for "진행 중인 챌린지" picker on the certify screen.
 * Wraps via flex-wrap externally. Slightly smaller than PeriodPill (h-10).
 */
export function Chip({ label, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`h-10 px-4 rounded-full border-[1.5px] text-body-14 transition-all active:scale-[0.96] ${
        selected
          ? 'bg-bg-green-tint border-primary text-primary'
          : 'bg-white border-gray/25 text-ink'
      }`}
    >
      {label}
    </button>
  );
}
