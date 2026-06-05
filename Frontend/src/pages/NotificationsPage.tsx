import { motion } from 'framer-motion';
import { useNotificationStore } from '../store/notificationStore';
import { Button } from '../components/ui/Button';
import { Bell, Heart, MessageSquare, Calendar, BookOpen, CheckCheck, Check } from 'lucide-react';
import { getTimeAgo, cn } from '../lib/utils';

const typeIcons = {
  match: Heart,
  message: MessageSquare,
  booking: Calendar,
  event: Calendar,
  session: BookOpen,
};

const typeColors = {
  match: 'text-red-500 bg-red-50',
  message: 'text-blue-500 bg-blue-50',
  booking: 'text-green-500 bg-green-50',
  event: 'text-purple-500 bg-purple-50',
  session: 'text-amber-500 bg-amber-50',
};

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotificationStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-2xl"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Notifications</h1>
          <p className="text-sm text-[#64748B]">
            {unreadCount()} unread notification{unreadCount() !== 1 ? 's' : ''}
          </p>
        </div>
        {unreadCount() > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            <CheckCheck size={16} />
            Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Bell size={48} className="text-[#CBD5E1]" />
            <h3 className="mt-4 text-lg font-semibold text-[#0F172A]">All clear!</h3>
            <p className="text-sm text-[#64748B]">You have no notifications</p>
          </div>
        ) : (
          notifications.map((notification) => {
            const Icon = typeIcons[notification.type];
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  'flex items-start gap-4 rounded-2xl border p-4 transition-all',
                  notification.read
                    ? 'border-[#E2E8F0] bg-white'
                    : 'border-[#2563EB]/20 bg-[#2563EB]/5'
                )}
              >
                <div
                  className={cn(
                    'rounded-xl p-2.5',
                    typeColors[notification.type]
                  )}
                >
                  <Icon size={18} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0F172A]">
                    {notification.title}
                  </p>
                  <p className="mt-0.5 text-sm text-[#64748B]">
                    {notification.description}
                  </p>
                  <p className="mt-1 text-xs text-[#94A3B8]">
                    {getTimeAgo(notification.createdAt)}
                  </p>
                </div>

                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="shrink-0 rounded-lg p-1.5 text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#2563EB] transition-colors"
                    title="Mark as read"
                  >
                    <Check size={16} />
                  </button>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
