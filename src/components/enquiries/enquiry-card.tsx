import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ENQUIRY_SOURCES, ENQUIRY_STATUSES } from '@/lib/constants'
import { formatDate } from '@/lib/utils'
import { Enquiry } from '@/types'
import { cn } from '@/lib/utils'

interface EnquiryCardProps {
  enquiry: Enquiry
  className?: string
}

export function EnquiryCard({ enquiry, className }: EnquiryCardProps) {
  const sourceInfo = ENQUIRY_SOURCES.find((s) => s.value === enquiry.source)
  const statusInfo = ENQUIRY_STATUSES.find((s) => s.value === enquiry.status)
  const SourceIcon = sourceInfo?.icon

  const statusVariantMap: Record<string, 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'draft' | 'sent' | 'opened' | 'replied' | 'accepted' | 'lost' | 'expired'> = {
    NEW: 'default',
    CONTACTED: 'warning',
    QUOTED: 'success',
    CLOSED: 'secondary',
  }

  return (
    <Link href={`/enquiries/${enquiry.id}`}>
      <Card className={cn('cursor-pointer transition-all hover:-translate-y-0.5', className)}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {statusInfo && (
                  <Badge variant={statusVariantMap[enquiry.status] ?? 'secondary'}>
                    {statusInfo.label}
                  </Badge>
                )}
                {sourceInfo && SourceIcon && (
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <SourceIcon className="h-3 w-3" />
                    {sourceInfo.label}
                  </span>
                )}
              </div>
              <p className="font-semibold text-gray-900 truncate">{enquiry.title}</p>
              {(enquiry.contactName ?? enquiry.customer?.name) && (
                <p className="text-sm text-gray-500 mt-0.5">
                  {enquiry.contactName ?? enquiry.customer?.name}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(enquiry.createdAt)}
            </div>
          </div>
          {enquiry.description && (
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{enquiry.description}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
