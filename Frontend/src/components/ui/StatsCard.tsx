import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function StatsCard({ icon: Icon, label, value, trend, trendUp, className }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm hover:shadow-md transition-shadow',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-[#2563EB]/5 p-2.5 text-[#2563EB]">
          <Icon size={20} />
        </div>
        {trend && (
          <span
            className={cn(
              'text-xs font-medium',
              trendUp ? 'text-green-600' : 'text-red-500'
            )}
          >
            {trend}
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold text-[#0F172A]">{value}</p>
      <p className="text-sm text-[#64748B]">{label}</p>
    </motion.div>
  );
}
