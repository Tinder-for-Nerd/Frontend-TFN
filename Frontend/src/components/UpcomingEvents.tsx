import { useNavigate } from 'react-router-dom'
import { events } from '../data/mockData'
import EventCard from './EventCard'
import { ArrowRight } from 'lucide-react'

export default function UpcomingEvents() {
  const navigate = useNavigate()
  return (
    <section id="events" className="bg-navy-900 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-400">
              Events
            </p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Upcoming gatherings
            </h2>
            <p className="mt-2 max-w-lg text-gray-400">
              Virtual and in-person events for the founder community.
            </p>
          </div>
          <button onClick={() => navigate('/login')} className="mt-4 flex shrink-0 items-center gap-1.5 rounded-xl border border-gray-600 px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:border-gray-500 hover:text-white sm:mt-0">
            View calendar
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-4">
          {events.map((e, i) => (
            <EventCard key={e.id} event={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
