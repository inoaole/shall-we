import { NavLink } from 'react-router-dom';
import { BookOpen, Home, CheckCircle, User } from 'lucide-react';

const tabs = [
  { to: '/diary', icon: BookOpen,    label: '다이어리' },
  { to: '/home',  icon: Home,        label: '홈' },
  { to: '/cert',  icon: CheckCircle, label: '인증' },
  { to: '/my',    icon: User,        label: '마이' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 max-w-screen mx-auto h-16 bg-white border-t border-gray/20 flex z-10">
      {tabs.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-0.5 ${
              isActive ? 'text-primary' : 'text-gray'
            }`
          }
        >
          <Icon size={22} strokeWidth={1.75} />
          <span className="text-body-12">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
