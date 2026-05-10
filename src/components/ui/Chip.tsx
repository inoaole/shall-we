interface Props {
  label: string;
  selected: boolean;
  onClick: () => void;
}

/**
 * Chip selector for "진행 중인 챌린지" picker on the certify screen.
 * Wraps via flex-wrap externally.
 */
export function Chip({ label, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`h-11 px-4 rounded-md border text-body-14 transition-colors ${
        selected
          ? 'bg-bg-green-tint border-primary border-[1.5px] text-primary'
          : 'bg-white border-gray/30 text-ink'
      }`}
    >
      {label}
    </button>
  );
}
