import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SwipeCard } from '../components/discover/SwipeCard';
import { DiscoverFilters } from '../components/discover/DiscoverFilters';
import { MatchModal } from '../components/discover/MatchModal';
import { useDiscoverStore } from '../store/discoverStore';
import { Button } from '../components/ui/Button';
import { RefreshCw, Users } from 'lucide-react';

export default function DiscoverPage() {
  const {
    currentIndex,
    matches,
    like,
    pass,
    superLike,
    reset,
    filteredProfiles,
  } = useDiscoverStore();

  const [showMatch, setShowMatch] = useState(false);
  const [lastMatchName, setLastMatchName] = useState('');

  const availableProfiles = filteredProfiles();
  const currentProfile = availableProfiles[currentIndex];

  const handleLike = () => {
    if (!currentProfile) return;
    const prevMatches = matches.length;
    like(currentProfile.id);
    setTimeout(() => {
      const newMatches = useDiscoverStore.getState().matches;
      if (newMatches.length > prevMatches) {
        setLastMatchName(currentProfile.name);
        setShowMatch(true);
      }
    }, 100);
  };

  const handlePass = () => {
    if (!currentProfile) return;
    pass(currentProfile.id);
  };

  const handleSuperLike = () => {
    if (!currentProfile) return;
    setLastMatchName(currentProfile.name);
    superLike(currentProfile.id);
    setTimeout(() => setShowMatch(true), 200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Discover</h1>
          <p className="text-sm text-[#64748B]">Find your next connection</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={reset}>
            <RefreshCw size={16} />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <DiscoverFilters className="hidden lg:block" />

        <div className="flex items-center justify-center min-h-[500px]">
          <AnimatePresence mode="wait">
            {currentProfile ? (
              <motion.div
                key={currentProfile.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="w-full max-w-sm"
              >
                <SwipeCard
                  profile={currentProfile}
                  onLike={handleLike}
                  onPass={handlePass}
                  onSuperLike={handleSuperLike}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="rounded-2xl bg-[#F8FAFC] p-6">
                  <Users size={48} className="text-[#64748B]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0F172A]">No more profiles</h3>
                <p className="text-sm text-[#64748B] max-w-sm">
                  You've seen everyone in your area. Check back later for new connections or adjust your filters.
                </p>
                <Button variant="secondary" onClick={reset}>
                  <RefreshCw size={16} />
                  Start over
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <MatchModal
        isOpen={showMatch}
        onClose={() => setShowMatch(false)}
        userName={lastMatchName}
      />
    </motion.div>
  );
}
