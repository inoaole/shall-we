interface Props {
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

/**
 * Box-style radio used for PHQ-9 answers (4 options) and 공개/비공개 toggles.
 */
export function RadioOption({ label, selected, onClick, className = '' }: Props) {
  return (
    <button
      onClick={onClick}
      role="radio"
      aria-checked={selected}
      className={`w-full h-12 px-5 rounded-md border text-left text-body-14 transition-colors ${
        selected
          ? 'bg-bg-green-tint border-primary border-[1.5px] text-primary'
          : 'bg-white border-gray/30 text-ink'
      } ${className}`}
    >
      {label}
    </button>
  );
}
