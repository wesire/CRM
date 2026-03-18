'use client'

import { Trash2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { formatCurrency } from '@/lib/utils'

export interface LineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
  optional: boolean
}

interface LineItemEditorProps {
  items: LineItem[]
  onChange: (items: LineItem[]) => void
}

export function LineItemEditor({ items, onChange }: LineItemEditorProps) {
  const updateItem = (id: string, updates: Partial<LineItem>) => {
    onChange(
      items.map((item) => {
        if (item.id !== id) return item
        const updated = { ...item, ...updates }
        updated.total = updated.quantity * updated.unitPrice
        return updated
      })
    )
  }

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id))
  }

  const addItem = () => {
    const newItem: LineItem = {
      id: `item-${Date.now()}`,
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
      optional: false,
    }
    onChange([...items, newItem])
  }

  return (
    <div className="space-y-2">
      <div className="hidden sm:grid grid-cols-12 gap-2 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
        <div className="col-span-5">Description</div>
        <div className="col-span-2 text-right">Qty</div>
        <div className="col-span-2 text-right">Unit Price</div>
        <div className="col-span-2 text-right">Total</div>
        <div className="col-span-1"></div>
      </div>

      {items.map((item) => (
        <div key={item.id} className="grid grid-cols-12 gap-2 items-center p-2 rounded-lg border border-gray-100 bg-gray-50">
          <div className="col-span-12 sm:col-span-5">
            <Input
              value={item.description}
              onChange={(e) => updateItem(item.id, { description: e.target.value })}
              placeholder="Description..."
              className="bg-white"
            />
          </div>
          <div className="col-span-4 sm:col-span-2">
            <Input
              type="number"
              min="0"
              step="0.01"
              value={item.quantity}
              onChange={(e) => updateItem(item.id, { quantity: parseFloat(e.target.value) || 0 })}
              className="bg-white text-right"
            />
          </div>
          <div className="col-span-4 sm:col-span-2">
            <Input
              type="number"
              min="0"
              step="0.01"
              value={item.unitPrice}
              onChange={(e) => updateItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
              className="bg-white text-right"
            />
          </div>
          <div className="col-span-3 sm:col-span-2 text-right text-sm font-medium text-gray-900">
            {formatCurrency(item.total)}
          </div>
          <div className="col-span-1 flex justify-end">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeItem(item.id)}
              className="h-8 w-8 text-gray-400 hover:text-rose-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="col-span-12 flex items-center gap-2 px-1">
            <Switch
              id={`optional-${item.id}`}
              checked={item.optional}
              onCheckedChange={(checked) => updateItem(item.id, { optional: checked })}
            />
            <Label htmlFor={`optional-${item.id}`} className="text-xs text-gray-500 cursor-pointer">
              Optional extra
            </Label>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" size="sm" onClick={addItem} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Line Item
      </Button>
    </div>
  )
}
