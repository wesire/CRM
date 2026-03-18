'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { LineItemEditor, type LineItem } from './line-item-editor'
import { formatCurrency } from '@/lib/utils'

interface QuoteFormData {
  title: string
  description: string
  customerNote: string
  internalNote: string
  taxRate: number
  lineItems: LineItem[]
}

interface QuoteFormProps {
  initialData?: Partial<QuoteFormData>
  onSubmit: (data: QuoteFormData) => void
  onCancel?: () => void
  isLoading?: boolean
}

export function QuoteForm({ initialData, onSubmit, onCancel, isLoading }: QuoteFormProps) {
  const [form, setForm] = useState<QuoteFormData>({
    title: initialData?.title ?? '',
    description: initialData?.description ?? '',
    customerNote: initialData?.customerNote ?? '',
    internalNote: initialData?.internalNote ?? '',
    taxRate: initialData?.taxRate ?? 20,
    lineItems: initialData?.lineItems ?? [],
  })

  const subtotal = form.lineItems
    .filter((i) => !i.optional)
    .reduce((sum, i) => sum + i.total, 0)
  const taxAmount = subtotal * (form.taxRate / 100)
  const total = subtotal + taxAmount

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="title">Quote Title *</Label>
          <Input
            id="title"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Bathroom renovation — full strip and reline"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="description">Scope of Work</Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe the work included in this quote..."
            rows={3}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Line Items</h3>
        <LineItemEditor
          items={form.lineItems}
          onChange={(lineItems) => setForm({ ...form, lineItems })}
        />
      </div>

      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal (required items)</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 items-center gap-2">
          <span>VAT</span>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="0"
              max="100"
              value={form.taxRate}
              onChange={(e) => setForm({ ...form, taxRate: parseFloat(e.target.value) || 0 })}
              className="w-16 h-7 text-right text-xs bg-white"
            />
            <span className="text-xs text-gray-500">%</span>
            <span>{formatCurrency(taxAmount)}</span>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-gray-900">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="customerNote">Note to Customer</Label>
          <Textarea
            id="customerNote"
            value={form.customerNote}
            onChange={(e) => setForm({ ...form, customerNote: e.target.value })}
            placeholder="Message shown on the customer-facing quote page..."
            rows={3}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="internalNote">Internal Note</Label>
          <Textarea
            id="internalNote"
            value={form.internalNote}
            onChange={(e) => setForm({ ...form, internalNote: e.target.value })}
            placeholder="Private notes — not shown to customer..."
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Quote'}
        </Button>
      </div>
    </form>
  )
}
