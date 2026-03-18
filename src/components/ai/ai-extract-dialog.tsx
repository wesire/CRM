"use client"

import { useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ExtractedEnquiry {
  name: string
  email: string
  phone: string
  description: string
  suggestedTitle: string
}

interface AIExtractDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateEnquiry: (data: ExtractedEnquiry) => void
}

const EXAMPLE_EXTRACTED: ExtractedEnquiry = {
  name: "James Whitfield",
  email: "j.whitfield@gmail.com",
  phone: "07901 234567",
  description: "Needs boiler replacement - old boiler kept breaking down over winter. Wants a new Worcester Bosch or similar. Property is a 3-bed semi.",
  suggestedTitle: "Boiler replacement — 3-bed semi",
}

export function AIExtractDialog({ open, onOpenChange, onCreateEnquiry }: AIExtractDialogProps) {
  const [rawText, setRawText] = useState("")
  const [loading, setLoading] = useState(false)
  const [extracted, setExtracted] = useState<ExtractedEnquiry | null>(null)

  const handleExtract = async () => {
    if (!rawText.trim()) return
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setExtracted(EXAMPLE_EXTRACTED)
    setLoading(false)
  }

  const handleCreate = () => {
    if (extracted) {
      onCreateEnquiry(extracted)
      onOpenChange(false)
      setRawText("")
      setExtracted(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-500" />
            Extract Enquiry from Email
          </DialogTitle>
          <DialogDescription>
            Paste a customer email and AI will extract the key details for you.
          </DialogDescription>
        </DialogHeader>

        {!extracted ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Paste email text</Label>
              <Textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste the customer's email here..."
                className="min-h-[150px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button onClick={handleExtract} disabled={loading || !rawText.trim()} className="gap-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {loading ? "Extracting..." : "Extract details"}
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
              ✓ Details extracted — review and confirm below
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Customer name</Label>
                <Input value={extracted.name} onChange={(e) => setExtracted({ ...extracted, name: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input value={extracted.email} onChange={(e) => setExtracted({ ...extracted, email: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input value={extracted.phone} onChange={(e) => setExtracted({ ...extracted, phone: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Suggested title</Label>
                <Input value={extracted.suggestedTitle} onChange={(e) => setExtracted({ ...extracted, suggestedTitle: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea value={extracted.description} onChange={(e) => setExtracted({ ...extracted, description: e.target.value })} />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setExtracted(null)}>Back</Button>
              <Button onClick={handleCreate}>Create enquiry</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
