import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useProfileStore } from '../store/profileStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  User, Lock, Bell, Eye, MapPin, MessageCircle, Shield,
  LogOut, Trash2, ChevronRight, Globe, Users, UserPlus,
  X, Camera, Smartphone, Monitor, Clock,
  AtSign, Hash, Bookmark, Ban, Sparkles, GraduationCap, Briefcase,
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  description?: string;
}

function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-3 group">
      <div className="flex-1 pr-4">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs text-gray-500">{description}</p>
        )}
      </div>
      <button
        onClick={onChange}
        className={cn(
          'relative h-7 w-12 shrink-0 rounded-full transition-all duration-300',
          checked ? 'bg-blue-500' : 'bg-gray-200'
        )}
      >
        <motion.div
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 h-5 w-5 rounded-full bg-white shadow-md"
        />
      </button>
    </div>
  );
}

interface SelectOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface SelectControlProps {
  label: string;
  description?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

function SelectControl({ label, description, value, options, onChange }: SelectControlProps) {
  return (
    <div className="py-3 group">
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-4">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          {description && (
            <p className="mt-0.5 text-xs text-gray-500">{description}</p>
          )}
        </div>
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-3 pr-8 text-sm font-medium text-gray-900 outline-none transition-colors hover:border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 cursor-pointer"
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronRight size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-gray-400" />
        </div>
      </div>
    </div>
  );
}

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}

function SectionCard({ icon, title, description, children }: SectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
    >
      <div className="border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            {icon}
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-50 px-5">
        {children}
      </div>
    </motion.div>
  );
}

type SettingsTab = 'privacy' | 'notifications' | 'account' | 'security' | 'content';

const tabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
  { id: 'privacy', label: 'Privacy', icon: <Lock size={16} /> },
  { id: 'account', label: 'Account', icon: <User size={16} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
  { id: 'security', label: 'Security', icon: <Shield size={16} /> },
  { id: 'content', label: 'Content', icon: <Sparkles size={16} /> },
];

export default function SettingsPage() {
  const { user, logout } = useAuthStore();
  const { dashboardType, setDashboardType } = useProfileStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SettingsTab>('privacy');

  const [account, setAccount] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Building the future of professional networking.',
    phone: '',
    gender: '',
  });

  const [privacy, setPrivacy] = useState({
    privateAccount: false,
    whoCanMessage: 'everyone',
    whoCanViewProfile: 'everyone',
    showActivityStatus: true,
    showLocation: true,
    preciseLocation: false,
    showReadReceipts: true,
    allowTagging: 'everyone',
    allowMentions: 'everyone',
    allowStoryReplies: 'following',
    hideStoryFrom: '',
    blockList: [] as string[],
    mutedList: [] as string[],
    restrictedList: [] as string[],
  });

  const [notifications, setNotifications] = useState({
    pushEnabled: true,
    likes: true,
    comments: true,
    commentLikes: true,
    newFollowers: true,
    followRequests: true,
    mentions: true,
    messages: true,
    messageRequests: true,
    storyReplies: true,
    liveVideos: true,
    posts: true,
    reminders: true,
    emailNotifications: false,
    smsNotifications: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
    password: '',
    newPassword: '',
    sessionTimeout: '30min',
    activeSessions: [
      { device: 'iPhone 15 Pro', location: 'San Francisco, CA', lastActive: 'Now', current: true },
      { device: 'Chrome on macOS', location: 'San Francisco, CA', lastActive: '2 hours ago', current: false },
    ],
    savedLogins: [
      { device: 'iPhone 15 Pro', lastUsed: 'Today' },
    ],
  });

  const [content, setContent] = useState({
    showSensitiveContent: false,
    hideOffensiveComments: true,
    keywordFilter: true,
    customKeywords: '',
    mutedWords: [] as string[],
    restrictedAccounts: [] as string[],
    savedPosts: 12,
    collections: 3,
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <div className="mx-auto max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your privacy, account, and notification preferences
        </p>
      </motion.div>

      <div className="mb-6 flex gap-1 overflow-x-auto rounded-2xl border border-gray-100 bg-white p-1 shadow-sm scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 shrink-0',
              activeTab === tab.id
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'privacy' && (
          <motion.div
            key="privacy"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <SectionCard
              icon={<Eye size={18} />}
              title="Profile Visibility"
              description="Control who can see your profile and activity"
            >
              <Toggle
                checked={privacy.privateAccount}
                onChange={() => setPrivacy({ ...privacy, privateAccount: !privacy.privateAccount })}
                label="Private account"
                description="Only approved followers can see your posts and profile"
              />
              <SelectControl
                label="Who can view your profile"
                description="Control profile visibility for non-followers"
                value={privacy.whoCanViewProfile}
                onChange={(v) => setPrivacy({ ...privacy, whoCanViewProfile: v })}
                options={[
                  { value: 'everyone', label: 'Everyone', icon: <Globe size={14} /> },
                  { value: 'following', label: 'People you follow', icon: <Users size={14} /> },
                  { value: 'off', label: 'No one', icon: <Ban size={14} /> },
                ]}
              />
              <Toggle
                checked={privacy.showActivityStatus}
                onChange={() => setPrivacy({ ...privacy, showActivityStatus: !privacy.showActivityStatus })}
                label="Show activity status"
                description="Let others see when you're active"
              />
              <Toggle
                checked={privacy.showReadReceipts}
                onChange={() => setPrivacy({ ...privacy, showReadReceipts: !privacy.showReadReceipts })}
                label="Read receipts"
                description="Let others know when you've read their messages"
              />
            </SectionCard>

            <SectionCard
              icon={<MapPin size={18} />}
              title="Location"
              description="Manage your location preferences"
            >
              <Toggle
                checked={privacy.showLocation}
                onChange={() => setPrivacy({ ...privacy, showLocation: !privacy.showLocation })}
                label="Show location on profile"
                description="Display your city on your profile"
              />
              <Toggle
                checked={privacy.preciseLocation}
                onChange={() => setPrivacy({ ...privacy, preciseLocation: !privacy.preciseLocation })}
                label="Precise location"
                description="Allow precise location for better recommendations"
              />
            </SectionCard>

            <SectionCard
              icon={<MessageCircle size={18} />}
              title="Messaging"
              description="Control who can contact you"
            >
              <SelectControl
                label="Who can message you"
                description="Control who can send you direct messages"
                value={privacy.whoCanMessage}
                onChange={(v) => setPrivacy({ ...privacy, whoCanMessage: v })}
                options={[
                  { value: 'everyone', label: 'Everyone', icon: <Globe size={14} /> },
                  { value: 'following', label: 'People you follow', icon: <Users size={14} /> },
                  { value: 'verified', label: 'Verified accounts', icon: <UserPlus size={14} /> },
                  { value: 'off', label: 'No one', icon: <Ban size={14} /> },
                ]}
              />
              <SelectControl
                label="Allow story replies"
                description="Who can reply to your stories"
                value={privacy.allowStoryReplies}
                onChange={(v) => setPrivacy({ ...privacy, allowStoryReplies: v })}
                options={[
                  { value: 'everyone', label: 'Everyone', icon: <Globe size={14} /> },
                  { value: 'following', label: 'People you follow', icon: <Users size={14} /> },
                  { value: 'off', label: 'No one', icon: <Ban size={14} /> },
                ]}
              />
              <Toggle
                checked={false}
                onChange={() => {}}
                label="Message requests"
                description="Review message requests from people you don't follow"
              />
            </SectionCard>

            <SectionCard
              icon={<AtSign size={18} />}
              title="Tags & Mentions"
              description="Control how others can interact with you"
            >
              <SelectControl
                label="Who can tag you"
                value={privacy.allowTagging}
                onChange={(v) => setPrivacy({ ...privacy, allowTagging: v })}
                options={[
                  { value: 'everyone', label: 'Everyone', icon: <Globe size={14} /> },
                  { value: 'following', label: 'People you follow', icon: <Users size={14} /> },
                  { value: 'off', label: 'No one', icon: <Ban size={14} /> },
                ]}
              />
              <SelectControl
                label="Who can mention you"
                value={privacy.allowMentions}
                onChange={(v) => setPrivacy({ ...privacy, allowMentions: v })}
                options={[
                  { value: 'everyone', label: 'Everyone', icon: <Globe size={14} /> },
                  { value: 'following', label: 'People you follow', icon: <Users size={14} /> },
                  { value: 'off', label: 'No one', icon: <Ban size={14} /> },
                ]}
              />
            </SectionCard>

            <SectionCard
              icon={<Ban size={18} />}
              title="Blocked & Restricted"
              description="Manage blocked and restricted accounts"
            >
              <div className="py-3">
                <button className="flex w-full items-center justify-between text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                  <span>Blocked accounts</span>
                  <span className="text-xs text-gray-400">{privacy.blockList.length}</span>
                </button>
              </div>
              <div className="py-3">
                <button className="flex w-full items-center justify-between text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors">
                  <span>Restricted accounts</span>
                  <span className="text-xs text-gray-400">{privacy.restrictedList.length}</span>
                </button>
              </div>
              <div className="py-3">
                <button className="flex w-full items-center justify-between text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors">
                  <span>Muted accounts</span>
                  <span className="text-xs text-gray-400">{privacy.mutedList.length}</span>
                </button>
              </div>
            </SectionCard>

            <div className="flex justify-end pb-4">
              <button
                onClick={() => { toast.success('Privacy settings saved'); }}
                className="rounded-xl bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 transition-all"
              >
                Save Privacy Settings
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'account' && (
          <motion.div
            key="account"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <SectionCard
              icon={<Camera size={18} />}
              title="Profile"
              description="Update your profile information"
            >
              <div className="py-4">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(account.name)}&background=2563EB&color=fff&size=200`}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={18} className="text-white" />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{account.name}</p>
                    <p className="text-xs text-gray-500">@{user?.email?.split('@')[0]}</p>
                    <button className="mt-1 text-xs font-semibold text-blue-500 hover:text-blue-700 transition-colors">
                      Change photo
                    </button>
                  </div>
                </div>
              </div>

              <div className="py-3">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</label>
                <input
                  type="text"
                  value={account.name}
                  onChange={(e) => setAccount({ ...account, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="py-3">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  value={account.email}
                  onChange={(e) => setAccount({ ...account, email: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="py-3">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Bio</label>
                <textarea
                  rows={3}
                  value={account.bio}
                  onChange={(e) => setAccount({ ...account, bio: e.target.value })}
                  className="mt-1 w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="py-3">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone</label>
                <input
                  type="tel"
                  value={account.phone}
                  onChange={(e) => setAccount({ ...account, phone: e.target.value })}
                  placeholder="Add phone number"
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </SectionCard>

            <SectionCard
              icon={<GraduationCap size={18} />}
              title="Dashboard Type"
              description="Choose your experience — Student or Professional"
            >
              <div className="py-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDashboardType('student')}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${
                      dashboardType === 'student'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <GraduationCap size={24} />
                    <div>
                      <p className="text-sm font-semibold">Student</p>
                      <p className="text-xs opacity-70">Learning & growth</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setDashboardType('professional')}
                    className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${
                      dashboardType === 'professional'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Briefcase size={24} />
                    <div>
                      <p className="text-sm font-semibold">Professional</p>
                      <p className="text-xs opacity-70">Career & analytics</p>
                    </div>
                  </button>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              icon={<Shield size={18} />}
              title="Account Management"
            >
              <div className="py-3">
                <button
                  onClick={() => { toast.success('Settings saved'); }}
                  className="w-full rounded-xl bg-blue-500 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 transition-all"
                >
                  Save Changes
                </button>
              </div>
              <div className="py-3">
                <button
                  onClick={() => { toast.success('Data exported. Check your email.'); }}
                  className="flex w-full items-center justify-between text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
                >
                  <span>Download account data</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              </div>
            </SectionCard>

            <SectionCard
              icon={<LogOut size={18} />}
              title="Logout & Delete"
            >
              <div className="py-3">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                >
                  <LogOut size={16} />
                  Log out of account
                </button>
              </div>
              <div className="py-3">
                <button
                  onClick={() => { toast.error('Account deletion requested. Check your email to confirm.'); }}
                  className="flex w-full items-center gap-3 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                >
                  <Trash2 size={16} />
                  Delete account permanently
                </button>
              </div>
            </SectionCard>
          </motion.div>
        )}

        {activeTab === 'notifications' && (
          <motion.div
            key="notifications"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <SectionCard
              icon={<Bell size={18} />}
              title="Push Notifications"
              description="Manage in-app notification preferences"
            >
              <Toggle
                checked={notifications.pushEnabled}
                onChange={() => setNotifications({ ...notifications, pushEnabled: !notifications.pushEnabled })}
                label="Push notifications"
                description="Receive push notifications on your device"
              />
              {notifications.pushEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="divide-y divide-gray-50"
                >
                  <Toggle checked={notifications.likes} onChange={() => setNotifications({ ...notifications, likes: !notifications.likes })} label="Likes" description="When someone likes your posts" />
                  <Toggle checked={notifications.comments} onChange={() => setNotifications({ ...notifications, comments: !notifications.comments })} label="Comments" description="When someone comments on your posts" />
                  <Toggle checked={notifications.commentLikes} onChange={() => setNotifications({ ...notifications, commentLikes: !notifications.commentLikes })} label="Comment likes" description="When someone likes your comment" />
                  <Toggle checked={notifications.newFollowers} onChange={() => setNotifications({ ...notifications, newFollowers: !notifications.newFollowers })} label="New followers" />
                  <Toggle checked={notifications.followRequests} onChange={() => setNotifications({ ...notifications, followRequests: !notifications.followRequests })} label="Follow requests" />
                  <Toggle checked={notifications.mentions} onChange={() => setNotifications({ ...notifications, mentions: !notifications.mentions })} label="Mentions" description="When someone mentions you" />
                  <Toggle checked={notifications.messages} onChange={() => setNotifications({ ...notifications, messages: !notifications.messages })} label="Messages" />
                  <Toggle checked={notifications.messageRequests} onChange={() => setNotifications({ ...notifications, messageRequests: !notifications.messageRequests })} label="Message requests" />
                  <Toggle checked={notifications.storyReplies} onChange={() => setNotifications({ ...notifications, storyReplies: !notifications.storyReplies })} label="Story replies" />
                  <Toggle checked={notifications.posts} onChange={() => setNotifications({ ...notifications, posts: !notifications.posts })} label="Posts" description="From accounts you follow" />
                  <Toggle checked={notifications.reminders} onChange={() => setNotifications({ ...notifications, reminders: !notifications.reminders })} label="Reminders" description="Events and sessions you've registered for" />
                </motion.div>
              )}
            </SectionCard>

            <SectionCard
              icon={<Smartphone size={18} />}
              title="Email & SMS"
              description="Manage email and text notifications"
            >
              <Toggle
                checked={notifications.emailNotifications}
                onChange={() => setNotifications({ ...notifications, emailNotifications: !notifications.emailNotifications })}
                label="Email notifications"
                description="Receive updates via email"
              />
              <Toggle
                checked={notifications.smsNotifications}
                onChange={() => setNotifications({ ...notifications, smsNotifications: !notifications.smsNotifications })}
                label="SMS notifications"
                description="Receive updates via text message"
              />
            </SectionCard>

            <div className="flex justify-end pb-4">
              <button
                onClick={() => { toast.success('Notification preferences saved'); }}
                className="rounded-xl bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 transition-all"
              >
                Save Notification Settings
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'security' && (
          <motion.div
            key="security"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <SectionCard
              icon={<Lock size={18} />}
              title="Login & Password"
              description="Manage your login credentials"
            >
              <div className="py-3">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Current Password</label>
                <input
                  type="password"
                  value={security.password}
                  onChange={(e) => setSecurity({ ...security, password: e.target.value })}
                  placeholder="Enter current password"
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="py-3">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">New Password</label>
                <input
                  type="password"
                  value={security.newPassword}
                  onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                  placeholder="Enter new password"
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="py-3">
                <button
                  onClick={() => { toast.success('Password updated successfully'); setSecurity({ ...security, password: '', newPassword: '' }); }}
                  className="w-full rounded-xl bg-blue-500 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 transition-all"
                >
                  Update Password
                </button>
              </div>
            </SectionCard>

            <SectionCard
              icon={<Shield size={18} />}
              title="Two-Factor Authentication"
              description="Add an extra layer of security"
            >
              <Toggle
                checked={security.twoFactor}
                onChange={() => setSecurity({ ...security, twoFactor: !security.twoFactor })}
                label="Two-factor authentication"
                description="Require a code from your authenticator app to log in"
              />
              <Toggle
                checked={security.loginAlerts}
                onChange={() => setSecurity({ ...security, loginAlerts: !security.loginAlerts })}
                label="Login alerts"
                description="Get notified when someone logs into your account"
              />
            </SectionCard>

            <SectionCard
              icon={<Monitor size={18} />}
              title="Active Sessions"
              description="Manage where you're logged in"
            >
              {security.activeSessions.map((session, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                      <Smartphone size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">{session.device}</p>
                        {session.current && (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{session.location} &middot; {session.lastActive}</p>
                    </div>
                  </div>
                  {!session.current && (
                    <button className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">
                      Log out
                    </button>
                  )}
                </div>
              ))}
            </SectionCard>

            <SectionCard
              icon={<Clock size={18} />}
              title="Session Timeout"
              description="Automatically log out after inactivity"
            >
              <SelectControl
                label="Timeout duration"
                value={security.sessionTimeout}
                onChange={(v) => setSecurity({ ...security, sessionTimeout: v })}
                options={[
                  { value: '15min', label: '15 minutes', icon: <Clock size={14} /> },
                  { value: '30min', label: '30 minutes', icon: <Clock size={14} /> },
                  { value: '1hr', label: '1 hour', icon: <Clock size={14} /> },
                  { value: '2hr', label: '2 hours', icon: <Clock size={14} /> },
                  { value: 'never', label: 'Never', icon: <Ban size={14} /> },
                ]}
              />
            </SectionCard>

            <div className="flex justify-end pb-4">
              <button
                onClick={() => { toast.success('Security settings saved'); }}
                className="rounded-xl bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 transition-all"
              >
                Save Security Settings
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'content' && (
          <motion.div
            key="content"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <SectionCard
              icon={<Eye size={18} />}
              title="Content Preferences"
              description="Control what you see on your feed"
            >
              <Toggle
                checked={content.showSensitiveContent}
                onChange={() => setContent({ ...content, showSensitiveContent: !content.showSensitiveContent })}
                label="Show sensitive content"
                description="Display potentially sensitive content in your feed"
              />
              <Toggle
                checked={content.hideOffensiveComments}
                onChange={() => setContent({ ...content, hideOffensiveComments: !content.hideOffensiveComments })}
                label="Hide offensive comments"
                description="Automatically hide comments that may be offensive"
              />
              <Toggle
                checked={content.keywordFilter}
                onChange={() => setContent({ ...content, keywordFilter: !content.keywordFilter })}
                label="Keyword filter"
                description="Filter comments containing specific words"
              />
              {content.keywordFilter && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="py-3"
                >
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Custom Keywords</label>
                  <input
                    type="text"
                    value={content.customKeywords}
                    onChange={(e) => setContent({ ...content, customKeywords: e.target.value })}
                    placeholder="Separate keywords with commas"
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </motion.div>
              )}
            </SectionCard>

            <SectionCard
              icon={<Hash size={18} />}
              title="Muted Words"
              description="Posts with these words won't appear in your feed"
            >
              <div className="py-3">
                <div className="flex flex-wrap gap-2 mb-3">
                  {content.mutedWords.map((word, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                    >
                      {word}
                      <button onClick={() => setContent({ ...content, mutedWords: content.mutedWords.filter((_, j) => j !== i) })}>
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a word to mute..."
                    className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        setContent({ ...content, mutedWords: [...content.mutedWords, e.currentTarget.value.trim()] });
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard
              icon={<Bookmark size={18} />}
              title="Saved Content"
            >
              <div className="flex items-center justify-between py-3">
                <p className="text-sm font-medium text-gray-900">Saved posts</p>
                <span className="text-sm text-gray-500">{content.savedPosts}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <p className="text-sm font-medium text-gray-900">Collections</p>
                <span className="text-sm text-gray-500">{content.collections}</span>
              </div>
              <div className="py-3">
                <button className="text-sm font-semibold text-blue-500 hover:text-blue-700 transition-colors">
                  View saved content
                </button>
              </div>
            </SectionCard>

            <div className="flex justify-end pb-4">
              <button
                onClick={() => { toast.success('Content preferences saved'); }}
                className="rounded-xl bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-600 transition-all"
              >
                Save Content Settings
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
