import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockDashboardData } from '../data/mockData';
import {
  BarChart3, TrendingUp, Users, Eye, MessageCircle,
  Briefcase, Calendar, Award, UserPlus, Share2,
  Activity, ChevronRight, Star,
} from 'lucide-react';
import { cn } from '../lib/utils';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area,
} from 'recharts';

export default function ProfessionalDashboardPage() {
  const data = mockDashboardData;
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'network' | 'opportunities'>('overview');

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: Activity },
    { id: 'analytics' as const, label: 'Analytics', icon: BarChart3 },
    { id: 'network' as const, label: 'Network', icon: Users },
    { id: 'opportunities' as const, label: 'Opportunities', icon: Briefcase },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900">
          Professional Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Analytics, network growth, and professional opportunities
        </p>
      </motion.div>

      <div className="mb-6 flex gap-1 rounded-2xl border border-gray-100 bg-white p-1 shadow-sm overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all shrink-0',
              activeTab === tab.id
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { icon: Eye, label: 'Profile Views', value: data.profileViews.toLocaleString(), trend: '+12%', color: 'text-blue-500', bg: 'bg-blue-50' },
                { icon: TrendingUp, label: 'Engagement', value: '89%', trend: '+5%', color: 'text-green-500', bg: 'bg-green-50' },
                { icon: Users, label: 'Followers', value: '1,245', trend: '+89 this week', color: 'text-purple-500', bg: 'bg-purple-50' },
                { icon: Star, label: 'Rating', value: data.rating.toString(), trend: '+0.2', color: 'text-yellow-500', bg: 'bg-yellow-50' },
              ].map(stat => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', stat.bg)}>
                    <stat.icon size={20} className={stat.color} />
                  </div>
                  <p className="mt-3 text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="mt-1 text-xs text-green-600">{stat.trend}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 size={16} className="text-blue-500" />
                  Profile Visits
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={data.profileVisits}>
                    <defs>
                      <linearGradient id="visitGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                    <YAxis stroke="#94A3B8" fontSize={12} />
                    <Tooltip />
                    <Area type="monotone" dataKey="visits" stroke="#2563EB" strokeWidth={2} fill="url(#visitGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase size={16} className="text-orange-500" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: Eye, text: 'Your profile was viewed by Sarah Chen', time: '2m ago', color: 'text-blue-500' },
                    { icon: MessageCircle, text: 'New message from Emma Wilson', time: '15m ago', color: 'text-green-500' },
                    { icon: UserPlus, text: 'Mike Torres started following you', time: '1h ago', color: 'text-purple-500' },
                    { icon: Star, text: 'You received a 5-star review', time: '3h ago', color: 'text-yellow-500' },
                    { icon: Share2, text: 'Your post was shared 12 times', time: '5h ago', color: 'text-cyan-500' },
                  ].map((a, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <a.icon size={14} className={cn('mt-0.5 shrink-0', a.color)} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">{a.text}</p>
                        <p className="text-xs text-gray-400">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award size={16} className="text-yellow-500" />
                Content Performance
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Posts Published', value: '24', change: '+4 this month' },
                  { label: 'Avg. Likes', value: '156', change: '+12%' },
                  { label: 'Avg. Comments', value: '23', change: '+8%' },
                ].map(item => (
                  <div key={item.label} className="rounded-xl bg-gray-50 p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-xs text-green-600 mt-1">{item.change}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <div className="grid gap-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Match Growth</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data.matchGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Session Revenue</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.sessionRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Bar dataKey="revenue" fill="#2563EB" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Network & Connections</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users size={16} className="text-blue-500" />
                  Top Connections
                </h4>
                <div className="space-y-3">
                  {[
                    { name: 'Sarah Chen', role: 'Product Designer', mutual: 12 },
                    { name: 'Emma Wilson', role: 'Engineering Manager', mutual: 8 },
                    { name: 'Mike Torres', role: 'CS Student @ MIT', mutual: 5 },
                  ].map(c => (
                    <div key={c.name} className="flex items-center gap-3">
                      <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
                        <p className="text-xs text-gray-500 truncate">{c.role} &middot; {c.mutual} mutual</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar size={16} className="text-orange-500" />
                  Upcoming Events
                </h4>
                <div className="space-y-3">
                  {[
                    { name: 'Tech Conference 2026', date: 'Jul 20', type: 'Conference' },
                    { name: 'Founder Meetup', date: 'Jul 25', type: 'Networking' },
                    { name: 'AI Workshop', date: 'Aug 5', type: 'Workshop' },
                  ].map(e => (
                    <div key={e.name} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{e.name}</p>
                        <p className="text-xs text-gray-500">{e.date}</p>
                      </div>
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">{e.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'opportunities' && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Opportunities & Collaborations</h2>
            <div className="space-y-3">
              {[
                { title: 'Senior Frontend Engineer', company: 'TechCorp', salary: '$150k-$200k', type: 'Full-time', match: '95%' },
                { title: 'Tech Lead - ML Platform', company: 'DataFlow Systems', salary: '$180k-$250k', type: 'Full-time', match: '88%' },
                { title: 'Product Design Consultant', company: 'DesignLabs', salary: '$120k-$160k', type: 'Contract', match: '82%' },
                { title: 'Open Source Contributor', company: 'Various Projects', salary: 'Unpaid', type: 'Volunteer', match: '90%' },
              ].map(job => (
                <div key={job.title} className="flex items-center justify-between rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors cursor-pointer">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-gray-900">{job.title}</h4>
                      <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700">{job.match} match</span>
                    </div>
                    <p className="text-xs text-gray-500">{job.company} &middot; {job.type} &middot; {job.salary}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
