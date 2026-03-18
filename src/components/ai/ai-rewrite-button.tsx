'use client'

import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const REWRITE_OPTIONS = [
  { label: 'Make shorter', value: 'shorter' },
  { label: 'More professional', value: 'professional' },
  { label: 'Friendlier', value: 'friendlier' },
  { label: 'More persuasive', value: 'persuasive' },
]

interface AiRewriteButtonProps {
  text: string
  onRewrite: (newText: string) => void
}

export function AiRewriteButton({ text, onRewrite }: AiRewriteButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleRewrite = async (option: string) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/ai/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, style: option }),
      })
      const data = await res.json()
      if (data.result) onRewrite(data.result)
    } catch {
      // silently fail
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
          ) : (
            <Sparkles className="h-3.5 w-3.5 mr-1.5 text-brand-500" />
          )}
          AI Rewrite
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Rewrite style</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {REWRITE_OPTIONS.map((opt) => (
          <DropdownMenuItem key={opt.value} onClick={() => handleRewrite(opt.value)}>
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
