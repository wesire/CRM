'use client'

import { useState } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface ExtractedData {
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  title?: string
  description?: string
  source?: string
}

interface AIExtractDialogProps {
  onExtract?: (data: ExtractedData) => void
}

export function AIExtractDialog({ onExtract }: AIExtractDialogProps) {
  const [emailText, setEmailText] = useState('')
  const [loading, setLoading] = useState(false)
  const [extracted, setExtracted] = useState<ExtractedData | null>(null)
  const [open, setOpen] = useState(false)

  const handleExtract = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    // Placeholder extraction
    setExtracted({
      contactName: 'Emma Wilson',
      contactEmail: 'emma.wilson@email.com',
      contactPhone: '07700 900123',
      title: 'Boiler replacement enquiry',
      description: 'Customer needs full boiler replacement. Current unit is 15 years old.',
      source: 'EMAIL',
    })
    setLoading(false)
  }

  const handleUse = () => {
    if (extracted) {
      onExtract?.(extracted)
      setOpen(false)
      setEmailText('')
      setExtracted(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-violet-600 border-violet-200 hover:bg-violet-50">
          <Sparkles className="h-4 w-4 mr-1.5" />
          Extract from email
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-500" />
            AI Enquiry Extraction
          </DialogTitle>
          <DialogDescription>
            Paste an email or message and AI will extract the customer details and enquiry automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Paste email or message text</Label>
            <Textarea
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              placeholder="Paste the customer's email here..."
              rows={5}
            />
          </div>

          {!extracted ? (
            <Button
              onClick={handleExtract}
              disabled={!emailText.trim() || loading}
              className="w-full bg-violet-600 hover:bg-violet-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {loading ? 'Extracting...' : 'Extract details'}
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="rounded-xl border border-violet-100 bg-violet-50 p-4 space-y-2">
                <p className="text-xs font-semibold text-violet-700 uppercase tracking-wider">Extracted details</p>
                {Object.entries(extracted).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-2 text-sm">
                    <span className="text-gray-500 w-28 shrink-0 capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setExtracted(null)}>
                  Try again
                </Button>
                <Button className="flex-1 bg-violet-600 hover:bg-violet-700" onClick={handleUse}>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Use these details
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
