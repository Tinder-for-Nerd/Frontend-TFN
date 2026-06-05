import { useState } from 'react';
import { motion } from 'framer-motion';
import { allUsers, adminNotifications, mockAppEvents } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { StatsCard } from '../components/ui/StatsCard';
import { Search, Shield, Users, CalendarCheck, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import type { UserRole } from '../types';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

export default function AdminPage() {
  type UserItem = { id: string; name: string; email: string; role: UserRole; status: 'active' | 'suspended'; joined: string; reports: number };
  const [userList, setUserList] = useState<UserItem[]>(allUsers as UserItem[]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<'users' | 'events'>('users');

  const filteredUsers = userList.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingEvents = mockAppEvents.filter((e) => e.status === 'pending');

  const toggleUserStatus = (userId: string) => {
    setUserList((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' }
          : u
      )
    );
    const user = userList.find((u) => u.id === userId);
    toast.success(
      `${user?.name} ${user?.status === 'active' ? 'suspended' : 'activated'} successfully`
    );
  };

  const handleEventAction = (_eventId: string, action: 'approved' | 'rejected') => {
    toast.success(`Event ${action} successfully`);
  };

  const stats = [
    { icon: Users, label: 'Total Users', value: userList.length },
    { icon: Shield, label: 'Active Users', value: userList.filter((u) => u.status === 'active').length },
    { icon: CalendarCheck, label: 'Pending Events', value: pendingEvents.length },
    { icon: AlertTriangle, label: 'Reports', value: userList.reduce((acc, u) => acc + u.reports, 0) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Admin Dashboard</h1>
        <p className="text-sm text-[#64748B]">Manage users and platform content</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} />
        ))}
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveSection('users')}
          className={cn(
            'rounded-xl px-4 py-2 text-sm font-medium transition-all',
            activeSection === 'users'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A]'
          )}
        >
          User Management
        </button>
        <button
          onClick={() => setActiveSection('events')}
          className={cn(
            'rounded-xl px-4 py-2 text-sm font-medium transition-all',
            activeSection === 'events'
              ? 'bg-[#2563EB] text-white shadow-sm'
              : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A]'
          )}
        >
          Event Approval {pendingEvents.length > 0 && `(${pendingEvents.length})`}
        </button>
      </div>

      {activeSection === 'users' ? (
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b border-[#E2E8F0]">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 w-full max-w-xs rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pl-9 pr-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E2E8F0]">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#64748B]">User</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#64748B]">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#64748B]">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#64748B]">Reports</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#64748B]">Joined</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#64748B]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar name={u.name} size="sm" />
                          <div>
                            <p className="text-sm font-medium text-[#0F172A]">{u.name}</p>
                            <p className="text-xs text-[#64748B]">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="info">{u.role}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={u.status === 'active' ? 'success' : 'danger'}>
                          {u.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#64748B]">{u.reports}</td>
                      <td className="px-4 py-3 text-sm text-[#64748B]">{u.joined}</td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          size="sm"
                          variant={u.status === 'active' ? 'danger' : 'success'}
                          onClick={() => toggleUserStatus(u.id)}
                        >
                          {u.status === 'active' ? 'Suspend' : 'Activate'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {pendingEvents.length === 0 ? (
            <Card className="p-12 text-center">
              <CalendarCheck size={48} className="mx-auto text-[#CBD5E1]" />
              <h3 className="mt-4 text-lg font-semibold text-[#0F172A]">No pending events</h3>
              <p className="text-sm text-[#64748B]">All events have been reviewed</p>
            </Card>
          ) : (
            pendingEvents.map((event) => (
              <Card key={event.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-[#0F172A]">{event.title}</h3>
                    <p className="mt-1 text-sm text-[#64748B] line-clamp-2">{event.description}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-[#64748B]">
                      <span>{event.date}</span>
                      <span>{event.host}</span>
                      <Badge>{event.mode}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleEventAction(event.id, 'approved')}
                    >
                      <CheckCircle size={14} />
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleEventAction(event.id, 'rejected')}
                    >
                      <XCircle size={14} />
                      Reject
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}

          {/* Admin Notifications */}
          <Card className="mt-6">
            <CardContent>
              <h3 className="font-semibold text-[#0F172A] mb-4">Admin Notifications</h3>
              <div className="space-y-3">
                {adminNotifications.map((n) => (
                  <div key={n.id} className="flex items-start gap-3 rounded-xl bg-[#F8FAFC] p-3">
                    <div className="rounded-lg bg-[#2563EB]/10 p-2">
                      {n.type === 'event_approval' && <CalendarCheck size={16} className="text-[#2563EB]" />}
                      {n.type === 'report' && <AlertTriangle size={16} className="text-[#F59E0B]" />}
                      {n.type === 'new_user' && <Users size={16} className="text-[#22C55E]" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">{n.title}</p>
                      <p className="text-xs text-[#64748B]">{n.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </motion.div>
  );
}
