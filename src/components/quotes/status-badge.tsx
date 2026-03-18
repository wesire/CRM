import { Badge } from '@/components/ui/badge'
import { QUOTE_STATUSES } from '@/lib/constants'
import { QuoteStatus } from '@/types'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: QuoteStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusInfo = QUOTE_STATUSES.find((s) => s.value === status)

  const variantMap: Record<QuoteStatus, 'draft' | 'sent' | 'opened' | 'replied' | 'accepted' | 'lost' | 'expired'> = {
    DRAFT: 'draft',
    SENT: 'sent',
    OPENED: 'opened',
    REPLIED: 'replied',
    ACCEPTED: 'accepted',
    LOST: 'lost',
    EXPIRED: 'expired',
  }

  return (
    <Badge variant={variantMap[status]} className={cn(className)}>
      {statusInfo?.label ?? status}
    </Badge>
  )
}
