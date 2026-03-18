'use client'

import { useState } from 'react'
import { Sparkles, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const REWRITE_OPTIONS = [
  { label: 'Make shorter', value: 'shorter' },
  { label: 'More professional', value: 'professional' },
  { label: 'Friendlier tone', value: 'friendly' },
  { label: 'More persuasive', value: 'persuasive' },
]

interface AIRewriteButtonProps {
  text: string
  onRewrite?: (rewrittenText: string, style: string) => void
  className?: string
}

export function AIRewriteButton({ text, onRewrite, className }: AIRewriteButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleRewrite = async (style: string) => {
    setLoading(true)
    try {
      // Placeholder: simulate AI rewrite
      await new Promise((r) => setTimeout(r, 800))
      onRewrite?.(`[AI rewritten: ${style}] ${text}`, style)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`text-violet-600 hover:text-violet-700 hover:bg-violet-50 gap-1 ${className}`}
          disabled={loading}
        >
          <Sparkles className="h-3.5 w-3.5" />
          {loading ? 'Rewriting...' : 'AI Rewrite'}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {REWRITE_OPTIONS.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => handleRewrite(opt.value)}
            disabled={loading}
          >
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
