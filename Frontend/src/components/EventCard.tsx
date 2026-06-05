import { motion } from 'framer-motion'
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import type { Event } from '../data/mockData'

interface EventCardProps {
  event: Event
  index: number
}

export default function EventCard({ event, index }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -3 }}
      className="flex shrink-0 flex-col rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:w-[300px]"
    >
      <div className="flex items-center gap-2 text-xs font-medium text-teal-600">
        <Calendar size={14} />
        <span>{event.date}</span>
        <span className="text-gray-300">·</span>
        <Clock size={14} />
        <span>{event.time}</span>
      </div>

      <h3 className="mt-3 text-base font-semibold text-navy-900">
        {event.title}
      </h3>

      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-gray-600">
        {event.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {event.tags.map((t) => (
          <span
            key={t}
            className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between pt-4">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Users size={13} />
          <span>{event.attendees} attending</span>
        </div>
        <button onClick={() => toast.success(`RSVP'd for ${event.title}!`)} className="flex items-center gap-1 rounded-lg bg-teal-600 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-teal-700">
          RSVP
          <ArrowRight size={13} />
        </button>
      </div>
    </motion.div>
  )
}
