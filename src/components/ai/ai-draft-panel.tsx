"use client"

import { useState } from "react"
import { Sparkles, RefreshCw, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface AIDraftPanelProps {
  context?: string
  onUseDraft: (draft: string) => void
  placeholder?: string
}

const EXAMPLE_DRAFTS = [
  "Hi there! Just following up on the quote I sent over recently. I wanted to check if you'd had a chance to review it and if you have any questions. I'm happy to talk through the details or adjust anything to suit your needs. Looking forward to hearing from you!",
  "I wanted to quickly follow up on the quote for your project. Have you had a chance to look it over? I'm confident we can deliver excellent results within your timeframe. Let me know if you'd like to discuss anything further.",
  "Hope you're well! I'm just checking in to see if you've had a chance to review the quote I sent. Please don't hesitate to get in touch if you need any clarification or would like to make any changes.",
]

export function AIDraftPanel({ context, onUseDraft, placeholder = "AI will draft a follow-up message..." }: AIDraftPanelProps) {
  const [draft, setDraft] = useState("")
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)

  const generateDraft = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const randomDraft = EXAMPLE_DRAFTS[Math.floor(Math.random() * EXAMPLE_DRAFTS.length)]
    setDraft(randomDraft)
    setGenerated(true)
    setLoading(false)
  }

  if (!generated && !loading) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/50">
        <Sparkles className="h-5 w-5 text-indigo-500 shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-slate-700 font-medium">AI Follow-up Draft</p>
          <p className="text-xs text-slate-500">Let AI draft a follow-up message based on this quote</p>
        </div>
        <Button size="sm" variant="outline" onClick={generateDraft} className="shrink-0">
          Generate
        </Button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl border border-indigo-200 bg-indigo-50/50">
        <Loader2 className="h-5 w-5 text-indigo-500 animate-spin shrink-0" />
        <p className="text-sm text-slate-600">Drafting message...</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 p-4 rounded-xl border border-indigo-200 bg-indigo-50/30">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-indigo-500" />
        <span className="text-xs font-medium text-indigo-700 uppercase tracking-wide">AI-assisted draft</span>
      </div>
      <Textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        className="bg-white min-h-[100px] text-sm"
        placeholder={placeholder}
      />
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={() => onUseDraft(draft)} className="gap-1.5">
          <Check className="h-3.5 w-3.5" />
          Use this draft
        </Button>
        <Button size="sm" variant="ghost" onClick={generateDraft} className="gap-1.5">
          <RefreshCw className="h-3.5 w-3.5" />
          Try again
        </Button>
      </div>
    </div>
  )
}
