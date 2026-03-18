import { formatCurrency } from '@/lib/utils'
import { QuoteLineItem } from '@/types'

interface LineItemsDisplayProps {
  items: QuoteLineItem[]
}

export function LineItemsDisplay({ items }: LineItemsDisplayProps) {
  const requiredItems = items.filter((i) => !i.optional)

  return (
    <div className="divide-y divide-gray-50">
      {requiredItems.map((item) => (
        <div key={item.id} className="flex items-start justify-between px-6 py-4 gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{item.description}</p>
            {item.quantity !== 1 && (
              <p className="text-xs text-gray-400 mt-0.5">
                {item.quantity} × {formatCurrency(item.unitPrice)}
              </p>
            )}
          </div>
          <span className="text-sm font-semibold text-gray-900 shrink-0">
            {formatCurrency(item.total)}
          </span>
        </div>
      ))}
    </div>
  )
}
