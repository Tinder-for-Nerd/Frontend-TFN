import { useState } from 'react';
import { Button, Icon } from '../ui';
import '../../styles/settings.css';

export function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailDigest: true,
    profileVisibility: 'public',
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="pm-settings-page">
      <header className="pm-settings-header">
        <h1 className="pm-settings-header__title">Settings</h1>
      </header>

      <div className="pm-settings-sections">
        <section className="pm-settings-section">
          <h2 className="pm-settings-section__title">Notifications</h2>
          
          <div className="pm-setting-item">
            <div className="pm-setting-label">
              <p className="pm-setting-name">Push notifications</p>
              <p className="pm-setting-description">Receive alerts for messages and matches</p>
            </div>
            <label className="pm-toggle-switch">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={() => handleToggle('notifications')}
              />
              <span className="pm-toggle-slider"></span>
            </label>
          </div>

          <div className="pm-setting-item">
            <div className="pm-setting-label">
              <p className="pm-setting-name">Email digest</p>
              <p className="pm-setting-description">Weekly summary of your activity</p>
            </div>
            <label className="pm-toggle-switch">
              <input
                type="checkbox"
                checked={settings.emailDigest}
                onChange={() => handleToggle('emailDigest')}
              />
              <span className="pm-toggle-slider"></span>
            </label>
          </div>
        </section>

        <section className="pm-settings-section">
          <h2 className="pm-settings-section__title">Privacy</h2>
          
          <div className="pm-setting-item">
            <label className="pm-setting-label">
              <p className="pm-setting-name">Profile visibility</p>
              <p className="pm-setting-description">Who can see your profile</p>
            </label>
            <select className="pm-setting-select" value={settings.profileVisibility}>
              <option>Public</option>
              <option>Friends only</option>
              <option>Private</option>
            </select>
          </div>
        </section>

        <section className="pm-settings-section pm-settings-section--danger">
          <h2 className="pm-settings-section__title">Account</h2>
          <Button variant="secondary" size="md">
            Sign out
          </Button>
          <Button variant="secondary" size="md">
            Delete account
          </Button>
        </section>
      </div>
    </div>
  );
}
