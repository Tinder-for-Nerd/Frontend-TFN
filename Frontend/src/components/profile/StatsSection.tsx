import type { ProfileStats } from '../../types';
import { Eye, Heart, CalendarCheck, Users } from 'lucide-react';
import { StatsCard } from '../ui/StatsCard';

interface StatsSectionProps {
  stats: ProfileStats;
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatsCard icon={Eye} label="Profile Views" value={stats.views} />
      <StatsCard icon={Heart} label="Matches" value={stats.matches} />
      <StatsCard icon={CalendarCheck} label="Bookings" value={stats.bookings} />
      <StatsCard icon={Users} label="Connections" value={stats.connections} />
    </div>
  );
}
