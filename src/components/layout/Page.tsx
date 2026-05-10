/**
 * Page wrapper — subtle fade-in + slide-up entrance per screen.
 *
 * v0.0.3 polish: framer-motion AnimatePresence with React Router v6
 * is fragile (requires shared layout + key). Simpler approach: each
 * screen wraps content in <Page>; entrance only, no exit. Keeps
 * implementation tiny while adding "this is intentional" feel.
 */

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export function Page({ children, className = '' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
