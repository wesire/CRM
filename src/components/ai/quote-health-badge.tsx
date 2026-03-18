import { cn } from '@/lib/utils'
import { Thermometer, Clock, Bell, CheckCircle2 } from 'lucide-react'

type HealthStatus = 'going-cold' | 'no-reply' | 'follow-up-today' | 'healthy'

interface QuoteHealthBadgeProps {
  status: HealthStatus
  className?: string
}

const HEALTH_CONFIG: Record<HealthStatus, { label: string; icon: React.ElementType; className: string }> = {
  'going-cold': {
    label: 'Going cold',
    icon: Thermometer,
    className: 'bg-orange-100 text-orange-700',
  },
  'no-reply': {
    label: 'No reply',
    icon: Clock,
    className: 'bg-rose-100 text-rose-700',
  },
  'follow-up-today': {
    label: 'Follow up today',
    icon: Bell,
    className: 'bg-amber-100 text-amber-700',
  },
  healthy: {
    label: 'Healthy',
    icon: CheckCircle2,
    className: 'bg-emerald-100 text-emerald-700',
  },
}

export function QuoteHealthBadge({ status, className }: QuoteHealthBadgeProps) {
  const config = HEALTH_CONFIG[status]
  const Icon = config.icon
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  )
}
