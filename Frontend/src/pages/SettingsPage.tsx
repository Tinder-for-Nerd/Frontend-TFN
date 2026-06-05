import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { toast } from 'sonner';
import {
  User, Shield, Bell, Eye, Lock, LogOut, Trash2
} from 'lucide-react';
import { cn } from '../lib/utils';

const settingsSections = [
  { id: 'account', icon: User, label: 'Account' },
  { id: 'privacy', icon: Eye, label: 'Privacy' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'discovery', icon: Shield, label: 'Discovery' },
  { id: 'security', icon: Lock, label: 'Security' },
];

export default function SettingsPage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('account');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [accountName, setAccountName] = useState(user?.name || '');
  const [accountEmail, setAccountEmail] = useState(user?.email || '');
  const [accountBio, setAccountBio] = useState('');

  const [privacyToggles, setPrivacyToggles] = useState({
    showProfile: true,
    showOnlineStatus: true,
    showLocation: true,
    allowMessages: false,
  });

  const [notifToggles, setNotifToggles] = useState({
    matches: true,
    messages: true,
    bookings: true,
    events: true,
    marketing: false,
  });

  const [discoveryLocation, setDiscoveryLocation] = useState('');
  const [discoveryRadius, setDiscoveryRadius] = useState(25);
  const [discoveryLookingFor, setDiscoveryLookingFor] = useState<string[]>(['Mentorship', 'Networking']);

  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30 minutes');

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const togglePrivacy = (key: keyof typeof privacyToggles) => {
    setPrivacyToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleNotif = (key: keyof typeof notifToggles) => {
    setNotifToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleLookingFor = (item: string) => {
    setDiscoveryLookingFor((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-4xl"
    >
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Settings</h1>
        <p className="text-sm text-[#64748B]">Manage your account settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <div className="space-y-1">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                activeSection === section.id
                  ? 'bg-[#2563EB]/10 text-[#2563EB]'
                  : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
              )}
            >
              <section.icon size={18} />
              {section.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeSection === 'account' && (
            <Card>
              <CardContent className="space-y-4">
                <h2 className="text-lg font-semibold text-[#0F172A]">Account Settings</h2>
                <Input label="Name" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
                <Input label="Email" type="email" value={accountEmail} onChange={(e) => setAccountEmail(e.target.value)} />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#0F172A]">Bio</label>
                  <textarea
                    rows={3}
                    value={accountBio}
                    onChange={(e) => setAccountBio(e.target.value)}
                    className="flex w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] resize-none"
                    placeholder="Tell us about yourself"
                  />
                </div>
                <Button onClick={handleSave}>Save Changes</Button>
                <hr className="border-[#E2E8F0]" />
                <Button variant="danger" onClick={handleLogout}>
                  <LogOut size={16} />
                  Log Out
                </Button>
                <Button variant="ghost" className="text-[#EF4444] hover:text-red-600" onClick={() => { toast.error('Account deletion requested'); navigate('/login'); }}>
                  <Trash2 size={16} />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          )}

          {activeSection === 'privacy' && (
            <Card>
              <CardContent className="space-y-4">
                <h2 className="text-lg font-semibold text-[#0F172A]">Privacy</h2>
                {[
                  { key: 'showProfile' as const, label: 'Show profile to everyone' },
                  { key: 'showOnlineStatus' as const, label: 'Show online status' },
                  { key: 'showLocation' as const, label: 'Show location' },
                  { key: 'allowMessages' as const, label: 'Allow messages from anyone' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <span className="text-sm text-[#0F172A]">{item.label}</span>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={privacyToggles[item.key]}
                        onChange={() => togglePrivacy(item.key)}
                        className="peer sr-only"
                      />
                      <div className="h-6 w-11 rounded-full bg-[#E2E8F0] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-[#2563EB] peer-checked:after:translate-x-full" />
                    </label>
                  </div>
                ))}
                <Button onClick={handleSave}>Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {activeSection === 'notifications' && (
            <Card>
              <CardContent className="space-y-4">
                <h2 className="text-lg font-semibold text-[#0F172A]">Notification Preferences</h2>
                {[
                  { key: 'matches' as const, label: 'New matches' },
                  { key: 'messages' as const, label: 'Messages' },
                  { key: 'bookings' as const, label: 'Session bookings' },
                  { key: 'events' as const, label: 'Event reminders' },
                  { key: 'marketing' as const, label: 'Marketing emails' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <span className="text-sm text-[#0F172A]">{item.label}</span>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={notifToggles[item.key]}
                        onChange={() => toggleNotif(item.key)}
                        className="peer sr-only"
                      />
                      <div className="h-6 w-11 rounded-full bg-[#E2E8F0] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-[#2563EB] peer-checked:after:translate-x-full" />
                    </label>
                  </div>
                ))}
                <Button onClick={handleSave}>Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {activeSection === 'discovery' && (
            <Card>
              <CardContent className="space-y-4">
                <h2 className="text-lg font-semibold text-[#0F172A]">Discovery Settings</h2>
                <Input label="Location" placeholder="City, State" value={discoveryLocation} onChange={(e) => setDiscoveryLocation(e.target.value)} />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-[#0F172A]">Search Radius (miles)</label>
                  <input
                    type="range"
                    min={5}
                    max={100}
                    value={discoveryRadius}
                    onChange={(e) => setDiscoveryRadius(Number(e.target.value))}
                    className="w-full accent-[#2563EB]"
                  />
                  <div className="flex justify-between text-xs text-[#64748B]">
                    <span>5 mi</span>
                    <span>{discoveryRadius} mi</span>
                    <span>100 mi</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#0F172A]">Looking for</label>
                  {['Mentorship', 'Networking', 'Job Opportunities', 'Collaboration', 'Friendship'].map((item) => (
                    <label key={item} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={discoveryLookingFor.includes(item)}
                        onChange={() => toggleLookingFor(item)}
                        className="rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB]"
                      />
                      <span className="text-sm text-[#0F172A]">{item}</span>
                    </label>
                  ))}
                </div>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {activeSection === 'security' && (
            <Card>
              <CardContent className="space-y-4">
                <h2 className="text-lg font-semibold text-[#0F172A]">Security</h2>
                <Input
                  label="Current Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button onClick={() => { toast.success('Password updated successfully'); setPassword(''); setNewPassword(''); }}>
                  Update Password
                </Button>
                <hr className="border-[#E2E8F0]" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">Two-Factor Authentication</p>
                    <p className="text-xs text-[#64748B]">Add an extra layer of security</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={twoFactor}
                      onChange={() => setTwoFactor(!twoFactor)}
                      className="peer sr-only"
                    />
                    <div className="h-6 w-11 rounded-full bg-[#E2E8F0] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-[#2563EB] peer-checked:after:translate-x-full" />
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">Session Timeout</p>
                    <p className="text-xs text-[#64748B]">Automatically log out after inactivity</p>
                  </div>
                  <select
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="rounded-xl border border-[#E2E8F0] bg-white px-3 py-1.5 text-sm text-[#0F172A]"
                  >
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>Never</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
}
