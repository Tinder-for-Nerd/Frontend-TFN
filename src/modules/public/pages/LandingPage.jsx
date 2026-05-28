import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../../components/ui';
import GridDistortion from '../../../components/ui/GridDistortion';
import { TestimonialCard } from '../../../components/ui/TestimonialCard';
import { CreativePricing } from '../../../components/ui/CreativePricing';
import { Pencil, Star, Sparkles } from 'lucide-react';
import alexAvatar from '../../../assets/alex-kumar.png';
import lightTechBg from '../../../assets/light-tech-background.png';
import '../../../styles/landing.css';

/* ─── Glow CTA Button ─── */
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

/* ─── Scroll-Reveal Section ─── */
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
      { threshold: 0.08 }
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

/* ─── Badge ─── */
function Badge({ children, tone, variant, className = "" }) {
  return (
    <span className={`pm-badge-lite pm-badge-${tone}-${variant} ${className}`}>
      {children}
    </span>
  );
}

/* ─── Animated Counter ─── */
function AnimatedStat({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
          const duration = 1800;
          const steps = 60;
          const increment = numericValue / steps;
          let current = 0;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            // Ease-out cubic
            const t = step / steps;
            const easedT = 1 - Math.pow(1 - t, 3);
            current = Math.round(easedT * numericValue);
            setCount(current);

            if (step >= steps) {
              clearInterval(timer);
              setCount(numericValue);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  const formatNumber = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'k';
    return num.toLocaleString();
  };

  return (
    <strong ref={ref}>
      {value.includes(',') || value.includes('+') || parseInt(value) >= 1000
        ? formatNumber(count) + (value.includes('+') ? '+' : '')
        : count + suffix
      }
    </strong>
  );
}


/* ─── Feature Data ─── */
const features = [
  { icon: 'spark', title: 'AI-Powered Matching', desc: 'Smart algorithms rank by skills, domain expertise, intent, and working style for precision connections.' },
  { icon: 'messages', title: 'Real-time Messaging', desc: 'Keep momentum high with instant chat the moment a match lands. No delays, no friction.' },
  { icon: 'calendar', title: 'Seamless Scheduling', desc: 'Move from discovery to a scheduled 1:1 call in a single flow. Calendar sync built-in.' },
  { icon: 'chart', title: 'Growth Analytics', desc: 'Track your networking progress, connection quality, and collaboration success metrics.' },
  { icon: 'connections', title: 'Smart Network Graph', desc: 'Visualize your professional network. Discover second-degree connections and warm introductions.' },
  { icon: 'events', title: 'Virtual Events', desc: 'Join curated meetups, hackathons, and pitch sessions tailored to your interests.' },
];

/* ─── Process Steps ─── */
const processSteps = [
  { step: '01', title: 'Sign Up', desc: 'OAuth in 30 seconds. Quick, secure, and ready to go.' },
  { step: '02', title: 'Build Profile', desc: 'Add skills, domain, goals, and your commitment level.' },
  { step: '03', title: 'Discover', desc: 'AI-ranked cards show fit signals that actually matter.' },
  { step: '04', title: 'Connect', desc: 'Open chat, jump into a call, or attend an event together.' },
];

/* ─── Testimonials ─── */
const testimonials = [
  {
    text: "Found my co-founder in 3 days. The AI matching is incredibly accurate — it understood exactly what kind of technical partner I needed.",
    name: "Priya Sharma",
    role: "CEO & Co-Founder, DataStack",
    initials: "PS",
    stars: 5,
  },
  {
    text: "This replaced three networking apps for me. The quality of connections here is 10x better than LinkedIn cold outreach.",
    name: "Marcus Chen",
    role: "Senior Engineer, Stripe",
    initials: "MC",
    stars: 5,
  },
  {
    text: "The scheduling integration is seamless. I went from discovery to my first mentoring call in under 10 minutes.",
    name: "Elena Rodriguez",
    role: "Product Lead, Notion",
    initials: "ER",
    stars: 5,
  },
];


/* ─── Pricing Tiers ─── */
const pricingTiers = [
  {
    name: "Free",
    icon: <Pencil size={24} />,
    price: 0,
    description: "Core matching features to get started.",
    features: ["Discover builders", "Send initial messages", "Book 1:1 calls", "Join basic events"],
    color: "zinc"
  },
  {
    name: "Pro",
    icon: <Star size={24} />,
    price: 12,
    description: "Accelerate your momentum & networking.",
    features: ["Everything in Free", "Priority in search results", "Advanced match analytics", "Unlimited matches & chat", "Special Profile badge"],
    popular: true,
    color: "amber"
  },
  {
    name: "Enterprise",
    icon: <Sparkles size={24} />,
    price: 39,
    description: "For teams, labs, and super-connectors.",
    features: ["Everything in Pro", "Warm double-opt-in intros", "Dedicated networking advisor", "Custom recruitment integrations", "VIP access to hackathons"],
    color: "emerald"
  }
];


/* ─── LANDING PAGE COMPONENT ─── */
export function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [testiList, setTestiList] = useState([
    {
      id: 1,
      testimonial: "Found my co-founder in 3 days. The AI matching is incredibly accurate — it understood exactly what kind of technical partner I needed.",
      author: "Priya Sharma",
      role: "CEO & Co-Founder, DataStack",
      position: "front"
    },
    {
      id: 2,
      testimonial: "This replaced three networking apps for me. The quality of connections here is 10x better than LinkedIn cold outreach.",
      author: "Marcus Chen",
      role: "Senior Engineer, Stripe",
      position: "middle"
    },
    {
      id: 3,
      testimonial: "The scheduling integration is seamless. I went from discovery to my first mentoring call in under 10 minutes.",
      author: "Elena Rodriguez",
      role: "Product Lead, Notion",
      position: "back"
    }
  ]);

  const handleShuffle = useCallback(() => {
    setTestiList((prev) =>
      prev.map((item) => {
        let newPos = "back";
        if (item.position === "front") newPos = "back";
        else if (item.position === "middle") newPos = "front";
        else if (item.position === "back") newPos = "middle";
        return { ...item, position: newPos };
      })
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  }, []);

  return (
    <div className="pm-landing-page">
      {/* ── Navigation ── */}
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
            <li><a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}>Testimonials</a></li>
            <li><a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}>Pricing</a></li>
            <li className="pm-nav-cta">
              <GlowButton to="/login" className="pm-nav-glow">Enter App</GlowButton>
            </li>
          </ul>
        </div>
      </nav>


      {/* ── Hero with GridDistortion Background ── */}
      <div className="pm-hero-wrapper">
        <div className="pm-hero-distortion" aria-hidden="true">
          <GridDistortion
            imageSrc={lightTechBg}
            grid={10}
            mouse={0.25}
            strength={0.15}
            relaxation={0.9}
          />
        </div>
        <div className="pm-hero-distortion-overlay" aria-hidden="true" />

      <Section className="pm-landing-hero">
        {/* Floating decorative shapes */}
        <div className="pm-hero-decor pm-hero-decor--1" aria-hidden="true" />
        <div className="pm-hero-decor pm-hero-decor--2" aria-hidden="true" />
        <div className="pm-hero-decor pm-hero-decor--3" aria-hidden="true" />
        <div className="pm-hero-decor pm-hero-decor--4" aria-hidden="true" />
        <div className="pm-hero-decor pm-hero-decor--5" aria-hidden="true" />

        <div className="pm-landing-hero__content">
          <Badge tone="teal" variant="soft" className="pm-hero-badge">
            <span className="pm-badge-dot" aria-hidden="true"></span>
            Now in Private Beta
          </Badge>

          <h1 className="pm-landing-hero__title">
            Find your next{' '}
            <span className="pm-gradient-text">collaborator</span>
          </h1>

          <p className="pm-landing-hero__subtitle">
            AI-ranked matching for builders, designers, and operators.
            Move from discovery to collaboration in minutes, not weeks.
          </p>

          <div className="pm-landing-hero__cta">
            <GlowButton to="/student/home">Get Started Free</GlowButton>
            <Link className="pm-landing-secondary-link" to="/student/home">
              View demo workspace →
            </Link>
          </div>

          <div className="pm-landing-hero__proof" aria-label="Platform activity">
            <div className="pm-stat-pill">
              <span className="pm-stat-icon">👥</span>
              <AnimatedStat value="2400" suffix="" />
              <span>builders</span>
            </div>
            <div className="pm-stat-pill">
              <span className="pm-stat-icon">⚡</span>
              <AnimatedStat value="91" suffix="%" />
              <span>match quality</span>
            </div>
            <div className="pm-stat-pill">
              <span className="pm-stat-icon">🌍</span>
              <AnimatedStat value="38" />
              <span>cities</span>
            </div>
          </div>
        </div>

        {/* Product Preview Card */}
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
            <span>🎯 Shared skills: Product, UX, React</span>
            <span>⚡ Response time: 2 hours</span>
            <span>📅 Next opening: Tomorrow, 3 PM</span>
          </div>
        </div>
      </Section>
      </div>{/* end pm-hero-wrapper */}


      {/* ── Features ── */}
      <Section id="features" className="pm-landing-features">
        <div className="pm-landing-header">
          <Badge tone="teal" variant="soft">Features</Badge>
          <h2>Why Tinder for Nerds</h2>
          <p>Engineered for high-momentum professional collaboration.</p>
        </div>
        <div className="pm-features-grid">
          {features.map((f, i) => (
            <div key={i} className="pm-feature-card pm-stagger" style={{ '--i': i }}>
              <div className="pm-feature-icon"><Icon name={f.icon} /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>


      {/* ── How it works ── */}
      <Section id="process" className="pm-landing-process">
        <div className="pm-landing-header">
          <Badge tone="teal" variant="soft">Process</Badge>
          <h2>How it works</h2>
          <p>From signup to collaboration in four simple steps.</p>
        </div>
        <div className="pm-process-steps">
          {processSteps.map((item, i) => (
            <div key={i} className="pm-process-step pm-stagger" style={{ '--i': i }}>
              <div className="pm-process-step__number">{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>


      {/* ── Testimonials ── */}
      <Section id="testimonials" className="pm-landing-testimonials">
        <div className="pm-testimonials-stack-container">
          <div className="pm-testimonials-stack-left">
            <Badge tone="teal" variant="soft">Testimonials</Badge>
            <h2>Loved by builders worldwide</h2>
            <p className="pm-testimonials-subtitle">See what our community has to say. Drag the front card left to shuffle through stories.</p>
            <div className="pm-testimonials-controls">
              <button onClick={handleShuffle} className="pm-testimonials-shuffle-btn">
                Shuffle Stories &rarr;
              </button>
            </div>
          </div>
          <div className="pm-testimonials-stack-right">
            <div className="pm-testimonials-stack-wrapper">
              {testiList.map((t) => (
                <TestimonialCard
                  key={t.id}
                  id={t.id}
                  testimonial={t.testimonial}
                  author={t.author}
                  role={t.role}
                  position={t.position}
                  handleShuffle={handleShuffle}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>


      {/* ── Pricing ── */}
      <Section id="pricing" className="pm-landing-pricing">
        <CreativePricing
          tag="Simple Pricing"
          title="Choose Your Momentum"
          description="Connect, collaborate, and build the future together"
          tiers={pricingTiers}
        />
      </Section>


      {/* ── CTA ── */}
      <Section className="pm-landing-cta">
        <div className="pm-cta-card">
          <h2>Ready to find your next collaboration?</h2>
          <p>Join thousands of builders, designers, and operators already connecting on Tinder for Nerds.</p>
          <GlowButton to="/student/home">Join Now — It's Free</GlowButton>
        </div>
      </Section>


      {/* ── Footer ── */}
      <footer className="pm-landing-footer">
        <div className="pm-footer-content">
          <div className="pm-footer-brand">
            <div className="pm-landing-nav__logo">
              <Icon name="spark" size={20} />
              Tinder for Nerds
            </div>
            <p>Ambitious precision in networking. Connecting the world's top builders, one match at a time.</p>
          </div>
          <div className="pm-footer-nav">
            <div className="pm-footer-group">
              <h4>Product</h4>
              <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a>
              <a href="#process" onClick={(e) => { e.preventDefault(); scrollToSection('process'); }}>How it works</a>
              <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}>Pricing</a>
            </div>
            <div className="pm-footer-group">
              <h4>Company</h4>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="pm-footer-group">
              <h4>Legal</h4>
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
            </div>
          </div>
        </div>
        <div className="pm-footer-bottom">
          <p>&copy; 2025 Tinder for Nerds. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
