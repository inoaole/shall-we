/**
 * Single AppContext (D3 from eng review).
 *
 * S1: empty reducer + provider (skeleton).
 * S2 will add SIGNUP / SET_PHQ9 / SET_PREFERENCE actions.
 * S3 will add ADD_CHALLENGE / CERTIFY / TOGGLE_FEED_VIEW + sessionStorage persist.
 *
 * Schema versioning (D-S2.1): when shape changes, bump STORAGE_KEY suffix.
 */

import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';

export type State = {
  user: { nickname: string | null; email: string | null };
  // S2: phq9, preference
  // S3: challenges, posts, feed, prefs
};

export type Action = { type: 'NOOP' };

const initialState: State = {
  user: { nickname: null, email: null },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'NOOP':
    default:
      return state;
  }
}

const AppCtx = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppCtx.Provider value={{ state, dispatch }}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be inside <AppProvider>');
  return ctx;
}
