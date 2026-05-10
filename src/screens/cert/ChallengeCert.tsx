/**
 * ChallengeCert — 챌린지 인증 업로드.
 *
 * Photo upload (blob URL with cleanup), challenge chip selector
 * (0/1/2+ branching), text, public/private radio, upload.
 *
 * - Photo picker cancel → notify (graceful)
 * - blob URL revoked on unmount (memory leak prevention)
 * - 1 challenge → auto-selected + chips hidden
 * - 2+ challenges → forced selection
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ImageIcon } from 'lucide-react';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Chip } from '@/components/ui/Chip';
import { RadioOption } from '@/components/ui/RadioOption';
import { uuid } from '@/utils/id';
import { notify } from '@/utils/notify';

export default function ChallengeCert() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);

  const [photo, setPhoto] = useState<{ file: File; url: string } | null>(null);
  const [challengeId, setChallengeId] = useState<string | null>(
    state.challenges.length === 1 ? state.challenges[0].id : null,
  );
  const [text, setText] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  // Cleanup blob URL on unmount (P2 prevention)
  useEffect(() => {
    return () => {
      if (photo?.url) URL.revokeObjectURL(photo.url);
    };
  }, [photo]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      notify.pickerCanceled();
      return;
    }
    if (photo?.url) URL.revokeObjectURL(photo.url);
    setPhoto({ file, url: URL.createObjectURL(file) });
  };

  const canUpload =
    !!photo && !!challengeId && state.challenges.length > 0 && text.trim().length > 0;

  const handleUpload = () => {
    if (!canUpload) return;
    const challenge = state.challenges.find((c) => c.id === challengeId);
    if (!challenge) return;

    dispatch({
      type: 'CERTIFY',
      payload: {
        id: uuid(),
        challengeId: challenge.id,
        challengeTitle: challenge.title,
        photoUrl: photo!.url,
        text: text.trim(),
        isPublic,
        date: new Date().toISOString(),
        authorNickname: state.user.nickname || '익명',
      },
    });
    notify.certified();
    navigate('/diary');
  };

  return (
    <div className="min-h-screen pb-10 bg-bg-gray">
      <header className="px-5 pt-4 pb-3 flex items-center bg-white border-b border-gray/10 sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="text-2xl text-ink leading-none -ml-1 px-1 active:scale-90 transition-transform"
          aria-label="뒤로가기"
        >
          ←
        </button>
        <h1 className="ml-2 text-title-20 text-ink">챌린지 인증</h1>
      </header>

      <div className="px-5 mt-5 space-y-6">
        {/* Photo */}
        <section className="space-y-2">
          <h2 className="text-subtitle-16 text-ink">사진 찍기</h2>
          <div
            className="aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center shadow-sm border border-gray/10 cursor-pointer active:scale-[0.99] transition-transform"
            onClick={() => fileRef.current?.click()}
          >
            {photo ? (
              <img src={photo.url} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray">
                <Camera size={36} strokeWidth={1.5} />
                <span className="text-body-12">탭해서 사진 선택</span>
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFile}
          />
          <Button
            variant="secondary"
            leftIcon={<ImageIcon size={18} />}
            onClick={() => fileRef.current?.click()}
          >
            갤러리에서 선택
          </Button>
        </section>

        {/* Challenge selector — chip 가로 wrap */}
        {state.challenges.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-subtitle-16 text-ink">진행 중인 챌린지</h2>
            {state.challenges.length === 1 ? (
              <p className="text-body-12 text-gray pl-1">
                ✓ {state.challenges[0].title}
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {state.challenges.map((c) => (
                  <Chip
                    key={c.id}
                    label={c.title}
                    selected={challengeId === c.id}
                    onClick={() => setChallengeId(c.id)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Text */}
        <section className="space-y-2">
          <h2 className="text-subtitle-16 text-ink">글 작성</h2>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="오늘의 챌린지를 어떻게 완수했나요?"
            maxLength={1000}
          />
        </section>

        {/* Privacy */}
        <section className="space-y-2">
          <h2 className="text-subtitle-16 text-ink">공개 설정</h2>
          <div className="grid grid-cols-2 gap-2">
            <RadioOption
              label="공개"
              selected={isPublic}
              onClick={() => setIsPublic(true)}
            />
            <RadioOption
              label="비공개"
              selected={!isPublic}
              onClick={() => setIsPublic(false)}
            />
          </div>
        </section>

        <Button onClick={handleUpload} disabled={!canUpload}>
          업로드
        </Button>
      </div>
    </div>
  );
}
