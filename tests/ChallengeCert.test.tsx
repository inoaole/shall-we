/**
 * ChallengeCert chip selector test (D-S3.6 from eng review).
 *
 * Verifies the 0/1/2+ branching:
 *   - 0 challenges: chip section absent (auto-selected nothing, upload disabled)
 *   - 1 challenge:  auto-selected (chips hidden, just confirmation text)
 *   - 2+ challenges: chips shown, must select one to enable upload
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { useEffect } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProvider, useApp, type Challenge } from '@/store/AppContext';
import ChallengeCert from '@/screens/cert/ChallengeCert';

function Seed({ challenges }: { challenges: Challenge[] }) {
  const { dispatch } = useApp();
  // Dispatch once via effect — dispatching during render → infinite loop
  useEffect(() => {
    challenges.forEach((c) => dispatch({ type: 'ADD_CHALLENGE', payload: c }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

function renderCert(challenges: Challenge[] = []) {
  return render(
    <AppProvider>
      <MemoryRouter initialEntries={['/cert/upload']}>
        <Seed challenges={challenges} />
        <Routes>
          <Route path="/cert/upload" element={<ChallengeCert />} />
          <Route path="/diary" element={<div>diary</div>} />
        </Routes>
      </MemoryRouter>
    </AppProvider>
  );
}

const mkChallenge = (id: string, title: string): Challenge => ({
  id,
  title,
  durationDays: 7,
  mission: 'm',
  effect: 'e',
  startedAt: new Date().toISOString(),
});

beforeEach(() => {
  sessionStorage.clear();
});

describe('ChallengeCert chip selector', () => {
  it('0 challenges: 진행 중 챌린지 섹션 안 나옴', () => {
    renderCert([]);
    expect(screen.queryByText('진행 중인 챌린지')).not.toBeInTheDocument();
    // 업로드 버튼 비활성
    expect(screen.getByRole('button', { name: '업로드' })).toBeDisabled();
  });

  it('1 challenge: chip 안 보이고 자동 선택 표시 (✓)', () => {
    renderCert([mkChallenge('c1', '산책 10분 하기')]);
    expect(screen.getByText('진행 중인 챌린지')).toBeInTheDocument();
    expect(screen.getByText(/산책 10분 하기/)).toBeInTheDocument();
    // chip 버튼은 노출 안 됨
    expect(screen.queryByRole('button', { pressed: false })).not.toBeInTheDocument();
  });

  it('2+ challenges: chip 모두 노출, 강제 선택 필요', () => {
    renderCert([
      mkChallenge('c1', '산책 10분 하기'),
      mkChallenge('c2', '하늘 보기'),
    ]);
    const chips = screen.getAllByRole('button', { pressed: false });
    expect(chips.length).toBeGreaterThanOrEqual(2);
    // 둘 다 미선택 상태
    expect(screen.getByRole('button', { name: '산책 10분 하기' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
    // 클릭 시 selected
    fireEvent.click(screen.getByRole('button', { name: '하늘 보기' }));
    expect(screen.getByRole('button', { name: '하늘 보기' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });
});
