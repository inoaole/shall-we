/**
 * Home — challenges 표시 동작 검증.
 *
 * - 빈 상태: EmptyState + "챌린지 추가하기"
 * - 1개: TodayCard 1개
 * - 2개: TodayCard 2개 (newest first — 리듀서 prepend)
 * - ADD_CHALLENGE 후 새 카드가 즉시 노출 (v0.2.3 회귀 가드)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProvider, useApp } from '@/store/AppContext';
import Home from '@/screens/home/Home';
import { useEffect } from 'react';

function Seed({ titles }: { titles: string[] }) {
  const { dispatch } = useApp();
  useEffect(() => {
    titles.forEach((title, i) => {
      dispatch({
        type: 'ADD_CHALLENGE',
        payload: {
          id: `c-${i}`,
          title,
          durationDays: 7,
          mission: 'm',
          effect: 'e',
          startedAt: new Date().toISOString(),
        },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

function renderHome(titles: string[]) {
  return render(
    <AppProvider>
      <MemoryRouter initialEntries={['/home']}>
        <Seed titles={titles} />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<div>create</div>} />
          <Route path="/challenge" element={<div>challenge</div>} />
        </Routes>
      </MemoryRouter>
    </AppProvider>,
  );
}

describe('Home', () => {
  beforeEach(() => sessionStorage.clear());

  it('빈 상태: EmptyState + 챌린지 추가하기', () => {
    renderHome([]);
    expect(screen.getByText('아직 시작한 챌린지가 없어요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '챌린지 추가하기' })).toBeInTheDocument();
  });

  it('1개 챌린지: TodayCard 1개 노출', () => {
    renderHome(['산책 10분']);
    expect(screen.getByText('산책 10분')).toBeInTheDocument();
    expect(screen.getByText('오늘의 챌린지')).toBeInTheDocument();
  });

  it('2개 챌린지: TodayCard 2개 모두 노출 (newest first)', () => {
    renderHome(['하늘 보기', '산책 10분']);
    // Seed dispatch order: 하늘 → 산책. Reducer prepends → newest [0] = 산책.
    expect(screen.getByText('하늘 보기')).toBeInTheDocument();
    expect(screen.getByText('산책 10분')).toBeInTheDocument();
    // DOM order: 산책 (newest) above 하늘
    const cards = screen.getAllByRole('button').filter((b) =>
      b.textContent?.includes('일 챌린지'),
    );
    expect(cards[0].textContent).toContain('산책 10분');
    expect(cards[1].textContent).toContain('하늘 보기');
  });
});
