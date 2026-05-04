import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function BrandMark() {
  return (
    <Link className="pm-brand" to="/" aria-label="Tinder for Nerds home">
      <span className="pm-brand__mark" aria-hidden="true">
        PM
      </span>
      <span className="pm-brand__copy">
        <strong>Tinder for Nerds</strong>
        <span>Ambitious precision</span>
      </span>
    </Link>
  );
}

export default function LoginPage({ mode = 'login' }) {
  const isSignup = mode === 'signup';

  useEffect(() => {
    document.title = `Tinder for Nerds | ${isSignup ? 'Sign up' : 'Log in'}`;

    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute(
        'content',
        'Log in or sign up to Tinder for Nerds and start finding co-founders, mentors, collaborators, and professionals faster.',
      );
    }

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', '#f8f4ec');
    }
  }, [isSignup]);

  return (
    <div className="pm-auth-shell">
      <div className="pm-auth-shell__glow pm-auth-shell__glow--one" />
      <div className="pm-auth-shell__glow pm-auth-shell__glow--two" />
      <div className="pm-auth-shell__grain" />
      <a className="pm-skip-link" href="#main">
        Skip to content
      </a>

      <section className="pm-auth-hero">
        <BrandMark />
        <div className="pm-auth-hero__content">
          <p className="pm-kicker">Your next chapter starts with the right person.</p>
          <h1>{isSignup ? 'Create a profile that serious people want to meet.' : 'Pick up where your network left off.'}</h1>
          <p>Tinder for Nerds keeps the first step lightweight with Google and LinkedIn OAuth, then moves straight into a focused onboarding flow.</p>
        </div>
        <article className="pm-card pm-auth-hero__quote">
          <p>“It reads like a premium recruiting tool, not a dating app.”</p>
          <div>
            <strong>Maya Chen</strong>
            <span>Founder</span>
          </div>
        </article>
      </section>

      <section id="main" className="pm-auth-panel">
        <div className="pm-auth-panel__inner">
          <LoginForm mode={mode} />
        </div>
      </section>
    </div>
  );
}