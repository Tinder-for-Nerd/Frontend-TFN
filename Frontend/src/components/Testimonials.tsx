import { motion } from 'framer-motion'
import { Quote, User } from 'lucide-react'
import { testimonials } from '../data/mockData'

export default function Testimonials() {
  return (
    <section className="bg-cream-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">
            Testimonials
          </p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
            Trusted by the founder community
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className="relative flex flex-col rounded-2xl border border-gray-200/70 bg-white p-6 shadow-sm"
            >
              <Quote size={28} className="absolute right-5 top-5 text-teal-100" />
              <p className="text-sm leading-relaxed text-gray-600">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-100 to-teal-50 text-teal-600">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                  <p className="text-xs text-gray-500">
                    {t.title}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
