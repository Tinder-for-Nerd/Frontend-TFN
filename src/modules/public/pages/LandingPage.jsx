import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, Menu, Star, X } from 'lucide-react';
import '../../../styles/landing.css';

const ORB_VIDEO_URL = 'https://future.co/images/homepage/glassy-orb/orb-purple.webm';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Company', href: '/about', route: true },
  { label: 'Pricing', href: '#pricing' },
];

const featureCards = [
  {
    title: 'Plan without friction',
    body: 'Turn goals, people, and deadlines into a calm workspace your team can scan in seconds.',
  },
  {
    title: 'Collaborate in context',
    body: 'Keep messages, sessions, discovery, and project movement connected across student and pro workspaces.',
  },
  {
    title: 'Move from idea to meeting',
    body: 'Book conversations, organize events, and keep relationship momentum in one polished flow.',
  },
];

const partnerLogos = ['Aster', 'Nexa', 'Lumen', 'Orbit', 'Helio'];

function scrollToSection(id) {
  const element = document.querySelector(id);
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function PartnerLogo({ name }) {
  return (
    <svg className="taskly-partner-logo" viewBox="0 0 160 44" role="img" aria-label={name}>
      <circle cx="22" cy="22" r="12" />
      <path d="M44 16h70M44 28h92" />
      <text x="52" y="27">{name}</text>
    </svg>
  );
}

function NavLinkItem({ item, onNavigate }) {
  if (item.route) {
    return (
      <Link to={item.href} onClick={onNavigate}>
        {item.label}
      </Link>
    );
  }

  return (
    <a
      href={item.href}
      onClick={(event) => {
        event.preventDefault();
        scrollToSection(item.href);
        onNavigate();
      }}
    >
      {item.label}
    </a>
  );
}

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <div className="taskly-page">
      <header className={`taskly-nav ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="taskly-nav__inner">
          <a
            className="taskly-brand"
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection('#home');
              closeMenu();
            }}
          >
            Taskly
          </a>

          <nav className={`taskly-nav__links ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLinkItem key={item.label} item={item} onNavigate={closeMenu} />
            ))}
            <Link className="taskly-nav__enter" to="/student/home" onClick={closeMenu}>
              Enter App
            </Link>
          </nav>

          <div className="taskly-nav__actions">
            <Link className="taskly-signup" to="/signup">
              <span>Sign Up</span>
              <ChevronRight size={16} />
            </Link>
            <button
              className="taskly-menu"
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileMenuOpen((value) => !value)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main id="home" className="taskly-hero">
        <section className="taskly-hero__inner">
          <div className="taskly-hero__copy">
            <div className="taskly-rating" aria-label="Rated 4.9 out of 5 by 2700 plus customers">
              <span className="taskly-rating__stars" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={15} fill="currentColor" />
                ))}
              </span>
              <span>Rated 4.9/5 by 2700+ customers</span>
            </div>

            <h1>Work smarter, achieve faster</h1>
            <p className="taskly-hero__subtitle">
              Effortlessly manage your projects, collaborate with your team, and achieve your goals with our intuitive task management tool.
            </p>

            <div className="taskly-hero__actions">
              <Link className="taskly-primary-cta" to="/student/home">
                <span>Get Started Now</span>
                <span className="taskly-primary-cta__icon" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </Link>

              <Link className="taskly-workspace-link" to="/pro/overview">
                Professional workspace
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="taskly-orb" aria-label="Interactive liquid glass orb preview">
            <video
              src={ORB_VIDEO_URL}
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
            />
          </div>
        </section>
      </main>

      <section className="taskly-partners" aria-label="Trusted by top-tier product companies">
        <p>Trusted by Top-tier product companies</p>
        <div className="taskly-partners__track">
          {partnerLogos.map((name) => (
            <PartnerLogo key={name} name={name} />
          ))}
        </div>
      </section>

      <section id="features" className="taskly-feature-band">
        <div className="taskly-section-head">
          <span>Features</span>
          <h2>Liquid Glass workflows for every workspace</h2>
        </div>
        <div className="taskly-feature-grid">
          {featureCards.map((feature) => (
            <article className="taskly-feature-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="taskly-pricing-band">
        <div className="taskly-pricing-card">
          <span>Beta access</span>
          <h2>Enter the workspace that matches your role.</h2>
          <div className="taskly-pricing-card__actions">
            <Link to="/student/home">Student dashboard</Link>
            <Link to="/pro/overview">Professional dashboard</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
