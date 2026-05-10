/**
 * Dev showcase — every UI primitive in every variant.
 * Visual smoke test: open /dev/components and eyeball it.
 *
 * S1 polish: section bg removed (was bg-white, made cards invisible);
 * cards now sit directly on bg-bg-gray to demonstrate their elevation;
 * color showcase rebuilt as named swatch grid.
 */

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { TodayCard, FeedCard, RecommendCard, AddCard } from '@/components/ui/Card';
import { RadioOption } from '@/components/ui/RadioOption';
import { PeriodPill } from '@/components/ui/PeriodPill';
import { PoleChoice } from '@/components/ui/PoleChoice';
import { Chip } from '@/components/ui/Chip';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StepPagination } from '@/components/ui/StepPagination';
import { Calendar, CalendarCell, type CellState } from '@/components/ui/Calendar';
import { Loading } from '@/components/ui/Loading';

function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="mb-4">
        <h2 className="text-title-20 text-ink">{title}</h2>
        {sub && <p className="text-body-12 text-gray mt-1">{sub}</p>}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

const swatches: { name: string; hex: string; token: string; textHint?: 'light' | 'dark' }[] = [
  { name: 'Primary',       hex: '#24D455', token: 'bg-primary',       textHint: 'light' },
  { name: 'Ink',           hex: '#232323', token: 'bg-ink',           textHint: 'light' },
  { name: 'Gray',          hex: '#8A8C8F', token: 'bg-gray',          textHint: 'light' },
  { name: 'Yellow',        hex: '#FFE183', token: 'bg-yellow',        textHint: 'dark' },
  { name: 'Gold',          hex: '#B38C45', token: 'bg-gold',          textHint: 'light' },
  { name: 'BG Gray',       hex: '#F8F9F7', token: 'bg-bg-gray',       textHint: 'dark' },
  { name: 'BG Green Tint', hex: '#EDF9E1', token: 'bg-bg-green-tint', textHint: 'dark' },
  { name: 'White',         hex: '#FFFFFF', token: 'bg-white',         textHint: 'dark' },
];

export default function DevComponents() {
  const [radio, setRadio] = useState('며칠 그랬다');
  const [period, setPeriod] = useState<number | null>(7);
  const [pole, setPole] = useState('정적인');
  const [chip, setChip] = useState('산책 10분 하기');

  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const cells: { day: number; state: CellState; isToday?: boolean; date: Date }[] = Array.from(
    { length: lastDay },
    (_, i) => {
      const day = i + 1;
      const date = new Date(today.getFullYear(), today.getMonth(), day);
      let state: CellState = 'missed';
      if (day < today.getDate()) state = day % 3 === 0 ? 'missed' : 'done';
      else if (day > today.getDate()) state = 'future';
      else state = 'today-empty';
      return { day, state, isToday: day === today.getDate(), date };
    }
  );

  return (
    <div className="px-5 pt-6 pb-24 bg-bg-gray min-h-screen">
      <header className="mb-8">
        <h1 className="text-title-24 text-ink">UI Components</h1>
        <p className="text-body-14 text-gray mt-1">
          S1 visual smoke test — design.md §5 모든 primitive
        </p>
      </header>

      <Section title="Typography" sub="design.md §3 — 12pt 미만 미사용">
        <div className="bg-white rounded-xl shadow-md p-5 space-y-3">
          <p className="text-title-24 text-ink">Title 24 / Bold — 화면 메인 헤딩</p>
          <p className="text-title-20 text-ink">Title 20 / Bold — 섹션 헤딩</p>
          <p className="text-subtitle-16 text-ink">Sub Title 16 / SemiBold — 카드 헤딩</p>
          <p className="text-body-14 text-ink">Body 14 / Regular — 본문 기본</p>
          <p className="text-body-12 text-gray">Body 12 / Regular — 캡션 / 메타</p>
        </div>
      </Section>

      <Section title="Color" sub="single source: src/tokens.ts">
        <div className="grid grid-cols-2 gap-3">
          {swatches.map((s) => (
            <div key={s.name} className="bg-white rounded-xl overflow-hidden shadow-md">
              <div
                className={`h-20 flex items-end p-3 ${s.token} ${
                  s.textHint === 'light' ? 'text-white' : 'text-ink'
                } ${s.name === 'White' || s.name === 'BG Gray' ? 'border-b border-gray/20' : ''}`}
              >
                <span className="text-subtitle-16">{s.name}</span>
              </div>
              <div className="px-3 py-2">
                <code className="text-body-12 text-gray">{s.hex}</code>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Button">
        <div className="space-y-3">
          <Button>Primary (full)</Button>
          <Button disabled>Primary disabled</Button>
          <Button variant="secondary">Secondary outline</Button>
          <Button variant="social" leftIcon={<span className="font-bold text-lg">G</span>}>
            구글로 계속
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" size="pair-prev">이전</Button>
            <Button size="pair-next">다음</Button>
          </div>
        </div>
      </Section>

      <Section title="Input / Textarea">
        <div className="space-y-4">
          <Input label="닉네임" placeholder="Shall We" helper="2-10자" />
          <Input
            label="비밀번호"
            type="password"
            placeholder="********"
            error="8자 이상, 영문 + 숫자 + 특수문자"
          />
          <Textarea label="글 작성" placeholder="오늘의 챌린지를 어떻게 완수했나요?" />
        </div>
      </Section>

      <Section title="Card — 4 variants" sub="D-S1.2: 분리된 컴포넌트, 같은 파일">
        <TodayCard title="산책 10분 하기" durationDays={7} completedDays={8} />
        <FeedCard
          title="산책 30분 하기"
          body="오늘 날씨가 정말 좋아서 한강에 다녀왔어요! 30분 걸었더니 우울한 기분이 사라지고 긍정적인 생각이 들었어요."
        />
        <FeedCard
          title="아침 6시 기상"
          body="비공개로 적어둔 일기예요. 오늘은 좀 힘들었네요."
          isPrivate
        />
        <RecommendCard
          shortTitle="하늘 바라보기"
          action="하루에 한 번 하늘 보기"
          mission="고개 들어서 하늘 한 번 보기"
          target="스마트폰 보다 거북목 되기 직전인 당신에게"
          effect="거북목 스트레칭과 한숨 돌리기"
        />
        <AddCard caption="나만의 목표를 세워보세요!" />
      </Section>

      <Section title="Selector — Radio (PHQ-9 답변)">
        <div className="space-y-2">
          {['전혀 그렇지 않다', '며칠 그랬다', '자주 그랬다', '거의 매일 그랬다'].map((label) => (
            <RadioOption
              key={label}
              label={label}
              selected={radio === label}
              onClick={() => setRadio(label)}
            />
          ))}
        </div>
      </Section>

      <Section title="Selector — Period Pill (챌린지 기간)">
        <div className="grid grid-cols-2 gap-2">
          {[3, 7, 14, 21, 28].map((d) => (
            <PeriodPill
              key={d}
              label={`${d}일`}
              selected={period === d}
              onClick={() => setPeriod(d)}
            />
          ))}
          <PeriodPill label="직접입력" selected={period === null} onClick={() => setPeriod(null)} />
        </div>
      </Section>

      <Section title="Selector — Pole Choice (양극 2지선다)">
        <PoleChoice
          left={{ label: '정적인', value: '정적인' }}
          right={{ label: '역동적인', value: '역동적인' }}
          value={pole}
          onChange={setPole}
        />
      </Section>

      <Section title="Selector — Chip (인증 진행 중 챌린지)">
        <div className="flex flex-wrap gap-2">
          {['산책 10분 하기', '하루 한 번 하늘 보기', '아침 6시 기상'].map((c) => (
            <Chip key={c} label={c} selected={chip === c} onClick={() => setChip(c)} />
          ))}
        </div>
      </Section>

      <Section title="Progress / Step">
        <div className="bg-white rounded-xl shadow-md p-5 space-y-4">
          <div className="space-y-2">
            <p className="text-body-12 text-gray">30%</p>
            <ProgressBar value={0.3} />
          </div>
          <div className="space-y-2">
            <p className="text-body-12 text-gray">70%</p>
            <ProgressBar value={0.7} />
          </div>
          <div className="space-y-2">
            <p className="text-body-12 text-gray">100%</p>
            <ProgressBar value={1} />
          </div>
          <div className="pt-2 border-t border-gray/10 space-y-1">
            <StepPagination current={3} total={10} />
            <br />
            <StepPagination current={10} total={10} label="단계" />
          </div>
        </div>
      </Section>

      <Section title="Calendar (3상태 셀 — 사각형)">
        <div className="bg-white rounded-xl border border-gray/15 shadow-sm p-5">
          <Calendar
            year={today.getFullYear()}
            month={today.getMonth()}
            cells={cells}
            renderCell={(c, onClick) => (
              <CalendarCell day={c.day} state={c.state} isToday={c.isToday} onClick={onClick} />
            )}
          />
          <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-gray/10 text-body-12 text-gray">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-primary" /> 완수
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-white border border-gray/30" /> 미완수
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-bg-gray" /> 미래
            </span>
          </div>
        </div>
      </Section>

      <Section title="Loading">
        <div className="bg-white rounded-xl shadow-md p-5">
          <Loading />
        </div>
      </Section>
    </div>
  );
}
