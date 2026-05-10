/**
 * MoodSlider — 연속 0-100 드래그 슬라이더 (Figma 40000663:1050).
 *
 * 트랙: red → gray → green 그라데이션. 라벨 3개(부정적 / 보통 / 긍정적)는
 * 현재 값이 속한 구간을 강조 (< 34 = negative, 34-66 = neutral, > 66 = positive).
 * 부모는 number 값을 받아 저장 시 Mood로 버킷 분류.
 */

interface Props {
  value: number; // 0-100
  onChange: (next: number) => void;
}

function bucket(value: number): 'negative' | 'neutral' | 'positive' {
  if (value < 34) return 'negative';
  if (value > 66) return 'positive';
  return 'neutral';
}

export function MoodSlider({ value, onChange }: Props) {
  const current = bucket(value);
  const ariaText =
    current === 'negative' ? '부정적' : current === 'positive' ? '긍정적' : '보통';

  return (
    <div className="space-y-3">
      <div className="relative h-10 flex items-center">
        {/* Gradient track — red → neutral → green */}
        <div
          className="absolute inset-x-0 h-2.5 rounded-full"
          style={{
            background:
              'linear-gradient(to right, #FF6467 0%, #D1D5DC 50%, #05DF72 100%)',
          }}
          aria-hidden
        />
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="오늘의 기분"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-valuetext={ariaText}
          className="relative w-full appearance-none bg-transparent cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-6
                     [&::-webkit-slider-thumb]:h-6
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-white
                     [&::-webkit-slider-thumb]:border-[2.5px]
                     [&::-webkit-slider-thumb]:border-ink
                     [&::-webkit-slider-thumb]:shadow-md
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-moz-range-thumb]:w-6
                     [&::-moz-range-thumb]:h-6
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:bg-white
                     [&::-moz-range-thumb]:border-[2.5px]
                     [&::-moz-range-thumb]:border-ink
                     [&::-moz-range-thumb]:shadow-md"
        />
      </div>
      <div className="flex justify-between text-body-12">
        <span className={current === 'negative' ? 'text-ink font-semibold' : 'text-gray'}>
          부정적
        </span>
        <span className={current === 'neutral' ? 'text-ink font-semibold' : 'text-gray'}>
          보통
        </span>
        <span className={current === 'positive' ? 'text-ink font-semibold' : 'text-gray'}>
          긍정적
        </span>
      </div>
    </div>
  );
}

/** 저장 시점에 number → Mood 변환 */
export function moodFromScore(score: number): 'negative' | 'neutral' | 'positive' {
  return bucket(score);
}
