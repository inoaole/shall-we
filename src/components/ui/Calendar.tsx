/**
 * Calendar — 3상태 셀 (완수 / 미완수 / 미래) + 오늘 강조 보더.
 * S3에서 utils/date.ts와 함께 사용하지만, S1엔 dummy state로 visual만 잡아둠.
 */

export type CellState = 'done' | 'missed' | 'future' | 'today-empty' | 'other-month';

interface CellProps {
  day: number;
  state: CellState;
  isToday?: boolean;
  onClick?: () => void;
}

const stateClass: Record<CellState, string> = {
  'done':         'bg-primary text-white',
  'missed':       'bg-white border border-gray/30 text-ink',
  'future':       'bg-gray/20 text-gray/60',
  'today-empty':  'bg-white border border-gray/30 text-ink',
  'other-month':  'bg-transparent text-gray/40',
};

export function CalendarCell({ day, state, isToday, onClick }: CellProps) {
  const interactive = state === 'done';
  return (
    <button
      onClick={onClick}
      disabled={!interactive}
      aria-label={`${day}일 ${state}`}
      className={`w-10 h-10 rounded-full flex items-center justify-center text-body-14 transition-colors ${
        stateClass[state]
      } ${isToday ? 'ring-[1.5px] ring-primary' : ''} ${interactive ? '' : 'cursor-default'}`}
    >
      {day}
    </button>
  );
}

interface CalendarProps {
  year: number;
  month: number; // 0-11
  cells: { day: number; state: CellState; isToday?: boolean; date: Date }[];
  onCellClick?: (date: Date) => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function Calendar({ year, month, cells, onCellClick, onPrev, onNext }: CalendarProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={onPrev} className="text-2xl text-ink px-2 leading-none" aria-label="이전 달">‹</button>
        <span className="text-subtitle-16 text-ink">
          {year}.{String(month + 1).padStart(2, '0')}
        </span>
        <button onClick={onNext} className="text-2xl text-ink px-2 leading-none" aria-label="다음 달">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-body-12 text-center text-gray mb-2">
        {['월', '화', '수', '목', '금', '토', '일'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 justify-items-center">
        {cells.map((c) => (
          <CalendarCell
            key={c.date.toISOString()}
            day={c.day}
            state={c.state}
            isToday={c.isToday}
            onClick={() => onCellClick?.(c.date)}
          />
        ))}
      </div>
    </div>
  );
}
