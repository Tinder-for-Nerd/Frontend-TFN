import { features } from '../data/mockData'
import FeatureCard from './FeatureCard'

export default function Features() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">
            Platform
          </p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            Everything you need to build
          </h2>
          <p className="mt-2 text-gray-600">
            From finding your first co-founder to scaling your leadership team.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={f.id} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
