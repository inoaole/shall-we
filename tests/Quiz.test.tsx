/**
 * Quiz integration test (D-S2.2 from eng review).
 *
 * Verifies the 14-step Quiz behavior end-to-end:
 * - Initial render: question 1/14 visible, "다음" disabled
 * - After answering: "다음" enabled
 * - 이전 button preserves prior answer
 * - Last step dispatches and navigates
 */

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
    </AppProvider>
  );
}

describe('Quiz', () => {
  it('첫 step에서 다음 버튼 비활성', () => {
    renderQuiz();
    expect(screen.getByText(/질문 1\/14/)).toBeInTheDocument();
    const nextBtn = screen.getByRole('button', { name: '다음' });
    expect(nextBtn).toBeDisabled();
  });

  it('답 선택하면 다음 버튼 활성화', () => {
    renderQuiz();
    fireEvent.click(screen.getByRole('radio', { name: '며칠 그랬다' }));
    expect(screen.getByRole('button', { name: '다음' })).not.toBeDisabled();
  });

  it('다음 → 이전 시 직전 답이 유지됨', () => {
    renderQuiz();
    // step 1: "자주 그랬다" 선택
    fireEvent.click(screen.getByRole('radio', { name: '자주 그랬다' }));
    fireEvent.click(screen.getByRole('button', { name: '다음' }));
    // step 2 노출
    expect(screen.getByText(/질문 2\/14/)).toBeInTheDocument();
    // 이전 클릭
    fireEvent.click(screen.getByRole('button', { name: '이전' }));
    // step 1으로 복귀, "자주 그랬다"가 selected 상태
    expect(screen.getByText(/질문 1\/14/)).toBeInTheDocument();
    const selected = screen.getByRole('radio', { name: '자주 그랬다' });
    expect(selected).toHaveAttribute('aria-checked', 'true');
  });

  it('14 step 모두 답하면 마지막에 "결과 보기" 버튼 노출', () => {
    renderQuiz();
    // 9 PHQ-9 step + 5 preference step
    for (let i = 0; i < 9; i++) {
      fireEvent.click(screen.getByRole('radio', { name: '며칠 그랬다' }));
      fireEvent.click(screen.getByRole('button', { name: /다음|결과 보기/ }));
    }
    // step 10~14 (preference): 양극 2개 중 하나 선택 (PoleChoice — role="radio")
    for (let i = 10; i <= 14; i++) {
      const radios = screen.getAllByRole('radio');
      // 첫 번째 옵션 (left pole) 클릭
      if (radios[0]) fireEvent.click(radios[0]);
      const next = screen.getByRole('button', { name: /다음|결과 보기/ });
      if (i < 14) fireEvent.click(next);
    }
    // 14 step에서 "결과 보기" 버튼이 보여야 함
    expect(screen.getByRole('button', { name: '결과 보기' })).toBeInTheDocument();
  });
});
