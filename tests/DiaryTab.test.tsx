/**
 * DiaryTab — empty state + 캘린더 + "오늘의 일기 쓰기" 진입.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from '@/store/AppContext';
import DiaryTab from '@/screens/diary/DiaryTab';

function renderTab() {
  return render(
    <AppProvider>
      <MemoryRouter initialEntries={['/diary']}>
        <Routes>
          <Route path="/diary" element={<DiaryTab />} />
          <Route path="/diary/write" element={<div>diary-write</div>} />
        </Routes>
      </MemoryRouter>
    </AppProvider>,
  );
}

describe('DiaryTab', () => {
  beforeEach(() => sessionStorage.clear());

  it('CTA + 캘린더 헤더 노출', () => {
    renderTab();
    expect(screen.getByRole('button', { name: '오늘의 일기 쓰기' })).toBeInTheDocument();
    expect(screen.getByText('오늘의 기록')).toBeInTheDocument();
    // 요일 헤더
    expect(screen.getByText('월')).toBeInTheDocument();
    expect(screen.getByText('일')).toBeInTheDocument();
  });

  it('entry 없으면 "최근 기록" 섹션 숨김', () => {
    renderTab();
    expect(screen.queryByText('최근 기록')).toBeNull();
  });

  it('CTA 클릭 → /diary/write', () => {
    renderTab();
    fireEvent.click(screen.getByRole('button', { name: '오늘의 일기 쓰기' }));
    expect(screen.getByText('diary-write')).toBeInTheDocument();
  });

  it('범례 3개 mood 노출', () => {
    renderTab();
    expect(screen.getByText('긍정적')).toBeInTheDocument();
    expect(screen.getByText('중립')).toBeInTheDocument();
    expect(screen.getByText('부정적')).toBeInTheDocument();
  });
});
