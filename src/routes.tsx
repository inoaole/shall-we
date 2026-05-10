/**
 * Router config (D7: React.lazy 코드 분할 적용).
 *
 * S1-A2 (eng review): Loading.tsx is imported eagerly (NOT lazy) because it
 * is used as the Suspense fallback — lazy-loading the fallback creates a
 * chicken-and-egg flicker on first paint.
 *
 * Layout routes:
 *   - 4 tab routes share <TabLayout> (Header + BottomNav)
 *   - Onboarding / modal routes have no chrome
 *
 * Wizard routes use single path + internal step state (D2):
 *   /check/quiz      → Quiz (PHQ-9 9 + preference 5 = 14 internal steps)
 *   /create/new      → Steps (5 internal steps)
 */

import { lazy, Suspense, type ReactElement } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Loading } from '@/components/ui/Loading';
import { TabLayout } from '@/components/layout/TabLayout';

const Splash         = lazy(() => import('@/screens/onboarding/Splash'));
const Intro1         = lazy(() => import('@/screens/onboarding/Intro1'));
const Intro2         = lazy(() => import('@/screens/onboarding/Intro2'));
const Signup         = lazy(() => import('@/screens/onboarding/Signup'));
const Quiz           = lazy(() => import('@/screens/onboarding/Quiz'));
const Analyzing      = lazy(() => import('@/screens/onboarding/Analyzing'));
const Result         = lazy(() => import('@/screens/onboarding/Result'));
const Home           = lazy(() => import('@/screens/home/Home'));
const PostDetail     = lazy(() => import('@/screens/home/PostDetail'));
const CertTab        = lazy(() => import('@/screens/cert/CertTab'));
const ChallengeCert  = lazy(() => import('@/screens/cert/ChallengeCert'));
const Recommend      = lazy(() => import('@/screens/create/Recommend'));
const Steps          = lazy(() => import('@/screens/create/Steps'));
const DiaryTab       = lazy(() => import('@/screens/diary/DiaryTab'));
const DiaryWrite     = lazy(() => import('@/screens/diary/DiaryWrite'));
const DiaryAnalyzing = lazy(() => import('@/screens/diary/DiaryAnalyzing'));
const DiaryResult    = lazy(() => import('@/screens/diary/DiaryResult'));
const DiaryRecommend = lazy(() => import('@/screens/diary/DiaryRecommend'));
const MyChallenge    = lazy(() => import('@/screens/challenge/MyChallenge'));
const MyPage         = lazy(() => import('@/screens/my/MyPage'));
const Settings       = lazy(() => import('@/screens/my/Settings'));
const DevComponents  = lazy(() => import('@/screens/dev/Components'));

function wrap(el: ReactElement): ReactElement {
  return <Suspense fallback={<Loading />}>{el}</Suspense>;
}

export const router = createBrowserRouter([
  // ── Onboarding & wizard (no chrome)
  { path: '/',                   element: wrap(<Splash />) },
  { path: '/onboarding/intro/1', element: wrap(<Intro1 />) },
  { path: '/onboarding/intro/2', element: wrap(<Intro2 />) },
  { path: '/signup',             element: wrap(<Signup />) },
  { path: '/check/quiz',         element: wrap(<Quiz />) },
  { path: '/check/analyzing',    element: wrap(<Analyzing />) },
  { path: '/check/result',       element: wrap(<Result />) },
  { path: '/cert/upload',        element: wrap(<ChallengeCert />) },
  { path: '/create',             element: wrap(<Recommend />) },
  { path: '/create/new',         element: wrap(<Steps />) },
  { path: '/post/:id',           element: wrap(<PostDetail />) },
  { path: '/settings',           element: wrap(<Settings />) },
  { path: '/diary/write',        element: wrap(<DiaryWrite />) },
  { path: '/diary/analyzing',    element: wrap(<DiaryAnalyzing />) },
  { path: '/diary/result',       element: wrap(<DiaryResult />) },
  { path: '/diary/recommend',    element: wrap(<DiaryRecommend />) },
  { path: '/challenge',          element: wrap(<MyChallenge />) },

  // ── 4 tab routes (Header + BottomNav)
  {
    element: <TabLayout />,
    children: [
      { path: '/home',  element: wrap(<Home />) },
      { path: '/diary', element: wrap(<DiaryTab />) },
      { path: '/cert',  element: wrap(<CertTab />) },
      { path: '/my',    element: wrap(<MyPage />) },
    ],
  },

  // ── Dev showcase
  { path: '/dev/components', element: wrap(<DevComponents />) },

  // ── 404 → splash
  { path: '*', element: <Navigate to="/" replace /> },
]);
