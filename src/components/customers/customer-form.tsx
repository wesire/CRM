'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Customer } from '@/types'

type CustomerFormData = Pick<Customer, 'name' | 'email' | 'phone' | 'company' | 'address' | 'postcode' | 'notes'>

interface CustomerFormProps {
  onSubmit?: (data: CustomerFormData) => void
  onCancel?: () => void
  initialData?: Partial<CustomerFormData>
}

export function CustomerForm({ onSubmit, onCancel, initialData }: CustomerFormProps) {
  const [formData, setFormData] = useState<CustomerFormData>({
    name: initialData?.name ?? '',
    email: initialData?.email ?? '',
    phone: initialData?.phone ?? '',
    company: initialData?.company ?? '',
    address: initialData?.address ?? '',
    postcode: initialData?.postcode ?? '',
    notes: initialData?.notes ?? '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  const update = (field: keyof CustomerFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((d) => ({ ...d, [field]: e.target.value }))

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name *</Label>
          <Input id="name" value={formData.name} onChange={update('name')} placeholder="e.g. John Smith" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="company">Company (optional)</Label>
          <Input id="company" value={formData.company ?? ''} onChange={update('company')} placeholder="Company name" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={formData.email ?? ''} onChange={update('email')} placeholder="john@email.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" value={formData.phone ?? ''} onChange={update('phone')} placeholder="07700 900000" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="address">Address</Label>
          <Input id="address" value={formData.address ?? ''} onChange={update('address')} placeholder="123 Main Street" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="postcode">Postcode</Label>
          <Input id="postcode" value={formData.postcode ?? ''} onChange={update('postcode')} placeholder="BS1 1AA" />
        </div>
        <div className="sm:col-span-2 space-y-1.5">
          <Label htmlFor="notes">Notes (private)</Label>
          <Textarea id="notes" value={formData.notes ?? ''} onChange={update('notes')} placeholder="Any notes about this customer..." rows={3} />
        </div>
      </div>
      <div className="flex gap-3 justify-end pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        )}
        <Button type="submit">Save Customer</Button>
      </div>
    </form>
  )
}
