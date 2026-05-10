import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Page } from './Page';

/**
 * Shared layout for the 4 main tab routes (다이어리/홈/인증/마이).
 *
 * v0.0.3: Page wrapper keyed by pathname triggers fade-in on each tab switch.
 */
export function TabLayout() {
  const { pathname } = useLocation();
  return (
    <>
      <Header />
      <main className="pb-20 min-h-screen">
        <Page key={pathname}>
          <Outlet />
        </Page>
      </main>
      <BottomNav />
    </>
  );
}
