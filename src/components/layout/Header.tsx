import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  showAdd?: boolean;
  showBack?: boolean;
  title?: string;
}

export function Header({ showAdd = true, showBack = false, title }: Props) {
  const navigate = useNavigate();

  return (
    <header className="h-14 px-5 flex items-center justify-between bg-white border-b border-gray/10 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="text-2xl text-ink leading-none -ml-1 px-1 active:scale-90 transition-transform"
            aria-label="뒤로가기"
          >
            ←
          </button>
        )}
        {title ? (
          <h1 className="text-title-20 text-ink">{title}</h1>
        ) : (
          <img src="/logo/wordmark.png" alt="Shall We" className="h-5" />
        )}
      </div>
      {showAdd && (
        <button
          onClick={() => navigate('/create')}
          className="text-ink p-1.5 -mr-1.5 active:scale-90 transition-transform"
          aria-label="챌린지 추가"
        >
          <Plus size={24} strokeWidth={2.25} />
        </button>
      )}
    </header>
  );
}
