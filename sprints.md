# ShallWe — Sprint Plan (Index)

> `plan.md` P1-P6를 4개 demo-able sprint로 묶음. 각 sprint 끝마다 시연 가능한 산출물 → 학생 발표·UT 일정에 맞춰 체크포인트 운영.
> **각 sprint별 세부 플랜은 `sprints/` 폴더에 별도 작성됨.**

---

## Sprint 개요

| Sprint | 묶인 Phase | 작업일 | 끝나면 시연 가능한 것 | 세부 플랜 |
|---|---|---|---|---|
| **S1 — Foundation** | P1 + P2 | 2일 | `/dev/components`에 12 컴포넌트 모두 렌더 + 4탭 BottomNav 동작 | [`sprints/s1-foundation.md`](./sprints/s1-foundation.md) |
| **S2 — Onboarding Flow** | P3 | 2일 | Splash → 가입 → PHQ-9·선호조사 → Result 풀 클릭 완주 (4단계 분기 동작) | [`sprints/s2-onboarding.md`](./sprints/s2-onboarding.md) |
| **S3 — Main App** | P4 + P5 | 3일 | 챌린지 만들기 → 홈 → 인증 → 다이어리 → 마이 풀 cycle 시연 | [`sprints/s3-main-app.md`](./sprints/s3-main-app.md) |
| **S4 — Polish & Demo Ready** | P6 | 1일 | UT 가능 수준 + README + (옵션) Vercel 배포 | [`sprints/s4-polish.md`](./sprints/s4-polish.md) |
| **합계** | — | **8일** | | |

> **각 세부 파일에 포함된 것**: Pre-flight checklist, 시간 단위 task breakdown(추정·의존성·파일 경로), 코드 스켈레톤(트릭 부분), 위험 대응, Demo 시나리오, Sprint Review 템플릿.

---

## Sprint 1 — Foundation (P1 + P2)

> 디자인 시스템을 코드로 옮기고, 모든 화면이 빈 라우트로 등록된 "뼈대" 완성.
> 끝까지 가면 디자인 시스템 시각 검증 + 모든 컴포넌트 prop variant 확인 가능.

### 🎯 Goal
React + Tailwind 토큰 매핑 완성, 12 UI primitive 전부 만들고 `/dev/components`에서 시각 확인.

### 📦 Scope
- [ ] `npm create vite@latest . -- --template react-ts`
- [ ] 의존성 설치 (Tailwind / Router / RHF / date-fns / framer / lucide / embla / vitest / testing-library)
- [ ] `src/tokens.ts` 작성 (color / typography / radius / fontFamily — design.md §8 그대로) — **D5: single source**
- [ ] `tailwind.config.js`에서 `require('./src/tokens')` derive
- [ ] `src/styles/globals.css` (Tailwind base + custom)
- [ ] 폴더 구조 스캐폴드 (모든 screens/는 placeholder export)
- [ ] React Router config + **`React.lazy()` 적용** (D7) — 모든 화면 lazy
- [ ] `App.tsx` + `AppContext.tsx` (빈 reducer + provider만, action은 S2부터)
- [ ] `components/layout/` (Header, BottomNav, Screen wrapper) — 살아있게
- [ ] `components/ui/` 12개 (Button / Input / Textarea / Card 4종 / RadioOption / PeriodPill / PoleChoice / Chip / ProgressBar / StepPagination / Calendar / Loading)
- [ ] **공용 폼 helper** (Q3): `<FormField>` + `<StepActions>` (S2/S3에서 재사용)
- [ ] `screens/dev/Components.tsx` — 12 컴포넌트를 모든 variant로 렌더 (시각 회귀 방지)
- [ ] `vitest.config.ts` + `tests/example.test.ts` 1개 (셋업 검증)

### ✅ Definition of Done
- [ ] `npm run dev` → 모든 라우트가 빈 화면이라도 진입 가능
- [ ] BottomNav 4탭 (다이어리/홈/인증/마이) 클릭 시 라우트 전환
- [ ] `/dev/components` 라우트에서 12개 primitive 모두 rendering
- [ ] 컬러: 화면에 `shallwe green #24D455`가 정확히 보임 (Tailwind class `bg-primary`)
- [ ] 폰트 크기: Title 24 / Sub Title 16 / Body 14 모두 design.md 사이즈 일치
- [ ] `npm test` → dummy 테스트 1개 통과

### 🎬 Demo (Sprint Review)
- "디자인 시스템 12개 컴포넌트가 모두 props로 variant 표현되며, 토큰은 한 곳(`tokens.ts`)에서 변경하면 전체 앱에 반영됩니다."
- `/dev/components` 페이지를 보여주며 각 컴포넌트의 default / pressed / disabled / selected state 시연.

### ⚠️ 위험
- **R1**: 토큰 매핑 실수 (Tailwind class와 `tokens.ts` 값 불일치) → 후속 sprint에서 발견되면 모든 컴포넌트 다시 칠해야 함. 대응: S1 끝에 design.md 토큰과 실제 렌더 색을 1:1 비교 (눈으로 확인 + 색상 picker로 5개 spot check).
- **R2**: Tailwind purge가 동적 class string 못 잡으면 production build에서 색이 빠짐. 대응: `safelist` 옵션으로 동적 class는 미리 등록 또는 컴포넌트에서 인라인 style로 fallback.

### 🔀 Parallel Lanes (팀 2-3명일 때)
- Lane A (1명): P1 셋업 + 라우터 + AppContext + Header/BottomNav/Screen
- Lane B (1명): UI primitive 6개 (Button / Input / Textarea / Card 4종)
- Lane C (1명): UI primitive 6개 (RadioOption / PeriodPill / PoleChoice / Chip / Progress / Calendar / Loading)
- A 끝나야 B/C가 라우트에 컴포넌트 등록 가능 → A 우선

---

## Sprint 2 — Onboarding Flow (P3)

> 신규 사용자가 처음 들어와서 검사 결과를 받기까지의 플로우. PHQ-9 + 선호조사 = 14 step Quiz가 핵심.

### 🎯 Goal
Splash → Result까지 클릭만으로 끊김 없이 진행. 4단계 분기(없음/낮음/중간/높음) 동작 확인.

### 📦 Scope
- [ ] `AppContext`: `SIGNUP`, `SET_PHQ9`, `SET_PREFERENCE` actions + reducer 구현
- [ ] `utils/storage.ts` — sessionStorage save/restore + quota try/catch
- [ ] `screens/onboarding/Splash.tsx` (2초 + auto-route 로직)
- [ ] `screens/onboarding/Intro1.tsx`, `Intro2.tsx` (정적, 다음 버튼만)
- [ ] `screens/onboarding/Signup.tsx` — RHF + Zod (닉네임 2-10자, 이메일 형식, 비밀번호 8+영문+숫자+특수)
- [ ] `data/phq9-questions.ts` — 9문항 + 4지선다 + 점수
- [ ] `data/preference-axes.ts` — 5축 + 양극 라벨
- [ ] `screens/onboarding/Quiz.tsx` — **D1+D2: 단일 컴포넌트 + 14 step 내부 state**, 데이터 주도
- [ ] `screens/onboarding/Analyzing.tsx` (1.5s setTimeout + `navigate('/check/result', { replace: true })`)
- [ ] `screens/onboarding/Result.tsx` (점수 → 단계 분기, 2 stacked CTA)
- [ ] `utils/phq9.ts` (점수 → 단계 함수)
- [ ] `tests/phq9.test.ts` — 4 케이스 (0/4 → 없음, 5/9 → 낮음, 10/14 → 중간, 15+ → 높음 경계값)

### ✅ Definition of Done
- [ ] 신규 진입 시 Splash → Intro1 → Intro2 → Signup → Quiz(14 step) → Analyzing → Result 완주
- [ ] Quiz 미응답 시 다음 버튼 비활성
- [ ] PHQ-9 점수 4단계 모두 직접 답변해서 결과 분기 시각 확인
- [ ] Result에서 back 클릭 시 Quiz로 안 돌아감 (replace 적용)
- [ ] 새로고침 시 가입 데이터 + 진행 step 유지 (sessionStorage)
- [ ] `npm test` 통과 (4 케이스 + dummy)

### 🎬 Demo (Sprint Review)
- "신규 사용자 시나리오를 1분 내 시연합니다" — Splash → Result까지 한 번에.
- 4단계가 다른 결과 메시지를 어떻게 분기시키는지 PHQ-9 응답 패턴 바꿔가며 시연.

### ⚠️ 위험
- **R1**: Quiz 14 step 단일 컴포넌트 — 첫 step 만들기 전에 데이터 schema 먼저 확정 (`questions: { id, text, type: 'phq9'|'preference', options: [...] }[]`). 도중 schema 바뀌면 모든 step refactor.
- **R2**: PHQ-9 9번 문항 (자해/자살)이 1점 이상일 때 Result에 1393 안내를 노출할지 — §8 product 결정 4번 (S2 끝까지 합의 필요). 미합의 시 일단 미구현으로 진행.

### 🔀 Parallel Lanes
- 거의 sequential (Signup → Quiz → Analyzing → Result는 데이터 흐름 의존).
- Lane A (1명): AppContext reducer + Signup
- Lane B (1명): Quiz + data 파일 (Lane A의 SET_PHQ9 action 시그니처 확정 후)
- Lane C (1명): Analyzing + Result + utils/phq9 + tests

---

## Sprint 3 — Main App (P4 + P5)

> 메인 4탭 + 챌린지 만들기/인증 풀 cycle. 서비스의 핵심 가치(매일 인증 → 캘린더 누적 → 마이페이지 게시글)가 동작.

### 🎯 Goal
온보딩 끝난 사용자가 챌린지 만들고 → 인증하고 → 캘린더에서 확인하고 → 마이페이지에서 본인 게시글 보는 풀 cycle.

### 📦 Scope

**P4 — 메인 6 화면**
- [ ] `AppContext`: `ADD_CHALLENGE`, `CERTIFY`, `TOGGLE_FEED_VIEW` actions
- [ ] `mocks/feed-seed.json` (5-10개 시드 — picsum.photos 이미지)
- [ ] `mocks/myPosts-seed.json` (빈 배열)
- [ ] `screens/home/Home.tsx` — 오늘의 챌린지 카드 + 모두의 챌린지 + ≡/▦ 토글 + 무한 스크롤
- [ ] `screens/home/PostDetail.tsx`
- [ ] `screens/cert/CertTab.tsx` — 오늘의 챌린지 + 챌린지 추가 진입
- [ ] `screens/cert/ChallengeCert.tsx` —
  - 사진 picker → `URL.createObjectURL` + cleanup `revokeObjectURL` (P2 위험)
  - **picker cancel 처리** + 토스트 (failure mode)
  - 진행 중 챌린지 chip selector (1개면 자동 / 2개+면 강제 선택)
  - 글 작성 textarea + 공개/비공개 라디오
  - 업로드 → `CERTIFY` dispatch → 홈 복귀
- [ ] `screens/diary/Calendar.tsx` —
  - 3상태 셀 (완수=초록 / 미완수=흰+보더 / 미래=회색)
  - `useMemo` cells + `React.memo` 셀 (P3 perf)
  - 오늘 챌린지 카드 + "인증하기" 버튼
- [ ] `utils/date.ts` — cellState 함수
- [ ] `tests/date.test.ts` — 3 케이스 (done/missed/future)
- [ ] `screens/my/MyPage.tsx` — 닉네임 + 진행 중 챌린지 + 설정 row + 내 게시글 피드 (≡/▦)
- [ ] `screens/my/Settings.tsx` — 알림/앱/계정 섹션

**P5 — 챌린지 만들기**
- [ ] `mocks/recommendations.json` (5개 추천 — "하늘 바라보기" 등)
- [ ] `screens/create/Recommend.tsx` — embla-carousel 가로 스와이프 + 페이지 인디케이터
- [ ] `screens/create/Steps.tsx` — **D2: 단일 라우트 `/create/new` + 5 step 내부 state**
  - Step 1 제목 / 2 기간 / 3 미션 / 4 기대효과 / 5 완료
  - 공용 `<FormField>` + `<StepActions>` 재사용 (S1에서 만든 것)
  - 완료 시 `ADD_CHALLENGE` → 홈 복귀 + 토스트

### ✅ Definition of Done
- [ ] 4탭 (다이어리/홈/인증/마이) 전환 OK
- [ ] 챌린지 만들기 5단계 완료 → 홈 "오늘의 챌린지" 카드에 즉시 반영
- [ ] 챌린지 인증 (사진+글) → 다이어리 캘린더 오늘 셀 초록 + 마이페이지 내 게시글 추가
- [ ] 사진 미선택 또는 picker cancel → 업로드 비활성 + 토스트
- [ ] 진행 중 챌린지 0/1/2+개 시 chip selector 동작 다름 (1개=auto, 2+=강제 선택)
- [ ] Diary 캘린더 3상태 셀 시각 차이 명확
- [ ] 모두의 챌린지 ≡/▦ 토글 동작 + localStorage 저장
- [ ] `npm test` 통과 (4+3+dummy)

### 🎬 Demo (Sprint Review)
- "온보딩 끝난 사용자의 1일을 시연합니다" — 새 챌린지 만들기 → 홈에서 인증 진입 → 사진/글 업로드 → 다이어리 캘린더 색 변경 → 마이페이지에서 본인 게시글 확인.

### ⚠️ 위험
- **R1**: ChallengeCert chip selector — 진행 중 챌린지 0개 / 1개 / 2개+ 분기 잘못 처리하면 인증 안 됨. S3 끝에 3가지 케이스 모두 수동 검증.
- **R2**: 사진 blob URL memory leak — 체크리스트 잊으면 모바일에서 빠르게 OOM. 모든 ChallengeCert/PostDetail unmount에 cleanup 필수.
- **R3**: Diary 캘린더 3상태 cell 로직 — `utils/date.ts`가 timezone 잘못 처리하면 "오늘"이 어긋남. UTC vs KST 명시 (`date-fns-tz` 권장).
- **R4**: P4 + P5 둘 다 챌린지 데이터 의존 — 동시 작업 시 reducer state shape 충돌 주의.

### 🔀 Parallel Lanes (팀 2-3명 이점이 큰 sprint)
- Lane A (1명): Home + Diary (Calendar 포함, 데이터 read-only)
- Lane B (1명): CertTab + ChallengeCert (사진 picker가 가장 까다로움 — 시간 buffer)
- Lane C (1명): MyPage + Settings + Recommend + Steps (form-heavy)
- AppContext reducer 작업이 모두 의존 → 미리 reducer schema 합의 후 분담

---

## Sprint 4 — Polish & Demo Ready (P6)

> UT(유저 테스팅) 가능 수준으로 마감. 실제 사용자에게 "써보세요" 줄 수 있는 상태.

### 🎯 Goal
실 사용자(친구, 교수, 다른 팀)에게 줘도 "이게 뭔지 모르겠다", "버튼 안 눌려요" 같은 컴플레인 없이 풀 cycle 사용 가능.

### 📦 Scope
- [ ] Framer Motion `AnimatePresence` 화면 전환 (push: slide-right, pop: slide-left)
- [ ] 빈 상태 처리
  - 모두의 챌린지 0건 → "첫 번째가 되어볼까요?"
  - 내 게시글 0건 → "지금 인증하러 가기" 버튼
  - 추천 챌린지 0건 → "직접 만들기" fallback
  - 다이어리 챌린지 미시작 → 캘린더 비활성 + "챌린지를 시작해보세요"
- [ ] 토스트 시스템 (sonner 또는 직접 구현) — 5종
  - 챌린지 추가됨 / 인증 완료 / 사진 picker cancel / sessionStorage quota / 일반 에러
- [ ] 320pt 폭 (iPhone SE) 대응 — Tailwind responsive (기본 440pt → sm: 320pt)
- [ ] PHQ-9 9번 문항 1점+ 시 Result에 1393 안내 카드 (§8 product 결정 4번 합의 시)
- [ ] Mock OAuth 처리 (§8-3 product 결정 합의 시) — 클릭 시 자동 가입 토스트
- [ ] `README.md` — 학교 발표용
  - 서비스 한 줄 + 스크린샷 / GIF
  - 실행 가이드 (`npm i && npm run dev`)
  - 디자인 시스템 / 와이어프레임 링크 (`design.md`, `wireframe.md`)
  - 의도적으로 미구현 항목 (백엔드, OAuth, AI 분석)
- [ ] `.gitignore` (node_modules, dist, .env, .DS_Store, *.log)
- [ ] (옵션) Vercel 자동 배포 — `vercel.json` 또는 GitHub 연동
- [ ] (옵션) demo GIF 녹화 (스플래쉬 → 인증까지 30초 컷)

### ✅ Definition of Done
- [ ] iPhone SE (320pt) ~ Pro Max (440pt) 모두 레이아웃 깨짐 없음
- [ ] 빈 상태 4종 시각 확인
- [ ] 토스트 5종 시각 확인
- [ ] 친구/교수에게 README + URL 보내고 5분 내 "다 해봤어요" 받을 수 있음
- [ ] `npm run build` 성공 + bundle size 리포트 OK (~200KB 이하 권장)

### 🎬 Demo (최종 / UT)
- 실 사용자에게 디바이스 + URL 주고 "써보세요" — 30분 think-aloud UT.
- 발표 자료에 demo GIF 첨부.

### ⚠️ 위험
- **R1**: 시간 부족 — 320pt 대응이나 Vercel 배포는 cut OK. 핵심은 풀 cycle 동작 + README.
- **R2**: bundle size 폭주 (date-fns 전체 import 등) — `npm run build` 후 `vite-bundle-visualizer`로 확인, 무거운 dep tree-shaking.

### 🔀 Parallel Lanes
- Lane A (1명): 애니메이션 + 빈 상태 + 토스트
- Lane B (1명): 320pt 반응형 + bundle 최적화 + 배포
- Lane C (1명): README + GIF + UT 일정 잡기

---

## 일정 예시 (8 작업일)

| 주 | 일 | Sprint | 작업 |
|---|---|---|---|
| 1주차 | 월-화 | S1 | Foundation 셋업 + 12 컴포넌트 |
| | 수-목 | S2 | Onboarding 플로우 (Quiz 14 step 핵심) |
| | 금 | — | (S2 통합 + buffer / 자유 작업) |
| 2주차 | 월-수 | S3 | Main app + 챌린지 만들기 (3일 — 가장 무거움) |
| | 목 | S4 | Polish + README |
| | 금 | — | UT / 발표 리허설 / 버퍼 |

> 학생 part-time이면 위 일정 × 2주 (작업일 × 2 = 16 calendar days).

---

## Sprint 운영 가이드

### 매 sprint 시작
1. 이 문서 sprint 섹션 펼치고 Scope 체크박스 보기
2. 분담 (parallel lanes 참고)
3. 첫 30분: AppContext reducer schema 합의 (S2/S3 핵심)

### 매 sprint 끝
1. **Definition of Done** 체크박스 하나하나 확인 (실제로 동작하는지)
2. **Demo** 시나리오 한 번 직접 시연 (스크린 녹화 권장 — 회귀 비교용)
3. **위험** 항목 중 발생한 게 있으면 다음 sprint Scope에 carry-over
4. `git tag s1` / `s2` / ... 로 milestone 마킹

### Cross-sprint dependency
```
S1 (Foundation)
   ↓
S2 (Onboarding) ── AppContext reducer 첫 actions
   ↓
S3 (Main App) ─── reducer 확장 + 모든 화면 통합
   ↓
S4 (Polish) ───── 통합 시점에 발견된 모든 edge case 해결
```

각 sprint는 이전 sprint의 산출물에 의존. 건너뛸 수 없음.

---

## 다음 단계

1. **S1 시작 명령** (지금 바로):
   ```bash
   cd "/Users/a1234/Documents/Yonsei/UXIM /ready_action/shall_we"
   npm create vite@latest . -- --template react-ts
   ```
2. 의존성 설치 (`plan.md` §1 참고)
3. `tokens.ts` 작성 → tailwind config 연결
4. S1 끝나면 sprint review → S2 진입
