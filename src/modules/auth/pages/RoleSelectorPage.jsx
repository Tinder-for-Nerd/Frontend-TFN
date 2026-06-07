import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthShell } from '../components/AuthShell';
import { AuthLogo } from '../components/AuthLogo';
import { RoleCard } from '../components/RoleCard';
import { ROLE_SELECTOR_CARDS } from '../authConfig';
import '../../../styles/login.css';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function RoleSelectorPage() {
  return (
    <AuthShell>
      <section className="taskly-auth-hero taskly-auth-hero--selector">
        <header className="taskly-auth-top">
          <AuthLogo to="/" />
          <Link to="/" className="taskly-workspace-link">Back to home</Link>
        </header>

        <motion.div
          className="taskly-auth-copy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="taskly-rating">
            <span>Choose your workspace</span>
          </div>
          <h1>Find your co-builder.</h1>
          <p className="taskly-hero__subtitle">
            Pick the login experience that matches how you use Tinder for Nerds.
          </p>
        </motion.div>

        <motion.div
          className="taskly-auth-role-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {ROLE_SELECTOR_CARDS.map((role) => (
            <motion.div key={role.id} variants={item}>
              <RoleCard
                icon={role.icon}
                title={role.label}
                subtitle={role.description}
                tags={role.tags}
                href={`/login/${role.path}`}
              />
            </motion.div>
          ))}
        </motion.div>

        <p className="taskly-auth-footer">
          Already have an account?{' '}
          <Link to="/login/student" className="taskly-workspace-link">Sign in →</Link>
        </p>
      </section>
    </AuthShell>
  );
}
