interface Option {
  label: string;
  value: string;
}

interface Props {
  left: Option;
  right: Option;
  value?: string;
  onChange: (value: string) => void;
}

/**
 * Bipolar 2-choice selector used for the challenge preference axes
 * (정적인 ↔ 역동적인, 혼자 ↔ 함께, ...).
 *
 * Two equal-width pills side-by-side. Single-select.
 * D2 from eng review: 2지선다 (slider 형식 X).
 */
export function PoleChoice({ left, right, value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {[left, right].map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            aria-pressed={selected}
            className={`h-11 rounded-md border text-subtitle-16 transition-colors ${
              selected
                ? 'bg-bg-green-tint border-primary border-[1.5px] text-primary'
                : 'bg-white border-gray/30 text-ink'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
