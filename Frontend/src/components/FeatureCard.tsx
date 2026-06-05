import { motion } from 'framer-motion'
import { Users, Calendar, Sparkles, MessageSquare, MapPin, GitBranch } from 'lucide-react'
import type { Feature } from '../data/mockData'

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Users,
  Calendar,
  Sparkles,
  MessageSquare,
  MapPin,
  GitBranch,
}

interface FeatureCardProps {
  feature: Feature
  index: number
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  const Icon = iconMap[feature.icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-gray-200/70 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
        {Icon && <Icon size={20} />}
      </div>
      <h3 className="mt-4 font-semibold text-navy-900">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        {feature.description}
      </p>
    </motion.div>
  )
}
