'use client'

import { useState } from 'react'
import { Sparkles, Copy, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AIDraftPanelProps {
  type: 'follow-up' | 'quote-note'
  context?: string
  onUse?: (draft: string) => void
  className?: string
}

const PLACEHOLDER_DRAFTS: Record<string, string> = {
  'follow-up': `Hi Mark,\n\nI hope you're doing well. I wanted to follow up on the quote I sent over for the kitchen plumbing repairs (QF-1023).\n\nIf you have any questions or would like to discuss the scope further, I'm happy to chat. The quote is valid until the end of the month.\n\nLooking forward to hearing from you.\n\nBest regards,\nJames Mitchell\nMitchell Plumbing & Heating`,
  'quote-note': `Thank you for getting in touch. Please find your personalised quote below. All work is fully insured and comes with a 12-month guarantee.\n\nFeel free to accept using the button below or call me if you'd like to discuss anything.`,
}

export function AIDraftPanel({ type, context, onUse, className }: AIDraftPanelProps) {
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)

  const generateDraft = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setDraft(PLACEHOLDER_DRAFTS[type] ?? 'AI draft will appear here.')
    setGenerated(true)
    setLoading(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(draft)
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-violet-500" />
          AI Draft
          <span className="text-xs font-normal text-gray-400 ml-auto">
            {type === 'follow-up' ? 'Follow-up email' : 'Customer note'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {!generated ? (
          <div className="text-center py-6">
            <Button onClick={generateDraft} disabled={loading} className="bg-violet-600 hover:bg-violet-700">
              <Sparkles className="h-4 w-4 mr-2" />
              {loading ? 'Generating...' : 'Generate draft'}
            </Button>
            <p className="text-xs text-gray-400 mt-2">AI will write a draft based on your quote details</p>
          </div>
        ) : (
          <>
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={8}
              className="text-sm font-mono"
            />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-3.5 w-3.5 mr-1.5" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={generateDraft} disabled={loading}>
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                Regenerate
              </Button>
              {onUse && (
                <Button size="sm" className="ml-auto bg-violet-600 hover:bg-violet-700" onClick={() => onUse(draft)}>
                  Use this draft
                </Button>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
