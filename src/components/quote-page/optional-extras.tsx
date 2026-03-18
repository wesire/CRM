'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { formatCurrency } from '@/lib/utils'
import { QuoteLineItem } from '@/types'

interface OptionalExtrasProps {
  items: QuoteLineItem[]
  accentColor?: string
  onSelectionChange?: (selectedIds: string[], additionalTotal: number) => void
}

export function OptionalExtras({ items, accentColor = '#6366f1', onSelectionChange }: OptionalExtrasProps) {
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set())

  if (items.length === 0) return null

  const toggleExtra = (id: string, total: number) => {
    const next = new Set(selectedExtras)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setSelectedExtras(next)
    const additionalTotal = items
      .filter((i) => next.has(i.id))
      .reduce((sum, i) => sum + i.total, 0)
    onSelectionChange?.(Array.from(next), additionalTotal)
  }

  return (
    <div>
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Optional extras
        </p>
        <p className="text-xs text-gray-400 mt-0.5">Toggle to add these to your quote</p>
      </div>
      <div className="divide-y divide-gray-50">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between px-6 py-4 gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Switch
                checked={selectedExtras.has(item.id)}
                onCheckedChange={() => toggleExtra(item.id, item.total)}
              />
              <div>
                <p className="text-sm text-gray-700">{item.description}</p>
                {item.quantity !== 1 && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {item.quantity} × {formatCurrency(item.unitPrice)}
                  </p>
                )}
              </div>
            </div>
            <span
              className="text-sm font-semibold shrink-0"
              style={{ color: selectedExtras.has(item.id) ? accentColor : undefined }}
            >
              +{formatCurrency(item.total)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
