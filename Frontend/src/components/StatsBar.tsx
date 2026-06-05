import { motion } from 'framer-motion'
import { Users, Briefcase, Calendar, GitMerge } from 'lucide-react'

const stats = [
  { icon: Users, value: '12,400+', label: 'Founders' },
  { icon: Briefcase, value: '3,200+', label: 'Mentors' },
  { icon: GitMerge, value: '8,600+', label: 'Connections' },
  { icon: Calendar, value: '450+', label: 'Events' },
]

export default function StatsBar() {
  return (
    <section className="border-y border-gray-200/60 bg-white">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:gap-12 lg:py-12">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex flex-col items-center gap-1.5 text-center"
          >
            <s.icon size={22} className="text-teal-600" />
            <span className="text-2xl font-bold tracking-tight text-navy-900">
              {s.value}
            </span>
            <span className="text-sm text-gray-500">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
