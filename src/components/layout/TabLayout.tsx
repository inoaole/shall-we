import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

/**
 * Shared layout for the 4 main tab routes (다이어리/홈/인증/마이).
 * Renders Header + Outlet + BottomNav.
 */
export function TabLayout() {
  return (
    <>
      <Header />
      <main className="pb-20 min-h-screen">
        <Outlet />
      </main>
      <BottomNav />
    </>
  );
}
