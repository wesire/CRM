import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { StatusBadge } from './status-badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Quote } from '@/types'
import { cn } from '@/lib/utils'

interface QuoteCardProps {
  quote: Quote
  className?: string
}

export function QuoteCard({ quote, className }: QuoteCardProps) {
  return (
    <Link href={`/quotes/${quote.id}`}>
      <Card className={cn('cursor-pointer transition-all hover:-translate-y-0.5', className)}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-gray-400">{quote.quoteNumber}</span>
                <StatusBadge status={quote.status} />
              </div>
              <p className="font-semibold text-gray-900 truncate">{quote.title}</p>
              <p className="text-sm text-gray-500 mt-0.5 truncate">
                {quote.customer?.name ?? 'Unknown customer'}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-bold text-gray-900">{formatCurrency(quote.total)}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(quote.createdAt)}</span>
            {quote.validUntil && (
              <>
                <span className="mx-1">·</span>
                <span>Valid until {formatDate(quote.validUntil)}</span>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
