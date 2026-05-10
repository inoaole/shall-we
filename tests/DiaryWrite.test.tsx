/**
 * DiaryWrite — write → analyzing → result phase 진행 + dispatch 검증.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from '@/store/AppContext';
import DiaryWrite from '@/screens/diary/DiaryWrite';

function renderWrite() {
  return render(
    <AppProvider>
      <MemoryRouter initialEntries={['/diary/write']}>
        <Routes>
          <Route path="/diary/write" element={<DiaryWrite />} />
          <Route path="/home" element={<div>home</div>} />
          <Route path="/create" element={<div>create</div>} />
        </Routes>
      </MemoryRouter>
    </AppProvider>,
  );
}

function flushAnalyzing() {
  // 1.5s × 2 = 3s, plus margin
  act(() => {
    vi.advanceTimersByTime(1600);
  });
  act(() => {
    vi.advanceTimersByTime(1600);
  });
}

describe('DiaryWrite', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    sessionStorage.clear();
  });
  afterEach(() => vi.useRealTimers());

  it('초기 phase: 3 textarea + CTA disabled', () => {
    renderWrite();
    expect(screen.getByText('오늘의 기록')).toBeInTheDocument();
    expect(screen.getAllByRole('textbox')).toHaveLength(3);
    expect(screen.getByRole('button', { name: 'AI 감정 분석 보기' })).toBeDisabled();
  });

  it('3 답 모두 입력 시 CTA 활성', () => {
    renderWrite();
    const boxes = screen.getAllByRole('textbox');
    fireEvent.change(boxes[0], { target: { value: '테스트 답 1' } });
    fireEvent.change(boxes[1], { target: { value: '테스트 답 2' } });
    fireEvent.change(boxes[2], { target: { value: '테스트 답 3' } });
    expect(screen.getByRole('button', { name: 'AI 감정 분석 보기' })).not.toBeDisabled();
  });

  it('CTA → analyzing 1단계 → 2단계 → result (slider 부정적)', () => {
    renderWrite();
    // 슬라이더를 부정적(0)으로 설정
    const slider = screen.getByLabelText('오늘의 기분') as HTMLInputElement;
    fireEvent.change(slider, { target: { value: '0' } });

    const boxes = screen.getAllByRole('textbox');
    fireEvent.change(boxes[0], { target: { value: '오늘 힘들었어요' } });
    fireEvent.change(boxes[1], { target: { value: '무기력해요' } });
    fireEvent.change(boxes[2], { target: { value: '감사한 일은 없어요' } });
    fireEvent.click(screen.getByRole('button', { name: 'AI 감정 분석 보기' }));

    expect(screen.getByText('마음을 읽고 있어요')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1600);
    });
    expect(screen.getByText('따뜻한 피드백을 준비할게요')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1600);
    });
    expect(screen.getByText('AI의 따뜻한 응원')).toBeInTheDocument();
    // 슬라이더로 선택한 negative mood가 결과에 반영
    expect(screen.getByText('힘듦')).toBeInTheDocument();
  });

  it('result에서 "홈으로 돌아가기" → home', () => {
    renderWrite();
    const boxes = screen.getAllByRole('textbox');
    boxes.forEach((b, i) => fireEvent.change(b, { target: { value: `답 ${i + 1}` } }));
    fireEvent.click(screen.getByRole('button', { name: 'AI 감정 분석 보기' }));
    flushAnalyzing();

    fireEvent.click(screen.getByRole('button', { name: '홈으로 돌아가기' }));
    expect(screen.getByText('home')).toBeInTheDocument();
  });

  it('result에서 "추천받기" → /create', () => {
    renderWrite();
    const boxes = screen.getAllByRole('textbox');
    boxes.forEach((b, i) => fireEvent.change(b, { target: { value: `답 ${i + 1}` } }));
    fireEvent.click(screen.getByRole('button', { name: 'AI 감정 분석 보기' }));
    flushAnalyzing();

    fireEvent.click(
      screen.getByRole('button', { name: '감정 분석에 맞는 챌린지 추천받기' }),
    );
    expect(screen.getByText('create')).toBeInTheDocument();
  });
});
