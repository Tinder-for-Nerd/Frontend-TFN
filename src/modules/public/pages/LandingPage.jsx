import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from '../../../components/ui';
import alexAvatar from '../../../assets/alex-kumar.png';
import '../../../styles/landing.css';

function GlowButton({ to, children, className = "" }) {
  return (
    <div className={`pm-glow-btn-wrap pm-press-feedback ${className}`}>
      <div className="pm-glow-btn-bg"></div>
      <Link to={to} className="pm-glow-btn">
        {children}
        <svg aria-hidden="true" viewBox="0 0 10 10">
          <path d="M0 5h7" className="arrow-path"></path>
          <path d="M1 1l4 4-4 4" className="head-path"></path>
        </svg>
      </Link>
    </div>
  );
}

function Section({ children, className = "", id }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id={id} 
      ref={sectionRef} 
      className={`${className} pm-reveal ${isVisible ? 'is-visible' : ''}`}
    >
      {children}
    </section>
  );
}

export function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="pm-landing-page">
      {/* Navigation */}
      <nav className={`pm-landing-nav ${isScrolled ? 'pm-landing-nav--scrolled' : ''}`}>
        <div className="pm-nav-container">
          <div className="pm-landing-nav__logo">
            <Icon name="spark" size={24} />
            Tinder for Nerds
          </div>
          
          <button 
            className="pm-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} size={24} />
          </button>

          <ul className={`pm-landing-nav__links ${mobileMenuOpen ? 'is-open' : ''}`}>
            <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a></li>
            <li><a href="#process" onClick={(e) => { e.preventDefault(); scrollToSection('process'); }}>How it works</a></li>
            <li><a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}>Pricing</a></li>
            <li className="pm-nav-cta">
              <GlowButton to="/login" className="pm-nav-glow">Enter App</GlowButton>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <Section className="pm-landing-hero">
        <div className="pm-landing-hero__content">
          <Badge tone="teal" variant="soft" className="pm-hero-badge">Now in Private Beta</Badge>
          <h1 className="pm-landing-hero__title">
            Find your co-founder, partner, or next collaborator
          </h1>
          <p className="pm-landing-hero__subtitle">
            AI-ranked matching for builders, designers, and operators. 
            Move from discovery to collaboration in minutes.
          </p>
          <div className="pm-landing-hero__cta">
            <GlowButton to="/student/home">Get Started For Free</GlowButton>
            <Link className="pm-landing-secondary-link" to="/student/home">
              View demo workspace
            </Link>
          </div>
          <div className="pm-landing-hero__proof" aria-label="Platform activity">
            <span><strong>2,400+</strong> builders</span>
            <span><strong>91%</strong> match quality</span>
            <span><strong>38</strong> cities</span>
          </div>
        </div>

        <div className="pm-landing-product" aria-label="Tinder for Nerds product preview">
          <div className="pm-landing-product__top">
            <div className="pm-landing-avatar">
              <img src={alexAvatar} alt="Alex Kumar profile" />
            </div>
            <div>
              <strong>Alex Kumar</strong>
              <span>ML Engineer · FinTech</span>
            </div>
            <div className="pm-landing-score">
              <strong>94%</strong>
              <span>fit</span>
            </div>
          </div>

          <div className="pm-landing-match-card">
            <div className="pm-match-visual" aria-hidden="true">
              <span>SC</span>
            </div>
            <div>
              <Badge tone="teal" variant="soft">Recommended</Badge>
              <h3>Sarah Chen</h3>
              <p>Product mentor with strong UX and founder-fit signals.</p>
            </div>
          </div>

          <div className="pm-landing-signals">
            <span>Shared skills: Product, UX, React</span>
            <span>Response time: 2 hours</span>
            <span>Next opening: Tomorrow, 3 PM</span>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section id="features" className="pm-landing-features">
        <div className="pm-landing-header">
          <Badge tone="teal" variant="soft">Features</Badge>
          <h2>Why Tinder for Nerds</h2>
          <p>Engineered for high-momentum collaboration.</p>
        </div>
        <div className="pm-features-grid">
          <div className="pm-feature-card pm-interactive-lift">
            <div className="pm-feature-icon"><Icon name="spark" /></div>
            <h3>AI Match</h3>
            <p>Rank by skills, domain, intent, and working style.</p>
          </div>
          <div className="pm-feature-card pm-interactive-lift">
            <div className="pm-feature-icon"><Icon name="messages" /></div>
            <h3>Real-time Chat</h3>
            <p>Keep momentum high the moment a match lands.</p>
          </div>
          <div className="pm-feature-card pm-interactive-lift">
            <div className="pm-feature-icon"><Icon name="calendar" /></div>
            <h3>1:1 Calls</h3>
            <p>Move from discovery to a scheduled call in one flow.</p>
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section id="process" className="pm-landing-process">
        <div className="pm-landing-header">
          <Badge tone="teal" variant="soft">Process</Badge>
          <h2>How it works</h2>
        </div>
        <div className="pm-process-steps">
          {[
            { step: '01', title: 'Sign up', desc: 'OAuth in 30 seconds, then shape recommendations.' },
            { step: '02', title: 'Build profile', desc: 'Add skills, domain, and commitment level.' },
            { step: '03', title: 'Discover', desc: 'AI-ranked cards show fit signals that matter.' },
            { step: '04', title: 'Connect', desc: 'Open chat or jump into an event.' }
          ].map((item, i) => (
            <div key={i} className="pm-process-step pm-interactive-lift">
              <div className="pm-process-step__number">{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="pm-landing-pricing">
        <div className="pm-landing-header">
          <Badge tone="teal" variant="soft">Pricing</Badge>
          <h2>Choose your momentum</h2>
        </div>
        <div className="pm-pricing-plans">
          <div className="pm-pricing-card pm-interactive-lift">
            <h3>Free</h3>
            <p className="pm-price">$0</p>
            <ul className="pm-pricing-features">
              <li>✓ Discover people</li>
              <li>✓ Send messages</li>
              <li>✓ Book calls</li>
            </ul>
            <GlowButton to="/student/home">Get started</GlowButton>
          </div>
          <div className="pm-pricing-card pm-pricing-card--featured pm-interactive-lift">
            <div className="pm-badge">Most popular</div>
            <h3>Pro</h3>
            <p className="pm-price">$12<span>/mo</span></p>
            <ul className="pm-pricing-features">
              <li>✓ Everything in Free</li>
              <li>✓ Priority search</li>
              <li>✓ Analytics</li>
            </ul>
            <GlowButton to="/student/home">Start free trial</GlowButton>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="pm-landing-cta">
        <div className="pm-cta-card">
          <h2>Ready to find your next collaboration?</h2>
          <GlowButton to="/student/home">Join Tinder for Nerds Now</GlowButton>
        </div>
      </Section>

      {/* Footer */}
      <footer className="pm-landing-footer">
        <div className="pm-footer-content">
          <div className="pm-footer-brand">
            <div className="pm-landing-nav__logo">Tinder for Nerds</div>
            <p>Ambitious Precision in Networking.</p>
          </div>
          <div className="pm-footer-nav">
            <div className="pm-footer-group">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="pm-footer-group">
              <h4>Legal</h4>
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
            </div>
          </div>
        </div>
        <div className="pm-footer-bottom">
          <p>&copy; 2024 Tinder for Nerds. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function Badge({ children, tone, variant }) {
  return <span className={`pm-badge-lite pm-badge-${tone}-${variant}`}>{children}</span>;
}
