'use client'

import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface ExtractedEnquiry {
  title?: string
  description?: string
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  source?: string
}

interface AiExtractDialogProps {
  onExtracted: (data: ExtractedEnquiry) => void
}

export function AiExtractDialog({ onExtracted }: AiExtractDialogProps) {
  const [open, setOpen] = useState(false)
  const [emailText, setEmailText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleExtract = async () => {
    if (!emailText.trim()) return
    setIsLoading(true)
    try {
      const res = await fetch('/api/ai/extract-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: emailText }),
      })
      const data = await res.json()
      onExtracted(data)
      setOpen(false)
      setEmailText('')
    } catch {
      // silently fail
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Sparkles className="h-3.5 w-3.5 mr-1.5 text-brand-500" />
          Paste Email
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Extract Enquiry from Email</DialogTitle>
          <DialogDescription>
            Paste a customer email and AI will extract the enquiry details automatically.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="email-text">Email content</Label>
          <Textarea
            id="email-text"
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            placeholder="Paste the email text here..."
            rows={8}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleExtract} disabled={isLoading || !emailText.trim()}>
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Extract Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
