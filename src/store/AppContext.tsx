/**
 * Single AppContext (D3 from eng review).
 *
 * S2: SIGNUP / SET_PHQ9 / SET_PREFERENCE actions + sessionStorage hydrate (D-S2.1).
 * S3 will add ADD_CHALLENGE / CERTIFY / TOGGLE_FEED_VIEW + challenges/posts state.
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

export type Level = '없음' | '낮음' | '중간' | '높음';

export type State = {
  user: { nickname: string | null; email: string | null };
  phq9: { answers: number[]; score: number; level: Level } | null;
  preference: Record<string, string> | null;
};

export type Action =
  | { type: 'SIGNUP'; payload: { nickname: string; email: string } }
  | { type: 'SET_PHQ9'; payload: { answers: number[]; score: number; level: Level } }
  | { type: 'SET_PREFERENCE'; payload: Record<string, string> }
  | { type: 'HYDRATE'; payload: State }
  | { type: 'RESET' };

export const initialState: State = {
  user: { nickname: null, email: null },
  phq9: null,
  preference: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SIGNUP':
      return { ...state, user: action.payload };
    case 'SET_PHQ9':
      return { ...state, phq9: action.payload };
    case 'SET_PREFERENCE':
      return { ...state, preference: action.payload };
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

  // Persist on every state change. Small state (~few KB), no debounce needed.
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
