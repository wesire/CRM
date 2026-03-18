"use client"

import { useState } from "react"
import { Sparkles, ChevronDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface AIRewriteButtonProps {
  onRewrite: (style: string, result: string) => void
  text: string
  size?: "sm" | "default"
}

const REWRITE_OPTIONS = [
  { value: "shorter", label: "Make shorter" },
  { value: "professional", label: "More professional" },
  { value: "friendly", label: "Friendlier tone" },
  { value: "persuasive", label: "More persuasive" },
]

export function AIRewriteButton({ onRewrite, text, size = "sm" }: AIRewriteButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleRewrite = async (style: string) => {
    setLoading(true)
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1200))
    const result = `[AI-rewritten as "${style}"]: ${text.slice(0, 80)}...`
    onRewrite(style, result)
    setLoading(false)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={size} disabled={loading} className="gap-1.5">
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
          )}
          {loading ? "Rewriting..." : "AI Rewrite"}
          {!loading && <ChevronDown className="h-3 w-3 opacity-60" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel className="text-xs">Rewrite style</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {REWRITE_OPTIONS.map((option) => (
          <DropdownMenuItem key={option.value} onClick={() => handleRewrite(option.value)}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
