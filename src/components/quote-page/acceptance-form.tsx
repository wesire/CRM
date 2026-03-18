'use client'

import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface AcceptanceFormProps {
  accentColor?: string
  onAccept?: (data: { name: string; email: string; message?: string }) => void
  onDecline?: (reason?: string) => void
}

type FormState = 'idle' | 'accepting' | 'declining' | 'accepted' | 'declined'

export function AcceptanceForm({ accentColor = '#6366f1', onAccept, onDecline }: AcceptanceFormProps) {
  const [formState, setFormState] = useState<FormState>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [declineReason, setDeclineReason] = useState('')

  const handleAccept = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('accepted')
    onAccept?.({ name, email, message })
  }

  const handleDecline = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('declined')
    onDecline?.(declineReason)
  }

  if (formState === 'accepted') {
    return (
      <div className="text-center py-8 space-y-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 mx-auto">
          <CheckCircle className="h-7 w-7 text-emerald-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Quote accepted!</h3>
        <p className="text-sm text-gray-500">
          Thank you, {name}. We&apos;ll be in touch to confirm the details and schedule the work.
        </p>
      </div>
    )
  }

  if (formState === 'declined') {
    return (
      <div className="text-center py-8 space-y-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 mx-auto">
          <XCircle className="h-7 w-7 text-gray-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Quote declined</h3>
        <p className="text-sm text-gray-500">
          Thanks for letting us know. Feel free to get in touch if your needs change.
        </p>
      </div>
    )
  }

  if (formState === 'accepting') {
    return (
      <form onSubmit={handleAccept} className="space-y-4">
        <h3 className="font-semibold text-gray-900">Confirm acceptance</h3>
        <p className="text-sm text-gray-500">
          Please confirm your details to accept this quote.
        </p>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="accept-name">Your name *</Label>
            <Input
              id="accept-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="accept-email">Email address *</Label>
            <Input
              id="accept-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="accept-message">Message (optional)</Label>
            <Textarea
              id="accept-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any comments or questions..."
              rows={2}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button type="button" variant="outline" className="flex-1" onClick={() => setFormState('idle')}>
            Back
          </Button>
          <Button type="submit" className="flex-1" style={{ backgroundColor: accentColor }}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Confirm acceptance
          </Button>
        </div>
      </form>
    )
  }

  if (formState === 'declining') {
    return (
      <form onSubmit={handleDecline} className="space-y-4">
        <h3 className="font-semibold text-gray-900">Let us know why</h3>
        <p className="text-sm text-gray-500">
          Your feedback helps us improve. Feel free to leave a note (optional).
        </p>
        <Textarea
          value={declineReason}
          onChange={(e) => setDeclineReason(e.target.value)}
          placeholder="e.g. Found another provider, budget changed..."
          rows={3}
        />
        <div className="flex gap-3">
          <Button type="button" variant="outline" className="flex-1" onClick={() => setFormState('idle')}>
            Back
          </Button>
          <Button type="submit" variant="destructive" className="flex-1">
            <XCircle className="h-4 w-4 mr-2" />
            Decline quote
          </Button>
        </div>
      </form>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-gray-900">Ready to proceed?</h2>
      <p className="text-sm text-gray-500">
        Accepting this quote confirms you&apos;re happy to proceed with the work as described.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          className="flex-1"
          style={{ backgroundColor: accentColor }}
          onClick={() => setFormState('accepting')}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Accept Quote
        </Button>
        <Button
          variant="outline"
          className="flex-1 text-rose-600 hover:bg-rose-50 hover:border-rose-200"
          onClick={() => setFormState('declining')}
        >
          <XCircle className="h-4 w-4 mr-2" />
          Decline
        </Button>
      </div>
    </div>
  )
}
