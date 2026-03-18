'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ENQUIRY_SOURCES } from '@/lib/constants'

interface EnquiryFormData {
  title: string
  description: string
  source: string
  contactName: string
  contactEmail: string
  contactPhone: string
}

interface EnquiryFormProps {
  initialData?: Partial<EnquiryFormData>
  onSubmit: (data: EnquiryFormData) => void
  onCancel?: () => void
  isLoading?: boolean
}

export function EnquiryForm({ initialData, onSubmit, onCancel, isLoading }: EnquiryFormProps) {
  const [form, setForm] = useState<EnquiryFormData>({
    title: initialData?.title ?? '',
    description: initialData?.description ?? '',
    source: initialData?.source ?? 'PHONE',
    contactName: initialData?.contactName ?? '',
    contactEmail: initialData?.contactEmail ?? '',
    contactPhone: initialData?.contactPhone ?? '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="title">Job Title *</Label>
        <Input
          id="title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="e.g. Bathroom renovation quote"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="source">Enquiry Source</Label>
        <Select value={form.source} onValueChange={(v) => setForm({ ...form, source: v })}>
          <SelectTrigger id="source">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ENQUIRY_SOURCES.map((s) => (
              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="contactName">Contact Name</Label>
          <Input
            id="contactName"
            value={form.contactName}
            onChange={(e) => setForm({ ...form, contactName: e.target.value })}
            placeholder="Jane Smith"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contactPhone">Phone</Label>
          <Input
            id="contactPhone"
            type="tel"
            value={form.contactPhone}
            onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
            placeholder="07700 900000"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="contactEmail">Email</Label>
          <Input
            id="contactEmail"
            type="email"
            value={form.contactEmail}
            onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Describe the job or enquiry..."
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Enquiry'}
        </Button>
      </div>
    </form>
  )
}
