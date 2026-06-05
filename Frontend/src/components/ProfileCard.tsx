import { motion } from 'framer-motion'
import { MapPin, BadgeCheck, ArrowUpRight, User } from 'lucide-react'
import type { Founder } from '../data/mockData'
import SkillBadge from './SkillBadge'

interface ProfileCardProps {
  founder: Founder
  index: number
}

const statusColors: Record<string, string> = {
  open: 'bg-emerald-500',
  busy: 'bg-gray-400',
  mentoring: 'bg-amber-400',
}

const statusLabels: Record<string, string> = {
  open: 'Open to connect',
  busy: 'Busy',
  mentoring: 'Mentoring',
}

export default function ProfileCard({ founder, index }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-100 to-teal-50 text-teal-700 ring-2 ring-white">
            <User size={22} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-navy-900">{founder.name}</h3>
              <BadgeCheck size={16} className="text-teal-600" />
            </div>
            <p className="text-xs text-gray-500">
              {founder.title} · {founder.company}
            </p>
          </div>
        </div>
        <span
          className={`mt-1 h-2.5 w-2.5 rounded-full ${statusColors[founder.availability]}`}
          title={statusLabels[founder.availability]}
        />
      </div>

      <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
        <MapPin size={12} />
        <span>{founder.location}</span>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-600">
        {founder.bio}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {founder.skills.map((s) => (
          <SkillBadge key={s} label={s} />
        ))}
      </div>

      <div className="mt-3 border-t border-gray-100 pt-3">
        <p className="mb-1.5 text-xs font-medium text-amber-700">Looking for</p>
        <div className="flex flex-wrap gap-1.5">
          {founder.lookingFor.map((l) => (
            <SkillBadge key={l} label={l} variant="looking-for" />
          ))}
        </div>
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-navy-900 transition-colors hover:bg-gray-50 group-hover:border-teal-300 group-hover:text-teal-700">
        View profile
        <ArrowUpRight size={15} />
      </button>
    </motion.div>
  )
}
