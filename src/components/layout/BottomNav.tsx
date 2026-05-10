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
    <nav className="fixed bottom-0 inset-x-0 max-w-screen mx-auto h-[64px] bg-white border-t border-gray/15 flex z-10">
      {tabs.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 ${
              isActive ? 'text-primary' : 'text-gray'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                size={22}
                strokeWidth={isActive ? 2.25 : 1.75}
                fill={isActive ? 'currentColor' : 'none'}
                fillOpacity={isActive ? 0.15 : 0}
              />
              <span className={`text-body-12 ${isActive ? 'font-semibold' : ''}`}>
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
