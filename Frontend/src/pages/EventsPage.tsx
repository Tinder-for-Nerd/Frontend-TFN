import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockAppEvents } from '../data/mockData';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Calendar, Clock, MapPin, Users, Wifi, Building } from 'lucide-react';
import { getEventTypeLabel } from '../lib/utils';
import { toast } from 'sonner';
import type { EventType } from '../types';

const eventTypes: EventType[] = ['hackathon', 'talk', 'webinar', 'workshop', 'networking', 'panel'];

export default function EventsPage() {
  const [filterMode, setFilterMode] = useState<'all' | 'online' | 'offline'>('all');
  const [filterType, setFilterType] = useState<EventType | 'all'>('all');

  const filteredEvents = mockAppEvents.filter((e) => {
    if (filterMode !== 'all' && e.mode !== filterMode) return false;
    if (filterType !== 'all' && e.type !== filterType) return false;
    return e.status === 'approved';
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Events</h1>
        <p className="text-sm text-[#64748B]">Discover and join tech events</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 rounded-xl bg-[#F8FAFC] p-1">
          {(['all', 'online', 'offline'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                filterMode === mode
                  ? 'bg-white text-[#0F172A] shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {mode === 'all' ? 'All' : mode === 'online' ? 'Online' : 'Offline'}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setFilterType('all')}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              filterType === 'all'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            All Types
          </button>
          {eventTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                filterType === type
                  ? 'bg-[#2563EB] text-white shadow-sm'
                  : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {getEventTypeLabel(type)}
            </button>
          ))}
        </div>
      </div>

      {/* Event Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-[#2563EB]/20 to-purple-500/20 flex items-center justify-center">
                {event.mode === 'online' ? (
                  <Wifi size={32} className="text-[#2563EB]/40" />
                ) : (
                  <Building size={32} className="text-[#2563EB]/40" />
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <Badge variant={event.mode === 'online' ? 'info' : 'default'}>
                    {event.mode === 'online' ? 'Online' : 'Offline'}
                  </Badge>
                  <Badge>{getEventTypeLabel(event.type)}</Badge>
                </div>

                <h3 className="mt-2 font-semibold text-[#0F172A]">{event.title}</h3>
                <p className="mt-1 text-xs text-[#64748B] line-clamp-2">{event.description}</p>

                <div className="mt-3 space-y-1.5 text-xs text-[#64748B]">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {event.time}
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} />
                      {event.location}
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-[#64748B]">
                    <Users size={12} />
                    <span>{event.attendees}/{event.capacity}</span>
                  </div>
                  <div className="flex-1 mx-3 h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#2563EB]"
                      style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {event.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>

                <Button
                  className="mt-4 w-full"
                  size="sm"
                  onClick={() => toast.success('RSVP confirmed! Check your email for details.')}
                >
                  RSVP Now
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
