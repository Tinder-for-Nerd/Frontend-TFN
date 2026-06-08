import { GoogleLogo, LinkedInLogo } from './AuthIcons';

const PROVIDERS = {
  google: {
    label: 'Continue with Google',
    shortLabel: 'Google',
    Logo: GoogleLogo,
    className: 'pm-oauth-button--google',
  },
  linkedin: {
    label: 'Continue with LinkedIn',
    shortLabel: 'LinkedIn',
    Logo: LinkedInLogo,
    className: 'pm-oauth-button--linkedin',
  },
};

export function OAuthButton({ provider, onClick, disabled = false, size = 'md', variant = 'default' }) {
  const config = PROVIDERS[provider];
  if (!config) return null;

  const label = size === 'lg' ? config.label : config.shortLabel;

  return (
    <button
      type="button"
      className={`pm-oauth-button ${config.className} ${size === 'lg' ? 'pm-oauth-button--lg' : ''} ${variant === 'secondary' ? 'pm-oauth-button--secondary' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={config.label}
    >
      <config.Logo />
      <span>{label}</span>
    </button>
  );
}

export function OAuthButtonGroup({ providers, onProviderClick, disabled = false, layout = 'grid' }) {
  const isStack = layout === 'stack';

  return (
    <div className={isStack ? 'pm-login-card__oauth pm-login-card__oauth--stack' : 'pm-login-card__oauth'}>
      {providers.map((provider, index) => (
        <OAuthButton
          key={provider}
          provider={provider}
          onClick={() => onProviderClick(provider)}
          disabled={disabled}
          size={index === 0 && isStack ? 'lg' : 'md'}
          variant={index === 0 ? 'default' : 'secondary'}
        />
      ))}
    </div>
  );
}
