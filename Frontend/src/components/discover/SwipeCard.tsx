import { motion, useMotionValue, useTransform } from 'framer-motion';
import { MapPin, Star, Heart, X, Zap } from 'lucide-react';
import type { DiscoveryProfile } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { cn, getMatchColor } from '../../lib/utils';

interface SwipeCardProps {
  profile: DiscoveryProfile;
  onLike: () => void;
  onPass: () => void;
  onSuperLike: () => void;
}

export function SwipeCard({ profile, onLike, onPass, onSuperLike }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const passOpacity = useTransform(x, [-100, 0], [1, 0]);
  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) {
      onLike();
    } else if (info.offset.x < -100) {
      onPass();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        style={{ x, rotate }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: 'grabbing' }}
        className="relative w-full max-w-sm cursor-grab"
      >
        <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-lg overflow-hidden">
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-6 right-6 z-10 rotate-12 rounded-xl border-4 border-green-500 px-4 py-2"
          >
            <span className="text-2xl font-bold text-green-500">LIKE</span>
          </motion.div>
          <motion.div
            style={{ opacity: passOpacity }}
            className="absolute top-6 left-6 z-10 -rotate-12 rounded-xl border-4 border-red-500 px-4 py-2"
          >
            <span className="text-2xl font-bold text-red-500">NOPE</span>
          </motion.div>

          <div className="h-40 bg-gradient-to-br from-[#2563EB]/20 to-[#2563EB]/5" />

          <div className="relative -mt-12 flex justify-center">
            <Avatar name={profile.name} size="xl" className="ring-4 ring-white shadow-md" />
          </div>

          <div className="px-6 pb-4 pt-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-xl font-bold text-[#0F172A]">{profile.name}</h3>
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            </div>
            <p className="text-sm text-[#64748B]">
              {profile.title && `${profile.title} at `}{profile.company}
            </p>
            <div className="mt-1 flex items-center justify-center gap-1 text-xs text-[#64748B]">
              <MapPin size={12} />
              {profile.location}
            </div>

            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#F8FAFC] px-3 py-1">
              <span className={cn('text-sm font-bold', getMatchColor(profile.matchScore))}>
                {profile.matchScore}%
              </span>
              <span className="text-xs text-[#64748B]">Match</span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#64748B] line-clamp-2">
              {profile.bio}
            </p>

            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {profile.skills.slice(0, 4).map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
              {profile.skills.length > 4 && (
                <Badge>+{profile.skills.length - 4}</Badge>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={onPass}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#E2E8F0] bg-white text-[#EF4444] shadow-sm hover:bg-red-50 hover:border-red-200 transition-all"
        >
          <X size={24} />
        </button>
        <button
          onClick={onSuperLike}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#E2E8F0] bg-white text-[#2563EB] shadow-sm hover:bg-blue-50 hover:border-blue-200 transition-all"
        >
          <Zap size={24} />
        </button>
        <button
          onClick={onLike}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#E2E8F0] bg-white text-[#22C55E] shadow-sm hover:bg-green-50 hover:border-green-200 transition-all"
        >
          <Heart size={24} />
        </button>
      </div>
    </div>
  );
}
