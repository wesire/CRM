'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { ENQUIRY_SOURCES, ENQUIRY_STATUSES } from '@/lib/constants'
import { Enquiry } from '@/types'

type EnquiryFormData = Pick<Enquiry, 'title' | 'description' | 'source' | 'status' | 'contactName' | 'contactEmail' | 'contactPhone'>

interface EnquiryFormProps {
  onSubmit?: (data: EnquiryFormData) => void
  onCancel?: () => void
  initialData?: Partial<EnquiryFormData>
}

export function EnquiryForm({ onSubmit, onCancel, initialData }: EnquiryFormProps) {
  const [formData, setFormData] = useState<EnquiryFormData>({
    title: initialData?.title ?? '',
    description: initialData?.description ?? '',
    source: initialData?.source ?? 'OTHER',
    status: initialData?.status ?? 'NEW',
    contactName: initialData?.contactName ?? '',
    contactEmail: initialData?.contactEmail ?? '',
    contactPhone: initialData?.contactPhone ?? '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="title">Enquiry title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData((d) => ({ ...d, title: e.target.value }))}
          placeholder="e.g. Boiler replacement enquiry"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="source">How did they contact you?</Label>
          <Select
            id="source"
            value={formData.source}
            onChange={(e) => setFormData((d) => ({ ...d, source: e.target.value as Enquiry['source'] }))}
          >
            {ENQUIRY_SOURCES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData((d) => ({ ...d, status: e.target.value as Enquiry['status'] }))}
          >
            {ENQUIRY_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contactName">Contact name</Label>
          <Input
            id="contactName"
            value={formData.contactName ?? ''}
            onChange={(e) => setFormData((d) => ({ ...d, contactName: e.target.value }))}
            placeholder="Customer name"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contactPhone">Phone</Label>
          <Input
            id="contactPhone"
            type="tel"
            value={formData.contactPhone ?? ''}
            onChange={(e) => setFormData((d) => ({ ...d, contactPhone: e.target.value }))}
            placeholder="07700 900000"
          />
        </div>
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="contactEmail">Email</Label>
          <Input
            id="contactEmail"
            type="email"
            value={formData.contactEmail ?? ''}
            onChange={(e) => setFormData((d) => ({ ...d, contactEmail: e.target.value }))}
            placeholder="customer@email.com"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Notes</Label>
        <Textarea
          id="description"
          value={formData.description ?? ''}
          onChange={(e) => setFormData((d) => ({ ...d, description: e.target.value }))}
          placeholder="Details about what they need..."
          rows={3}
        />
      </div>

      <div className="flex gap-3 justify-end pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        )}
        <Button type="submit">Save Enquiry</Button>
      </div>
    </form>
  )
}
