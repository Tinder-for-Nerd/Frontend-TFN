import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { MessageSquare, Sparkles } from 'lucide-react';
import { Avatar, Button } from '../../../../components/ui';
import { profiles as allProfiles } from '../../../../data/mockData';

function fireMatchConfetti() {
  const duration = 2800;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 72,
      origin: { x: 0, y: 0.65 },
      colors: ['#0084ff', '#34d399', '#fbbf24', '#f472b6'],
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 72,
      origin: { x: 1, y: 0.65 },
      colors: ['#0084ff', '#34d399', '#fbbf24', '#f472b6'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.55 },
    startVelocity: 42,
  });

  frame();
}

export function MatchModal({
  isOpen,
  onClose,
  matchProfile,
  messagesPath = '/student/messages',
  autoDismissMs = 4500,
}) {
  const navigate = useNavigate();
  const me = allProfiles.me;

  useEffect(() => {
    if (!isOpen) return undefined;

    fireMatchConfetti();

    const timer = window.setTimeout(() => {
      onClose();
    }, autoDismissMs);

    return () => window.clearTimeout(timer);
  }, [isOpen, autoDismissMs, onClose]);

  return (
    <AnimatePresence>
      {isOpen && matchProfile ? (
        <motion.div
          className="match-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="match-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            className="match-modal__backdrop"
            aria-label="Close match modal"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="match-modal__panel"
            initial={{ opacity: 0, scale: 0.82, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <motion.div
              className="match-modal__sparkle"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles size={40} />
            </motion.div>

            <h2 id="match-modal-title" className="match-modal__title">
              It&apos;s a match!
            </h2>
            <p className="match-modal__subtitle">
              You and <strong>{matchProfile.name}</strong> are ready to collaborate.
            </p>

            <div className="match-modal__avatars">
              <motion.div
                className="match-modal__avatar-wrap match-modal__avatar-wrap--left"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 220, damping: 18 }}
              >
                <Avatar name={me.name} src={me.src} initials={me.avatar} tone={me.tone} size="xl" />
                <span>You</span>
              </motion.div>

              <motion.div
                className="match-modal__heart"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              >
                <Sparkles size={28} />
              </motion.div>

              <motion.div
                className="match-modal__avatar-wrap match-modal__avatar-wrap--right"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 18 }}
              >
                <Avatar
                  name={matchProfile.name}
                  src={matchProfile.src}
                  initials={matchProfile.avatar}
                  tone={matchProfile.tone}
                  size="xl"
                />
                <span>{matchProfile.name.split(' ')[0]}</span>
              </motion.div>
            </div>

            <div className="match-modal__actions">
              <Button
                variant="primary"
                onClick={() => {
                  navigate(`${messagesPath}/${matchProfile.username || matchProfile.id}`);
                  onClose();
                }}
              >
                <MessageSquare size={16} />
                Send message
              </Button>
              <Button variant="secondary" onClick={onClose}>
                Keep browsing
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
