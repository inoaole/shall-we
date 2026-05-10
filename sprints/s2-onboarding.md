# Sprint 2 — Onboarding Flow

> **목표**: Splash → 가입 → PHQ-9·선호조사 → 결과 분석 → 결과까지 풀 클릭 완주.
> **기간**: 2 작업일 (16h)
> **상위 플랜**: `../plan.md` P3, `../sprints.md` S2

---

## Pre-flight Checklist

- [ ] S1 완료 (S1 review의 모든 DoD 체크 ✓)
- [ ] `git tag s1-foundation` 존재
- [ ] `wireframe.md` §4-8 (회원가입 + PHQ-9 + 챌린지 선호조사 + 로딩 + 결과) 다시 한 번 읽기
- [ ] `design.md` §5.4 Selector / §5.5 Progress / §5.9 Loading 컴포넌트 사양 확인
- [ ] PHQ-9 9개 문항 verbatim — `wireframe.md` §5 "문항 (9개)" 섹션
- [ ] §8 product 결정 4번 (PHQ-9 9번 자해 응답 시 1393 안내) — S2 끝 또는 S4에서 합의

---

## Task Breakdown — Day 1 (8h)

### Morning (4h) — Context 확장 + 단순 화면

| ID | 작업 | 파일 | 추정 | 의존 |
|---|---|---|---|---|
| **T2.1** | AppContext 확장: `SIGNUP`, `SET_PHQ9`, `SET_PREFERENCE` actions + reducer | `src/store/AppContext.tsx` | 1h | S1 T1.6 |
| **T2.2** | `utils/storage.ts` — sessionStorage save/restore + quota try/catch + 토스트 hook | `src/utils/storage.ts` | 45m | T2.1 |
| **T2.3** | `Splash.tsx` (2초 대기 → 라우팅 분기) | `src/screens/onboarding/Splash.tsx` | 45m | T2.1 |
| **T2.4** | `Intro1.tsx`, `Intro2.tsx` (정적 + 다음 버튼) | `src/screens/onboarding/{Intro1,Intro2}.tsx` | 30m | S1 |
| **T2.5** | sessionStorage 통합 — AppContext가 dispatch마다 직렬화 저장 | `src/store/AppContext.tsx` 보강 | 30m | T2.2 |
| **T2.6** | Day 1 morning 검증 — Splash → Intro1 → Intro2 클릭 진행 | — | 30m | T2.3, T2.4 |

### Afternoon (4h) — Signup + Quiz 데이터 + 첫 step

| ID | 작업 | 파일 | 추정 | 의존 |
|---|---|---|---|---|
| **T2.7** | `data/phq9-questions.ts` — 9문항 + 옵션 + 점수 schema | `src/data/phq9-questions.ts` | 30m | — |
| **T2.8** | `data/preference-axes.ts` — 5축 + 양극 라벨 schema | `src/data/preference-axes.ts` | 15m | — |
| **T2.9** | `Signup.tsx` — RHF + Zod (3 필드 검증) + SIGNUP dispatch | `src/screens/onboarding/Signup.tsx` | 1.5h | T2.1, T2.7 후 |
| **T2.10** | Quiz 데이터 schema 합의 + 첫 step 프로토타입 | `src/screens/onboarding/Quiz.tsx` (초기) | 1h | T2.7, T2.8 |
| **T2.11** | Day 1 검증 — Splash → Signup 통과 + 첫 PHQ-9 문항 표시 | — | 45m | T2.9, T2.10 |

**Day 1 DoD**: 가입까지 완료, PHQ-9 첫 문항 화면 동작, 새로고침 시 가입 데이터 sessionStorage 복원.

---

## Task Breakdown — Day 2 (8h)

### Morning (4h) — Quiz 14 step 완성

| ID | 작업 | 파일 | 추정 | 의존 |
|---|---|---|---|---|
| **T2.12** | Quiz 9 step (PHQ-9) 완성 — 진행률 바 + 이전/다음 + 답변 저장 | `src/screens/onboarding/Quiz.tsx` | 1.5h | T2.10 |
| **T2.13** | Quiz 5 step (선호조사) 추가 — PoleChoice 컴포넌트 사용 | `Quiz.tsx` 확장 | 1h | T2.12 |
| **T2.14** | Quiz 완료 시 `SET_PHQ9` + `SET_PREFERENCE` dispatch + `/check/analyzing`로 navigate | `Quiz.tsx` | 30m | T2.13 |
| **T2.15** | Quiz 14 step 다 응답 후 Analyzing 진입 시각 검증 | — | 1h | T2.14 |

### Afternoon (4h) — Analyzing + Result + 테스트

| ID | 작업 | 파일 | 추정 | 의존 |
|---|---|---|---|---|
| **T2.16** | `Analyzing.tsx` — 1.5s setTimeout + `navigate('/check/result', { replace: true })` | `src/screens/onboarding/Analyzing.tsx` | 45m | T2.14 |
| **T2.17** | `utils/phq9.ts` — `score(answers): number` + `level(score): '없음'\|'낮음'\|'중간'\|'높음'` | `src/utils/phq9.ts` | 30m | — |
| **T2.18** | `Result.tsx` — 단계명 텍스트 + 단계별 메시지 + 2 stacked CTA | `src/screens/onboarding/Result.tsx` | 1.5h | T2.17 |
| **T2.19** | `tests/phq9.test.ts` — 4 케이스 경계값 (0, 4, 5, 9, 10, 14, 15, 27) | `tests/phq9.test.ts` | 30m | T2.17 |
| **T2.20** | 풀 플로우 통합 테스트 (수동) — 4단계 다 시도 | — | 30m | T2.18, T2.19 |
| **T2.21** | S2 review template 채우기 + git tag | 본 파일 § Sprint Review | 15m | T2.20 |

**Day 2 DoD**: Splash → Result 풀 클릭 완주, 4단계 분기 모두 시각 확인, vitest 4 케이스 통과.

---

## 코드 스켈레톤

### `src/store/AppContext.tsx` (T2.1 — 확장)

```tsx
type State = {
  user: { nickname: string | null; email: string | null };
  phq9: { answers: number[]; score: number; level: '없음'|'낮음'|'중간'|'높음' } | null;
  preference: Record<string, string> | null;
  // S3에서 challenges 등 추가
};

type Action =
  | { type: 'SIGNUP'; payload: { nickname: string; email: string } }
  | { type: 'SET_PHQ9'; payload: { answers: number[]; score: number; level: State['phq9']['level'] } }
  | { type: 'SET_PREFERENCE'; payload: Record<string, string> }
  | { type: 'HYDRATE'; payload: State };  // sessionStorage 복원용

const STORAGE_KEY = 'shallwe.app.v1';

const initialState: State = {
  user: { nickname: null, email: null },
  phq9: null,
  preference: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SIGNUP':         return { ...state, user: action.payload };
    case 'SET_PHQ9':       return { ...state, phq9: action.payload };
    case 'SET_PREFERENCE': return { ...state, preference: action.payload };
    case 'HYDRATE':        return action.payload;
    default:               return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    const stored = readStorage(STORAGE_KEY);
    return stored ?? init;
  });

  useEffect(() => {
    writeStorage(STORAGE_KEY, state);  // utils/storage.ts에서
  }, [state]);

  return <AppCtx.Provider value={{ state, dispatch }}>{children}</AppCtx.Provider>;
}
```

### `src/utils/storage.ts` (T2.2)

```ts
export function readStorage<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : null;
  } catch {
    return null;
  }
}

export function writeStorage<T>(key: string, value: T): boolean {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      // S4에서 토스트 시스템 통합 시 실제 토스트 호출
      console.warn('sessionStorage quota exceeded');
    }
    return false;
  }
}
```

### `src/data/phq9-questions.ts` (T2.7)

```ts
export interface QuizStep {
  id: string;
  type: 'phq9' | 'preference';
  category?: string;     // preference만: 활동/관계/방식/취미/시간
  question: string;
  options: { label: string; value: number | string }[];
}

export const phq9Questions: QuizStep[] = [
  {
    id: 'phq9-1',
    type: 'phq9',
    question: '기분이 가라앉거나, 우울하거나, 희망이 없다고 느꼈다.',
    options: [
      { label: '전혀 그렇지 않다',   value: 0 },
      { label: '며칠 그랬다',        value: 1 },
      { label: '자주 그랬다',        value: 2 },
      { label: '거의 매일 그랬다',   value: 3 },
    ],
  },
  // ... 9까지. 옵션은 모두 동일하므로 const SCORE_OPTIONS 추출 가능
];
```

### `src/data/preference-axes.ts` (T2.8)

```ts
import { QuizStep } from './phq9-questions';

export const preferenceAxes: QuizStep[] = [
  { id: 'pref-활동', type: 'preference', category: '활동',
    question: '활동',
    options: [{ label: '정적인', value: '정적인' }, { label: '역동적인', value: '역동적인' }] },
  { id: 'pref-관계', type: 'preference', category: '관계',
    question: '관계',
    options: [{ label: '혼자', value: '혼자' }, { label: '함께', value: '함께' }] },
  { id: 'pref-방식', type: 'preference', category: '방식',
    question: '방식',
    options: [{ label: '성취중심', value: '성취중심' }, { label: '루틴중심', value: '루틴중심' }] },
  { id: 'pref-취미', type: 'preference', category: '취미',
    question: '취미',
    options: [{ label: '창작', value: '창작' }, { label: '자기계발', value: '자기계발' }] },
  { id: 'pref-시간', type: 'preference', category: '시간',
    question: '시간',
    options: [{ label: '짧게', value: '짧게' }, { label: '길게', value: '길게' }] },
];
```

### `src/screens/onboarding/Quiz.tsx` (T2.10-T2.14 — 핵심)

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { phq9Questions } from '@/data/phq9-questions';
import { preferenceAxes } from '@/data/preference-axes';
import { useApp } from '@/store/AppContext';
import { score, level } from '@/utils/phq9';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { RadioOption } from '@/components/ui/RadioOption';
import { PoleChoice } from '@/components/ui/PoleChoice';
import { Button } from '@/components/ui/Button';

const STEPS = [...phq9Questions, ...preferenceAxes];  // 14개

export default function Quiz() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const navigate = useNavigate();
  const { dispatch } = useApp();

  const step = STEPS[stepIdx];
  const value = answers[step.id];
  const canNext = value !== undefined;
  const isLast = stepIdx === STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      // 14 step 다 완료
      const phq9Answers = phq9Questions.map(q => Number(answers[q.id]));
      const s = score(phq9Answers);
      const l = level(s);
      dispatch({ type: 'SET_PHQ9', payload: { answers: phq9Answers, score: s, level: l } });

      const pref: Record<string, string> = {};
      preferenceAxes.forEach(a => { pref[a.category!] = String(answers[a.id]); });
      dispatch({ type: 'SET_PREFERENCE', payload: pref });

      navigate('/check/analyzing', { replace: true });
    } else {
      setStepIdx(stepIdx + 1);
    }
  };

  const handlePrev = () => {
    if (stepIdx === 0) navigate(-1);
    else setStepIdx(stepIdx - 1);
  };

  return (
    <div className="px-5 py-4 min-h-screen bg-bg-gray flex flex-col">
      <header className="flex items-center justify-between mb-3">
        <button onClick={handlePrev}>←</button>
        <span className="text-body-12 text-gray">
          질문 {stepIdx + 1}/{STEPS.length}
        </span>
        <span />
      </header>
      <ProgressBar value={(stepIdx + 1) / STEPS.length} />

      <h1 className="text-title-20 mt-6 mb-8 whitespace-pre-line">
        {step.question}
      </h1>

      <div className="flex-1 space-y-2">
        {step.type === 'phq9' ? (
          step.options.map(opt => (
            <RadioOption
              key={opt.label}
              label={opt.label}
              selected={value === opt.value}
              onClick={() => setAnswers({ ...answers, [step.id]: opt.value })}
            />
          ))
        ) : (
          <PoleChoice
            left={step.options[0]}
            right={step.options[1]}
            value={value as string | undefined}
            onChange={(v) => setAnswers({ ...answers, [step.id]: v })}
          />
        )}
      </div>

      <footer className="flex gap-2 mt-6">
        <Button variant="secondary" size="pair-prev" onClick={handlePrev}>이전</Button>
        <Button variant="primary" size="pair-next" disabled={!canNext} onClick={handleNext}>
          다음
        </Button>
      </footer>
    </div>
  );
}
```

### `src/utils/phq9.ts` (T2.17)

```ts
export type Level = '없음' | '낮음' | '중간' | '높음';

export function score(answers: number[]): number {
  return answers.reduce((sum, v) => sum + v, 0);
}

export function level(score: number): Level {
  if (score <= 4)  return '없음';
  if (score <= 9)  return '낮음';
  if (score <= 14) return '중간';
  return '높음';
}
```

### `tests/phq9.test.ts` (T2.19)

```ts
import { describe, it, expect } from 'vitest';
import { score, level } from '@/utils/phq9';

describe('score', () => {
  it('합산', () => {
    expect(score([0,1,2,3,0,1,2,3,1])).toBe(13);
    expect(score([0,0,0,0,0,0,0,0,0])).toBe(0);
    expect(score([3,3,3,3,3,3,3,3,3])).toBe(27);
  });
});

describe('level', () => {
  it('없음 (0~4)',  () => { expect(level(0)).toBe('없음');  expect(level(4)).toBe('없음'); });
  it('낮음 (5~9)',  () => { expect(level(5)).toBe('낮음');  expect(level(9)).toBe('낮음'); });
  it('중간 (10~14)', () => { expect(level(10)).toBe('중간'); expect(level(14)).toBe('중간'); });
  it('높음 (15+)',  () => { expect(level(15)).toBe('높음'); expect(level(27)).toBe('높음'); });
});
```

### `src/screens/onboarding/Analyzing.tsx` (T2.16)

```tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { Loading } from '@/components/ui/Loading';

export default function Analyzing() {
  const navigate = useNavigate();
  const { state } = useApp();
  const nickname = state.user.nickname || 'oo';

  useEffect(() => {
    const t = setTimeout(() => {
      navigate('/check/result', { replace: true });  // back loop 차단
    }, 1500);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <img src="/logo/symbol.png" alt="" className="w-16 h-16" />
      <p className="text-title-20 text-center">{nickname}님의 마음을<br/>읽고 있어요!</p>
      <Loading />
    </div>
  );
}
```

### `src/screens/onboarding/Result.tsx` (T2.18)

```tsx
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/Button';

const messages: Record<string, string> = {
  '없음': '좋아요! 가벼운 마음으로 도전해봐요.',
  '낮음': 'ShallWe와 함께 조금씩 극복해나가요!',
  '중간': 'ShallWe와 함께 조금씩 극복해나가요!',
  '높음': '쉬운 챌린지부터 천천히 시작해요.',
};

export default function Result() {
  const { state } = useApp();
  const navigate = useNavigate();
  const lvl = state.phq9?.level ?? '낮음';
  const score9 = state.phq9?.answers[8] ?? 0;  // 9번 문항

  return (
    <div className="px-5 py-10 min-h-screen flex flex-col">
      <h2 className="text-title-20 text-center mb-2">결과 분석 완료!</h2>
      <hr className="my-4 border-gray/30" />
      <p className="text-title-24 text-center my-8">
        당신의 무기력 정도는<br/>
        <span className="text-primary">{lvl}</span> 입니다.
      </p>
      <hr className="my-4 border-gray/30" />
      <p className="text-body-14 text-center text-ink">{messages[lvl]}</p>

      {score9 >= 1 && (
        <div className="mt-6 p-4 bg-bg-green-tint rounded-lg text-body-12">
          힘들 때는 혼자 견디지 마세요. <strong>1393</strong> 자살예방상담전화로 연락할 수 있어요.
        </div>
      )}

      <div className="flex-1" />

      <div className="space-y-3">
        <Button variant="secondary" onClick={() => navigate('/home')}>
          다른 사람들의 챌린지를 구경하고 올래요
        </Button>
        <Button variant="primary" onClick={() => navigate('/create')}>
          챌린지 시작
        </Button>
      </div>
    </div>
  );
}
```

---

## 위험 (Sprint-specific)

| # | 위험 | 발생 신호 | 대응 |
|---|---|---|---|
| **R1** | Quiz 14 step 단일 컴포넌트 schema가 도중에 바뀜 | T2.13에서 PoleChoice 추가 시 step 타입 분기 어색 | T2.7에서 schema(`QuizStep` interface)를 PHQ-9 + 선호조사 둘 다 수용하도록 사전 합의. T2.10 첫 step에서 두 type 모두 렌더 prototype 검증. |
| **R2** | Result back → Analyzing 무한 루프 | back 누르면 다시 분석 화면 → 다시 Result | T2.16 `navigate('...', { replace: true })` 필수. Quiz → Analyzing 진입 시도 동일하게 replace. T2.20 수동 검증 단계에 포함. |
| **R3** | sessionStorage가 dispatch마다 직렬화 — 큰 state면 perf 문제 | Quiz 마지막 단계에서 dispatch 시 lag | S2 단계에선 state가 작아서 안전. S3에서 챌린지 + posts 추가되면 debounce 검토. |
| **R4** | RHF + Zod 한글 에러 메시지 미적용 | Signup 검증 실패 시 영어 메시지 | Zod schema에 `.min(2, '닉네임은 2자 이상')` 등 한글 명시. |
| **R5** | PHQ-9 9번 응답 시 1393 안내 — §8-4 product 결정 미합의 | Result 화면 구현 시 어떻게 표시할지 모호 | 본 sprint는 default "score9 >= 1이면 노출"로 구현. S4 polish 때 정확한 디자인·문구 확정. |

---

## Sprint Review (S2 끝나고 채우기)

### Definition of Done 체크
- [ ] `/`에서 시작 → Splash 2초 → Intro1 → Intro2 → Signup → Quiz 14 step → Analyzing 1.5s → Result 도달
- [ ] Signup 폼 검증 동작 (닉네임 1자 입력 → 에러 메시지)
- [ ] Quiz 미응답 시 다음 버튼 비활성
- [ ] Quiz 이전 버튼으로 직전 step 돌아가서 답 변경 가능
- [ ] PHQ-9 점수 4단계 모두 시각 확인 (다 0점 / 다 1점 / 평균 2점 / 다 3점)
- [ ] 9번 응답 1점 이상 시 Result에 1393 카드 노출
- [ ] Result에서 back 클릭 시 Analyzing으로 안 돌아감
- [ ] 새로고침 시 Signup 단계까지 이름 입력값 sessionStorage 유지
- [ ] `npm test` → 8 케이스 (4 score + 4 level) 통과

### Demo 시연 시나리오 (1분 30초)
1. `npm run dev` → Splash 자동 진입
2. Intro1 → Intro2 → 가입하기
3. Signup: "테스트", "test@a.com", "Test1234!" 입력 → 가입하기
4. Quiz: 9 PHQ-9 문항 모두 "거의 매일 그랬다"(3점) → 5 선호조사
5. Analyzing 1.5초 대기 → Result "높음" + 1393 카드 노출
6. back 시도 → Quiz로 안 돌아감 (replace 동작 확인)

### 발견된 미해결 / Carry-over to S3
- [ ] (필요 시 채움 — 예: AppContext가 S3에서 challenges 추가될 때 schema 호환 확인)

### git tag
```bash
git tag s2-onboarding
git push --tags
```
