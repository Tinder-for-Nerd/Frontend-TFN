import { useState } from 'react';
import { AppShell } from '../../../components/layout';
import { Button } from '../../../components/ui';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { settingsTabs } from '../../../data/mockData';
import { useSubscription } from '../../../context/SubscriptionContext';
import '../../../styles/settings.css';

const TAB_CONTENT = {
  Profile: () => (
    <section className="pm-settings-section">
      <h2>Profile</h2>
      <div className="pm-setting-item"><div className="pm-setting-label"><p className="pm-setting-name">Display name</p></div><input className="pm-settings-input" defaultValue="Alex Kumar" /></div>
      <div className="pm-setting-item"><div className="pm-setting-label"><p className="pm-setting-name">Headline</p></div><input className="pm-settings-input" defaultValue="ML Engineer · FinTech" /></div>
    </section>
  ),
  Account: () => (
    <section className="pm-settings-section">
      <h2>Account</h2>
      <div className="pm-setting-item"><div className="pm-setting-label"><p className="pm-setting-name">Email</p></div><input className="pm-settings-input" defaultValue="alex@example.com" /></div>
      <Button variant="secondary" size="sm">Change password</Button>
      <div className="pm-setting-item">
        <div className="pm-setting-label">
          <p className="pm-setting-name">Sign out</p>
          <p className="pm-setting-description">End your session on this device.</p>
        </div>
        <Button variant="secondary" size="sm" to="/logout">
          Sign out
        </Button>
      </div>
    </section>
  ),
  Notifications: ({ settings, handleToggle }) => (
    <section className="pm-settings-section">
      <h2>Notifications</h2>
      {['notifications', 'emailDigest'].map((key) => (
        <div className="pm-setting-item" key={key}>
          <div className="pm-setting-label"><p className="pm-setting-name">{key === 'notifications' ? 'Push notifications' : 'Email digest'}</p></div>
          <label className="pm-toggle-switch"><input type="checkbox" checked={settings[key]} onChange={() => handleToggle(key)} /><span className="pm-toggle-slider" /></label>
        </div>
      ))}
    </section>
  ),
  Privacy: () => (
    <section className="pm-settings-section">
      <h2>Privacy</h2>
      <p className="pm-settings-muted">Control who can see your profile and availability.</p>
      <select className="pm-settings-input" defaultValue="public"><option value="public">Public</option><option value="connections">Connections only</option></select>
    </section>
  ),
  Appearance: () => (
    <section className="pm-settings-section"><h2>Appearance</h2><p className="pm-settings-muted">Theme follows system light mode.</p></section>
  ),
  Billing: ({ isPro }) => (
    <section className="pm-settings-section">
      <h2>Billing</h2>
      <p>{isPro ? 'Pro plan active — $12/mo' : 'Free plan'}</p>
      <Button variant="primary" size="sm" to="/pro/billing">{isPro ? 'Manage subscription' : 'Upgrade to Pro'}</Button>
    </section>
  ),
  'Danger Zone': () => (
    <section className="pm-settings-section pm-settings-section--danger">
      <h2>Danger zone</h2>
      <Button variant="secondary" size="sm">Delete account</Button>
    </section>
  ),
};

export function SettingsPage({ variant = 'student' }) {
  const { isPro } = useSubscription();
  const [activeTab, setActiveTab] = useState('Profile');
  const [settings, setSettings] = useState({ notifications: true, emailDigest: true });

  usePageMeta('Settings | Tinder for Nerds', 'Profile, notifications, billing, and security.');

  const handleToggle = (key) => setSettings((s) => ({ ...s, [key]: !s[key] }));
  const Panel = TAB_CONTENT[activeTab] || TAB_CONTENT.Profile;

  return (
    <AppShell variant={variant} title="Settings" hideTopbar className="pm-settings-shell">
      <div className="pm-settings-page pm-settings-page--tabs">
        <header className="pm-settings-header">
          <h1 className="pm-settings-header__title">Settings</h1>
        </header>

        <div className="pm-settings-tabs-layout">
          <nav className="pm-settings-tabs" aria-label="Settings sections">
            {settingsTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`pm-settings-tab${activeTab === tab ? ' is-active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>
          <div className="pm-settings-tab-panel">
            <Panel settings={settings} handleToggle={handleToggle} isPro={isPro} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
