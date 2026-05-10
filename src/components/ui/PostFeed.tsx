/**
 * PostFeed — 공용 게시글 피드 (D-S3.4: DRY).
 *
 * Used by:
 *   - 홈 (모두의 챌린지) — feed prop = state.feed
 *   - 마이페이지 (내 게시글) — feed prop = state.posts
 *
 * Same UI + view toggle + empty state, different data source.
 */

import { LayoutGrid, AlignJustify } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FeedCard } from './Card';
import { EmptyState } from './EmptyState';
import type { Post, FeedView } from '@/store/AppContext';

interface Props {
  title: string;
  posts: Post[];
  viewMode: FeedView;
  onToggleView: () => void;
  emptyMessage?: string;
  emptyAction?: { label: string; onClick: () => void };
}

export function PostFeed({
  title,
  posts,
  viewMode,
  onToggleView,
  emptyMessage = '아직 게시글이 없어요',
  emptyAction,
}: Props) {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-subtitle-16 text-ink">{title}</h2>
        <div className="flex items-center gap-1 bg-white rounded-full p-0.5 shadow-sm">
          <button
            onClick={() => viewMode !== 'list' && onToggleView()}
            aria-label="리스트 뷰"
            aria-pressed={viewMode === 'list'}
            className={`p-1.5 rounded-full transition-colors ${
              viewMode === 'list' ? 'bg-bg-green-tint text-primary' : 'text-gray'
            }`}
          >
            <AlignJustify size={16} />
          </button>
          <button
            onClick={() => viewMode !== 'grid' && onToggleView()}
            aria-label="그리드 뷰"
            aria-pressed={viewMode === 'grid'}
            className={`p-1.5 rounded-full transition-colors ${
              viewMode === 'grid' ? 'bg-bg-green-tint text-primary' : 'text-gray'
            }`}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {posts.length === 0 ? (
        <EmptyState message={emptyMessage} action={emptyAction} />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 gap-3">
          {posts.map((p) => (
            <FeedCard
              key={p.id}
              title={p.challengeTitle}
              body={p.text}
              photoUrl={p.photoUrl}
              isPrivate={!p.isPublic}
              layout="grid"
              onClick={() => navigate(`/post/${p.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <FeedCard
              key={p.id}
              title={p.challengeTitle}
              body={p.text}
              isPrivate={!p.isPublic}
              layout="list"
              onClick={() => navigate(`/post/${p.id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
