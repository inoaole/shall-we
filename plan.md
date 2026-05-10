# ShallWe — React Prototype 구현 플랜

> 목표: `wireframe.md` 22개 화면 + `design.md` 디자인 시스템을 React 기반 클릭가능한 프로토타입으로 구현. 백엔드 없는 demo (mock 데이터 / 로컬 상태) 수준.
> 산출물: 학교 발표·UT용 데모, 코드 단순성 우선, 추후 실제 백엔드 연결 가능한 구조.

---

## 0. 범위와 비범위

### 범위 (in scope)
- `wireframe.md` 22 화면 전부 — 클릭/입력/플로우 동작
- `design.md` 디자인 토큰·컴포넌트 1:1 구현
- PHQ-9 채점 로직 (클라이언트 산출)
- Mock 피드·추천 데이터 (JSON)
- 사진 업로드는 로컬 file picker → blob URL (서버 업로드 X)
- 로컬 상태 + sessionStorage로 진행 중 챌린지 / 검사 결과 유지

### 비범위 (out of scope, 차후)
- 실제 인증 / Google OAuth / 토큰 발급
- 백엔드 API / DB / 사진 업로드 서버
- Push 알림 / FCM / 이메일
- AI 분석 (검사 결과 로딩은 1.5초 setTimeout으로 mock)
- 배포 (Vercel / Netlify는 P6에서 검토)
- E2E 테스트 (Playwright 등)
- 다크 모드 / i18n

---

## 1. 기술 스택

| 영역 | 선택 | 대안 | 선택 이유 |
|---|---|---|---|
| Framework | **Vite + React 18** | Next.js | SSR 불필요, 빌드 빠름, 학습곡선 낮음 |
| Language | **TypeScript** | JS | 컴포넌트 props 안정성, IDE 지원 |
| Routing | **React Router v6** | TanStack Router | 가장 익숙, 자료 많음 |
| Styling | **Tailwind CSS v3** | CSS Modules / styled-components | design.md 토큰을 `tailwind.config.js`로 1:1 매핑, 빠른 iteration |
| Forms | **React Hook Form** | Formik / 직접 useState | PHQ-9 9문항 + 가입 + 챌린지 5단계에 일관 적용 |
| State | **단일 AppContext + useReducer** (또는 zustand) | Context 2개 분리 | provider nesting 회피, 22 화면 prototype 적정 (D3) |
| Date | **date-fns** | dayjs / Day.js | 캘린더 그리드 + D-day 계산 |
| Icons | **lucide-react** | react-icons | design.md §6에서 이미 명시 |
| 애니메이션 | **Framer Motion** (필요 시 일부 화면) | CSS only | 화면 전환 + 결과 분석 로딩 |
| 빌드 | **Vite 5** | — | dev server 즉시 reload |
| Lint/Format | **ESLint + Prettier** | Biome | 학교 환경 호환성 |

> **고민 포인트**: Tailwind인지 CSS Modules인지. 디자인 시스템 토큰이 명확하므로 Tailwind 추천. 단, 디자인이 자주 바뀐다면 CSS Variables + CSS Modules가 더 유연 (token 한 곳만 수정).

---

## 2. 폴더 구조

```
shall_we/
├── public/
│   └── logo/
│       ├── symbol.png
│       └── wordmark.png
├── src/
│   ├── main.tsx                    # entry
│   ├── App.tsx                     # router + global providers
│   ├── routes.tsx                  # 라우트 정의
│   ├── tokens.ts                   # design.md 토큰 (TS 객체)
│   ├── styles/
│   │   └── globals.css             # tailwind base + custom
│   │
│   ├── components/
│   │   ├── ui/                     # design.md §5 primitives
│   │   │   ├── Button.tsx          # Primary / Secondary / Social / Pair
│   │   │   ├── Input.tsx           # TextField + HelperText
│   │   │   ├── Textarea.tsx
│   │   │   ├── Card.tsx            # Today / Feed / Recommend / Add
│   │   │   ├── RadioOption.tsx     # PHQ-9 답변
│   │   │   ├── PeriodPill.tsx      # 챌린지 기간
│   │   │   ├── PoleChoice.tsx      # 선호도 양극 2지선다
│   │   │   ├── Chip.tsx            # 진행 중 챌린지 선택
│   │   │   ├── ProgressBar.tsx     # 진행률
│   │   │   ├── StepPagination.tsx  # 1/10
│   │   │   ├── Calendar.tsx        # 3상태 캘린더
│   │   │   └── Loading.tsx         # 점 3개 인디케이터
│   │   │
│   │   └── layout/
│   │       ├── BottomNav.tsx       # 다이어리/홈/인증/마이
│   │       ├── Header.tsx          # ShallWe 로고 + +
│   │       └── Screen.tsx          # 화면 wrapper (440pt centered)
│   │
│   ├── screens/                    # 22 wireframe 화면
│   │   ├── onboarding/
│   │   │   ├── Splash.tsx          # 1
│   │   │   ├── Intro1.tsx          # 2 서비스 소개
│   │   │   ├── Intro2.tsx          # 3 검사 안내
│   │   │   ├── Signup.tsx          # 4
│   │   │   ├── Quiz.tsx            # 5 + 6 통합 (PHQ-9 9문항 + 선호조사 5축) — 데이터 주도 (D1)
│   │   │   ├── Analyzing.tsx       # 7 결과 분석 로딩
│   │   │   └── Result.tsx          # 8
│   │   │
│   │   ├── home/
│   │   │   ├── Home.tsx            # 9 + 10 (스크롤 상태)
│   │   │   └── PostDetail.tsx      # 20
│   │   │
│   │   ├── cert/                   # rename: auth → cert (D4: 챌린지 인증 ≠ authentication)
│   │   │   ├── CertTab.tsx         # 11 인증 탭 진입
│   │   │   └── ChallengeCert.tsx   # 12 챌린지 인증 업로드
│   │   │
│   │   ├── create/
│   │   │   ├── Recommend.tsx       # 13 추천 캐러셀
│   │   │   └── Steps.tsx           # 14~18 (5단계, 단일 라우트 + 내부 step state — D2)
│   │   │
│   │   ├── diary/
│   │   │   └── Calendar.tsx        # 19
│   │   │
│   │   └── my/
│   │       ├── MyPage.tsx          # 21
│   │       └── Settings.tsx        # 22
│   │
│   ├── store/
│   │   └── AppContext.tsx          # 단일 Context: user / phq9 / preference / challenges / posts (D3)
│   │
│   ├── data/                       # 정적 데이터 (mock과 다름 — 변하지 않음)
│   │   ├── phq9-questions.ts       # 9문항 + 4지선다 (Quiz가 import)
│   │   └── preference-axes.ts      # 5축 + 양극 (Quiz가 import)
│   │
│   ├── mocks/                      # 시드 데이터 (init 시 AppContext로 로드 — A3)
│   │   ├── feed-seed.json          # 모두의 챌린지 시드
│   │   ├── recommendations.json    # 추천 챌린지
│   │   └── myPosts-seed.json       # 내 게시글 시드 (빈 배열)
│   │
│   ├── hooks/
│   │   └── useDailyCert.ts         # 오늘 인증 가능 여부
│   │
│   └── utils/
│       ├── phq9.ts                 # 점수 → 단계 (단위 테스트 ★ — D6)
│       ├── date.ts                 # 캘린더 셀 상태 계산 (단위 테스트 ★ — D6)
│       └── storage.ts              # sessionStorage helper + quota 토스트
│
├── tests/                          # Vitest (D6)
│   ├── phq9.test.ts                # 4단계 분기 (없음/낮음/중간/높음)
│   └── date.test.ts                # 셀 상태 3가지 (done/missed/future)
│
├── design.md                       # 디자인 시스템 (참고)
├── wireframe.md                    # 와이어프레임 (참고)
├── plan.md                         # 본 플랜
├── README.md                       # 신규
├── .gitignore                      # 신규
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts                # 신규 (D6)
├── tailwind.config.js              # tokens.ts에서 require (D5)
└── postcss.config.js
```

---

## 3. 디자인 토큰 — 단일 출처 (D5)

**Single source of truth: `src/tokens.ts`**. tailwind config는 이걸 require해서 derive. 토큰 변경 시 한 곳만 수정.

```ts
// src/tokens.ts (primary)
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
  'title-24': ['24px', { lineHeight: '1.4', fontWeight: 700 }],
  'title-20': ['20px', { lineHeight: '1.4', letterSpacing: '-0.5%', fontWeight: 700 }],
  'subtitle-16': ['16px', { lineHeight: '1', fontWeight: 600 }],
  'body-14': ['14px', { lineHeight: '1.4' }],
  'body-12': ['12px', { lineHeight: '1' }],
} as const;

export const radius = { sm: '8px', md: '12px', lg: '16px', xl: '24px', full: '9999px' } as const;
export const fontFamily = { base: ['Roboto', 'Apple SD Gothic Neo', 'Pretendard', 'sans-serif'] } as const;
```

```js
// tailwind.config.js — derive from tokens.ts
const { colors, typography, radius, fontFamily } = require('./src/tokens');

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    colors,
    fontFamily,
    fontSize: typography,
    borderRadius: radius,
    extend: { spacing: { '18': '72px' } },
  },
};
```

> Calendar 셀 색상 분기 등 **동적으로 토큰을 참조**해야 할 때는 컴포넌트에서 `import { colors } from '@/tokens'`. Tailwind class string 동적 생성은 purge에 잡히지 않으니 피할 것.

---

## 4. 라우팅

| Path | Screen | Bottom Nav | Notes |
|---|---|---|---|
| `/` | Splash | — | 2초 후 자동 라우팅 |
| `/onboarding/intro/1` | Intro1 | — | |
| `/onboarding/intro/2` | Intro2 | — | |
| `/signup` | Signup | — | |
| `/check/quiz` | Quiz | — | **단일 라우트 + 내부 step state** (D1+D2). PHQ-9 9문항 + 선호조사 5축 = 14 step. 외부 deep link → step 1로 redirect. `navigate('/check/analyzing', { replace: true })`로 back loop 차단 |
| `/check/analyzing` | Analyzing | — | 1.5s setTimeout 후 `navigate('/check/result', { replace: true })` |
| `/check/result` | Result | — | back 시 quiz로 안 돌아가도록 history entry 정리 |
| `/home` | Home | ✓ (홈) | |
| `/post/:id` | PostDetail | — | |
| `/cert` | CertTab | ✓ (인증) | rename: auth → cert (D4) |
| `/cert/upload` | ChallengeCert | — | |
| `/create` | Recommend | ✓ (인증 → 추천 — Recommend는 인증 탭의 + 진입점에서도 옴) | |
| `/create/new` | Steps | — | **단일 라우트 + 내부 step state** (D2). 5단계는 useReducer로 관리. 새로고침 시 step 1로 reset (sessionStorage에 부분 저장 옵션) |
| `/diary` | Diary (캘린더) | ✓ (다이어리) | |
| `/my` | MyPage | ✓ (마이) | |
| `/settings` | Settings | — | |

> 정확한 라우트 구조는 P1 끝에서 React Router config로 확정.
> **D2 적용**: wizard step은 URL이 아니라 컴포넌트 내부 state. 장점 = back-button 안전, deep link 단순. 단점 = 새로고침 시 step 유실 → sessionStorage로 임시 저장 권장.

---

## 5. State / 데이터 흐름

### 단일 AppContext (D3)

```ts
// store/AppContext.tsx
type State = {
  user: { nickname: string | null; email: string | null };
  phq9: { answers: number[]; score: number; level: '없음'|'낮음'|'중간'|'높음' } | null;
  preference: { 활동: '정적인'|'역동적인'; 관계: ...; 방식: ...; 취미: ...; 시간: ... } | null;
  challenges: Challenge[];      // 진행 중
  posts: Post[];                // 내 게시글 (공개 + 비공개)
  feed: Post[];                 // 모두의 챌린지 (seed + 내 공개 posts)
  prefs: { feedView: 'list' | 'grid' };
};

type Action =
  | { type: 'SIGNUP'; user; }
  | { type: 'SET_PHQ9'; result; }
  | { type: 'SET_PREFERENCE'; preference; }
  | { type: 'ADD_CHALLENGE'; challenge; }
  | { type: 'CERTIFY'; challengeId; photo; text; public; }
  | { type: 'TOGGLE_FEED_VIEW'; };

// 초기 state는 mocks/*.json + sessionStorage 복원 결과로 구성
```

**왜 단일 Context?**
- 22 화면 prototype 규모엔 Context 1개로 충분
- Provider nesting / 의존 순서 고민 없음
- 추후 zustand로 갈아끼울 때도 한 곳만 수정
- *대안: zustand* — 5줄로 같은 구조, devtools middleware 무료. 학생 학습 곡선 고려해 Context 우선.

### Persistence
- **sessionStorage**: state 전체 (사진 blob URL 제외)를 매 dispatch마다 직렬화 저장. quota 초과 시 토스트 노출 (`utils/storage.ts`)
- **localStorage**: feedView 토글 (≡/▦)같은 영구 설정만
- **메모리 only**: 사진 blob URL — 새로고침 시 잃음. unmount 시 `URL.revokeObjectURL`로 메모리 누수 방지 (P2 위험요소)

### Seed 데이터 (A3 — static import 아님)
- `mocks/feed-seed.json`: 5~10개 시드 게시물 (이미지 URL은 picsum.photos)
- `mocks/recommendations.json`: 5개 추천 챌린지 ("하늘 바라보기" 등 — 변하지 않음, 진짜 static)
- `mocks/myPosts-seed.json`: 빈 배열 (사용자 인증 시 dispatch로 추가)

→ AppContext init 시 seed 파일을 state로 로드. 그 후로는 dispatch만으로 변경.

---

## 6. 단계별 일정 (총 ~9 작업일 추정 / CC 보조 ~2-3일)

### P1 — 셋업 (0.5일 / CC: ~30분)
- `npm create vite@latest shall_we -- --template react-ts`
- Tailwind / React Router / RHF / date-fns / framer-motion / lucide-react / **vitest** / @testing-library/react 설치 (D6)
- `src/tokens.ts` 작성 + `tailwind.config.js`에서 require (D5)
- 라우터 skeleton: 모든 화면을 placeholder로 등록 + **`React.lazy()` 적용** (D7)
- 폴더 구조 생성 + Header / BottomNav 빈 컴포넌트
- AppContext 빈 reducer + Provider 등록 (D3)
- vitest 셋업 + 첫 dummy 테스트 1개 (`tests/example.test.ts`)
- **완료 기준**: `npm run dev` 시 모든 라우트 빈 화면 + 하단 네비 동작 + `npm test` 통과

### P2 — UI 컴포넌트 12개 (1.5일 / CC: ~1시간)
- design.md §5의 모든 primitive
- 각 컴포넌트는 props로 variant 표현 (Button: primary/secondary/social/pair)
- **공용 폼 helper** (Q3): `<FormField>` + `<StepActions>` (이전·다음 버튼 쌍) — 회원가입 + 챌린지 만들기 5단계가 공유
- **완료 기준**: Storybook 없어도 좋으니 `/dev/components` 라우트에 모두 렌더 OK

### P3 — 온보딩 7개 화면 (2일 / CC: ~3시간) — D1으로 화면 1개 감소
- Splash → Intro1 → Intro2 → Signup → **Quiz (PHQ-9 9 + 선호 5 = 14 step)** → Analyzing → Result
- Quiz: `data/phq9-questions.ts` + `data/preference-axes.ts`를 read해서 동일 컴포넌트 + 내부 step state로 14 step 처리 (D1+D2)
- 가입 form: RHF + Zod 검증 (닉네임 2-10자, 이메일 형식, 비밀번호 영문+숫자+특수)
- Result: 점수 → 단계 분기 (utils/phq9.ts) + `tests/phq9.test.ts` 4 케이스 (D6)
- Analyzing → Result는 `navigate(..., { replace: true })`로 back loop 차단 (failure mode fix)
- **완료 기준**: Splash부터 Result까지 클릭만으로 완주 가능 + `npm test` 통과

### P4 — 메인 6개 화면 (2일 / CC: ~3시간)
- Home (오늘의 챌린지 + 모두의 챌린지 + ≡/▦ 토글)
- CertTab + ChallengeCert (D4: cert/ 폴더)
  - 사진 picker: `URL.createObjectURL(file)` → useEffect cleanup에 `URL.revokeObjectURL` 명시 (P2 위험요소)
  - **Picker cancel** 처리: 사용자가 파일 선택 취소 시 토스트 "사진을 선택해주세요" + 업로드 비활성 유지 (failure mode fix)
- Diary (3상태 캘린더) + `tests/date.test.ts` 3 케이스 (D6)
- Calendar 셀: `React.memo` + cells 배열 `useMemo` (P3)
- MyPage + Settings
- **완료 기준**: 메인 4탭 전환 + 인증 → 캘린더 마커 추가 → 마이페이지 게시글 노출 + 사진 picker cancel 시 정상 처리

### P5 — 챌린지 만들기 (1일 / CC: ~1.5시간)
- Recommend (가로 스와이프 캐러셀, embla-carousel-react 추천)
- 5-step wizard: 단일 라우트 `/create/new` + 내부 step state (D2)
- "직접 만들기" → 챌린지 add → Home으로 복귀 + 토스트
- **완료 기준**: 추천 → 시작 OR 직접 만들기 5단계 → 완료

### P6 — 폴리시 (1일)
- 화면 전환 애니메이션 (Framer Motion `AnimatePresence`)
- 빈 상태 처리 (피드 0개 / 게시글 0개 / 추천 0개)
- 로딩 / 에러 토스트 (sessionStorage quota 초과 포함)
- 320pt 폭 (iPhone SE) 대응 (디자인.md는 440pt 기준이지만 작은 화면 대비)
- README + 데모 GIF
- (옵션) Vercel 자동 배포
- **완료 기준**: UT 가능한 수준

---

## 7. 위험 요소 / 미해결

| 위험 | 영향 | 대응 |
|---|---|---|
| 전용 로고 폰트 라이선스 | 워드마크 PNG로 대체 (현재 자산) | PNG 사용, 폰트 입수 시 교체 |
| Roboto + 한글 fallback 폰트 weight 매칭 | 디자인 vs 실제 차이 | Pretendard 권장 (Bold 700 / SemiBold 600 일치) |
| 사진 업로드 mock의 한계 | 새로고침 시 사진 사라짐 | sessionStorage로 base64 저장은 100KB 제한 — Object URL 유지 |
| 캘린더 3상태 셀 색상 — Figma divergence | 디자인 검토 필요 | design.md §9에 이미 기록, 구현은 plan대로 |
| 추천 캐러셀 — embla-carousel vs 직접 구현 | 의존성 1개 추가 vs 코드 50줄 | embla 추천 (touch-friendly, prebuilt) |
| 가입 화면 OAuth 버튼 클릭 시 동작 | 백엔드 없음 | 클릭 시 mock 닉네임으로 자동 가입 + 토스트 "데모 모드입니다" |
| **🔴 사진 picker cancel** | 업로드 silent fail | P4: cancel 시 토스트 + 업로드 버튼 비활성 유지 |
| **🔴 검사 결과 → back loop** | analyzing↔result 무한 루프 | `navigate('...', { replace: true })` 명시 |
| sessionStorage quota 초과 | dispatch silent fail | `utils/storage.ts` write try/catch + 토스트 노출 |
| Wizard 새로고침 (D2 단점) | step state 유실 → 1단계 reset | sessionStorage에 step + 입력값 임시 저장 (옵션) |
| Bundle size (22 화면) | 모바일 first-paint 지연 | React.lazy 코드 분할 (D7) — 초기 ~40KB 목표 |
| Calendar re-render | 월 이동 시 30+ 셀 reconstruct | `useMemo` cells + `React.memo` 셀 (P3) |

---

## 8. 결정 필요 (구현 중 / 후 합의)

> Eng 결정 D1-D7은 §11에서 resolved. 아래는 product 결정 — P3-P5 진행 중에 합의 필요.

1. **Tailwind 채택** — D5에서 결정됨 (tokens.ts primary + tailwind require). ~~CSS Modules~~
2. **모바일 only** vs **반응형 (320~768pt)** — UT 디바이스가 iPhone 16 Pro Max만이면 only OK
3. **Mock OAuth 처리 방식** — (a) 클릭 시 자동 가입 / (b) 모달로 "데모용" 안내 / (c) 비활성화
4. **PHQ-9 9번 (자해) 1점 이상 시 1393 안내** — Result 화면에 항상 노출 / 점수 따라 조건부 / 미구현
5. **다이어리 캘린더 month 이동** — 좌우 화살표 / 스와이프 / 둘 다
6. **데모 배포** — Vercel 자동 배포 vs 로컬 시연만
7. **챌린지 만들기 "기간 직접입력"** — 모달 키패드 / 일반 number input / 미구현

---

## 9. 검증 방식 (테스트 없이 확인하는 법)

E2E 테스트 미작성 (프로토타입). 대신 수동 체크리스트:

- [ ] Splash → Result까지 막힘 없이 진행
- [ ] PHQ-9 답변 안 한 채로 다음 클릭 → 비활성
- [ ] Result 단계가 점수에 맞게 분기 (없음/낮음/중간/높음 4개 다 테스트)
- [ ] 챌린지 추가 → 홈 "오늘의 챌린지" 카드에 반영
- [ ] 인증 → 캘린더 오늘 셀 초록색 + 마이페이지 게시글 추가
- [ ] 사진 미선택 → 업로드 비활성
- [ ] 사진 picker cancel → 토스트 + 비활성 유지 (failure mode)
- [ ] 진행 중 챌린지 0개 / 1개 / 2개 이상 시 chip selector 동작
- [ ] 모든 라우트 url 직접 입력 시 정상 진입 (또는 onboarding으로 redirect)
- [ ] 검사 결과 화면에서 back → 분석 화면으로 안 돌아감 (replace 적용 검증)
- [ ] 새로고침 후 sessionStorage 데이터 유지
- [ ] sessionStorage quota 초과 시 토스트 노출 (인위적으로 큰 값 dispatch해서 검증)

**자동 (Vitest):**
- [ ] `tests/phq9.test.ts` 4 케이스 (없음/낮음/중간/높음 경계값)
- [ ] `tests/date.test.ts` 3 케이스 (done/missed/future)

---

## 10. 다음 단계

1. ~~본 플랜 리뷰 (`/plan-eng-review`)~~ ✅ 완료 (D1-D7 적용됨)
2. ~~Sprint 분할~~ ✅ 완료 → **`sprints.md` 참고** (4 sprint × ~2일 = 8일)
3. §8 product 결정 7개 (각 sprint 진행 중 합의)
4. **S1 셋업 시작**: `cd shall_we && npm create vite@latest . -- --template react-ts`
5. 각 sprint 끝마다 review → 다음 sprint 진입

---

## 11. Resolved Decisions (Eng Review 결정 적용 완료)

| # | 결정 | 결과 | 영향 받은 섹션 |
|---|---|---|---|
| **D1** | PHQ-9 + 선호조사 통합 | 단일 `Quiz.tsx` + `data/phq9-questions.ts` + `data/preference-axes.ts`. 14 step 데이터 주도 | §2 폴더, §3 라우팅, §6 P3 |
| **D2** | Wizard step routing | URL이 아닌 컴포넌트 내부 step state. URL은 `/check/quiz`, `/create/new` 단일 | §4 라우팅 |
| **D3** | State 관리 | 단일 `AppContext` (provider 1개, reducer 1개). 추후 zustand로 갈아끼울 수 있게 | §1 stack, §2 폴더, §5 state |
| **D4** | `screens/auth/` rename | `screens/cert/` (CertTab, ChallengeCert). URL `/cert`, `/cert/upload` | §2 폴더, §4 라우팅, §6 P4 |
| **D5** | Token single source | `src/tokens.ts` primary. `tailwind.config.js`는 require해서 derive | §3 토큰 |
| **D6** | Vitest 단위 테스트 | `tests/phq9.test.ts` 4 케이스 + `tests/date.test.ts` 3 케이스. P1 셋업에 vitest 포함 | §1 stack, §2 폴더, §6 P1/P3/P4, §9 검증 |
| **D7** | React.lazy 코드 분할 | 22 화면 모두 `React.lazy()`. P1 셋업에서 즉시 적용 | §6 P1, §7 위험요소 |

**Failure modes 추가 처리:**
- 사진 picker cancel → P4 토스트 + 비활성 유지
- Analyzing → Result back loop → `navigate(..., { replace: true })`
- sessionStorage quota → `utils/storage.ts` try/catch + 토스트
- Wizard 새로고침 → sessionStorage에 step + 부분입력 임시 저장 (옵션)

**Lake Score: 5/7 추천을 complete로 채택** (D1, D2, D3, D5, D6 완전화 / D4 trivial / D7 perf).
