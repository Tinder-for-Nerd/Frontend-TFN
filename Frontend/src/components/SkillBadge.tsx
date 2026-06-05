interface SkillBadgeProps {
  label: string
  variant?: 'default' | 'looking-for'
}

export default function SkillBadge({ label, variant = 'default' }: SkillBadgeProps) {
  const base = 'inline-block rounded-full px-3 py-1 text-xs font-medium transition-colors'

  if (variant === 'looking-for') {
    return (
      <span className={`${base} bg-amber-50 text-amber-700 border border-amber-200`}>
        {label}
      </span>
    )
  }

  return (
    <span className={`${base} bg-teal-50 text-teal-700 border border-teal-200`}>
      {label}
    </span>
  )
}
