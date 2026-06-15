import { useState } from 'react';
import { AppShell } from '../../../components/layout';
import { Button, Badge } from '../../../components/ui';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { hiringPipeline } from '../../../data/platformData';

export function HiringDashboardPage() {
  usePageMeta('Hiring dashboard | Tinder for Nerds', 'Applicant pipeline and status tracking.');

  const [cards, setCards] = useState(hiringPipeline.cards);

  const moveCard = (cardId, columnId) => {
    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, columnId } : c)));
  };

  return (
    <AppShell variant="pro" title="Hiring" subtitle="Applicant pipeline" hideTopbar>
      <div className="hiring-dash">
        <header className="hiring-dash__head">
          <div>
            <h1>Hiring dashboard</h1>
            <p>Track applicants from apply to offer.</p>
          </div>
          <Button variant="primary" to="/startup/projects/new">Post project</Button>
        </header>

        <div className="hiring-kanban">
          {hiringPipeline.columns.map((column) => (
            <section key={column.id} className={`hiring-kanban__col hiring-kanban__col--${column.color}`}>
              <header>
                <h2>{column.title}</h2>
                <span>{cards.filter((c) => c.columnId === column.id).length}</span>
              </header>
              <div className="hiring-kanban__cards">
                {cards.filter((c) => c.columnId === column.id).map((card) => (
                  <article key={card.id} className="hiring-kanban__card">
                    <strong>{card.name}</strong>
                    <span>{card.role}</span>
                    <div className="hiring-kanban__meta">
                      <Badge tone="teal">{card.score}% fit</Badge>
                      <span>{card.applied}</span>
                    </div>
                    <div className="hiring-kanban__moves">
                      {hiringPipeline.columns
                        .filter((col) => col.id !== column.id)
                        .slice(0, 2)
                        .map((col) => (
                          <button key={col.id} type="button" onClick={() => moveCard(card.id, col.id)}>
                            → {col.title}
                          </button>
                        ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
