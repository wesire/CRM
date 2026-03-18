'use client'

import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { formatCurrency } from '@/lib/utils'
import { QuoteLineItem } from '@/types'

type LineItem = Omit<QuoteLineItem, 'id' | 'quoteId' | 'createdAt' | 'updatedAt'>

interface LineItemEditorProps {
  items: LineItem[]
  taxRate: number
  onChange: (items: LineItem[]) => void
}

export function LineItemEditor({ items, taxRate, onChange }: LineItemEditorProps) {
  const updateItem = (index: number, field: keyof LineItem, value: string | number | boolean) => {
    const updated = items.map((item, i) => {
      if (i !== index) return item
      const newItem = { ...item, [field]: value }
      if (field === 'quantity' || field === 'unitPrice') {
        newItem.total = newItem.quantity * newItem.unitPrice
      }
      return newItem
    })
    onChange(updated)
  }

  const addItem = () => {
    onChange([
      ...items,
      {
        description: '',
        quantity: 1,
        unitPrice: 0,
        total: 0,
        optional: false,
        selected: true,
        sortOrder: items.length,
      },
    ])
  }

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index))
  }

  const subtotal = items.filter((i) => !i.optional || i.selected).reduce((sum, i) => sum + i.total, 0)
  const taxAmount = subtotal * (taxRate / 100)
  const total = subtotal + taxAmount

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="grid grid-cols-[1fr_80px_100px_80px_40px] gap-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <span>Description</span>
        <span className="text-right">Qty</span>
        <span className="text-right">Unit price</span>
        <span className="text-right">Total</span>
        <span />
      </div>

      {/* Items */}
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-[1fr_80px_100px_80px_40px] gap-2 items-center">
          <Input
            value={item.description}
            onChange={(e) => updateItem(index, 'description', e.target.value)}
            placeholder="Item description"
            className="text-sm"
          />
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
            min={0}
            step={0.5}
            className="text-sm text-right"
          />
          <Input
            type="number"
            value={item.unitPrice}
            onChange={(e) => updateItem(index, 'unitPrice', Number(e.target.value))}
            min={0}
            step={0.01}
            className="text-sm text-right"
          />
          <span className="text-sm font-medium text-gray-900 text-right pr-1">
            {formatCurrency(item.total)}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-rose-500"
            onClick={() => removeItem(index)}
            disabled={items.length <= 1}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          {item.optional !== undefined && (
            <div className="col-span-5 flex items-center gap-2 px-1 pb-1">
              <Switch
                checked={item.optional}
                onCheckedChange={(checked) => updateItem(index, 'optional', checked)}
              />
              <span className="text-xs text-gray-500">Optional extra</span>
            </div>
          )}
        </div>
      ))}

      <Button type="button" variant="ghost" size="sm" onClick={addItem} className="mt-1">
        <Plus className="h-4 w-4 mr-1.5" />
        Add item
      </Button>

      {/* Totals */}
      <div className="border-t border-gray-100 pt-3 mt-3 space-y-1.5">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>VAT ({taxRate}%)</span>
          <span>{formatCurrency(taxAmount)}</span>
        </div>
        <div className="flex justify-between font-bold text-gray-900">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  )
}
