import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Star,
  Zap,
  MessageCircle,
  Calendar,
  Users,
  Check,
} from 'lucide-react';
import GridDistortion from '../../../components/ui/GridDistortion';
import { Icon } from '../../../components/ui';
import lightTechBg from '../../../assets/light-tech-background.png';
import { landingFeatures } from '../../../constants/landingData';
import '../../../styles/landing.css';

const howItWorks = [
  {
    step: '01',
    title: 'Build your profile',
    body: 'Add skills, intent, domain, and availability so matches are skill-first—not keyword spam.',
    icon: Users,
  },
  {
    step: '02',
    title: 'Discover & connect',
    body: 'Swipe through curated profiles, filter by fit, and connect with builders who share your goals.',
    icon: Zap,
  },
  {
    step: '03',
    title: 'Chat & meet',
    body: 'Move into real-time chat, book 1:1 sessions, and show up to events—all in one workspace.',
    icon: MessageCircle,
  },
];

export function LandingPage() {
  return (
    <div className="taskly-page">
      <div className="taskly-ambient" aria-hidden="true">
        <div className="taskly-ambient__orb taskly-ambient__orb--blue" />
        <div className="taskly-ambient__orb taskly-ambient__orb--violet" />
        <GridDistortion
          imageSrc={lightTechBg}
          grid={14}
          mouse={0.06}
          strength={0.1}
          relaxation={0.94}
          className="taskly-ambient__grid"
        />
      </div>

      {/* Hero */}
      <main id="home" className="taskly-hero">
        <section className="taskly-hero__inner">
          <div className="taskly-hero__copy">
            <div className="taskly-hero__eyebrow">
              <span className="taskly-hero__pill">Skill-first networking</span>
              <div className="taskly-rating" aria-label="Rated 4.9 out of 5">
                <span className="taskly-rating__stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={14} fill="currentColor" />
                  ))}
                </span>
                <span>4.9 from 2,700+ builders</span>
              </div>
            </div>

            <h1>
              Find your next{' '}
              <span className="taskly-gradient-text">nerd-powered</span>{' '}
              connection
            </h1>
            <p className="taskly-hero__subtitle">
              Tinder for Nerds matches students, mentors, and founders by skills,
              intent, and collaboration fit—then takes you from profile to chat to
              booked session in one flow.
            </p>

            <div className="taskly-hero__actions">
              <Link className="taskly-primary-cta" to="/login">
                <span>Get started free</span>
                <span className="taskly-primary-cta__icon" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
              <Link className="taskly-secondary-cta" to="/freelancer/onboarding/step-1">
                I&apos;m a freelancer
              </Link>
            </div>

            <ul className="taskly-hero__checks" aria-label="Platform highlights">
              <li><Check size={16} /> Swipe discovery with smart filters</li>
              <li><Check size={16} /> Real-time chat &amp; presence</li>
              <li><Check size={16} /> Events &amp; bookable 1:1 sessions</li>
            </ul>
          </div>

          <div className="taskly-showcase" aria-label="Product preview">
            <div className="taskly-showcase__glow" aria-hidden="true" />

            <article className="taskly-showcase__card taskly-showcase__card--main">
              <header className="taskly-showcase__card-head">
                <span className="taskly-showcase__avatar">SC</span>
                <div>
                  <strong>Sarah Chen</strong>
                  <span>Product @ Grab · Singapore</span>
                </div>
                <span className="taskly-showcase__match">94% match</span>
              </header>
              <div className="taskly-showcase__tags">
                <span>Product</span>
                <span>UX</span>
                <span>Mentor</span>
              </div>
              <p>Open to mentoring students in PM and UX. Fast responder.</p>
              <div className="taskly-showcase__actions">
                <span className="taskly-showcase__btn taskly-showcase__btn--pass">Pass</span>
                <span className="taskly-showcase__btn taskly-showcase__btn--connect">Connect</span>
              </div>
            </article>

            <article className="taskly-showcase__card taskly-showcase__card--chat">
              <MessageCircle size={16} />
              <div>
                <strong>New message</strong>
                <span>Want to hop on a quick call next week?</span>
              </div>
            </article>

            <article className="taskly-showcase__card taskly-showcase__card--event">
              <Calendar size={16} />
              <div>
                <strong>AI Founders Meetup</strong>
                <span>Tomorrow · 6:00 PM</span>
              </div>
            </article>
          </div>
        </section>
      </main>

      {/* Feature strip */}
      <section id="features" className="taskly-feature-strip" aria-label="Platform features">
        <div className="taskly-feature-strip__inner">
          {landingFeatures.map((feature) => (
            <article className="taskly-feature-strip__item" key={feature.title}>
              <span className="taskly-feature-strip__icon">
                <Icon name={feature.icon} size={20} />
              </span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="taskly-steps" aria-labelledby="how-it-works-title">
        <div className="taskly-section-head taskly-section-head--center">
          <span>How it works</span>
          <h2 id="how-it-works-title">From profile to meeting in three steps</h2>
          <p>No cold DMs. No random LinkedIn spam. Just high-intent matching built for builders.</p>
        </div>
        <div className="taskly-steps__grid">
          {howItWorks.map(({ step, title, body, icon: StepIcon }) => (
            <article className="taskly-step-card" key={step}>
              <span className="taskly-step-card__num">{step}</span>
              <span className="taskly-step-card__icon">
                <StepIcon size={22} />
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="taskly-final-cta">
        <div className="taskly-final-cta__inner">
          <h2>Ready to find your next collaborator?</h2>
          <p>Join thousands of builders already matching on intent, not titles.</p>
          <div className="taskly-final-cta__actions">
            <Link className="taskly-primary-cta" to="/login">
              <span>Create free account</span>
              <span className="taskly-primary-cta__icon" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
            </Link>
            <Link className="taskly-secondary-cta taskly-secondary-cta--light" to="/startup/onboarding/step-1">
              I&apos;m a startup
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
