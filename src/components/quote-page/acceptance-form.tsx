'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface AcceptanceFormProps {
  accentColor?: string
  onAccept?: (data: { name: string; email: string; message: string }) => void
  onDecline?: (data: { name: string; message: string }) => void
}

export function AcceptanceForm({
  accentColor = '#6366f1',
  onAccept,
  onDecline,
}: AcceptanceFormProps) {
  const [mode, setMode] = useState<'idle' | 'accept' | 'decline' | 'done'>('idle')
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '', agreed: false })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    if (mode === 'accept') {
      onAccept?.({ name: form.name, email: form.email, message: form.message })
    } else {
      onDecline?.({ name: form.name, message: form.message })
    }
    setIsLoading(false)
    setMode('done')
  }

  if (mode === 'done') {
    return (
      <div className="text-center py-8 space-y-3">
        <div
          className="h-16 w-16 rounded-full mx-auto flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}18` }}
        >
          <CheckCircle className="h-8 w-8" style={{ color: accentColor }} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Response sent!</h3>
        <p className="text-sm text-gray-500">Thank you. We&apos;ll be in touch shortly.</p>
      </div>
    )
  }

  if (mode === 'idle') {
    return (
      <div className="space-y-4">
        <h2 className="font-semibold text-gray-900">Ready to proceed?</h2>
        <p className="text-sm text-gray-500">
          Accepting this quote confirms you&apos;re happy to proceed with the work as described above.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className="flex-1 text-white"
            style={{ backgroundColor: accentColor }}
            onClick={() => setMode('accept')}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Accept Quote
          </Button>
          <Button
            variant="outline"
            className="flex-1 text-rose-600 hover:bg-rose-50 hover:border-rose-200"
            onClick={() => setMode('decline')}
          >
            <XCircle className="h-4 w-4 mr-2" />
            Decline
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="font-semibold text-gray-900">
        {mode === 'accept' ? 'Accept this quote' : 'Decline this quote'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="acc-name">Your name</Label>
          <Input
            id="acc-name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Smith"
          />
        </div>
        {mode === 'accept' && (
          <div className="space-y-1.5">
            <Label htmlFor="acc-email">Your email</Label>
            <Input
              id="acc-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="acc-message">
          {mode === 'accept' ? 'Any questions or comments?' : 'Why are you declining?'}
        </Label>
        <Textarea
          id="acc-message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={mode === 'accept' ? 'Optional...' : 'Help us understand...'}
          rows={3}
        />
      </div>
      {mode === 'accept' && (
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={form.agreed}
            onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
            className="mt-0.5 h-4 w-4 rounded border-gray-300"
            style={{ accentColor }}
          />
          <span className="text-sm text-gray-600">
            I agree to proceed with this quote and understand that work will be arranged after acceptance.
          </span>
        </label>
      )}
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={() => setMode('idle')} className="flex-1">
          Back
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 text-white"
          style={{ backgroundColor: mode === 'accept' ? accentColor : '#f43f5e' }}
        >
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {mode === 'accept' ? 'Confirm Acceptance' : 'Send Decline'}
        </Button>
      </div>
    </form>
  )
}
