import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useApp } from '@/store/AppContext';
import { format } from 'date-fns';
import { Lock, Globe, ImageOff } from 'lucide-react';
import { BackHeader } from '@/components/layout/BackHeader';

export default function PostDetail() {
  const { id } = useParams();
  const { state } = useApp();
  const [imgError, setImgError] = useState(false);

  // Search both feed (others' posts) and posts (mine)
  const post = state.feed.find((p) => p.id === id) || state.posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-bg-gray">
        <BackHeader sticky />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-body-14 text-gray">게시글을 찾을 수 없어요</p>
        </div>
      </div>
    );
  }

  const isBlobUrl = post.photoUrl.startsWith('blob:');
  const showPlaceholder = imgError || (isBlobUrl && false); // blob URLs may be invalid after refresh

  return (
    <div className="min-h-screen bg-bg-gray pb-10">
      <BackHeader title="챌린지 인증" sticky />

      <div className="px-5 space-y-4">
        <div className="aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center">
          {showPlaceholder ? (
            <div className="flex flex-col items-center gap-2 text-gray">
              <ImageOff size={32} />
              <span className="text-body-12">사진을 불러올 수 없어요</span>
            </div>
          ) : (
            <img
              src={post.photoUrl}
              alt=""
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-subtitle-16 text-ink">{post.challengeTitle}</h2>
            <span className="text-body-12 text-gray">
              {format(new Date(post.date), 'yyyy.MM.dd')}
            </span>
          </div>
          <p className="text-body-14 text-ink whitespace-pre-line leading-relaxed">{post.text}</p>
          <div className="flex items-center gap-2 pt-2 border-t border-gray/10 text-body-12 text-gray">
            {post.isPublic ? (
              <>
                <Globe size={14} /> 공개
              </>
            ) : (
              <>
                <Lock size={14} /> 비공개
              </>
            )}
            <span className="ml-auto">@{post.authorNickname}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
