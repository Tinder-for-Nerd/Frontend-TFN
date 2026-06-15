import { AppShell } from '../../../components/layout';
import { Badge, Button } from '../../../components/ui';
import { FeatureGate, useSubscription } from '../../../context/SubscriptionContext';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { portfolioAnalysis } from '../../../data/platformData';

export function PortfolioAnalyzerPage() {
  const { isPro } = useSubscription();
  usePageMeta('Portfolio analyzer | Tinder for Nerds', 'GitHub score and quality breakdown.');

  const { score, badge, breakdown, repos, github } = portfolioAnalysis;

  return (
    <AppShell variant="student" title="Portfolio analyzer" hideTopbar>
      <div className="portfolio-analyzer">
        <header className="portfolio-analyzer__head">
          <div>
            <h1>Portfolio analyzer</h1>
            <p>Analyzing <strong>{github}</strong></p>
          </div>
          {!isPro ? (
            <Button variant="primary" to="/pro/billing">Unlock with Pro</Button>
          ) : null}
        </header>

        <FeatureGate
          feature="portfolio-analyzer"
          fallback={
            <div className="portfolio-analyzer__gate">
              <p>Pro plan unlocks full GitHub analysis, quality badge, and breakdown.</p>
              <Button variant="primary" to="/pro/billing">Upgrade to Pro — $12/mo</Button>
            </div>
          }
        >
          <div className="portfolio-analyzer__score-card">
            <div className="portfolio-analyzer__score">
              <strong>{score}</strong>
              <span>GitHub score</span>
            </div>
            <Badge tone="teal">{badge} quality</Badge>
          </div>

          <section className="portfolio-analyzer__breakdown">
            <h2>Breakdown</h2>
            {breakdown.map((row) => (
              <div key={row.label} className="portfolio-analyzer__row">
                <span>{row.label}</span>
                <div className="portfolio-analyzer__bar"><span style={{ width: `${row.value}%` }} /></div>
                <strong>{row.value}%</strong>
              </div>
            ))}
          </section>

          <section className="portfolio-analyzer__repos">
            <h2>Top repositories</h2>
            {repos.map((repo) => (
              <article key={repo.name}>
                <strong>{repo.name}</strong>
                <span>{repo.lang} · ★ {repo.stars}</span>
              </article>
            ))}
          </section>
        </FeatureGate>
      </div>
    </AppShell>
  );
}
