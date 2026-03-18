"use client"

import { useState } from "react"
import { QuoteLineItem } from "@/types"
import { formatCurrency } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface OptionalExtrasProps {
  items: QuoteLineItem[]
  onSelectionChange: (selectedIds: string[], extraTotal: number) => void
}

export function OptionalExtras({ items, onSelectionChange }: OptionalExtrasProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  if (items.length === 0) return null

  const toggle = (id: string) => {
    const newSelected = new Set(selected)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelected(newSelected)
    const extraTotal = items
      .filter((i) => newSelected.has(i.id))
      .reduce((sum, i) => sum + i.total, 0)
    onSelectionChange(Array.from(newSelected), extraTotal)
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-900">Optional extras</h3>
      <p className="text-xs text-slate-500">Select any optional additions to your quote:</p>
      {items.map((item) => {
        const isSelected = selected.has(item.id)
        return (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className={cn(
              "w-full text-left p-4 rounded-xl border-2 transition-all",
              isSelected
                ? "border-indigo-500 bg-indigo-50"
                : "border-slate-200 bg-white hover:border-slate-300"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className={cn("text-sm font-medium", isSelected ? "text-indigo-900" : "text-slate-900")}>
                  {item.description}
                </p>
                {item.quantity !== 1 && (
                  <p className="text-xs text-slate-400 mt-0.5">
                    {item.quantity} × {formatCurrency(item.unitPrice)}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <p className={cn("text-sm font-semibold", isSelected ? "text-indigo-700" : "text-slate-900")}>
                  +{formatCurrency(item.total)}
                </p>
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                  isSelected ? "bg-indigo-500 border-indigo-500" : "border-slate-300"
                )}>
                  {isSelected && <Check className="h-3 w-3 text-white" />}
                </div>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
