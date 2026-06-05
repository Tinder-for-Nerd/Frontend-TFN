import { useDiscoverStore } from '../../store/discoverStore';
import { Input } from '../ui/Input';
import { SlidersHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState } from 'react';

interface DiscoverFiltersProps {
  className?: string;
}

export function DiscoverFilters({ className }: DiscoverFiltersProps) {
  const { filters, setFilters } = useDiscoverStore();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn('rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm', className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between text-sm font-medium text-[#0F172A]"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-[#64748B]" />
          Filters
        </div>
        <span className="text-xs text-[#64748B]">{isExpanded ? 'Hide' : 'Show'}</span>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          <Input
            placeholder="Location"
            value={filters.location}
            onChange={(e) => setFilters({ location: e.target.value })}
          />
          <Input
            placeholder="Interests"
            value={filters.interests}
            onChange={(e) => setFilters({ interests: e.target.value })}
          />
          <Input
            placeholder="Intent"
            value={filters.intent}
            onChange={(e) => setFilters({ intent: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}
