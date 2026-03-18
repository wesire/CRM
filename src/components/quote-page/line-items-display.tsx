import { QuoteLineItem } from "@/types"
import { formatCurrency } from "@/lib/utils"

interface LineItemsDisplayProps {
  items: QuoteLineItem[]
}

export function LineItemsDisplay({ items }: LineItemsDisplayProps) {
  const requiredItems = items.filter((item) => !item.optional)

  return (
    <div className="space-y-3">
      {requiredItems.map((item) => (
        <div key={item.id} className="flex items-start justify-between gap-3 py-2">
          <div className="flex-1">
            <p className="text-sm text-slate-900">{item.description}</p>
            {item.quantity !== 1 && (
              <p className="text-xs text-slate-400 mt-0.5">
                {item.quantity} × {formatCurrency(item.unitPrice)}
              </p>
            )}
          </div>
          <p className="text-sm font-semibold text-slate-900 shrink-0">
            {formatCurrency(item.total)}
          </p>
        </div>
      ))}
    </div>
  )
}
