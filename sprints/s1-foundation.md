# Sprint 1 — Foundation

> **목표**: 디자인 시스템을 코드로 옮기고, 모든 화면이 빈 라우트로 등록된 "뼈대" 완성.
> **기간**: 2 작업일 (16h)
> **상위 플랜**: `../plan.md` P1+P2, `../sprints.md` S1

---

## Pre-flight Checklist

S1 시작 전에 확인:

- [ ] Node.js 20+ 설치 (`node -v`)
- [ ] npm 10+ (`npm -v`)
- [ ] 작업 디렉토리: `shall_we/` (현재 디자인 시스템 docs + 로고만 존재)
- [ ] 디자인 시스템 ground truth: `design.md` §8 토큰 표 — 색·폰트·radius·shadow 값 외워둘 것
- [ ] 와이어프레임 ground truth: `wireframe.md` §글로벌 컴포넌트 — Header / BottomNav / Screen 구조

---

## 의존성 설치 명령

```bash
cd "/Users/a1234/Documents/Yonsei/UXIM /ready_action/shall_we"
npm create vite@latest . -- --template react-ts
# 'shall_we' 폴더가 비어있지 않다는 경고 → "Ignore files and continue" 선택
npm i
npm i react-router-dom react-hook-form zod @hookform/resolvers \
      date-fns date-fns-tz \
      lucide-react framer-motion embla-carousel-react
npm i -D tailwindcss postcss autoprefixer \
         vitest @testing-library/react @testing-library/jest-dom jsdom @vitest/ui
npx tailwindcss init -p
```

---

## Task Breakdown — Day 1 (8h)

### Morning (4h) — 셋업 + 토큰 + 라우터 뼈대

| ID | 작업 | 파일 | 추정 | 의존 |
|---|---|---|---|---|
| **T1.1** | Vite 셋업 + 의존성 설치 | (위 명령) | 30m | — |
| **T1.2** | `tokens.ts` 작성 (color/typography/radius/font) | `src/tokens.ts` | 30m | T1.1 |
| **T1.3** | `tailwind.config.js` (require tokens) + `globals.css` | `tailwind.config.js`, `src/styles/globals.css` | 45m | T1.2 |
| **T1.4** | 폴더 구조 mkdir + placeholder export | `src/screens/**/*.tsx` 등 | 30m | T1.1 |
| **T1.5** | vitest config + dummy test | `vitest.config.ts`, `tests/example.test.ts` | 30m | T1.1 |
| **T1.6** | AppContext (빈 reducer + Provider) | `src/store/AppContext.tsx` | 45m | T1.4 |
| **T1.7** | 첫 통합 검증 — `npm run dev` + `npm test` 동시 통과 | — | 30m | T1.1~T1.6 |

### Afternoon (4h) — 라우터 + Layout

| ID | 작업 | 파일 | 추정 | 의존 |
|---|---|---|---|---|
| **T1.8** | React Router config + `React.lazy()` 모든 화면 | `src/routes.tsx`, `src/App.tsx` | 1h | T1.4, T1.6 |
| **T1.9** | `Header.tsx` (워드마크 + + 버튼, 로고 import) | `src/components/layout/Header.tsx` | 45m | T1.3 |
| **T1.10** | `BottomNav.tsx` (4탭 + 활성 표시) | `src/components/layout/BottomNav.tsx` | 1h | T1.3, T1.8 |
| **T1.11** | `Screen.tsx` wrapper (440pt centered + safe area) | `src/components/layout/Screen.tsx` | 30m | T1.3 |
| **T1.12** | Day 1 review — 라우트 진입 + 탭 전환 시각 확인 | — | 45m | All Day 1 |

**Day 1 DoD**: `npm run dev` 시 모든 라우트가 빈 화면이지만 진입 가능, BottomNav 4탭 클릭 시 라우트 전환, vitest 통과.

---

## Task Breakdown — Day 2 (8h)

### Morning (4h) — UI Primitives 1/2

| ID | 작업 | 파일 | 추정 | 의존 |
|---|---|---|---|---|
| **T1.13** | `Button.tsx` 4 variant (primary/secondary/social/pair) | `src/components/ui/Button.tsx` | 1h | T1.3 |
| **T1.14** | `Input.tsx` + `Textarea.tsx` + `FormField.tsx` 헬퍼 | `src/components/ui/{Input,Textarea,FormField}.tsx` | 1h | T1.13 |
| **T1.15** | `Card.tsx` 4 variant (today/feed/recommend/add) | `src/components/ui/Card.tsx` | 1h | T1.3 |
| **T1.16** | `RadioOption.tsx` (PHQ-9 답변용) | `src/components/ui/RadioOption.tsx` | 30m | T1.3 |
| **T1.17** | `PeriodPill.tsx` + `PoleChoice.tsx` + `Chip.tsx` | `src/components/ui/{PeriodPill,PoleChoice,Chip}.tsx` | 30m | T1.16 |

### Afternoon (4h) — UI Primitives 2/2 + 검증

| ID | 작업 | 파일 | 추정 | 의존 |
|---|---|---|---|---|
| **T1.18** | `ProgressBar.tsx` + `StepPagination.tsx` | `src/components/ui/{ProgressBar,StepPagination}.tsx` | 30m | T1.3 |
| **T1.19** | `Calendar.tsx` (3상태 셀, 월 그리드) | `src/components/ui/Calendar.tsx` | 1h | T1.3 |
| **T1.20** | `Loading.tsx` (점 3개 인디케이터) | `src/components/ui/Loading.tsx` | 15m | T1.3 |
| **T1.21** | `StepActions.tsx` (이전/다음 버튼 쌍) | `src/components/ui/StepActions.tsx` | 15m | T1.13 |
| **T1.22** | `screens/dev/Components.tsx` — 모든 primitive variant 렌더 | `src/screens/dev/Components.tsx` | 1h | T1.13~T1.21 |
| **T1.23** | 시각 검증 — `design.md` 토큰과 색·폰트·radius 1:1 비교 | — | 45m | T1.22 |
| **T1.24** | S1 review template 작성 (DoD 체크 + demo 녹화) | 본 파일 § Sprint Review 채우기 | 15m | T1.23 |

**Day 2 DoD**: `/dev/components`에 12 컴포넌트 모두 렌더, design.md 토큰 시각 일치, vitest 1 케이스 통과.

---

## 코드 스켈레톤 (트릭 부분만)

### `src/tokens.ts` (T1.2)

```ts
export const colors = {
  transparent: 'transparent',
  white: '#FFFFFF',
  primary: '#24D455',          // shallwe green
  ink: '#232323',              // shallwe white (다크 그레이)
  black: '#000000',
  gray: '#8A8C8F',             // Y Gray
  yellow: '#FFE183',           // shallwe yellow
  gold: '#B38C45',             // Y Gold
  'bg-gray': '#F8F9F7',
  'bg-green-tint': '#EDF9E1',
} as const;

export const typography = {
  'title-24':    ['24px', { lineHeight: '1.4', fontWeight: '700' }],
  'title-20':    ['20px', { lineHeight: '1.4', letterSpacing: '-0.005em', fontWeight: '700' }],
  'subtitle-16': ['16px', { lineHeight: '1',   fontWeight: '600' }],
  'body-14':     ['14px', { lineHeight: '1.4', fontWeight: '400' }],
  'body-12':     ['12px', { lineHeight: '1',   fontWeight: '400' }],
} as const;

export const radius = {
  none: '0', sm: '8px', md: '12px', lg: '16px', xl: '24px', full: '9999px',
} as const;

export const fontFamily = {
  base: ['Roboto', 'Apple SD Gothic Neo', 'Pretendard', 'sans-serif'],
} as const;

export const shadow = {
  sm: '0 1px 2px rgba(0,0,0,0.04)',
  md: '0 2px 8px rgba(0,0,0,0.06)',
  lg: '0 4px 16px rgba(0,0,0,0.08)',
} as const;
```

### `tailwind.config.js` (T1.3)

```js
const { colors, typography, radius, fontFamily, shadow } = require('./src/tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors,
    fontFamily,
    fontSize: typography,
    borderRadius: radius,
    boxShadow: shadow,
    extend: {
      maxWidth: { screen: '440px' },
    },
  },
  plugins: [],
};
```

### `src/store/AppContext.tsx` (T1.6 — 빈 껍데기)

```tsx
import { createContext, useContext, useReducer, ReactNode } from 'react';

type State = {
  user: { nickname: string | null; email: string | null };
  // S2부터 phq9, preference 추가
  // S3부터 challenges, posts, feed, prefs 추가
};

type Action = { type: 'NOOP' };  // S2부터 SIGNUP 등 추가

const initialState: State = {
  user: { nickname: null, email: null },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    default: return state;
  }
}

const AppCtx = createContext<{ state: State; dispatch: React.Dispatch<Action> } | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppCtx.Provider value={{ state, dispatch }}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
```

### `src/routes.tsx` (T1.8)

```tsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Loading } from './components/ui/Loading';

const Splash      = lazy(() => import('./screens/onboarding/Splash'));
const Intro1      = lazy(() => import('./screens/onboarding/Intro1'));
const Intro2      = lazy(() => import('./screens/onboarding/Intro2'));
const Signup      = lazy(() => import('./screens/onboarding/Signup'));
const Quiz        = lazy(() => import('./screens/onboarding/Quiz'));
const Analyzing   = lazy(() => import('./screens/onboarding/Analyzing'));
const Result      = lazy(() => import('./screens/onboarding/Result'));
const Home        = lazy(() => import('./screens/home/Home'));
const PostDetail  = lazy(() => import('./screens/home/PostDetail'));
const CertTab     = lazy(() => import('./screens/cert/CertTab'));
const ChallengeCert = lazy(() => import('./screens/cert/ChallengeCert'));
const Recommend   = lazy(() => import('./screens/create/Recommend'));
const Steps       = lazy(() => import('./screens/create/Steps'));
const Diary       = lazy(() => import('./screens/diary/Calendar'));
const MyPage      = lazy(() => import('./screens/my/MyPage'));
const Settings    = lazy(() => import('./screens/my/Settings'));
const DevComponents = lazy(() => import('./screens/dev/Components'));

const wrap = (El: React.LazyExoticComponent<React.FC>) =>
  <Suspense fallback={<Loading />}><El /></Suspense>;

export const router = createBrowserRouter([
  { path: '/',                 element: wrap(Splash) },
  { path: '/onboarding/intro/1', element: wrap(Intro1) },
  { path: '/onboarding/intro/2', element: wrap(Intro2) },
  { path: '/signup',           element: wrap(Signup) },
  { path: '/check/quiz',       element: wrap(Quiz) },
  { path: '/check/analyzing',  element: wrap(Analyzing) },
  { path: '/check/result',     element: wrap(Result) },
  { path: '/home',             element: wrap(Home) },
  { path: '/post/:id',         element: wrap(PostDetail) },
  { path: '/cert',             element: wrap(CertTab) },
  { path: '/cert/upload',      element: wrap(ChallengeCert) },
  { path: '/create',           element: wrap(Recommend) },
  { path: '/create/new',       element: wrap(Steps) },
  { path: '/diary',            element: wrap(Diary) },
  { path: '/my',               element: wrap(MyPage) },
  { path: '/settings',         element: wrap(Settings) },
  { path: '/dev/components',   element: wrap(DevComponents) },
  { path: '*',                 element: <Navigate to="/" replace /> },
]);
```

### `src/components/ui/Button.tsx` (T1.13 — 4 variant 패턴)

```tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'social';
type Size = 'full' | 'pair-prev' | 'pair-next';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClass: Record<Variant, string> = {
  primary:   'bg-primary text-white',
  secondary: 'bg-transparent text-primary border border-primary',
  social:    'bg-white text-ink border border-gray/30',
};

const sizeClass: Record<Size, string> = {
  full:      'w-full h-13 rounded-md text-subtitle-16 font-semibold',  // h-13 = 52pt
  'pair-prev': 'flex-[1] h-13 rounded-md text-subtitle-16 font-semibold',
  'pair-next': 'flex-[2] h-13 rounded-md text-subtitle-16 font-semibold',
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'primary', size = 'full', className = '', ...rest }, ref) => (
    <button
      ref={ref}
      className={`${variantClass[variant]} ${sizeClass[size]} disabled:bg-gray/40 disabled:text-white transition-colors ${className}`}
      {...rest}
    />
  )
);
```

### `src/components/layout/BottomNav.tsx` (T1.10)

```tsx
import { NavLink } from 'react-router-dom';
import { BookOpen, Home, CheckCircle, User } from 'lucide-react';

const tabs = [
  { to: '/diary', icon: BookOpen,    label: '다이어리' },
  { to: '/home',  icon: Home,         label: '홈' },
  { to: '/cert',  icon: CheckCircle,  label: '인증' },
  { to: '/my',    icon: User,         label: '마이' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 max-w-screen mx-auto h-16 bg-white border-t border-gray/20 flex">
      {tabs.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-0.5 ${
              isActive ? 'text-primary' : 'text-gray'
            }`
          }
        >
          <Icon size={24} strokeWidth={1.5} />
          <span className="text-body-12 font-semibold">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
```

### `src/screens/dev/Components.tsx` (T1.22)

```tsx
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
// ... 모든 ui import

export default function DevComponents() {
  return (
    <div className="p-5 space-y-8 bg-bg-gray min-h-screen">
      <section>
        <h2 className="text-title-20 mb-3">Button</h2>
        <div className="space-y-2">
          <Button variant="primary">Primary</Button>
          <Button variant="primary" disabled>Primary disabled</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="social">G  구글로 계속</Button>
          <div className="flex gap-2">
            <Button variant="secondary" size="pair-prev">이전</Button>
            <Button variant="primary" size="pair-next">다음</Button>
          </div>
        </div>
      </section>
      {/* Input / Card / RadioOption / ... 동일 패턴으로 모든 variant */}
    </div>
  );
}
```

---

## 위험 (Sprint-specific)

| # | 위험 | 발생 신호 | 대응 |
|---|---|---|---|
| **R1** | Tailwind 토큰 매핑 실수 (class와 tokens.ts 값 불일치) | T1.23 시각 검증에서 색이 다름 | 즉시 fix. T1.23은 Day 2 끝 필수 검증 — 지나가면 후속 sprint 모든 컴포넌트 다시 칠해야 함. |
| **R2** | Tailwind purge가 동적 class string 누락 | dev에서는 보이는데 build 시 색 빠짐 | `safelist` 옵션에 동적 class 등록 또는 tokens.ts에서 `import { colors }` 후 인라인 style |
| **R3** | React Router v6 + Vite + lazy 결합 버그 (file extension) | dev에서 라우트 빈 화면 | import 경로에 `.tsx` 명시 시도 / `vite.config.ts`의 `optimizeDeps` 확인 |
| **R4** | Roboto 한글 fallback 가중치 불일치 | 한글 SemiBold가 Bold처럼 보임 | Pretendard로 fallback 우선순위 변경 (`'Pretendard', 'Apple SD Gothic Neo', ...`) |

---

## Sprint Review (S1 끝나고 채우기)

### Definition of Done 체크
- [ ] `npm run dev` → 모든 라우트 진입 가능
- [ ] BottomNav 4탭 클릭 시 라우트 전환
- [ ] `/dev/components`에 12 primitive 모두 렌더 (모든 variant)
- [ ] 컬러: `bg-primary` 가 `#24D455`로 보임 (color picker로 spot check)
- [ ] 폰트 크기: Title 24 / Sub Title 16 / Body 14 design.md 일치
- [ ] `npm test` → dummy test 통과
- [ ] `npm run build` 성공 + `dist/` 생성

### Demo 시연 시나리오 (1분)
1. `npm run dev` 실행
2. 브라우저에서 `/dev/components` 진입 → "12 컴포넌트 전부 디자인 토큰 기반으로 렌더됩니다"
3. Button 4 variant 한 번씩 hover/disabled 확인
4. BottomNav 4탭 한 바퀴 클릭 → 빈 화면이지만 라우트 전환은 OK
5. `npm test` 실행 → 통과

### 발견된 미해결 / Carry-over to S2
- [ ] (필요 시 채움)

### git tag
```bash
git tag s1-foundation
git push --tags
```
