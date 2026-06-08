import { useState } from 'react';
import { AppShell } from '../../../components/layout';
import { Button, Badge, Icon } from '../../../components/ui';
import '../../../styles/settings.css';

export function SettingsPage({ variant = 'student' }) {
  const [settings, setSettings] = useState({
    notifications: true,
    emailDigest: true,
    profileVisibility: 'public',
    availabilityShare: variant === 'pro',
    autoConfirmBookings: false,
    payoutEmails: variant === 'pro',
    matchSuggestions: variant !== 'pro',
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <AppShell
      variant={variant}
      title="Settings"
      subtitle={
        variant === 'pro'
          ? 'Control bookings, notifications, and professional preferences.'
          : 'Control notifications, privacy, and account preferences.'
      }
      hideTopbar
      className="pm-settings-shell"
    >
      <div className="pm-settings-page">
        <header className="pm-settings-header">
          <div>
            <h1 className="pm-settings-header__title">Account settings</h1>
            <p>
              {variant === 'pro'
                ? 'Tune availability, booking rules, and organizer preferences.'
                : 'Fine-tune how Tinder for Nerds works for you.'}
            </p>
          </div>
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

            {variant === 'pro' ? (
              <div className="pm-setting-item">
                <div className="pm-setting-label">
                  <p className="pm-setting-name">Payout emails</p>
                  <p className="pm-setting-description">Updates for bookings and payouts</p>
                </div>
                <label className="pm-toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.payoutEmails}
                    onChange={() => handleToggle('payoutEmails')}
                  />
                  <span className="pm-toggle-slider"></span>
                </label>
              </div>
            ) : null}
          </section>

          <section className="pm-settings-section">
            <h2 className="pm-settings-section__title">
              {variant === 'pro' ? 'Bookings' : 'Privacy'}
            </h2>
            
            {variant === 'pro' ? (
              <>
                <div className="pm-setting-item">
                  <div className="pm-setting-label">
                    <p className="pm-setting-name">Share availability</p>
                    <p className="pm-setting-description">Let connections book available slots</p>
                  </div>
                  <label className="pm-toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.availabilityShare}
                      onChange={() => handleToggle('availabilityShare')}
                    />
                    <span className="pm-toggle-slider"></span>
                  </label>
                </div>

                <div className="pm-setting-item">
                  <div className="pm-setting-label">
                    <p className="pm-setting-name">Auto-confirm bookings</p>
                    <p className="pm-setting-description">Skip manual approval for new sessions</p>
                  </div>
                  <label className="pm-toggle-switch">
                    <input
                      type="checkbox"
                      checked={settings.autoConfirmBookings}
                      onChange={() => handleToggle('autoConfirmBookings')}
                    />
                    <span className="pm-toggle-slider"></span>
                  </label>
                </div>
              </>
            ) : (
              <div className="pm-setting-item">
                <label className="pm-setting-label">
                  <p className="pm-setting-name">Profile visibility</p>
                  <p className="pm-setting-description">Who can see your profile</p>
                </label>
                <select
                  className="pm-setting-select"
                  value={settings.profileVisibility}
                  onChange={(event) =>
                    setSettings({ ...settings, profileVisibility: event.target.value })
                  }
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends only</option>
                  <option value="private">Private</option>
                </select>
              </div>
            )}
          </section>

          <section className="pm-settings-section">
            <h2 className="pm-settings-section__title">
              {variant === 'pro' ? 'Discovery' : 'Recommendations'}
            </h2>

            <div className="pm-setting-item">
              <div className="pm-setting-label">
                <p className="pm-setting-name">
                  {variant === 'pro' ? 'Student requests' : 'Match suggestions'}
                </p>
                <p className="pm-setting-description">
                  {variant === 'pro'
                    ? 'Prioritize relevant student connection requests'
                    : 'Tune match suggestions based on your activity'}
                </p>
              </div>
              <label className="pm-toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.matchSuggestions}
                  onChange={() => handleToggle('matchSuggestions')}
                />
                <span className="pm-toggle-slider"></span>
              </label>
            </div>
          </section>

          <section className="pm-settings-section pm-settings-section--danger">
            <h2 className="pm-settings-section__title">Account</h2>
            <Button variant="secondary" size="md" to="/logout" icon="logout">
              Sign out
            </Button>
            <Button variant="secondary" size="md">
              Delete account
            </Button>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
