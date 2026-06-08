import GridDistortion from '../../../components/ui/GridDistortion';
import lightTechBg from '../../../assets/light-tech-background.png';
import '../../../styles/landing.css';
import '../../../styles/login.css';

const ORB_VIDEO_URL = 'https://future.co/images/homepage/glassy-orb/orb-purple.webm';

export function AuthShell({ children }) {
  return (
    <div className="taskly-page taskly-auth-page">
      <div className="taskly-background-art taskly-auth-background" aria-hidden="true">
        <GridDistortion
          imageSrc={lightTechBg}
          grid={12}
          mouse={0.08}
          strength={0.12}
          relaxation={0.92}
          className="taskly-background-art__canvas"
        />
      </div>

      <main className="taskly-auth-main">{children}</main>

      <div className="taskly-auth-orb" aria-hidden="true">
        <video src={ORB_VIDEO_URL} autoPlay loop muted playsInline preload="auto" />
      </div>
    </div>
  );
}

export function AuthLandingVisual({ title, body, stats }) {
  return (
    <div className="taskly-auth-visual" aria-hidden="true">
      <div className="taskly-visual">
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
            <strong>{title}</strong>
            <span>{body}</span>
          </div>
        </div>
      </div>

      {stats?.length ? (
        <div className="taskly-auth-stats">
          {stats.map((stat) => (
            <article className="taskly-community-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}
