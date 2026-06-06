import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Award, Target, TrendingUp, Zap,
  Code2, Users, Calendar, Clock,
  GraduationCap, FileCheck, Lightbulb, Rocket,
  BarChart3, Activity, Check,
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'learning' | 'projects' | 'career'>('overview');

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: Activity },
    { id: 'learning' as const, label: 'Learning', icon: BookOpen },
    { id: 'projects' as const, label: 'Projects', icon: Code2 },
    { id: 'career' as const, label: 'Career', icon: Target },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900">
          Student Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your learning journey, projects, and career growth
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
                { icon: BookOpen, label: 'Courses', value: '12', trend: '+3 this month', color: 'text-blue-500', bg: 'bg-blue-50' },
                { icon: Award, label: 'Certifications', value: '8', trend: '+2 this month', color: 'text-yellow-500', bg: 'bg-yellow-50' },
                { icon: Code2, label: 'Projects', value: '15', trend: '+5 this month', color: 'text-green-500', bg: 'bg-green-50' },
                { icon: TrendingUp, label: 'Skill Score', value: '87%', trend: '+12% this month', color: 'text-purple-500', bg: 'bg-purple-50' },
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
                  <GraduationCap size={16} className="text-blue-500" />
                  Learning Progress
                </h3>
                <div className="space-y-3">
                  {[
                    { course: 'Advanced React Patterns', progress: 85, color: 'bg-blue-500' },
                    { course: 'Python for ML', progress: 62, color: 'bg-green-500' },
                    { course: 'System Design', progress: 40, color: 'bg-purple-500' },
                    { course: 'Docker & K8s', progress: 28, color: 'bg-orange-500' },
                  ].map(c => (
                    <div key={c.course}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700">{c.course}</span>
                        <span className="text-gray-400">{c.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100">
                        <div className={cn('h-2 rounded-full transition-all', c.color)} style={{ width: `${c.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Lightbulb size={16} className="text-yellow-500" />
                  AI Career Suggestions
                </h3>
                <div className="space-y-3">
                  {[
                    { text: 'Complete React certification to strengthen your frontend profile', type: 'course' },
                    { text: 'Apply for internships at fintech companies - high demand for your skills', type: 'internship' },
                    { text: 'Contribute to open source - improves your GitHub profile by 40%', type: 'suggestion' },
                    { text: 'Attend AI Hackathon next month - great networking opportunity', type: 'event' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl bg-gray-50 p-3">
                      <div className="mt-0.5 shrink-0">
                        {s.type === 'course' && <BookOpen size={14} className="text-blue-500" />}
                        {s.type === 'internship' && <Target size={14} className="text-green-500" />}
                        {s.type === 'suggestion' && <Zap size={14} className="text-yellow-500" />}
                        {s.type === 'event' && <Calendar size={14} className="text-purple-500" />}
                      </div>
                      <p className="text-sm text-gray-600">{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Rocket size={16} className="text-purple-500" />
                Upcoming Competitions & Hackathons
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'AI Innovation Hackathon', date: 'Jul 15', participants: 1200, prize: '$10,000' },
                  { name: 'Codeforces Round #850', date: 'Jul 8', participants: 8500, prize: 'Rating' },
                  { name: 'Google Solution Challenge', date: 'Aug 1', participants: 3400, prize: '$5,000' },
                ].map(h => (
                  <div key={h.name} className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{h.name}</p>
                      <p className="text-xs text-gray-500">{h.date} &middot; {h.participants.toLocaleString()} participants</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-green-600">{h.prize}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'learning' && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Journey</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: BookOpen, title: 'Enrolled Courses', desc: '12 active courses', color: 'text-blue-500', bg: 'bg-blue-50' },
                { icon: Award, title: 'Certifications', desc: '8 completed', color: 'text-yellow-500', bg: 'bg-yellow-50' },
                { icon: Clock, title: 'Hours Learned', desc: '247 hours this month', color: 'text-green-500', bg: 'bg-green-50' },
                { icon: BarChart3, title: 'Skill Progress', desc: '5 skills improved', color: 'text-purple-500', bg: 'bg-purple-50' },
              ].map(item => (
                <div key={item.title} className="rounded-xl border border-gray-100 p-4">
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', item.bg)}>
                    <item.icon size={20} className={item.color} />
                  </div>
                  <h4 className="mt-2 text-sm font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Projects & Portfolio</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'AI Study Buddy', tech: 'Python, FastAPI, React', status: 'Completed', color: 'text-green-600', bg: 'bg-green-50' },
                { title: 'E-Commerce Platform', tech: 'Next.js, Stripe, Prisma', status: 'In Progress', color: 'text-blue-600', bg: 'bg-blue-50' },
                { title: 'Distributed Cache', tech: 'Go, Redis, K8s', status: 'Planning', color: 'text-yellow-600', bg: 'bg-yellow-50' },
                { title: 'ML Pipeline', tech: 'Python, TensorFlow, Airflow', status: 'In Progress', color: 'text-blue-600', bg: 'bg-blue-50' },
              ].map(p => (
                <div key={p.title} className="rounded-xl border border-gray-100 p-4">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-semibold text-gray-900">{p.title}</h4>
                    <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-medium', p.bg, p.color)}>{p.status}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{p.tech}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'career' && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Career Roadmap</h2>
            <div className="space-y-4">
              {[
                { stage: 'Complete Core Skills', progress: 100, desc: 'React, Python, SQL', icon: Check },
                { stage: 'Build Portfolio Projects', progress: 80, desc: '3 projects completed, 2 in progress', icon: Code2 },
                { stage: 'Get Certified', progress: 60, desc: 'AWS, Google Cloud certifications', icon: Award },
                { stage: 'Apply for Internships', progress: 25, desc: '5 applications sent, 3 pending', icon: FileCheck },
                { stage: 'Network & Community', progress: 40, desc: 'Joined 3 tech communities', icon: Users },
              ].map(item => (
                <div key={item.stage} className="flex items-start gap-4">
                  <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold',
                    item.progress === 100 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'
                  )}>
                    {item.progress === 100 ? <item.icon size={14} /> : item.icon === Check ? item.progress : <item.icon size={14} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{item.stage}</h4>
                      <span className="text-xs text-gray-400">{item.progress}%</span>
                    </div>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                    <div className="mt-1 h-1.5 rounded-full bg-gray-100">
                      <div className={cn('h-1.5 rounded-full', item.progress === 100 ? 'bg-green-500' : 'bg-blue-500')} style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
