import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export function MatchModal({ isOpen, onClose, userName }: MatchModalProps) {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="relative flex flex-col items-center rounded-3xl bg-white p-8 shadow-2xl border border-[#E2E8F0] max-w-sm w-full text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mb-4"
            >
              <Sparkles size={48} className="text-yellow-400" />
            </motion.div>

            <h2 className="text-3xl font-extrabold text-[#0F172A]">It's a Match!</h2>
            <p className="mt-2 text-[#64748B]">
              You and <strong>{userName}</strong> liked each other.
            </p>

            <div className="mt-6 flex gap-4">
              <Avatar name={userName} size="xl" />
              <div className="flex items-center">
                <Sparkles size={24} className="text-yellow-400" />
              </div>
            </div>

            <div className="mt-8 flex w-full flex-col gap-3">
              <Button
                onClick={() => { navigate('/messages'); onClose(); }}
                className="w-full"
              >
                <MessageSquare size={16} />
                Send Message
              </Button>
              <Button
                variant="secondary"
                onClick={onClose}
                className="w-full"
              >
                Keep Browsing
                <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
