import { motion } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-teal-600/5 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-teal-700/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto max-w-3xl text-center"
      >
        <span className="inline-block rounded-full bg-teal-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-teal-700 border border-teal-200/60">
          Where founders find founders
        </span>

        <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
          Discover the people
          <br />
          <span className="text-teal-600">your startup needs</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
          SkillSynth connects founders, mentors, and operators based on real skill
          synergy — not random introductions.
        </p>

        <div className="mx-auto mt-10 flex max-w-lg items-center rounded-2xl border border-gray-300 bg-white p-1.5 shadow-sm transition-shadow focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100">
          <div className="flex items-center gap-2 pl-3">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by skill, industry, or role..."
            className="flex-1 border-0 bg-transparent px-3 py-2.5 text-sm text-navy-900 outline-none placeholder:text-gray-400"
          />
          <button className="flex items-center gap-1.5 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700">
            Search
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </section>
  )
}
