'use client'

import { useState } from 'react'
import { Sparkles, RefreshCw, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface AiDraftPanelProps {
  quoteId: string
  onUse: (text: string) => void
}

export function AiDraftPanel({ quoteId, onUse }: AiDraftPanelProps) {
  const [draft, setDraft] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const generate = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/ai/draft-followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quoteId }),
      })
      const data = await res.json()
      if (data.draft) setDraft(data.draft)
    } catch {
      setDraft("Hi there, I just wanted to follow up on the quote I sent over. Please let me know if you have any questions or if you're ready to go ahead!")
    } finally {
      setIsLoading(false)
    }
  }

  if (!draft) {
    return (
      <Button variant="outline" size="sm" onClick={generate} disabled={isLoading}>
        <Sparkles className="h-3.5 w-3.5 mr-1.5 text-brand-500" />
        {isLoading ? 'Drafting...' : 'AI Draft Follow-up'}
      </Button>
    )
  }

  return (
    <div className="rounded-xl border border-brand-200 bg-brand-50 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-brand-500" />
        <span className="text-sm font-medium text-brand-700">AI Draft</span>
      </div>
      <Textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={4}
        className="bg-white"
      />
      <div className="flex gap-2">
        <Button size="sm" onClick={() => onUse(draft)}>
          <Check className="h-3.5 w-3.5 mr-1.5" />
          Use this
        </Button>
        <Button size="sm" variant="outline" onClick={generate} disabled={isLoading}>
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
          Try again
        </Button>
      </div>
    </div>
  )
}
