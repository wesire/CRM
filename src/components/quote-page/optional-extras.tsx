'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface OptionalItem {
  id: string
  description: string
  total: number
  optional: boolean
}

interface OptionalExtrasProps {
  items: OptionalItem[]
  accentColor?: string
  onTotalChange?: (total: number) => void
}

export function OptionalExtras({ items, accentColor = '#6366f1', onTotalChange }: OptionalExtrasProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    const next = new Set(selected)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setSelected(next)
    const total = items
      .filter((i) => next.has(i.id))
      .reduce((sum, i) => sum + i.total, 0)
    onTotalChange?.(total)
  }

  if (items.length === 0) return null

  return (
    <div>
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Optional extras
        </p>
      </div>
      <div className="divide-y divide-gray-50">
        {items.map((item) => {
          const isSelected = selected.has(item.id)
          return (
            <div
              key={item.id}
              className="flex items-center justify-between px-6 py-4 gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggle(item.id)}
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  type="button"
                  className="h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                  style={{
                    borderColor: isSelected ? accentColor : '#d1d5db',
                    backgroundColor: isSelected ? accentColor : 'transparent',
                  }}
                >
                  {isSelected ? (
                    <Minus className="h-3 w-3 text-white" />
                  ) : (
                    <Plus className="h-3 w-3 text-gray-400" />
                  )}
                </button>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.description}</p>
                  <p className="text-xs text-gray-400">{isSelected ? 'Included' : 'Click to add'}</p>
                </div>
              </div>
              <span
                className="text-sm font-semibold shrink-0"
                style={{ color: isSelected ? accentColor : '#6b7280' }}
              >
                +{formatCurrency(item.total)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
