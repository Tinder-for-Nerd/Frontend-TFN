import { Users } from 'lucide-react'

const footerLinks = [
  {
    title: 'Platform',
    links: ['Discover', 'Mentors', 'Events', 'Community'],
  },
  {
    title: 'Resources',
    links: ['Blog', 'Help Center', 'Founder Guide', 'API'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Privacy', 'Terms'],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/60 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 text-white">
                <Users size={15} />
              </div>
              <span className="text-base font-bold tracking-tight text-navy-900">
                SkillSynth
              </span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              The founder discovery platform. Connecting builders with the right
              people at the right time.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 transition-colors hover:text-teal-600"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-100 pt-6 text-xs text-gray-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} SkillSynth. All rights reserved.</p>
          <p>Built for founders, by founders.</p>
        </div>
      </div>
    </footer>
  )
}
