import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDiscoverStore } from '../store/discoverStore';
import { useAuthStore } from '../store/authStore';
import { mockProfiles, mockDiscoveryProfiles } from '../data/mockData';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MessageCircle, UserPlus, Users, Star, Calendar } from 'lucide-react';

export default function ConnectionsPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { matches } = useDiscoverStore();
  const [activeTab, setActiveTab] = useState<'matches' | 'connections' | 'requests'>('matches');

  const matchedProfiles = matches
    .map((id) => mockDiscoveryProfiles.find((p) => p.id === id))
    .filter(Boolean);

  const allConnections = Object.values(mockProfiles).filter(
    (p) => p.userId !== user?.id
  );

  const tabs = [
    { id: 'matches' as const, label: 'Matches', count: matchedProfiles.length, icon: Star },
    { id: 'connections' as const, label: 'All Connections', count: allConnections.length, icon: Users },
    { id: 'requests' as const, label: 'Requests', count: 3, icon: UserPlus },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Connections</h1>
        <p className="text-sm text-[#64748B]">Manage your network</p>
      </div>

      <div className="flex gap-1 rounded-xl bg-[#F8FAFC] p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-[#2563EB] shadow-sm'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
            <span className={`rounded-full px-2 py-0.5 text-xs ${
              activeTab === tab.id ? 'bg-[#2563EB]/10 text-[#2563EB]' : 'bg-[#E2E8F0] text-[#64748B]'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {activeTab === 'matches' && (
        <div className="space-y-3">
          {matchedProfiles.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-12 text-center">
              <div className="rounded-2xl bg-[#F8FAFC] p-4">
                <Star size={40} className="text-[#94A3B8]" />
              </div>
              <h3 className="text-lg font-semibold text-[#0F172A]">No matches yet</h3>
              <p className="max-w-sm text-sm text-[#64748B]">
                Start swiping on the Discover page to find your next connection!
              </p>
              <Button onClick={() => navigate('/discover')}>
                Explore Profiles
              </Button>
            </div>
          ) : (
            matchedProfiles.map((profile, i) => (
              <motion.div
                key={profile!.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 transition-all hover:shadow-md hover:border-[#2563EB]/20"
              >
                <Avatar name={profile!.name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-[#0F172A]">{profile!.name}</h3>
                    <Badge variant="info">{profile!.role}</Badge>
                    {profile!.matchScore >= 80 && (
                      <Badge variant="success">Hot match</Badge>
                    )}
                  </div>
                  <p className="text-sm text-[#64748B] truncate">
                    {profile!.title} at {profile!.company}
                  </p>
                  <p className="text-xs text-[#94A3B8]">{profile!.location}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate('/messages')}
                  >
                    <MessageCircle size={14} />
                    Message
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/sessions')}
                  >
                    <Calendar size={14} />
                    Book
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {activeTab === 'connections' && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allConnections.map((profile, i) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-4 transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <Avatar name={profile.name} size="md" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#0F172A]">{profile.name}</h3>
                  <p className="text-xs text-[#64748B] truncate">{profile.title}</p>
                  <p className="text-xs text-[#94A3B8]">{profile.company}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {profile.skills.slice(0, 3).map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
                {profile.skills.length > 3 && (
                  <Badge>+{profile.skills.length - 3}</Badge>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-[#64748B]">{profile.location}</span>
                <Button variant="ghost" size="sm" onClick={() => navigate('/messages')}>
                  <MessageCircle size={14} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="space-y-3">
          {[
            { name: 'David Kim', title: 'Frontend Developer', company: 'StartupX', reason: 'Wants to connect based on shared skills' },
            { name: 'Rachel Green', title: 'UX Designer', company: 'DesignCo', reason: 'Mutual connection: Sarah Chen' },
            { name: 'Tom Hardy', title: 'Data Analyst', company: 'DataViz Inc.', reason: 'Followed you from Discover' },
          ].map((request, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-4"
            >
              <Avatar name={request.name} size="md" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#0F172A]">{request.name}</h3>
                <p className="text-sm text-[#64748B]">{request.title} at {request.company}</p>
                <p className="text-xs text-[#94A3B8]">{request.reason}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="default" size="sm">Accept</Button>
                <Button variant="ghost" size="sm">Decline</Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
