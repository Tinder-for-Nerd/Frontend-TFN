import { MapPin, Briefcase, Star } from 'lucide-react';
import type { Profile } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ProfileHeaderProps {
  profile: Profile;
  isOwnProfile?: boolean;
  onConnect?: () => void;
  onMessage?: () => void;
  onBookSession?: () => void;
}

export function ProfileHeader({ profile, isOwnProfile, onConnect, onMessage, onBookSession }: ProfileHeaderProps) {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-[#2563EB]/20 to-[#2563EB]/5" />

      <div className="px-6 pb-6">
        <div className="relative -mt-12 flex items-end justify-between">
          <Avatar name={profile.name} size="xl" className="ring-4 ring-white shadow-md" />
          {!isOwnProfile && (
            <div className="flex gap-2 pb-2">
              <Button size="sm" onClick={onMessage}>Message</Button>
              <Button size="sm" variant="secondary" onClick={onConnect}>Connect</Button>
              <Button size="sm" onClick={onBookSession}>Book Session</Button>
            </div>
          )}
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-bold text-[#0F172A]">{profile.name}</h1>
          <p className="text-[#64748B]">
            {profile.title} at {profile.company}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[#64748B]">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {profile.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={14} />
              {profile.experience} years experience
            </span>
            <span className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              {profile.rating} ({profile.reviews.length} reviews)
            </span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm leading-relaxed text-[#64748B]">{profile.bio}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <Badge key={skill} variant="info">{skill}</Badge>
          ))}
        </div>

        {profile.interests.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">Interests</p>
            <div className="flex flex-wrap gap-1.5">
              {profile.interests.map((interest) => (
                <Badge key={interest}>{interest}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
