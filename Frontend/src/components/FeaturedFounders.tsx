import { founders } from '../data/mockData'
import ProfileCard from './ProfileCard'

export default function FeaturedFounders() {
  return (
    <section id="discover" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">
              Discover
            </p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              Featured founders
            </h2>
            <p className="mt-2 max-w-lg text-gray-600">
              Profiles curated for active collaboration and recent activity.
            </p>
          </div>
          <button className="mt-4 shrink-0 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 sm:mt-0">
            View all founders
          </button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {founders.map((f, i) => (
            <ProfileCard key={f.id} founder={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
