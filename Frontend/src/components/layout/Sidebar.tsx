import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  Calendar,
  CalendarRange,
  Bell,
  User,
  Settings,
  Shield,
  X,
  Rss,
  Flame,
  Send,
  LayoutDashboard,
  Users,
  Compass,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  role: string;
}

const navItems = {
  student: [
    { icon: Compass, label: 'Discover', path: '/discover' },
    { icon: Rss, label: 'Feed', path: '/feed' },
    { icon: Flame, label: 'Explore', path: '/explore' },
    { icon: Users, label: 'Connections', path: '/connections' },
    { icon: Send, label: 'Direct Messages', path: '/messages' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Sessions', path: '/sessions' },
    { icon: CalendarRange, label: 'Events', path: '/events' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ],
  professional: [
    { icon: Compass, label: 'Discover', path: '/discover' },
    { icon: Rss, label: 'Feed', path: '/feed' },
    { icon: Flame, label: 'Explore', path: '/explore' },
    { icon: Users, label: 'Connections', path: '/connections' },
    { icon: Send, label: 'Direct Messages', path: '/messages' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Sessions', path: '/sessions' },
    { icon: CalendarRange, label: 'Events', path: '/events' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ],
  admin: [
    { icon: Shield, label: 'Admin', path: '/admin' },
    { icon: Compass, label: 'Discover', path: '/discover' },
    { icon: Rss, label: 'Feed', path: '/feed' },
    { icon: Flame, label: 'Explore', path: '/explore' },
    { icon: Users, label: 'Connections', path: '/connections' },
    { icon: Send, label: 'Direct Messages', path: '/messages' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Sessions', path: '/sessions' },
    { icon: CalendarRange, label: 'Events', path: '/events' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ],
};

export function Sidebar({ isOpen, onClose, role }: SidebarProps) {
  const items = navItems[role as keyof typeof navItems] || navItems.student;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-[#E2E8F0] bg-white transition-transform duration-300 lg:relative lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-4">
          <NavLink to="/discover" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB] text-white font-bold text-sm">
              P
            </div>
            <span className="text-lg font-bold text-[#0F172A]">Tinder For Nerds</span>
          </NavLink>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#64748B] hover:bg-[#F8FAFC] lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-[#2563EB]/10 text-[#2563EB]'
                    : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                )
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-[#E2E8F0] p-4">
          <div className="rounded-xl bg-[#F8FAFC] p-3">
            <p className="text-xs font-medium text-[#0F172A]">Tinder For Nerds Pro</p>
            <p className="mt-1 text-xs text-[#64748B]">
              Unlock premium features
            </p>
            <button className="mt-2 w-full rounded-lg bg-[#2563EB] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#1D4ED8] transition-colors">
              Upgrade
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
