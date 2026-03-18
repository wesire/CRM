import { Flame, AlertTriangle, Clock, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { QuoteStatus } from '@/types'

type HealthStatus = 'hot' | 'at-risk' | 'cold' | 'follow-up-today' | 'won' | 'normal'

interface QuoteHealthBadgeProps {
  status: QuoteStatus
  sentAt?: Date | null
  openedAt?: Date | null
  repliedAt?: Date | null
  className?: string
}

function getHealthStatus(props: Omit<QuoteHealthBadgeProps, 'className'>): HealthStatus {
  const { status, sentAt, openedAt, repliedAt } = props
  const now = Date.now()
  const dayMs = 1000 * 60 * 60 * 24

  if (status === 'ACCEPTED') return 'won'
  if (status === 'LOST' || status === 'EXPIRED') return 'normal'

  if (status === 'OPENED' && openedAt && !repliedAt) {
    const openedDaysAgo = (now - new Date(openedAt).getTime()) / dayMs
    if (openedDaysAgo > 2) return 'at-risk'
    return 'hot'
  }

  if (status === 'SENT' && sentAt) {
    const sentDaysAgo = (now - new Date(sentAt).getTime()) / dayMs
    if (sentDaysAgo >= 5) return 'cold'
    if (sentDaysAgo >= 3) return 'follow-up-today'
  }

  return 'normal'
}

const healthConfig: Record<HealthStatus, { label: string; icon: React.ComponentType<{ className?: string }>; className: string } | null> = {
  hot: { label: 'Hot lead', icon: Flame, className: 'bg-orange-100 text-orange-700' },
  'at-risk': { label: 'At risk', icon: AlertTriangle, className: 'bg-amber-100 text-amber-700' },
  cold: { label: 'Going cold', icon: Clock, className: 'bg-slate-100 text-slate-600' },
  'follow-up-today': { label: 'Follow up today', icon: Clock, className: 'bg-rose-100 text-rose-700' },
  won: { label: 'Won', icon: CheckCircle, className: 'bg-emerald-100 text-emerald-700' },
  normal: null,
}

export function QuoteHealthBadge({ className, ...props }: QuoteHealthBadgeProps) {
  const health = getHealthStatus(props)
  const config = healthConfig[health]
  if (!config) return null

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
