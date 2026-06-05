import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useNotificationStore } from '../../store/notificationStore';
import { Avatar } from '../ui/Avatar';
import {
  Search,
  Bell,
  Menu,
  LogOut,
  User,
  Settings,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TopNavbarProps {
  onMenuClick: () => void;
}

export function TopNavbar({ onMenuClick }: TopNavbarProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[#E2E8F0] bg-white/90 backdrop-blur-md px-4 lg:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-[#64748B] hover:bg-[#F8FAFC] lg:hidden"
      >
        <Menu size={20} />
      </button>

      <div className="flex flex-1 items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search professionals, skills, events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pl-9 pr-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/notifications')}
          className="relative rounded-xl p-2 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
        >
          <Bell size={20} />
          {unreadCount() > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#EF4444] px-1 text-[10px] font-bold text-white">
              {unreadCount()}
            </span>
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-[#F8FAFC] transition-colors"
          >
            <Avatar name={user?.name || ''} size="sm" />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 top-full mt-2 z-50 w-56 rounded-xl border border-[#E2E8F0] bg-white shadow-lg"
                >
                  <div className="border-b border-[#E2E8F0] px-4 py-3">
                    <p className="text-sm font-medium text-[#0F172A]">{user?.name}</p>
                    <p className="text-xs text-[#64748B]">{user?.email}</p>
                    <span className="mt-1 inline-block rounded-full bg-[#2563EB]/10 px-2 py-0.5 text-xs font-medium text-[#2563EB] capitalize">
                      {user?.role}
                    </span>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={() => { navigate('/profile'); setShowUserMenu(false); }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                    >
                      <User size={16} />
                      Profile
                    </button>
                    <button
                      onClick={() => { navigate('/settings'); setShowUserMenu(false); }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                    >
                      <Settings size={16} />
                      Settings
                    </button>
                    <hr className="my-1 border-[#E2E8F0]" />
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#EF4444] hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Log out
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
