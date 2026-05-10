# ShallWe — Design System

> 출처: Figma 3TEAM 파일 (`q6BM3ZWZA1UB2R0t3GBVYo`) > 디자인시스템 페이지.
> 화면 사양 기준: iPhone 16 / 17 Pro Max (440 × 956pt).
> 기본 폰트: **Roboto Regular** (한글 본문은 시스템 한글 fallback 사용).
> 본 문서는 MVP 단계 기준이며 컬러·폰트 값은 추후 변경될 수 있습니다.
> 와이어프레임은 `wireframe.md` 참고.

---

## 0. Concept & Direction

| 항목 | 정의 |
|---|---|
| 서비스 한 줄 | '쉬었음 청년'을 위한 AI 감정기록 챌린지 서비스 |
| 톤 | 부드럽고, 다그치지 않으며, 작은 성취를 축하 |
| 키 메시지 | "ShallWe와 함께 조금씩 극복해나가요" |
| 디자인 키워드 | 청량한 그린 / 충분한 여백 / 둥근 모서리 / 가독성 우선 |
| 타겟 디바이스 | iPhone 16 / 17 Pro Max (440pt 폭) — 다른 폭은 비례 확장 |

> **상태 (MVP)**: 심볼 / 워드마크 / 메인 컬러 / 대표 폰트 / 팀원 레이아웃 방향성 정의 완료.
> 미정의: 전체 UI 시스템 / 상세 색상 스타일 / 세부 인터랙션 → 본 문서 + React 구현 단계에서 보완.

---

## 1. Logo

### 자산 경로
| 자산 | 파일 | Figma 마스터 (디자인시스템 페이지) | 원본 크기 |
|---|---|---|---|
| 심볼 | `assets/logo/symbol.png` | `Component 4` (`40000607:3210`) | 260 × 260 |
| 워드마크 | `assets/logo/wordmark.png` | `Shall We` 텍스트 (`40000603:1477`) | 464 × 71 |

> SVG 버전은 Figma → Export → SVG로 추가 추출 권장 (벡터 무손실).

### 심볼
- 형태: 6엽 곡선형 마크, 중앙 작은 별/스파크
- 색상: `shallwe green` (`#24D455`) 단색
- 단독 사용 가능 (워드마크와 함께 또는 독립적으로)
- 화면 내 사용 사이즈
  - 50 × 50pt: 헤더 / 카드 안 (Figma `Component 7` 인스턴스)
  - 34 × 34pt: 작은 아이콘 (Figma `Component 2`)
  - 75 × 75pt: 빈 상태 일러스트 보조

### 워드마크
- 표기: **Shall We** (S, W 대문자)
- 폰트: 전용 로고 폰트 (Figma 디자인시스템 정의 — 굵은 산세리프 / 디스플레이)
- 색상: `shallwe black` (`#000000`) 기본 / `shallwe green` (`#24D455`) 강조
- 본문 폰트(Roboto)와 혼용 금지
- 사용처: 스플래쉬, 헤더 좌측, 결과 화면, 추가 완료 화면

### 사용 규칙
- 최소 표기 폭: 워드마크 80pt / 심볼 32pt
- 보호 영역: 심볼/워드마크 높이의 1/4 이상
- 회전·기울임·색상 임의 변경 금지
- 심볼 + 워드마크 가로 lockup은 Figma에 별도 정의 없음 — 필요 시 8pt 간격으로 배치 권장 (구현 시 확정)
- 앱 아이콘 (iOS/Android round square 컨테이너) 정의 없음 — 차후 추가 필요

---

## 2. Color

> Figma에서 사용 중인 컬러명을 그대로 유지합니다 (`shallwe white`가 다크 그레이인 점 등은 Figma 정의를 따르며, 코드에서는 별도 alias로 매핑하는 것을 권장).

### Primary Palette
| Name | Token | HEX | 용도 |
|---|---|---|---|
| shallwe green | `--color-primary` | `#24D455` | 메인 액션, 활성 상태, 강조, 진행률 바 |
| shallwe white | `--color-ink` | `#232323` | 본문 / 헤딩 텍스트 (실제는 다크 그레이) |
| shallwe black | `--color-black` | `#000000` | 진한 강조, 특수 헤딩 |

### Secondary Palette
| Name | Token | HEX | 용도 |
|---|---|---|---|
| Y Gray | `--color-secondary-gray` | `#8A8C8F` | 보조 텍스트, 비활성 상태, 보더 |
| shallwe yellow | `--color-accent-yellow` | `#FFE183` | 포인트 강조 (배지, 일러스트 보조) |
| Y Gold | `--color-accent-gold` | `#B38C45` | 노란 계열 텍스트/아이콘 |
| Blue Gradient | `--gradient-blue` | (정의 예정) | 일러스트 / 배경 보조 그라디언트 |

### Background
| Name | Token | HEX | 용도 |
|---|---|---|---|
| BG Gray | `--bg-gray` | `#F8F9F7` | 기본 화면 배경 |
| BG Green Tint | `--bg-green-tint` | `#EDF9E1` | 강조 섹션 / 결과 화면 배경 |

### 컬러 사용 가이드
- 주요 CTA(가입하기 / 다음 / 챌린지 시작 / 인증하기) → `shallwe green`
- 비활성 버튼 → `Y Gray` 50% opacity 또는 BG Gray 위 회색 텍스트
- 본문 텍스트 → `shallwe white` (다크 그레이)
- 보조 텍스트 / placeholder → `Y Gray`
- 카드 배경 → `#FFFFFF` (실제 흰색) on `BG Gray` 페이지
- 위험 액션 (회원탈퇴) → 별도 시스템 적색 (`#E5484D` 권장, 추후 정의)
- 자해/자살 안내 카드 → `BG Green Tint` 배경 + `shallwe green` 강조

### 접근성 (WCAG)
- 본문 텍스트는 배경 대비 4.5:1 이상 유지
- `shallwe green` on white 대비 ≈ 1.7:1 → 텍스트로는 부적합, 버튼 배경 + 흰색 텍스트로 사용
- `shallwe green` on `shallwe white(#232323)` 대비 ≈ 4.7:1 → 다크 모드 텍스트 사용 가능

---

## 3. Typography

### 폰트
- **본문 폰트**: Roboto Regular (영문) + 한글 시스템 폰트 fallback (Apple SD Gothic Neo / Pretendard 등)
- **로고 폰트**: 전용 로고 폰트 (워드마크 전용, 본문 사용 금지)

### 사이즈 스케일
> **최소 사이즈: 12pt** (12pt 미만 사용 금지)

| Name | Weight | Size | Line-Height | Letter-Spacing | 용도 |
|---|---|---|---|---|---|
| Title 24 | Bold | 24 | 140% (33.6) | 0% | 화면 메인 헤딩 (예: 검사 결과) |
| Title 20 | Bold | 20 | 140% (28) | -0.5% | 섹션 헤딩, 모달 타이틀 |
| Sub Title 16 | SemiBold | 16 | 100% (16) | 0% | 카드 헤딩, 라벨 |
| Body 14 | Regular | 14 | 140% (19.6) | 0% | 본문 기본 |
| Body 12 (small) | Regular | 12 | 100% (12) | 0% | 캡션, 도움말, 메타 정보 (날짜 등) |

### 사용 가이드
- 한 화면 내 헤딩은 **2단계 이내**로 제한 (Title 24 → Sub Title 16 권장)
- 본문은 Body 14가 기본, 길어지면 자동 줄바꿈 + line-height 140% 유지
- Body 12 small은 라벨·메타 한정 (긴 본문 사용 금지)
- 한글 본문은 letter-spacing -1% 정도 추가 적용 권장 (Roboto는 영문 기준)
- 숫자 강조 (예: "33일 / 100일") → Title 20 Bold

---

## 4. Spacing & Layout

### Grid
- 화면 폭: 440pt 기준, 좌우 패딩 **20pt** 고정
- 콘텐츠 영역 폭: 400pt
- 카드 사이 간격: **12pt**
- 섹션 사이 간격: **24pt**
- 헤더 ↔ 본문 간격: 16pt

### Spacing Scale (4의 배수)
| Token | Value | 용도 |
|---|---|---|
| `space-1` | 4 | 아이콘 ↔ 텍스트 |
| `space-2` | 8 | 인라인 요소 간격 |
| `space-3` | 12 | 카드 내부 행 간격 |
| `space-4` | 16 | 본문 ↔ 헤딩 |
| `space-5` | 20 | 화면 좌우 패딩 |
| `space-6` | 24 | 섹션 간격 |
| `space-8` | 32 | 큰 섹션 분리 |
| `space-10` | 40 | 풀스크린 여백 (스플래쉬 등) |

### Radius
| Token | Value | 용도 |
|---|---|---|
| `radius-sm` | 8 | 작은 태그, 칩 |
| `radius-md` | 12 | 입력 필드, 버튼 |
| `radius-lg` | 16 | 카드, 모달 |
| `radius-xl` | 24 | 일러스트 컨테이너, 큰 카드 |
| `radius-full` | 9999 | 원형 아바타, 인디케이터 |

### Shadow
| Token | Value |
|---|---|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.04)` (입력 필드) |
| `shadow-md` | `0 2px 8px rgba(0,0,0,0.06)` (카드 기본) |
| `shadow-lg` | `0 4px 16px rgba(0,0,0,0.08)` (모달, 플로팅) |

---

## 5. Components

> 본 절은 Figma 완성본에서 식별된 컴포넌트입니다. 변형(state)은 React 구현 시 prop으로 표현하세요.

### 5.1 Button

**Primary (full-width)**
- 배경: `shallwe green`
- 텍스트: 흰색 (`#FFFFFF`), Sub Title 16 SemiBold
- 높이: 52pt
- 모서리: `radius-md` (12)
- 사용처: 가입하기, 다음, 챌린지 시작, 인증하기, 홈으로 이동
- 비활성: 배경 `Y Gray` @ 40%, 텍스트 흰색

**Secondary (outline)**
- 배경: 투명
- 보더: 1px `shallwe green`
- 텍스트: `shallwe green`, Sub Title 16 SemiBold
- 사용처: 이전, 나중에 할게요

**Social (구글)**
- 배경: 흰색
- 보더: 1px `Y Gray` @ 30%
- 텍스트: `shallwe white(#232323)`, Sub Title 16 SemiBold
- 좌측 아이콘 24pt: G (구글 로고)
- 사용처: 구글로 계속

**Pair (이전/다음)**
- 두 버튼 가로 배치, 비율 1:2
- 이전: Secondary outline, 다음: Primary

### 5.2 Input

**Text Field**
- 배경: 흰색
- 보더: 1px `Y Gray` @ 30%
- 모서리: `radius-md`
- 높이: 48pt (단일 라인)
- 패딩: 좌우 16pt
- placeholder: `Y Gray`, Body 14
- 입력값: `shallwe white`, Body 14
- 포커스: 보더 `shallwe green`, 외곽 그림자 없음
- 에러: 보더 빨강 + 하단 에러 메시지 Body 12

**Helper Text**
- 위치: 입력 필드 하단, Body 12, `Y Gray`
- 예: "2-10자", "8자 이상, 영문 + 숫자 + 특수문자"

**Textarea (글 작성)**
- 최소 높이: 120pt, 자동 확장
- 그 외 Text Field와 동일

### 5.3 Card

**Today Challenge Card** (오늘의 챌린지)
- 배경: 흰색
- 모서리: `radius-lg`
- 패딩: 16pt
- 그림자: `shadow-md`
- 구성: 챌린지명 (Sub Title 16) / 기간 (Body 12) / 누적 완수일 (Body 14)

**Feed Card** (모두의 챌린지)
- 배경: 흰색
- 모서리: `radius-lg`
- 패딩: 16pt
- 사진 영역: 좌측 80pt × 80pt 또는 상단 풀폭 (둘 다 가능)
- 본문 미리보기 2~3줄 후 말줄임

**Recommendation Card** (챌린지 추천)
- Feed Card와 동일하나, 우측 상단에 "추천" 배지 (yellow)
- 5단 구성 (Figma 일치):
  - 짧은 타이틀 (Sub Title 16) — "하늘 바라보기"
  - 액션 설명 (Title 20 Bold) — "하루에 한 번 하늘 보기"
  - 미션 라벨 + 본문 (Body 14)
  - 타겟 디스크립션 (Body 14)
  - 기대효과 라벨 + 본문 (Body 14)

**Add Challenge Card** (챌린지 추가 진입)
- 배경: `BG Green Tint`
- 모서리: `radius-lg`
- 중앙 정렬, 큰 + 아이콘 + "챌린지 추가" 텍스트

### 5.4 Selector

**Radio Option** (PHQ-9 답변)
- 박스형 옵션 4개 (전혀 그렇지 않다 / 며칠 / 자주 / 거의 매일)
- 배경: 흰색, 보더 1px `Y Gray` @ 30%, 모서리 `radius-md`
- 선택: 배경 `BG Green Tint`, 보더 `shallwe green` 1.5px, 텍스트 `shallwe green`
- 높이: 48pt, 패딩 좌 20pt

**Period Pill** (기간 선택 — 3일 / 7일 등)
- 박스형 6개 (3 × 2 그리드)
- 배경: 흰색, 보더 1px `Y Gray` @ 30%, 모서리 `radius-md`
- 선택 시 색상 변화는 Radio Option과 동일

**Pole Choice** (선호도 양극 2지선다 — 정적인 / 역동적인 등)
- 좌우 2개 박스(Pill), 단일 선택
- 각 박스: 높이 44pt, 동일 폭 1:1, 사이 간격 8pt
- 기본: 배경 흰색, 보더 1px `Y Gray` @ 30%, 텍스트 `shallwe white(#232323)` Sub Title 16
- 선택: 배경 `BG Green Tint`, 보더 `shallwe green` 1.5px, 텍스트 `shallwe green`
- > Figma 완성본 자가진단10에는 양극 라벨 + 21x21 마커 2개 형식으로 작성됨. 본 컴포넌트는 명시적 Pill 형태 (구현 시 둘 중 하나 확정 필요).

**Chip** (인증 화면 — 진행 중인 챌린지 선택)
- 박스형, 가로 wrap (한 줄에 화면 폭 허용 만큼)
- 각 chip: 높이 44pt, 좌우 패딩 16pt, 모서리 `radius-md`
- 기본: 배경 흰색, 보더 1px `Y Gray` @ 30%, 텍스트 Body 14
- 선택: 배경 `BG Green Tint`, 보더 `shallwe green` 1.5px, 텍스트 `shallwe green`
- 단일 선택 (라디오 거동)

### 5.5 Progress

**Linear Progress Bar**
- 트랙: `Y Gray` @ 20%, 높이 4pt, 모서리 `radius-full`
- Fill: `shallwe green`
- 사용처: PHQ-9 진행률, 챌린지 진행률 (33/100일)

**Step Pagination** (1/10, 2/10 …)
- 텍스트 라벨: Body 12, `Y Gray`
- 선택적으로 도트 인디케이터(●●●○○○) 사용 가능

### 5.6 Bottom Navigation

- 4개 탭: 다이어리 / 홈 / 인증 / 마이
- 높이: 64pt + safe area
- 배경: 흰색, 상단 hairline 1px `Y Gray` @ 20%
- 활성 탭
  - 아이콘: `shallwe green`
  - 라벨: Body 12, `shallwe green`, SemiBold
- 비활성 탭
  - 아이콘 / 라벨: `Y Gray`
- 표시 화면: 홈 / 다이어리 / 인증 / 마이
- 미표시 화면: 온보딩 전체, 챌린지 만들기 플로우, 챌린지 인증, 검사 결과 모달

### 5.7 Header

- 좌측: 워드마크 "Shall We" (로고 폰트)
- 우측: 챌린지 추가(+) 아이콘 24pt, 탭 시 챌린지 탐색(13번)으로 이동
- 높이: 56pt
- 배경: 흰색 또는 화면 배경과 동일 (탭 화면), 모달은 헤더 대신 뒤로가기(←)만

### 5.8 Calendar

- 월간 그리드 (월~일, 7열 × 4-6행)
- 헤더: 요일 라벨 (월/화/수/목/금/토/일) Body 12 SemiBold
- 셀: 40pt × 40pt
- **셀 상태 (3가지)**
  - **완수일**: 배경 `shallwe green` 채움 원, 텍스트 흰색 SemiBold
  - **미완수일** (이미 지난 날인데 인증 안 함): 배경 흰색, 보더 1px `Y Gray` @ 30%, 텍스트 `shallwe white(#232323)`
  - **미래일** (아직 날짜가 지나지 않음): 배경 `Y Gray` @ 20%, 텍스트 `Y Gray` @ 60% (탭 비활성)
- **오늘**: 위 3상태 중 하나에 추가로 보더 1.5px `shallwe green` (중첩)
- 비활성(이전/다음 달): `Y Gray` @ 50%, 탭 비활성
- 탭 → 게시물 상세 (완수일만)
- > Figma 완성본 캘린더는 셀당 색상 구분 없이 숫자만 표시 — 본 사양은 사용자 요청에 따라 3상태 추가. Figma 업데이트 필요.

### 5.9 Loading

**Loading**
- 로고 + "{nickname}님의 마음을 읽고 있어요!" 텍스트
- 하단 점 3개 인디케이터 (타이밍 0.4s 간격)
- 사용처: 결과 분석 로딩 (검사 → 결과 사이)

> 참고: Figma 완성본 자가진단12(검사 결과)는 단계 시각화(막대 차트, dot indicator 등)가 없고 단계명 텍스트만 노출. 따라서 본 디자인 시스템에서도 별도의 "Result Bar" 컴포넌트를 정의하지 않음.

---

## 6. Iconography

- 시스템 기준: SF Symbols 또는 Lucide (24pt 기본, stroke 1.5)
- 핵심 아이콘
  - 다이어리: book / calendar
  - 홈: house
  - 인증: check-circle
  - 마이: user
  - 추가: plus
  - 뒤로가기: chevron-left
  - 카메라: camera
  - 갤러리: image
  - 알림: bell
  - 설정: gear
- 아이콘 색상은 텍스트 컬러 토큰을 따름 (활성 = `shallwe green`, 비활성 = `Y Gray`)

---

## 7. Motion

| 인터랙션 | 시간 | 이징 |
|---|---|---|
| 버튼 탭 (state 변화) | 120ms | ease-out |
| 화면 전환 (push/pop) | 280ms | ease-in-out |
| 모달 등장 / 사라짐 | 200ms | ease-out |
| Tab 전환 | 0ms (즉시) | — |
| 로딩 점 인디케이터 | 1.2s loop | ease-in-out |
| 진행률 바 fill | 400ms | ease-out |

> 과한 애니메이션은 지양. "잘 안 움직이는 듯하지만 자연스러운" 톤이 ShallWe의 정체성.

---

## 8. Tokens (Design ↔ Code Mapping)

```css
:root {
  /* color — primary */
  --color-primary: #24D455;
  --color-ink: #232323;          /* Figma: shallwe white */
  --color-black: #000000;

  /* color — secondary */
  --color-secondary-gray: #8A8C8F;
  --color-accent-yellow: #FFE183;
  --color-accent-gold: #B38C45;

  /* color — background */
  --bg-gray: #F8F9F7;
  --bg-green-tint: #EDF9E1;
  --bg-card: #FFFFFF;

  /* typography */
  --font-base: 'Roboto', 'Apple SD Gothic Neo', 'Pretendard', sans-serif;

  --text-title-24: 700 24px/1.4 var(--font-base);
  --text-title-20: 700 20px/1.4 var(--font-base);
  --text-subtitle-16: 600 16px/1   var(--font-base);
  --text-body-14:    400 14px/1.4 var(--font-base);
  --text-body-12:    400 12px/1   var(--font-base);

  /* spacing */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px;
  --space-4: 16px; --space-5: 20px; --space-6: 24px;
  --space-8: 32px; --space-10: 40px;

  /* radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* shadow */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.08);

  /* layout */
  --screen-padding-x: var(--space-5);
  --content-max-width: 400px;
}
```

### React (styled-components / Tailwind 매핑 예시)
```ts
// tokens.ts
export const colors = {
  primary: '#24D455',
  ink: '#232323',
  black: '#000000',
  gray: '#8A8C8F',
  yellow: '#FFE183',
  gold: '#B38C45',
  bg: { gray: '#F8F9F7', greenTint: '#EDF9E1', card: '#FFFFFF' },
} as const;

export const typography = {
  title24: { fontWeight: 700, fontSize: 24, lineHeight: 1.4, letterSpacing: 0 },
  title20: { fontWeight: 700, fontSize: 20, lineHeight: 1.4, letterSpacing: '-0.5%' },
  subtitle16: { fontWeight: 600, fontSize: 16, lineHeight: 1, letterSpacing: 0 },
  body14: { fontWeight: 400, fontSize: 14, lineHeight: 1.4, letterSpacing: 0 },
  body12: { fontWeight: 400, fontSize: 12, lineHeight: 1, letterSpacing: 0 },
} as const;
```

---

## 9. 미정의 / 결정 필요

향후 디자인 / 개발 과정에서 합의가 필요한 항목입니다.

| 항목 | 상태 | 비고 |
|---|---|---|
| Blue Gradient 정확한 컬러 스톱 | 미정의 | Secondary 계열, 일러스트 보조용 |
| Error / Warning 컬러 | 미정의 | `#E5484D` (Radix red 9) 등 시스템 적색 추천 |
| Success 컬러 | 미정의 | `shallwe green` 재활용 가능 |
| 다크 모드 | 미정의 | MVP 이후 |
| 타이포 한글 letter-spacing 보정값 | 미정의 | 본문 -1% 권장, 헤딩 별도 |
| Pole Choice 시각 (Pill vs 양극 라벨+마커) | 미정의 | Figma 자가진단10은 양극+마커 형식, 본 문서는 Pill 명시 — 통일 필요 |
| 좋아요 / 댓글 등 소셜 인터랙션 | 미정의 | 비교 압박 최소화 방향 |
| 회원탈퇴 플로우 모달 | 미정의 | 비밀번호 재확인 + 데이터 처리 안내 |
| 심볼 + 워드마크 가로 lockup | 미정의 | Figma에 별도 lockup 컴포넌트 없음 |
| 앱 아이콘 (iOS / Android) | 미정의 | round-square 컨테이너 + safe zone 디자인 필요 |
| 로고 SVG 추출 | 미완료 | 현재 PNG만. 벡터 무손실용 SVG export 필요 |

### Figma 와의 의도적 divergence (Figma 업데이트 필요)

| 항목 | wireframe.md / design.md | Figma 완성본 |
|---|---|---|
| 챌린지 추천 (13번) | Horizontal swipe 캐러셀 | Vertical scroll list |
| 다이어리 캘린더 (19번) | 3색 셀 (완수/미완수/미래) | 숫자만, 셀 색상 없음 |
| 마이페이지 설정 (21번) | "설정" 단독 row | streak 블록 안 inline 링크 |
| 검사 결과 4단계 시각화 (8번) | 텍스트만 (Figma 일치) | 텍스트만 |
| 챌린지 인증 chip selector (12번) | Chip 형식 (Figma 일치) | Chip 2개 |

---

## 10. 변경 이력

| 일자 | 변경 | 작성자 |
|---|---|---|
| 2026-05-10 | 초안 작성 (Figma 완성본 + 사용자 제공 토큰 기반) | — |
