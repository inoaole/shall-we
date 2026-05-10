# Sprint 3 — Main App

> **목표**: 메인 4탭 + 챌린지 만들기/인증 풀 cycle. 매일 인증 → 캘린더 누적 → 마이페이지 게시글이 동작.
> **기간**: 3 작업일 (24h) — 가장 무거운 sprint
> **상위 플랜**: `../plan.md` P4+P5, `../sprints.md` S3

---

## Pre-flight Checklist

- [ ] S2 완료 (S2 review의 모든 DoD 체크 ✓)
- [ ] `git tag s2-onboarding` 존재
- [ ] `wireframe.md` §9-22 (홈/인증/챌린지만들기/다이어리/마이페이지/설정) 다시 한 번 읽기
- [ ] `design.md` §5.3 Card / §5.4 Selector(Chip) / §5.8 Calendar / §5.6 BottomNav 확인
- [ ] §8 product 결정 5번 (캘린더 month 이동 방식) — Day 2 시작 전 합의
- [ ] §8 product 결정 7번 (챌린지 만들기 직접입력) — Day 3 시작 전 합의

---

## Task Breakdown — Day 1 (8h) — Home + Cert 진입

### Morning (4h)

| ID | 작업 | 파일 | 추정 | 의존 |
|---|---|---|---|---|
| **T3.1** | AppContext 확장: `ADD_CHALLENGE`, `CERTIFY`, `TOGGLE_FEED_VIEW` actions + reducer | `src/store/AppContext.tsx` | 1h | S2 |
| **T3.2** | `mocks/feed-seed.json` (5-10개 시드 게시물 — picsum URL) | `src/mocks/feed-seed.json` | 30m | — |
| **T3.3** | `mocks/recommendations.json` (5개 — "하늘 바라보기" 등) | `src/mocks/recommendations.json` | 15m | — |
| **T3.4** | `mocks/myPosts-seed.json` (빈 배열) + AppContext init load | `src/mocks/myPosts-seed.json`, AppContext 보강 | 15m | T3.1, T3.2 |
| **T3.5** | `Home.tsx` — 오늘의 챌린지 카드 + 모두의 챌린지 list 뷰 | `src/screens/home/Home.tsx` | 1h | T3.1, T3.2 |
| **T3.6** | Home ≡/▦ 토글 + grid 뷰 + localStorage 저장 | `Home.tsx` 보강 | 1h | T3.5 |

### Afternoon (4h)

| ID | 작업 | 파일 | 추정 | 의존 |
|---|---|---|---|---|
| **T3.7** | `PostDetail.tsx` (피드 카드 탭 진입) | `src/screens/home/PostDetail.tsx` | 45m | T3.5 |
| **T3.8** | `CertTab.tsx` — 오늘의 챌린지 + "챌린지 추가" 카드 (진입점만) | `src/screens/cert/CertTab.tsx` | 1h | T3.1 |
| **T3.9** | Day 1 검증 — Home 4탭 BottomNav + ≡/▦ 토글 + PostDetail 진입 | — | 30m | T3.5-T3.8 |
| **T3.10** | Cross-screen 데이터 연결 검증 — feed에서 카드 탭 → PostDetail에 데이터 정상 표시 | — | 45m | T3.7 |
| **T3.11** | 진행 중 챌린지 0개 시 CertTab 빈 상태 처리 | `CertTab.tsx` | 30m | T3.8 |
| **T3.12** | mock 챌린지 1개 dispatch 헬퍼 (개발용 `/dev/seed` 라우트) | `src/screens/dev/Seed.tsx` | 30m | T3.1 |

**Day 1 DoD**: Home 두 뷰 모드 동작, PostDetail 진입, CertTab 진입(빈 상태 + 챌린지 1개일 때 카드).

---

## Task Breakdown — Day 2 (8h) — ChallengeCert + Diary

### Morning (4h)

| ID | 작업 | 파일 | 추정 | 의존 |
|---|---|---|---|---|
| **T3.13** | `ChallengeCert.tsx` 골격 — 사진 picker + 글 + 공개/비공개 + 업로드 버튼 | `src/screens/cert/ChallengeCert.tsx` | 1h | T3.8 |
| **T3.14** | 사진 picker — `URL.createObjectURL` + cleanup useEffect | `ChallengeCert.tsx` | 45m | T3.13 |
| **T3.15** | **picker cancel 처리** + 사진 미선택 시 토스트 + 업로드 비활성 | `ChallengeCert.tsx` | 30m | T3.14 |
| **T3.16** | Chip selector — 진행 중 챌린지 (0/1/2+개 분기) | `ChallengeCert.tsx` | 1h | T3.16 |
| **T3.17** | 업로드 → `CERTIFY` dispatch + `/cert`로 navigate + 토스트 | `ChallengeCert.tsx` | 45m | T3.16 |

### Afternoon (4h)

| ID | 작업 | 파일 | 추정 | 의존 |
|---|---|---|---|---|
| **T3.18** | `utils/date.ts` — `cellState(date, today, posts): 'done'\|'missed'\|'future'\|'other-month'` | `src/utils/date.ts` | 45m | — |
| **T3.19** | `tests/date.test.ts` — 4 케이스 (done/missed/future/other-month) | `tests/date.test.ts` | 30m | T3.18 |
| **T3.20** | `Calendar.tsx` (S1 base에 3상태 셀 적용) — 이번 달 월간 그리드 | `src/screens/diary/Calendar.tsx` | 1h | T3.18 |
| **T3.21** | Calendar 좌우 month 네비 (§8-5 product 결정에 따라 화살표 / 스와이프) | `Calendar.tsx` | 30m | T3.20 |
| **T3.22** | Calendar `useMemo` cells + `React.memo` 셀 (P3 perf) | `Calendar.tsx` | 30m | T3.20 |
| **T3.23** | Diary 화면 — 진행 중 챌린지 카드 + 캘린더 + 오늘 챌린지 카드 ("인증하기" 버튼) | `src/screens/diary/Calendar.tsx` 보강 | 45m | T3.20 |
| **T3.24** | Day 2 검증 — 인증 → 캘린더 셀 즉시 초록 + PostDetail 진입 | — | 30m | All Day 2 |

**Day 2 DoD**: 챌린지 인증 사이클 동작 (사진→chip→글→공개→업로드→캘린더 표시), picker cancel 처리됨.

---

## Task Breakdown — Day 3 (8h) — MyPage + Settings + Create

### Morning (4h) — MyPage / Settings + Recommend

| ID | 작업 | 파일 | 추정 | 의존 |
|---|---|---|---|---|
| **T3.25** | `MyPage.tsx` — 닉네임 + 진행 중 챌린지 + 설정 row + 내 게시글 피드 (≡/▦ 재사용) | `src/screens/my/MyPage.tsx` | 1.5h | T3.5, T3.17 |
| **T3.26** | `Settings.tsx` — 알림/앱/계정 섹션 (정적 메뉴) | `src/screens/my/Settings.tsx` | 1h | — |
| **T3.27** | `Recommend.tsx` — embla-carousel 가로 스와이프 + 페이지 인디케이터 | `src/screens/create/Recommend.tsx` | 1.5h | T3.3 |

### Afternoon (4h) — Steps wizard + 통합 테스트

| ID | 작업 | 파일 | 추정 | 의존 |
|---|---|---|---|---|
| **T3.28** | `Steps.tsx` — 5단계 wizard (단일 라우트 + 내부 step state) | `src/screens/create/Steps.tsx` | 2h | T3.27, S1 FormField/StepActions |
| **T3.29** | Steps 완료 → `ADD_CHALLENGE` + `/home` navigate + 토스트 | `Steps.tsx` | 30m | T3.28 |
| **T3.30** | 풀 cycle 통합 테스트 (수동) — 추천 시작 → 인증 → 캘린더 → 마이 | — | 1h | All Day 3 |
| **T3.31** | 진행 중 챌린지 2+개 케이스 검증 (chip selector 강제 선택) | — | 15m | T3.30 |
| **T3.32** | S3 review template 채우기 + git tag | 본 파일 § Sprint Review | 15m | T3.31 |

**Day 3 DoD**: 추천에서 챌린지 시작 또는 직접 만들기 5단계 → 홈 카드 등록 → 인증 → 캘린더 + MyPage 게시글 등장 → Settings 메뉴 정상.

---

## 코드 스켈레톤

### `src/store/AppContext.tsx` (T3.1 — S3 확장)

```tsx
type Challenge = {
  id: string;
  title: string;
  durationDays: number;       // 7, 14, 21, ...
  mission: string;
  effect: string;             // optional
  startedAt: string;          // ISO date
};

type Post = {
  id: string;
  challengeId: string;
  challengeTitle: string;
  photoUrl: string;
  text: string;
  isPublic: boolean;
  date: string;               // ISO date
  authorNickname: string;
};

type State = {
  user: { nickname: string | null; email: string | null };
  phq9: { ... } | null;
  preference: ... | null;
  challenges: Challenge[];    // 진행 중
  posts: Post[];              // 내 게시글 (공개+비공개)
  feed: Post[];               // 모두의 챌린지 (seed + 내 공개 posts merged)
  prefs: { feedView: 'list' | 'grid' };
};

type Action =
  | { type: 'SIGNUP'; payload: ... }
  | { type: 'SET_PHQ9'; payload: ... }
  | { type: 'SET_PREFERENCE'; payload: ... }
  | { type: 'ADD_CHALLENGE'; payload: { challenge: Challenge } }
  | { type: 'CERTIFY'; payload: { post: Post } }
  | { type: 'TOGGLE_FEED_VIEW'; }
  | { type: 'HYDRATE'; payload: State };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    // ... S2 actions
    case 'ADD_CHALLENGE':
      return { ...state, challenges: [...state.challenges, action.payload.challenge] };
    case 'CERTIFY': {
      const newPosts = [action.payload.post, ...state.posts];
      const newFeed = action.payload.post.isPublic
        ? [action.payload.post, ...state.feed]
        : state.feed;
      return { ...state, posts: newPosts, feed: newFeed };
    }
    case 'TOGGLE_FEED_VIEW':
      return { ...state,
        prefs: { ...state.prefs, feedView: state.prefs.feedView === 'list' ? 'grid' : 'list' } };
    default: return state;
  }
}

// initialState 시 mocks 로드
import feedSeed from '@/mocks/feed-seed.json';
const initialState: State = {
  user: { nickname: null, email: null },
  phq9: null,
  preference: null,
  challenges: [],
  posts: [],
  feed: feedSeed as Post[],
  prefs: { feedView: 'list' },
};
```

### `src/utils/date.ts` (T3.18)

```ts
import { isSameDay, isAfter, isBefore, startOfDay } from 'date-fns';

export type CellState = 'done' | 'missed' | 'future' | 'other-month' | 'today-empty';

export function cellState(
  date: Date,
  today: Date,
  posts: { date: string }[],   // ISO dates
  currentMonth: number,        // 0-11
): CellState {
  if (date.getMonth() !== currentMonth) return 'other-month';
  const today0 = startOfDay(today);
  const date0 = startOfDay(date);
  const isFuture = isAfter(date0, today0);
  const isPast = isBefore(date0, today0);
  const hasPost = posts.some(p => isSameDay(new Date(p.date), date0));

  if (isFuture) return 'future';
  if (hasPost) return 'done';
  if (isSameDay(date0, today0)) return hasPost ? 'done' : 'today-empty';
  return 'missed';  // 지난 날 + post 없음
}
```

### `tests/date.test.ts` (T3.19)

```ts
import { describe, it, expect } from 'vitest';
import { cellState } from '@/utils/date';

const today = new Date('2026-05-10T12:00:00');
const posts = [{ date: '2026-05-08T10:00:00' }];

describe('cellState', () => {
  it('future', () => {
    expect(cellState(new Date('2026-05-15'), today, posts, 4)).toBe('future');
  });
  it('done (지난 날 + post)', () => {
    expect(cellState(new Date('2026-05-08'), today, posts, 4)).toBe('done');
  });
  it('missed (지난 날 + no post)', () => {
    expect(cellState(new Date('2026-05-05'), today, posts, 4)).toBe('missed');
  });
  it('other month', () => {
    expect(cellState(new Date('2026-04-30'), today, posts, 4)).toBe('other-month');
  });
});
```

### `src/screens/cert/ChallengeCert.tsx` (T3.13-T3.17 — 핵심)

```tsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { Camera, Image } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { RadioOption } from '@/components/ui/RadioOption';

export default function ChallengeCert() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<{ file: File; url: string } | null>(null);
  const [challengeId, setChallengeId] = useState<string | null>(
    state.challenges.length === 1 ? state.challenges[0].id : null
  );
  const [text, setText] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  // P2: blob URL cleanup
  useEffect(() => () => {
    if (photo?.url) URL.revokeObjectURL(photo.url);
  }, [photo]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      // picker cancel → 토스트 (S4에서 실제 토스트)
      console.warn('사진을 선택해주세요');
      return;
    }
    if (photo?.url) URL.revokeObjectURL(photo.url);
    setPhoto({ file, url: URL.createObjectURL(file) });
  };

  const canUpload = !!photo && !!challengeId && state.challenges.length > 0;

  const handleUpload = () => {
    if (!canUpload) return;
    const challenge = state.challenges.find(c => c.id === challengeId)!;
    dispatch({
      type: 'CERTIFY',
      payload: {
        post: {
          id: crypto.randomUUID(),
          challengeId: challenge.id,
          challengeTitle: challenge.title,
          photoUrl: photo!.url,
          text,
          isPublic,
          date: new Date().toISOString(),
          authorNickname: state.user.nickname || '익명',
        },
      },
    });
    navigate('/cert');
  };

  return (
    <div className="px-5 py-4 pb-24 min-h-screen bg-bg-gray">
      <header className="flex items-center mb-4">
        <button onClick={() => navigate(-1)}>←</button>
        <h1 className="ml-2 text-title-20">챌린지 인증</h1>
      </header>

      {/* 사진 */}
      <section className="space-y-2 mb-6">
        <h2 className="text-subtitle-16">사진 찍기</h2>
        <div className="aspect-square bg-white rounded-lg overflow-hidden flex items-center justify-center">
          {photo ? <img src={photo.url} alt="" className="w-full h-full object-cover" />
                 : <Camera size={48} className="text-gray" />}
        </div>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
        <Button variant="secondary" onClick={() => fileRef.current?.click()}>
          <Image size={18} /> 갤러리에서 선택
        </Button>
      </section>

      {/* 진행 중 챌린지 selector — chip 형식 */}
      {state.challenges.length > 0 && (
        <section className="mb-6">
          <h2 className="text-subtitle-16 mb-2">진행 중인 챌린지</h2>
          <div className="flex flex-wrap gap-2">
            {state.challenges.map(c => (
              <Chip
                key={c.id}
                label={c.title}
                selected={challengeId === c.id}
                onClick={() => setChallengeId(c.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 글 */}
      <section className="mb-6">
        <h2 className="text-subtitle-16 mb-2">글 작성</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={1000}
          rows={5}
          className="w-full p-3 rounded-md border border-gray/30 text-body-14"
          placeholder="오늘의 챌린지를 어떻게 완수했나요?"
        />
      </section>

      {/* 공개 설정 */}
      <section className="mb-6">
        <h2 className="text-subtitle-16 mb-2">공개 설정</h2>
        <div className="flex gap-2">
          <RadioOption label="공개" selected={isPublic} onClick={() => setIsPublic(true)} />
          <RadioOption label="비공개" selected={!isPublic} onClick={() => setIsPublic(false)} />
        </div>
      </section>

      <Button onClick={handleUpload} disabled={!canUpload}>업로드</Button>
    </div>
  );
}
```

### `src/screens/diary/Calendar.tsx` (T3.20-T3.23)

```tsx
import { useMemo, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { cellState, CellState } from '@/utils/date';
import { startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from 'date-fns';
import { Button } from '@/components/ui/Button';

const DayCell = memo(({ day, state, onClick }: { day: number; state: CellState; onClick?: () => void }) => {
  const stateClass: Record<CellState, string> = {
    'done':         'bg-primary text-white font-semibold',
    'missed':       'bg-white border border-gray/30 text-ink',
    'future':       'bg-gray/20 text-gray/60',
    'other-month':  'bg-transparent text-gray/50',
    'today-empty':  'bg-white border border-gray/30 text-ink',
  };
  return (
    <button
      onClick={onClick}
      disabled={state === 'future' || state === 'other-month'}
      className={`w-10 h-10 rounded-full flex items-center justify-center text-body-14 ${stateClass[state]}`}
    >
      {day}
    </button>
  );
});

export default function Diary() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [viewMonth, setViewMonth] = useState(new Date());
  const today = new Date();

  const cells = useMemo(() => {
    const start = startOfMonth(viewMonth);
    const end = endOfMonth(viewMonth);
    return eachDayOfInterval({ start, end }).map(d => ({
      day: d.getDate(),
      state: cellState(d, today, state.posts, viewMonth.getMonth()),
      date: d,
    }));
  }, [viewMonth, state.posts]);

  const activeChallenge = state.challenges[0];
  const completedDays = state.posts.filter(p => p.challengeId === activeChallenge?.id).length;

  return (
    <div className="px-5 py-4 pb-24 min-h-screen bg-bg-gray">
      {/* 진행 중 챌린지 카드 */}
      {activeChallenge && (
        <section className="bg-white rounded-lg p-4 mb-6 shadow-md">
          <h3 className="text-title-20">{activeChallenge.title}</h3>
          <p className="text-body-14 mt-2">
            {completedDays}일 / {activeChallenge.durationDays}일
          </p>
          <div className="h-2 bg-gray/20 rounded-full mt-2">
            <div className="h-full bg-primary rounded-full"
                 style={{ width: `${(completedDays / activeChallenge.durationDays) * 100}%` }} />
          </div>
        </section>
      )}

      {/* 캘린더 */}
      <section className="bg-white rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setViewMonth(subMonths(viewMonth, 1))}>‹</button>
          <span className="text-subtitle-16">{viewMonth.getFullYear()}.{viewMonth.getMonth()+1}</span>
          <button onClick={() => setViewMonth(addMonths(viewMonth, 1))}>›</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-body-12 text-center text-gray font-semibold mb-2">
          {['월','화','수','목','금','토','일'].map(d => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 justify-items-center">
          {cells.map(c => (
            <DayCell key={c.date.toISOString()} day={c.day} state={c.state}
                     onClick={() => c.state === 'done' && navigate('/post/by-date/' + c.date.toISOString())} />
          ))}
        </div>
      </section>

      {/* 오늘 챌린지 + 인증하기 */}
      {activeChallenge && (
        <section className="bg-white rounded-lg p-4">
          <h3 className="text-subtitle-16 mb-2">오늘 챌린지</h3>
          <p className="text-body-14 mb-3">{activeChallenge.title}</p>
          <Button onClick={() => navigate('/cert/upload')}>인증하기</Button>
        </section>
      )}
    </div>
  );
}
```

### `src/screens/create/Steps.tsx` (T3.28 — 단일 라우트 + step state)

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PeriodPill } from '@/components/ui/PeriodPill';

const TOTAL = 5;
const PERIODS = [3, 7, 14, 21, 28];  // + 직접입력

interface FormData { title: string; days: number | null; mission: string; effect: string; }

export default function Steps() {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({ title: '', days: null, mission: '', effect: '' });

  const canNext = (): boolean => {
    switch (step) {
      case 1: return data.title.length > 0;
      case 2: return data.days !== null;
      case 3: return data.mission.length > 0;
      case 4: return true;  // effect는 옵션
      default: return false;
    }
  };

  const handleNext = () => {
    if (step === 4) {
      dispatch({
        type: 'ADD_CHALLENGE',
        payload: {
          challenge: {
            id: crypto.randomUUID(),
            title: data.title,
            durationDays: data.days!,
            mission: data.mission,
            effect: data.effect,
            startedAt: new Date().toISOString(),
          },
        },
      });
      setStep(5);
    } else if (step === 5) {
      navigate('/home');
    } else {
      setStep(step + 1);
    }
  };

  const handlePrev = () => step === 1 ? navigate(-1) : setStep(step - 1);

  return (
    <div className="px-5 py-4 min-h-screen bg-bg-gray flex flex-col">
      <header className="flex items-center mb-3">
        <button onClick={handlePrev}>←</button>
        <h1 className="ml-2 text-title-20">챌린지 만들기</h1>
      </header>
      <ProgressBar value={step / TOTAL} />

      <div className="flex-1 mt-6">
        {step === 1 && (
          <>
            <h2 className="text-title-20 mb-6">어떤 챌린지를 해볼까요?</h2>
            <Input value={data.title} onChange={(e) => setData({...data, title: e.target.value})}
                   placeholder="예) 아침 6시 기상" />
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-title-20 mb-2">며칠 동안 진행할까요?</h2>
            <p className="text-body-14 text-gray mb-6">가볍게 7일부터 시작해보는 건 어때요?</p>
            <div className="grid grid-cols-2 gap-2">
              {PERIODS.map(d => (
                <PeriodPill key={d} label={`${d}일`} selected={data.days === d}
                            onClick={() => setData({...data, days: d})} />
              ))}
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="text-title-20 mb-6">하루에 할당할<br/>미션은 무엇인가요?</h2>
            <Input value={data.mission} onChange={(e) => setData({...data, mission: e.target.value})}
                   placeholder="예) 아침 6시 기상" />
          </>
        )}
        {step === 4 && (
          <>
            <h2 className="text-title-20 mb-2">이루고 싶은 것 / 기대 효과</h2>
            <p className="text-body-14 text-gray mb-6">이 챌린지를 통해 무엇을 얻고 싶나요?</p>
            <Input value={data.effect} onChange={(e) => setData({...data, effect: e.target.value})}
                   placeholder="예) 아침 6시 기상" />
          </>
        )}
        {step === 5 && (
          <div className="flex flex-col items-center justify-center pt-16 text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-3xl mb-6">✓</div>
            <p className="text-title-20">'{data.title}'<br/>챌린지가 추가되었습니다!</p>
            <p className="text-body-14 text-gray mt-4">시작이 반이에요.<br/>앞으로 멋지게 해낼 당신을 응원합니다!</p>
          </div>
        )}
      </div>

      {step < 5 ? (
        <div className="flex gap-2">
          <Button variant="secondary" size="pair-prev" onClick={handlePrev}>이전</Button>
          <Button size="pair-next" disabled={!canNext()} onClick={handleNext}>다음</Button>
        </div>
      ) : (
        <Button onClick={() => navigate('/home')}>홈으로 이동</Button>
      )}
    </div>
  );
}
```

### `src/screens/create/Recommend.tsx` (T3.27 — embla)

```tsx
import useEmblaCarousel from 'embla-carousel-react';
import { useNavigate } from 'react-router-dom';
import recommendations from '@/mocks/recommendations.json';

export default function Recommend() {
  const [emblaRef] = useEmblaCarousel({ loop: false });
  const navigate = useNavigate();

  return (
    <div className="px-5 py-4 pb-24 min-h-screen bg-bg-gray">
      <header className="flex items-center mb-4">
        <button onClick={() => navigate(-1)}>←</button>
        <h1 className="ml-2 text-title-20">어떤 챌린지를<br/>해볼까요?</h1>
      </header>

      {/* embla 캐러셀 */}
      <div className="overflow-hidden mb-6" ref={emblaRef}>
        <div className="flex">
          {recommendations.map(r => (
            <div key={r.id} className="flex-[0_0_85%] mr-3 bg-white rounded-lg p-4 shadow-md"
                 onClick={() => { /* dispatch ADD_CHALLENGE 후 home */ }}>
              <p className="text-subtitle-16">{r.shortTitle}</p>
              <h3 className="text-title-20 mt-2">{r.action}</h3>
              <p className="text-body-14 mt-3"><strong>미션:</strong> {r.mission}</p>
              <p className="text-body-14 mt-2 text-gray">{r.target}</p>
              <p className="text-body-14 mt-2"><strong>기대효과:</strong> {r.effect}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full bg-bg-green-tint rounded-lg p-4 text-center"
              onClick={() => navigate('/create/new')}>
        <p className="text-subtitle-16">챌린지 직접 만들기</p>
        <p className="text-body-12 text-gray mt-1">나만의 목표를 세워보세요!</p>
      </button>
    </div>
  );
}
```

### `mocks/recommendations.json` (T3.3)

```json
[
  {
    "id": "rec-1",
    "shortTitle": "하늘 바라보기",
    "action": "하루에 한 번 하늘 보기",
    "mission": "고개 들어서 하늘 한 번 보기",
    "target": "스마트폰 보다 거북목 되기 직전인 당신에게",
    "effect": "거북목 스트레칭과 한숨 돌리기",
    "durationDays": 7
  },
  { "id": "rec-2", "shortTitle": "...", "action": "산책 10분 하기", ... }
]
```

---

## 위험 (Sprint-specific)

| # | 위험 | 발생 신호 | 대응 |
|---|---|---|---|
| **R1** | 사진 picker cancel 미처리 | 사용자가 picker 취소했는데 업로드 가능 (이전 사진 유지) | T3.15 cancel 시 explicit return + 토스트. picker 다시 열때 이전 photo state 유지 vs 초기화 결정 (default: 유지) |
| **R2** | blob URL memory leak | 모바일 시연 중 OOM | T3.14 useEffect cleanup 필수. PostDetail에도 동일 cleanup 적용 |
| **R3** | timezone 버그 — "오늘"이 자정 기준 어긋남 | 새벽에 인증 시 캘린더 어제 셀에 표시 | `date-fns-tz`로 KST 명시 (`zonedTimeToUtc`) |
| **R4** | reducer state shape mismatch — Lane B/C 동시 작업 시 | runtime error in dispatch | T3.1 reducer schema를 sprint 시작 30분 합의로 lock. 이후 변경 금지 |
| **R5** | embla-carousel CSS 충돌 | 캐러셀 카드 폭 / 스냅 동작 이상 | embla 기본 CSS 적용 후 Tailwind class 추가 |
| **R6** | 챌린지 0개 상태에서 Diary 진입 | 빈 화면 또는 crash | T3.20 빈 상태 명시 — "챌린지를 시작해보세요" + CTA |

---

## Sprint Review (S3 끝나고 채우기)

### Definition of Done 체크
- [ ] 4탭 BottomNav 전환 동작
- [ ] 챌린지 추가 → 홈 "오늘의 챌린지" 카드 즉시 반영
- [ ] 챌린지 인증 → 다이어리 캘린더 오늘 셀 초록 + 마이페이지 게시글 추가
- [ ] 사진 미선택 / picker cancel → 업로드 비활성 + 토스트
- [ ] 진행 중 챌린지 0/1/2+개 시 chip selector 동작 다름 (1개=auto, 2+=강제 선택)
- [ ] Diary 캘린더 4상태 셀 (done/missed/future/other-month) 시각 차이 명확
- [ ] 모두의 챌린지 ≡/▦ 토글 동작 + localStorage 저장
- [ ] Recommend 캐러셀 가로 스와이프 + 카드 탭 시 챌린지 시작
- [ ] 직접 만들기 5단계 → 완료 화면 → 홈으로 이동 + 카드 추가
- [ ] Settings 메뉴 정상 표시 (알림/앱/계정)
- [ ] MyPage 내 게시글 = 본인 게시글만 (피드의 다른 사용자 글 X)
- [ ] `npm test` → 12 케이스 (4 score + 4 level + 4 cellState) 통과

### Demo 시연 시나리오 (2-3분)
1. (S2의 Result 화면 이어서) "챌린지 시작" 클릭
2. Recommend에서 "하루에 한 번 하늘 보기" 추천 카드 시작
3. Home 진입 → 오늘의 챌린지 카드 등장
4. 인증 탭 → 챌린지 인증 → 사진 선택 → chip 자동 선택 → 글 입력 → 공개 → 업로드
5. Home 복귀 토스트 → Diary 탭 → 캘린더 오늘 초록 + 진행률 1/7
6. MyPage 탭 → 닉네임 + 진행 챌린지 + 내 게시글 1개
7. Settings 탭 → 알림/앱/계정 메뉴 확인

### 추가 검증 (수동)
- [ ] 챌린지 2개 만들고 인증 시 chip selector 강제 선택 동작
- [ ] 새로고침 → state 복원 (challenges, posts, feed 유지)
- [ ] 비공개 인증 → MyPage엔 보이고 모두의 챌린지엔 안 보임
- [ ] PostDetail에서 본인 게시물 vs 시드(타인) 게시물 구분 표시 (선택)

### 발견된 미해결 / Carry-over to S4
- [ ] (예: 빈 상태 일러스트 미작성, 토스트 시스템 임시 console.warn → S4에서 sonner 통합)

### git tag
```bash
git tag s3-main-app
git push --tags
```
