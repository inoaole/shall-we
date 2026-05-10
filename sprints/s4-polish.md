# Sprint 4 — Polish & Demo Ready

> **목표**: UT(유저 테스팅) 가능 수준으로 마감. 친구·교수에게 URL 보내고 5분 내 "다 해봤어요" 받을 수 있는 상태.
> **기간**: 1 작업일 (8h)
> **상위 플랜**: `../plan.md` P6, `../sprints.md` S4

---

## Pre-flight Checklist

- [ ] S3 완료 (S3 review의 모든 DoD 체크 ✓)
- [ ] `git tag s3-main-app` 존재
- [ ] §8 product 결정 모두 합의:
  - [ ] **§8-3** Mock OAuth 처리 (자동 가입 / 모달 안내 / 비활성화)
  - [ ] **§8-4** PHQ-9 9번 1393 안내 (항상 / 조건부 / 미구현)
  - [ ] **§8-7** 챌린지 만들기 직접입력 (모달 키패드 / number input / 미구현)
  - [ ] **§8-6** Vercel 배포 여부
- [ ] 토스트 시스템 라이브러리 결정 — `sonner` 추천 (가볍고 미려)

---

## Task Breakdown (8h)

### Morning (4h) — UX polish

| ID | 작업 | 파일 | 추정 | 의존 |
|---|---|---|---|---|
| **T4.1** | Framer Motion `<AnimatePresence>` 화면 전환 (push: slide-right, pop: slide-left) | `src/App.tsx` 라우터 wrapper | 1h | S3 |
| **T4.2** | 빈 상태 4종 구현<br/>(모두의 챌린지 0건 / 내 게시글 0건 / 추천 0건 / 다이어리 챌린지 미시작) | `src/components/ui/EmptyState.tsx` + 각 화면 | 1h | S3 |
| **T4.3** | 토스트 시스템 — `sonner` 설치 + 5종 처리<br/>(챌린지 추가됨 / 인증 완료 / picker cancel / sessionStorage quota / 일반 에러) | `npm i sonner`, `src/utils/toast.ts` 헬퍼 | 1h | S3 |
| **T4.4** | 320pt 폭 (iPhone SE) 대응 — Tailwind responsive 검증 | 모든 화면 | 1h | S3 |

### Afternoon (4h) — Product 결정 + 배포 + 문서

| ID | 작업 | 파일 | 추정 | 의존 |
|---|---|---|---|---|
| **T4.5** | §8-4: PHQ-9 9번 1393 안내 카드 (Result 화면) — 합의된 방식 | `src/screens/onboarding/Result.tsx` | 30m | S2 |
| **T4.6** | §8-3: Mock OAuth 처리 — 합의된 방식 (default: 자동 가입 + 토스트) | `src/screens/onboarding/Signup.tsx`, `Intro2.tsx` | 30m | S2 |
| **T4.7** | §8-7: 챌린지 만들기 직접입력 — 합의된 방식 | `src/screens/create/Steps.tsx` (step 2) | 30m | S3 |
| **T4.8** | `README.md` — 학교 발표용 (서비스 소개 + 실행 가이드 + 스크린샷 + 기여자) | `README.md` | 1h | — |
| **T4.9** | `.gitignore` (node_modules, dist, .env, .DS_Store, *.log) | `.gitignore` | 5m | — |
| **T4.10** | bundle size 확인 — `vite-bundle-visualizer` 또는 `npm run build` 후 dist 분석 | — | 30m | — |
| **T4.11** | (옵션) Vercel 자동 배포 — GitHub 연동 + 환경변수 없음 (정적) | `vercel.json` (필요 시) | 1h | T4.8 |
| **T4.12** | demo GIF 녹화 (스플래쉬→인증까지 30-45초) — `Kap` 또는 `LICEcap` | `assets/demo.gif` | 30m | T4.1 |
| **T4.13** | 최종 review + UT 일정 잡기 + S4 review template 채우기 | 본 파일 § Sprint Review | 15m | All |

---

## 코드 스켈레톤

### `src/App.tsx` (T4.1 — Framer Motion 화면 전환)

```tsx
import { RouterProvider } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { router } from './routes';
import { AppProvider } from './store/AppContext';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </AppProvider>
  );
}

// 화면 wrapper에서 motion 적용
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-30%', opacity: 0 }}
      transition={{ duration: 0.28, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
```

> 실제 적용은 React Router v6 outlet에 `<AnimatePresence mode="wait">` 감싸는 게 정석. `framer-motion` + `react-router-dom v6` 조합 검색 → 가이드 따르기.

### `src/components/ui/EmptyState.tsx` (T4.2)

```tsx
import { ReactNode } from 'react';

interface Props {
  emoji?: string;          // 또는 일러스트 컴포넌트
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ emoji = '🌱', title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-6xl mb-4">{emoji}</div>
      <p className="text-title-20 text-ink mb-2">{title}</p>
      {description && <p className="text-body-14 text-gray mb-6 whitespace-pre-line">{description}</p>}
      {action && (
        <button onClick={action.onClick}
                className="px-6 h-12 rounded-md bg-primary text-white text-subtitle-16 font-semibold">
          {action.label}
        </button>
      )}
    </div>
  );
}
```

### `src/utils/toast.ts` (T4.3)

```ts
import { toast } from 'sonner';

export const notify = {
  challengeAdded: (title: string) =>
    toast.success(`'${title}' 챌린지가 추가되었습니다!`),
  certified: () =>
    toast.success('인증 완료! 다이어리에서 확인해보세요.'),
  pickerCanceled: () =>
    toast.warning('사진을 선택해주세요.'),
  storageQuota: () =>
    toast.error('저장 공간이 부족해요. 일부 데이터가 유지되지 않을 수 있습니다.'),
  error: (msg: string) =>
    toast.error(msg),
  demoMode: () =>
    toast.info('데모 모드입니다. 실제 인증 없이 바로 진행됩니다.'),
};
```

→ S3에서 `console.warn` 했던 자리에 모두 이걸로 교체. `utils/storage.ts`의 quota catch에도 `notify.storageQuota()` 호출.

### `src/screens/onboarding/Result.tsx` 보강 (T4.5)

```tsx
// §8-4 합의 결과에 따라 분기
const SUICIDE_INFO_MODE: 'always' | 'conditional' | 'off' = 'conditional';

const showSuicideInfo =
  SUICIDE_INFO_MODE === 'always' ||
  (SUICIDE_INFO_MODE === 'conditional' && score9 >= 1);

{showSuicideInfo && (
  <div className="mt-6 p-4 bg-bg-green-tint rounded-lg border border-primary/30">
    <p className="text-body-14 mb-2">힘들 때는 혼자 견디지 마세요.</p>
    <a href="tel:1393" className="text-subtitle-16 text-primary font-semibold">
      📞 1393 자살예방상담전화
    </a>
    <p className="text-body-12 text-gray mt-1">24시간 무료 상담</p>
  </div>
)}
```

### `src/screens/onboarding/Signup.tsx` Mock OAuth (T4.6)

```tsx
// §8-3 default: 자동 가입 + 토스트
import { notify } from '@/utils/toast';

const handleGoogleLogin = () => {
  dispatch({
    type: 'SIGNUP',
    payload: { nickname: '데모 유저', email: 'demo@shallwe.app' },
  });
  notify.demoMode();
  navigate('/check/quiz', { replace: true });
};

// 또는 §8-3 합의가 "비활성화"라면:
// <Button variant="social" disabled>G  구글로 계속 (준비 중)</Button>
```

### `src/screens/create/Steps.tsx` 직접입력 (T4.7)

```tsx
// §8-7 default: number input (모달 키패드는 모바일 OS가 자동 띄워줌)
const PERIODS = [3, 7, 14, 21, 28];
const [customMode, setCustomMode] = useState(false);
const [customDays, setCustomDays] = useState<number | ''>('');

{step === 2 && (
  <>
    {/* 프리셋 5개 */}
    {PERIODS.map(d => (
      <PeriodPill key={d} label={`${d}일`} selected={data.days === d}
                  onClick={() => { setCustomMode(false); setData({...data, days: d}); }} />
    ))}
    {/* 직접입력 */}
    <PeriodPill label="직접입력" selected={customMode}
                onClick={() => setCustomMode(true)} />
    {customMode && (
      <input type="number" inputMode="numeric" min={1} max={365}
             value={customDays} onChange={(e) => {
               const v = parseInt(e.target.value);
               setCustomDays(isNaN(v) ? '' : v);
               setData({...data, days: isNaN(v) ? null : v});
             }}
             placeholder="1~365일"
             className="w-full p-3 rounded-md border border-gray/30 mt-2" />
    )}
  </>
)}
```

### `README.md` (T4.8 — 학교 발표용)

```markdown
# ShallWe — '쉬었음 청년'을 위한 AI 감정기록 챌린지 서비스

> 연세대 UXIM 3팀 (레디액션) — React 프로토타입

![demo](./assets/demo.gif)

## 서비스 소개
- **타깃**: 무기력감을 느끼는 청년 (PHQ-9 척도 기반)
- **핵심 가치**: 비교 압박 없는 마이크로 챌린지 + 감정 캘린더
- **MVP 범위**: 22 화면 클릭 가능 프로토타입 (백엔드 없음, mock 데이터)

## 실행 방법
```bash
git clone <repo>
cd shall_we
npm install
npm run dev
# → http://localhost:5173
```

## 디자인 시스템
- 컬러 / 타이포 / 컴포넌트 사양: [`design.md`](./design.md)
- 22 화면 와이어프레임: [`wireframe.md`](./wireframe.md)
- 구현 플랜: [`plan.md`](./plan.md)
- Sprint 진행 기록: [`sprints/`](./sprints/)

## 의도적으로 미구현 (프로토타입)
- 실제 인증 (Google OAuth) — 데모 자동 가입
- 백엔드 / DB — 모든 데이터는 sessionStorage
- 사진 업로드 서버 — 로컬 blob URL
- AI 분석 — 1.5초 setTimeout으로 mock
- 푸시 알림 / 이메일

## 기술 스택
React 18 + TypeScript + Vite + Tailwind + React Router + RHF + Zod + date-fns + framer-motion + embla-carousel + Vitest

## 팀
- 백종현 (디자인 시스템, 와이어프레임, 구현)
- (팀원 추가)

## 라이선스
학교 프로젝트 — 외부 사용 금지
```

### `.gitignore` (T4.9)

```
node_modules/
dist/
dist-ssr/
.env
.env.local
.env.*.local
.DS_Store
*.log
.vite/

# IDE
.idea/
.vscode/

# OS
Thumbs.db

# 빌드 산출물
*.tsbuildinfo

# 테스트 커버리지
coverage/
```

---

## 320pt 반응형 대응 (T4.4) — 체크리스트

| 화면 | 320pt 시 깨짐 가능성 | 대응 |
|---|---|---|
| Splash | 낮음 (centered) | OK |
| Signup 폼 | 높음 (input + label 좁아짐) | placeholder 짧게, label 위치 위 |
| Quiz 옵션 4개 | 중간 (RadioOption 2줄로 줄바꿈) | 옵션 텍스트 최대 폭 명시 |
| Home 모두의 챌린지 grid | 높음 (2열에서 카드 너무 좁음) | 320pt에서는 list 강제 (sm:grid 옵션) |
| Calendar 셀 | 중간 (40pt × 7 = 280pt) | 셀 36pt로 축소 |
| Settings 메뉴 row | 낮음 | OK |

Tailwind responsive: `sm:` (640pt 이상)과 default(<640pt)로 분기. 320pt는 default. 440pt(iPhone Pro Max)는 sm: 못 미침 → 동일 default. 별 차이 없으면 OK.

---

## bundle size 최적화 (T4.10)

```bash
npm run build
npx vite-bundle-visualizer
# 또는
ls -lh dist/assets/
```

**목표**:
- initial chunk (main.js): < 80KB gzipped
- 각 lazy chunk: < 20KB gzipped
- 전체 dist/: < 500KB

**무거우면**:
- date-fns 통째 import 시 무거움 → 함수별 named import (`import { isSameDay } from 'date-fns/isSameDay'`)
- framer-motion 큼 (~40KB) — 일부 화면만 사용하면 lazy load
- lucide-react 아이콘 named import (전체 import는 ~200KB)

---

## Vercel 배포 (T4.11, 옵션)

```bash
npm i -g vercel
vercel
# 첫 deploy 후 GitHub 연동하면 push마다 자동 배포
```

**빌드 설정** (Vercel 자동 인식): Vite framework → preset 자동.

**없는 환경변수**: 백엔드 없으니 `.env` 불필요.

**Production URL** 받으면 README 상단에 추가.

---

## 위험 (Sprint-specific)

| # | 위험 | 발생 신호 | 대응 |
|---|---|---|---|
| **R1** | Framer Motion + React Router v6 outlet 통합 까다로움 | 화면 전환 애니메이션 안 됨 또는 깜빡임 | 공식 문서 패턴 따름. 까다로우면 cut — 핵심은 풀 cycle 동작 |
| **R2** | 320pt에서 Home grid 뷰 깨짐 | 카드 텍스트 잘림 | 320pt에서는 list 강제 또는 padding 줄임 |
| **R3** | bundle size 폭주 (date-fns 전체 + framer-motion) | initial chunk > 200KB | named import / lazy load |
| **R4** | Vercel 배포 시 React Router v6 SPA fallback 필요 | 새로고침 시 404 | `vercel.json`에 rewrite rule 추가 (`{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`) |
| **R5** | 시간 부족 — 4종 빈 상태 + 토스트 + 반응형 + 배포 + GIF 다 못 함 | Day 4 끝까지 미완 | 우선순위: 토스트 > 빈 상태 > README > 320pt > 애니메이션 > Vercel > GIF (마지막 cut OK) |

---

## Sprint Review (S4 끝나고 채우기)

### Definition of Done 체크
- [ ] 화면 전환 애니메이션 (push/pop)
- [ ] 빈 상태 4종 시각 확인
- [ ] 토스트 5종 시각 확인 (sonner)
- [ ] 320pt~440pt 모두 레이아웃 깨짐 없음 (Chrome DevTools 디바이스 시뮬)
- [ ] §8 product 결정 3개 모두 구현 (1393 / Mock OAuth / 직접입력)
- [ ] `README.md` 작성 (서비스 소개 + 실행 + 스크린샷)
- [ ] `.gitignore` 적용
- [ ] `npm run build` 성공
- [ ] bundle size 리포트 OK (initial < 80KB gzipped 권장)
- [ ] (옵션) Vercel 배포 URL 동작
- [ ] (옵션) demo GIF 녹화

### UT 시연 시나리오 (5분 think-aloud)
1. 사용자에게 URL + "ShallWe라는 무기력 챌린지 앱이에요. 한번 써보세요" 외 안내 없음
2. 사용자가 Splash → Signup → Quiz → Result → Home → 챌린지 만들기 → 인증까지 자력 도달하는지 관찰
3. 막히는 지점 / 헷갈리는 카피 / 깨지는 UI 메모
4. 5분 후 "어떠셨어요?" 한 줄 피드백

### 발견된 이슈 (UT 후)
- (UT 끝나고 채움)

### git tag
```bash
git tag s4-polish
git tag v0.1.0   # 첫 demo 버전
git push --tags
```

### 발표 자료
- 데모 URL (Vercel)
- demo GIF
- design.md / wireframe.md / sprints/ 링크
- "다음 단계" 슬라이드 — 실제 백엔드, OAuth, AI 분석, App Store 출시 등
