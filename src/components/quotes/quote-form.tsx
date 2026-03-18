'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { LineItemEditor } from './line-item-editor'
import { QuoteLineItem } from '@/types'

interface QuoteFormData {
  title: string
  customerId: string
  description: string
  customerNote: string
  internalNote: string
  taxRate: number
  lineItems: Omit<QuoteLineItem, 'id' | 'quoteId' | 'createdAt' | 'updatedAt'>[]
}

interface QuoteFormProps {
  onSubmit?: (data: QuoteFormData) => void
  onCancel?: () => void
  initialData?: Partial<QuoteFormData>
}

export function QuoteForm({ onSubmit, onCancel, initialData }: QuoteFormProps) {
  const [formData, setFormData] = useState<QuoteFormData>({
    title: initialData?.title ?? '',
    customerId: initialData?.customerId ?? '',
    description: initialData?.description ?? '',
    customerNote: initialData?.customerNote ?? '',
    internalNote: initialData?.internalNote ?? '',
    taxRate: initialData?.taxRate ?? 20,
    lineItems: initialData?.lineItems ?? [
      { description: '', quantity: 1, unitPrice: 0, total: 0, optional: false, selected: true, sortOrder: 0 },
    ],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="title">Quote title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData((d) => ({ ...d, title: e.target.value }))}
            placeholder="e.g. Bathroom plumbing repair"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="taxRate">VAT rate (%)</Label>
          <Input
            id="taxRate"
            type="number"
            value={formData.taxRate}
            onChange={(e) => setFormData((d) => ({ ...d, taxRate: Number(e.target.value) }))}
            min={0}
            max={100}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description (internal)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((d) => ({ ...d, description: e.target.value }))}
          placeholder="Describe the scope of work..."
          rows={3}
        />
      </div>

      <div className="space-y-3">
        <Label>Line items</Label>
        <LineItemEditor
          items={formData.lineItems}
          taxRate={formData.taxRate}
          onChange={(items) => setFormData((d) => ({ ...d, lineItems: items }))}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="customerNote">Note for customer</Label>
        <Textarea
          id="customerNote"
          value={formData.customerNote}
          onChange={(e) => setFormData((d) => ({ ...d, customerNote: e.target.value }))}
          placeholder="A personal message shown on the quote page..."
          rows={2}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="internalNote">Internal note</Label>
        <Textarea
          id="internalNote"
          value={formData.internalNote}
          onChange={(e) => setFormData((d) => ({ ...d, internalNote: e.target.value }))}
          placeholder="Private note for your reference only..."
          rows={2}
        />
      </div>

      <div className="flex gap-3 justify-end pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">Save Quote</Button>
      </div>
    </form>
  )
}
