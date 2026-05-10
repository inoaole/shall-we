/**
 * Dev showcase — every UI primitive in every variant.
 * Visual smoke test: open /dev/components and eyeball it.
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
import { Calendar, type CellState } from '@/components/ui/Calendar';
import { Loading } from '@/components/ui/Loading';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-title-20 text-ink mb-3">{title}</h2>
      <div className="space-y-2 bg-white p-4 rounded-lg shadow-sm">{children}</div>
    </section>
  );
}

export default function DevComponents() {
  const [radio, setRadio] = useState('며칠 그랬다');
  const [period, setPeriod] = useState<number | null>(7);
  const [pole, setPole] = useState('정적인');
  const [chip, setChip] = useState('산책 10분 하기');

  const today = new Date();
  const cells: { day: number; state: CellState; isToday?: boolean; date: Date }[] = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const date = new Date(today.getFullYear(), today.getMonth(), day);
    let state: CellState = 'missed';
    if (day < today.getDate()) state = day % 2 === 0 ? 'done' : 'missed';
    else if (day > today.getDate()) state = 'future';
    else state = 'today-empty';
    return { day, state, isToday: day === today.getDate(), date };
  });

  return (
    <div className="px-5 py-6 pb-24 bg-bg-gray min-h-screen">
      <h1 className="text-title-24 text-ink mb-2">UI Components</h1>
      <p className="text-body-14 text-gray mb-6">
        S1 visual smoke test. design.md §5 모든 primitive.
      </p>

      <Section title="Typography">
        <p className="text-title-24 text-ink">Title 24 — 화면 메인 헤딩</p>
        <p className="text-title-20 text-ink">Title 20 — 섹션 헤딩</p>
        <p className="text-subtitle-16 text-ink">Sub Title 16 — 카드 헤딩</p>
        <p className="text-body-14 text-ink">Body 14 — 본문 기본</p>
        <p className="text-body-12 text-gray">Body 12 — 캡션 / 메타</p>
      </Section>

      <Section title="Color">
        <div className="flex flex-wrap gap-2">
          {[
            ['primary', '#24D455'],
            ['ink', '#232323'],
            ['gray', '#8A8C8F'],
            ['yellow', '#FFE183'],
            ['gold', '#B38C45'],
            ['bg-gray', '#F8F9F7'],
            ['bg-green-tint', '#EDF9E1'],
          ].map(([name, hex]) => (
            <div key={name} className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-md border border-gray/20"
                style={{ background: hex }}
              />
              <span className="text-body-12 text-ink">
                {name}
                <br />
                <span className="text-gray">{hex}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Button">
        <Button>Primary (full)</Button>
        <Button disabled>Primary disabled</Button>
        <Button variant="secondary">Secondary outline</Button>
        <Button variant="social" leftIcon={<span className="font-bold">G</span>}>
          구글로 계속
        </Button>
        <div className="flex gap-2">
          <Button variant="secondary" size="pair-prev">이전</Button>
          <Button size="pair-next">다음</Button>
        </div>
      </Section>

      <Section title="Input / Textarea">
        <Input label="닉네임" placeholder="Shall We" helper="2-10자" />
        <Input
          label="비밀번호"
          type="password"
          placeholder="Shall We"
          error="8자 이상, 영문 + 숫자 + 특수문자"
        />
        <Textarea label="글 작성" placeholder="오늘의 챌린지를 어떻게 완수했나요?" />
      </Section>

      <Section title="Card">
        <TodayCard title="산책 10분 하기" durationDays={7} completedDays={8} />
        <FeedCard
          title="산책 30분 하기"
          body="오늘 날씨가 정말 좋아서 한강에 다녀왔어요! 30분 걸었더니 우울한 기분이 사라지고..."
        />
        <FeedCard title="산책" body="비공개 게시글" isPrivate />
        <RecommendCard
          shortTitle="하늘 바라보기"
          action="하루에 한 번 하늘 보기"
          mission="고개 들어서 하늘 한 번 보기"
          target="스마트폰 보다 거북목 되기 직전인 당신에게"
          effect="거북목 스트레칭과 한숨 돌리기"
        />
        <AddCard caption="나만의 목표를 세워보세요!" />
      </Section>

      <Section title="Selector — Radio (PHQ-9)">
        {['전혀 그렇지 않다', '며칠 그랬다', '자주 그랬다', '거의 매일 그랬다'].map((label) => (
          <RadioOption
            key={label}
            label={label}
            selected={radio === label}
            onClick={() => setRadio(label)}
          />
        ))}
      </Section>

      <Section title="Selector — PeriodPill">
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

      <Section title="Selector — PoleChoice (양극 2지선다)">
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
        <ProgressBar value={0.3} />
        <ProgressBar value={0.7} />
        <ProgressBar value={1} />
        <StepPagination current={3} total={10} />
        <StepPagination current={10} total={10} label="단계" />
      </Section>

      <Section title="Calendar (3상태 셀)">
        <Calendar
          year={today.getFullYear()}
          month={today.getMonth()}
          cells={cells}
        />
        <p className="text-body-12 text-gray mt-3">
          ● 완수 (초록 채움) &nbsp;&nbsp;○ 미완수 (흰 + 보더) &nbsp;&nbsp;░ 미래 (회색)
        </p>
      </Section>

      <Section title="Loading">
        <Loading />
      </Section>
    </div>
  );
}
