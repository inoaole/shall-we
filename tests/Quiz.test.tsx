/**
 * Quiz integration test.
 *
 * - PHQ-9 (9 step): 선택 시 250ms 후 자동 진행. 하단 CTA 없음.
 * - 선호조사 (1 화면): 5축 모두 노출, 모두 답해야 "결과 보기" 활성.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from '@/store/AppContext';
import Quiz from '@/screens/onboarding/Quiz';

function renderQuiz() {
  return render(
    <AppProvider>
      <MemoryRouter initialEntries={['/check/quiz']}>
        <Routes>
          <Route path="/check/quiz" element={<Quiz />} />
          <Route path="/check/analyzing" element={<div>analyzing</div>} />
        </Routes>
      </MemoryRouter>
    </AppProvider>,
  );
}

function flushAdvance() {
  act(() => {
    vi.advanceTimersByTime(260);
  });
}

describe('Quiz', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('PHQ-9 첫 step: "다음" 없음, "이전" 있음', () => {
    renderQuiz();
    expect(screen.getByText(/질문 1\/9/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '다음' })).toBeNull();
    expect(screen.getByRole('button', { name: '이전' })).toBeInTheDocument();
  });

  it('PHQ-9 선택 시 250ms 후 자동 진행', () => {
    renderQuiz();
    fireEvent.click(screen.getByRole('radio', { name: '며칠 그랬다' }));
    flushAdvance();
    expect(screen.getByText(/질문 2\/9/)).toBeInTheDocument();
  });

  it('PHQ-9 9개 답하면 선호조사 화면으로 전환', () => {
    renderQuiz();
    for (let i = 0; i < 9; i++) {
      fireEvent.click(screen.getByRole('radio', { name: '며칠 그랬다' }));
      flushAdvance();
    }
    expect(screen.getByText('챌린지 선호 조사')).toBeInTheDocument();
    // 5축 카테고리 라벨이 모두 보여야 함
    ['활동', '관계', '방식', '취미', '시간'].forEach((cat) => {
      expect(screen.getByText(cat)).toBeInTheDocument();
    });
  });

  it('선호조사: 5개 모두 답해야 "결과 보기" 활성', () => {
    renderQuiz();
    // PHQ-9 9개 통과
    for (let i = 0; i < 9; i++) {
      fireEvent.click(screen.getByRole('radio', { name: '며칠 그랬다' }));
      flushAdvance();
    }
    // 선호 화면
    const submit = screen.getByRole('button', { name: '결과 보기' });
    expect(submit).toBeDisabled();

    // 5축 left pole 선택 (각 카드의 첫 라디오)
    ['활동', '관계', '방식', '취미', '시간'].forEach((cat) => {
      const card = screen.getByText(cat).closest('div') as HTMLElement;
      const firstRadio = within(card).getAllByRole('radio')[0];
      fireEvent.click(firstRadio);
    });

    expect(screen.getByRole('button', { name: '결과 보기' })).not.toBeDisabled();
  });

  it('전체 완료 시 analyzing으로 이동', () => {
    renderQuiz();
    for (let i = 0; i < 9; i++) {
      fireEvent.click(screen.getByRole('radio', { name: '며칠 그랬다' }));
      flushAdvance();
    }
    ['활동', '관계', '방식', '취미', '시간'].forEach((cat) => {
      const card = screen.getByText(cat).closest('div') as HTMLElement;
      const firstRadio = within(card).getAllByRole('radio')[0];
      fireEvent.click(firstRadio);
    });
    fireEvent.click(screen.getByRole('button', { name: '결과 보기' }));
    expect(screen.getByText('analyzing')).toBeInTheDocument();
  });
});
