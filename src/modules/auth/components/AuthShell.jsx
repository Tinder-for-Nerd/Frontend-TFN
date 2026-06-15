import GridDistortion from '../../../components/ui/GridDistortion';
import lightTechBg from '../../../assets/light-tech-background.png';
import '../../../styles/landing.css';
import '../../../styles/login.css';

export function AuthShell({ children }) {
  return (
    <div className="taskly-page taskly-auth-page">
      <div className="taskly-auth-ambient" aria-hidden="true">
        <GridDistortion
          imageSrc={lightTechBg}
          grid={12}
          mouse={0.08}
          strength={0.12}
          relaxation={0.92}
          className="taskly-auth-ambient__grid"
        />
      </div>

      <main className="taskly-auth-main">{children}</main>
    </div>
  );
}

export function AuthLandingVisual({ title, body, stats }) {
  return (
    <aside className="taskly-auth-visual" aria-label="Platform highlights">
      <div className="taskly-auth-visual__card">
        <div className="taskly-auth-visual__media">
          <GridDistortion
            imageSrc={lightTechBg}
            grid={10}
            mouse={0.12}
            strength={0.16}
            relaxation={0.9}
            className="taskly-auth-visual__distortion"
          />
        </div>
        <div className="taskly-auth-visual__copy">
          <h2 className="taskly-auth-visual__title">{title}</h2>
          <p className="taskly-auth-visual__body">{body}</p>
        </div>
      </div>

      {stats?.length ? (
        <div className="taskly-auth-stats">
          {stats.map((stat) => (
            <article className="taskly-auth-stat" key={stat.label}>
              <strong className="taskly-auth-stat__value">{stat.value}</strong>
              <span className="taskly-auth-stat__label">{stat.label}</span>
            </article>
          ))}
        </div>
      ) : null}
    </aside>
  );
}
