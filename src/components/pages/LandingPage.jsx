import { Link } from 'react-router-dom';
import { Button, Icon } from '../ui';
import '../../styles/landing.css';

export function LandingPage() {
  return (
    <div className="pm-landing-page">
      {/* Navigation */}
      <nav className="pm-landing-nav">
        <div className="pm-landing-nav__logo">ProMatch</div>
        <ul className="pm-landing-nav__links">
          <li><a href="#features">Features</a></li>
          <li><a href="#process">How it works</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <Link to="/login">
          <Button variant="primary" size="sm">Sign in</Button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="pm-landing-hero">
        <div className="pm-landing-hero__content">
          <h1 className="pm-landing-hero__title">
            Find your co-founder, partner, or next collaborator
          </h1>
          <p className="pm-landing-hero__subtitle">
            AI-ranked matching for builders, designers, and operators. 
            Move from discovery to collaboration in minutes.
          </p>
          <div className="pm-landing-hero__cta">
            <Link to="/login">
              <Button variant="primary" size="lg">Get started free</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="pm-landing-features">
        <h2>Why ProMatch</h2>
        <div className="pm-features-grid">
          <div className="pm-feature-card">
            <div className="pm-feature-icon"><Icon name="spark" /></div>
            <h3>AI Match</h3>
            <p>Rank by skills, domain, intent, and working style.</p>
          </div>
          <div className="pm-feature-card">
            <div className="pm-feature-icon"><Icon name="messages" /></div>
            <h3>Real-time Chat</h3>
            <p>Keep momentum high the moment a match lands.</p>
          </div>
          <div className="pm-feature-card">
            <div className="pm-feature-icon"><Icon name="calendar" /></div>
            <h3>1:1 Calls</h3>
            <p>Move from discovery to a scheduled call in one flow.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="process" className="pm-landing-process">
        <h2>How it works</h2>
        <div className="pm-process-steps">
          <div className="pm-process-step">
            <div className="pm-process-step__number">01</div>
            <h3>Sign up</h3>
            <p>OAuth in 30 seconds, then use onboarding to shape the first recommendations.</p>
          </div>
          <div className="pm-process-step">
            <div className="pm-process-step__number">02</div>
            <h3>Build profile</h3>
            <p>Add skills, domain, intent, commitment, and a short bio.</p>
          </div>
          <div className="pm-process-step">
            <div className="pm-process-step__number">03</div>
            <h3>Discover</h3>
            <p>AI-ranked cards show the fit signals that matter most.</p>
          </div>
          <div className="pm-process-step">
            <div className="pm-process-step__number">04</div>
            <h3>Connect</h3>
            <p>Open chat, book a call, or jump into an event.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="pm-landing-pricing">
        <h2>Pricing</h2>
        <div className="pm-pricing-plans">
          <div className="pm-pricing-card">
            <h3>Free</h3>
            <p className="pm-price">$0</p>
            <ul className="pm-pricing-features">
              <li>✓ Discover people</li>
              <li>✓ Send messages</li>
              <li>✓ Book calls</li>
              <li>✓ Community events</li>
            </ul>
            <Button variant="secondary">Get started</Button>
          </div>
          <div className="pm-pricing-card pm-pricing-card--featured">
            <div className="pm-badge">Most popular</div>
            <h3>Pro</h3>
            <p className="pm-price">$12<span>/mo</span></p>
            <ul className="pm-pricing-features">
              <li>✓ Everything in Free</li>
              <li>✓ Priority search</li>
              <li>✓ Analytics</li>
              <li>✓ Company profile</li>
            </ul>
            <Button variant="primary">Start free trial</Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pm-landing-cta">
        <h2>Ready to find your next collaboration?</h2>
        <Link to="/login">
          <Button variant="primary" size="lg">Join ProMatch</Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="pm-landing-footer">
        <div className="pm-footer-content">
          <p>&copy; 2024 ProMatch. All rights reserved.</p>
          <div className="pm-footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
