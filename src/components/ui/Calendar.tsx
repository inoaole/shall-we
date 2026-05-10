/**
 * Calendar — generic month grid + weekday header.
 *
 * Cell rendering is delegated to caller via `renderCell` so the same grid can
 * power the challenge progress view (CalendarCell) and the AI 다이어리 mood
 * view (MoodCell). DRY per eng review D4.
 */

import { Fragment, type ReactNode } from 'react';

export type CellState = 'done' | 'missed' | 'future' | 'today-empty' | 'other-month';

interface CellProps {
  day: number;
  state: CellState;
  isToday?: boolean;
  onClick?: () => void;
}

const stateClass: Record<CellState, string> = {
  'done':         'bg-primary text-white font-semibold',
  'missed':       'bg-white border border-gray/30 text-ink/70',
  'future':       'bg-bg-gray text-gray/60',
  'today-empty':  'bg-white border border-gray/30 text-ink',
  'other-month':  'bg-transparent text-gray/40',
};

const stateLabelKo: Record<CellState, string> = {
  'done':         '완수',
  'missed':       '미완수',
  'future':       '미래',
  'today-empty':  '오늘 (미완수)',
  'other-month':  '다른 달',
};

export function CalendarCell({ day, state, isToday, onClick }: CellProps) {
  const interactive = state === 'done';
  const todaySuffix = isToday ? ', 오늘' : '';
  return (
    <button
      onClick={onClick}
      disabled={!interactive}
      aria-label={`${day}일 ${stateLabelKo[state]}${todaySuffix}`}
      className={`w-10 h-10 rounded-md flex items-center justify-center text-body-14 transition-all ${
        stateClass[state]
      } ${isToday ? 'ring-[1.5px] ring-primary ring-offset-1' : ''} ${
        interactive ? 'active:scale-[0.95]' : 'cursor-default'
      }`}
    >
      {day}
    </button>
  );
}

interface CellBase {
  day: number;
  isToday?: boolean;
  date: Date;
}

interface CalendarProps<C extends CellBase> {
  year: number;
  month: number; // 0-11
  cells: C[];
  renderCell: (cell: C, onClick: () => void) => ReactNode;
  onCellClick?: (date: Date) => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function Calendar<C extends CellBase>({
  year,
  month,
  cells,
  renderCell,
  onCellClick,
  onPrev,
  onNext,
}: CalendarProps<C>) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPrev}
          className="text-2xl text-ink px-2 leading-none active:scale-90 transition-transform"
          aria-label="이전 달"
        >
          ‹
        </button>
        <span className="text-subtitle-16 text-ink">
          {year}.{String(month + 1).padStart(2, '0')}
        </span>
        <button
          onClick={onNext}
          className="text-2xl text-ink px-2 leading-none active:scale-90 transition-transform"
          aria-label="다음 달"
        >
          ›
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1.5 text-body-12 text-center text-gray mb-2 font-medium">
        {['월', '화', '수', '목', '금', '토', '일'].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5 justify-items-center">
        {cells.map((c) => {
          const handleClick = () => onCellClick?.(c.date);
          return <Fragment key={c.date.toISOString()}>{renderCell(c, handleClick)}</Fragment>;
        })}
      </div>
    </div>
  );
}
