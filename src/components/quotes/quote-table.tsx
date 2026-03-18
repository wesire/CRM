import Link from 'next/link'
import { StatusBadge } from './status-badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Quote } from '@/types'
import { DataTable } from '@/components/shared/data-table'
import { cn } from '@/lib/utils'

interface QuoteTableProps {
  quotes: Quote[]
  className?: string
}

export function QuoteTable({ quotes, className }: QuoteTableProps) {
  return (
    <DataTable
      headers={['Quote', 'Customer', 'Total', 'Status', 'Date']}
      className={className}
    >
      {quotes.map((quote) => (
        <tr
          key={quote.id}
          className="hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <td className="px-4 py-3">
            <div>
              <Link
                href={`/quotes/${quote.id}`}
                className="font-medium text-gray-900 hover:text-brand-600"
              >
                {quote.title}
              </Link>
              <p className="text-xs font-mono text-gray-400">{quote.quoteNumber}</p>
            </div>
          </td>
          <td className="px-4 py-3 text-sm text-gray-600">
            {quote.customer?.name ?? '—'}
          </td>
          <td className="px-4 py-3">
            <span className={cn('text-sm font-semibold', quote.total > 0 ? 'text-gray-900' : 'text-gray-400')}>
              {formatCurrency(quote.total)}
            </span>
          </td>
          <td className="px-4 py-3">
            <StatusBadge status={quote.status} />
          </td>
          <td className="px-4 py-3 text-xs text-gray-400">
            {formatDate(quote.createdAt)}
          </td>
        </tr>
      ))}
    </DataTable>
  )
}
