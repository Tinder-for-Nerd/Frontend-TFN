import { Button } from '../ui';
import '../../styles/about.css';

export function AboutPage() {
  return (
    <div className="pm-about-page">
      <section className="pm-about-hero">
        <h1>About ProMatch</h1>
        <p>We believe finding the right collaborator shouldn't be a game of chance.</p>
      </section>

      <section className="pm-about-section">
        <h2>Our mission</h2>
        <p>
          ProMatch makes it easy for builders, designers, operators, and entrepreneurs to discover 
          and collaborate with the right people. We use AI to cut through the noise and surface the 
          best matches based on what actually matters—skills, domain expertise, intent, and working style.
        </p>
      </section>

      <section className="pm-about-section">
        <h2>The problem we solve</h2>
        <div className="pm-problems-grid">
          <div className="pm-problem-card">
            <h3>Noisy networks</h3>
            <p>Traditional networking is chaotic and time-consuming. Most connections don't lead anywhere.</p>
          </div>
          <div className="pm-problem-card">
            <h3>Misaligned intent</h3>
            <p>Without clear signals, you waste time talking to people who aren't a good fit.</p>
          </div>
          <div className="pm-problem-card">
            <h3>Friction to action</h3>
            <p>Moving from interest to an actual conversation or commitment is slow and painful.</p>
          </div>
          <div className="pm-problem-card">
            <h3>No visibility</h3>
            <p>You don't know what signals matter most or how to improve your chances of good matches.</p>
          </div>
        </div>
      </section>

      <section className="pm-about-section">
        <h2>Our approach</h2>
        <div className="pm-approach-steps">
          <div className="pm-step">
            <span className="pm-step-number">1</span>
            <h3>Signal clarity</h3>
            <p>We ask for what actually matters: skills, domain, intent, commitment, and working style.</p>
          </div>
          <div className="pm-step">
            <span className="pm-step-number">2</span>
            <h3>AI ranking</h3>
            <p>Our algorithm ranks matches by compatibility, keeping the most relevant people at the top.</p>
          </div>
          <div className="pm-step">
            <span className="pm-step-number">3</span>
            <h3>Frictionless action</h3>
            <p>Chat, schedule, and collaborate without ever leaving the platform.</p>
          </div>
        </div>
      </section>

      <section className="pm-about-section">
        <h2>Our team</h2>
        <p>
          Built by makers and operators who've been through the chaos of finding the right collaborators. 
          We're using ProMatch ourselves, every day.
        </p>
      </section>

      <section className="pm-about-cta">
        <h2>Join ProMatch</h2>
        <p>Start discovering better collaborations today</p>
        <Button variant="primary" size="lg">
          Get started free
        </Button>
      </section>
    </div>
  );
}
