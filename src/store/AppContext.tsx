/**
 * Single AppContext (D3 from eng review).
 *
 * v0.0.2 / S3:
 *   - challenges / posts / feed / prefs 추가
 *   - ADD_CHALLENGE / CERTIFY / TOGGLE_FEED_VIEW actions
 *   - mocks/feed-seed.json + recommendations + myPosts-seed init load
 *   - STORAGE_KEY bumped to v2 (D-S2.1: schema 변경 시 옛 v1 데이터 무시)
 */

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';
import { readStorage, writeStorage } from '@/utils/storage';
import feedSeed from '@/mocks/feed-seed.json';
import myPostsSeed from '@/mocks/myPosts-seed.json';

export type Level = '없음' | '낮음' | '중간' | '높음';

export type Challenge = {
  id: string;
  title: string;
  durationDays: number;
  mission: string;
  effect: string;
  startedAt: string; // ISO
};

export type Post = {
  id: string;
  challengeId: string;
  challengeTitle: string;
  photoUrl: string; // blob:... or external
  text: string;
  isPublic: boolean;
  date: string; // ISO
  authorNickname: string;
};

export type FeedView = 'list' | 'grid';

export type State = {
  user: { nickname: string | null; email: string | null };
  phq9: { answers: number[]; score: number; level: Level } | null;
  preference: Record<string, string> | null;
  challenges: Challenge[];
  posts: Post[]; // 본인 게시글 (공개 + 비공개)
  feed: Post[]; // 모두의 챌린지 (seed + 본인 공개 posts)
  prefs: { feedView: FeedView };
};

export type Action =
  | { type: 'SIGNUP'; payload: { nickname: string; email: string } }
  | { type: 'SET_PHQ9'; payload: { answers: number[]; score: number; level: Level } }
  | { type: 'SET_PREFERENCE'; payload: Record<string, string> }
  | { type: 'ADD_CHALLENGE'; payload: Challenge }
  | { type: 'CERTIFY'; payload: Post }
  | { type: 'TOGGLE_FEED_VIEW' }
  | { type: 'HYDRATE'; payload: State }
  | { type: 'RESET' };

export const initialState: State = {
  user: { nickname: null, email: null },
  phq9: null,
  preference: null,
  challenges: [],
  posts: myPostsSeed as Post[],
  feed: feedSeed as Post[],
  prefs: { feedView: 'list' },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SIGNUP':
      return { ...state, user: action.payload };
    case 'SET_PHQ9':
      return { ...state, phq9: action.payload };
    case 'SET_PREFERENCE':
      return { ...state, preference: action.payload };
    case 'ADD_CHALLENGE':
      return { ...state, challenges: [...state.challenges, action.payload] };
    case 'CERTIFY': {
      const newPosts = [action.payload, ...state.posts];
      const newFeed = action.payload.isPublic
        ? [action.payload, ...state.feed]
        : state.feed;
      return { ...state, posts: newPosts, feed: newFeed };
    }
    case 'TOGGLE_FEED_VIEW':
      return {
        ...state,
        prefs: { ...state.prefs, feedView: state.prefs.feedView === 'list' ? 'grid' : 'list' },
      };
    case 'HYDRATE':
      return action.payload;
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const AppCtx = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    const stored = readStorage<State>();
    return stored ?? init;
  });

  useEffect(() => {
    writeStorage(state);
  }, [state]);

  return <AppCtx.Provider value={{ state, dispatch }}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be inside <AppProvider>');
  return ctx;
}
