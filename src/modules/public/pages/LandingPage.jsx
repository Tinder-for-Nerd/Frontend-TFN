import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight, Menu, Star, X } from 'lucide-react';
import GridDistortion from '../../../components/ui/GridDistortion';
import lightTechBg from '../../../assets/light-tech-background.png';
import '../../../styles/landing.css';

const ORB_VIDEO_URL = 'https://future.co/images/homepage/glassy-orb/orb-purple.webm';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Community', href: '/about', route: true },
  { label: 'Beta Access', href: '#pricing' },
];

const featureCards = [
  {
    title: 'Find builders who match your intent',
    body: 'Discover students, mentors, founders, and professionals using skills, goals, availability, and collaboration fit.',
  },
  {
    title: 'Move from profile to conversation',
    body: 'Open a profile, connect, chat, and schedule meetings without losing the context that made the match interesting.',
  },
  {
    title: 'Build through events and sessions',
    body: 'Join community events, host meetups, organize attendees, and keep every meeting tied to real networking momentum.',
  },
];

const communityStats = [
  { value: '2,700+', label: 'builders exploring matches' },
  { value: '4.9/5', label: 'early beta satisfaction' },
  { value: '38', label: 'student and pro communities' },
  { value: '1:1', label: 'meetings from profile discovery' },
];

function scrollToSection(id) {
  const element = document.querySelector(id);
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      <div className="taskly-background-art" aria-hidden="true">
        <GridDistortion
          imageSrc={lightTechBg}
          grid={12}
          mouse={0.08}
          strength={0.12}
          relaxation={0.92}
          className="taskly-background-art__canvas"
        />
      </div>

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
            Tinder for Nerds
          </a>

          <nav className={`taskly-nav__links ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLinkItem key={item.label} item={item} onNavigate={closeMenu} />
            ))}
            <Link className="taskly-nav__enter" to="/student/home" onClick={closeMenu}>
              Enter Beta
            </Link>
          </nav>

          <div className="taskly-nav__actions">
            <Link className="taskly-signup" to="/signup">
              <span>Join Beta</span>
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
            <div className="taskly-rating" aria-label="Rated 4.9 out of 5 by 2700 plus builders">
              <span className="taskly-rating__stars" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={15} fill="currentColor" />
                ))}
              </span>
              <span>Rated 4.9/5 by 2700+ builders</span>
            </div>

            <h1>Find your next nerd-powered connection</h1>
            <p className="taskly-hero__subtitle">
              Meet collaborators, mentors, founders, and technical partners through skill-first discovery, real profiles, chat, events, and bookable meetings.
            </p>

            <div className="taskly-hero__actions">
              <Link className="taskly-primary-cta" to="/student/home">
                <span>Enter Student Beta</span>
                <span className="taskly-primary-cta__icon" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </Link>

              <Link className="taskly-workspace-link" to="/pro/overview">
                Professional dashboard
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="taskly-visual" aria-label="Interactive Tinder for Nerds visual preview">
            <div className="taskly-visual__image">
              <GridDistortion
                imageSrc={lightTechBg}
                grid={10}
                mouse={0.12}
                strength={0.16}
                relaxation={0.9}
                className="taskly-visual__distortion"
              />
              <div className="taskly-visual__caption">
                <strong>Skill-first discovery</strong>
                <span>Profiles, chats, events, and meetings in one glass workspace.</span>
              </div>
            </div>

            <div className="taskly-orb" aria-hidden="true">
              <video
                src={ORB_VIDEO_URL}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </section>
      </main>

      <section className="taskly-partners" aria-label="Tinder for Nerds beta community proof">
        <p>Built for high-intent student and professional networking</p>
        <div className="taskly-partners__track">
          {communityStats.map((stat) => (
            <article className="taskly-community-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="features" className="taskly-feature-band">
        <div className="taskly-section-head">
          <span>Features</span>
          <h2>Everything you need to discover, connect, and meet</h2>
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
          <h2>Choose the workspace built for how you network.</h2>
          <div className="taskly-pricing-card__actions">
            <Link to="/student/home">Student dashboard</Link>
            <Link to="/pro/overview">Professional dashboard</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
