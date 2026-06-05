import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  const navigate = useNavigate()
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-navy-900 px-8 py-14 text-center shadow-xl sm:px-16 sm:py-20"
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-600/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-teal-600/10 blur-3xl" />

        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to find your people?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-gray-400">
            Join thousands of founders building on SkillSynth. It&apos;s free to
            create your profile.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={() => navigate('/login')} className="flex items-center gap-1.5 rounded-xl bg-teal-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-700">
              Create your profile
              <ArrowRight size={16} />
            </button>
            <button onClick={() => navigate('/login')} className="rounded-xl border border-gray-600 px-6 py-3 text-sm font-medium text-gray-300 transition-colors hover:border-gray-500 hover:text-white">
              Learn more
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
