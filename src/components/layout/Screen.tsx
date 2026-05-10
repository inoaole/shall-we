import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Whether to leave room for the bottom navigation (default: true). */
  withBottomNav?: boolean;
  className?: string;
}

/**
 * Wraps screen content. Adds bottom padding for BottomNav clearance,
 * and centers within iPhone Pro Max width on wide displays (handled by #root in globals.css).
 */
export function Screen({ children, withBottomNav = true, className = '' }: Props) {
  return (
    <main
      className={`min-h-screen flex flex-col ${
        withBottomNav ? 'pb-20' : ''
      } ${className}`}
    >
      {children}
    </main>
  );
}
