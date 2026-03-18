"use client"

import { useState } from "react"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface AcceptanceFormProps {
  customerName?: string
  customerEmail?: string
  accentColor?: string
}

type State = "idle" | "accepting" | "declining" | "accepted" | "declined"

export function AcceptanceForm({ customerName, customerEmail, accentColor = "#6366f1" }: AcceptanceFormProps) {
  const [state, setState] = useState<State>("idle")
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(customerName || "")
  const [email, setEmail] = useState(customerEmail || "")
  const [message, setMessage] = useState("")
  const [declineReason, setDeclineReason] = useState("")
  const [agreed, setAgreed] = useState(false)

  const handleAccept = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setState("accepted")
    setLoading(false)
  }

  const handleDecline = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setState("declined")
    setLoading(false)
  }

  if (state === "accepted") {
    return (
      <div className="text-center py-8 space-y-3">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-8 w-8 text-emerald-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Quote accepted!</h3>
        <p className="text-sm text-slate-500">Thank you! We&apos;ll be in touch shortly to arrange the work.</p>
      </div>
    )
  }

  if (state === "declined") {
    return (
      <div className="text-center py-8 space-y-3">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
          <XCircle className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Quote declined</h3>
        <p className="text-sm text-slate-500">No problem at all. Thank you for your time.</p>
      </div>
    )
  }

  if (state === "accepting") {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900">Accept this quote</h3>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Your name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
          </div>
          <div className="space-y-1.5">
            <Label>Email address</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" />
          </div>
          <div className="space-y-1.5">
            <Label>Message (optional)</Label>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Any notes for the tradesperson..." rows={3} />
          </div>
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300" />
            <span className="text-sm text-slate-700">I accept this quote and agree to proceed with the work as described.</span>
          </label>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setState("idle")} className="flex-1">Back</Button>
          <Button
            onClick={handleAccept}
            disabled={!name || !agreed || loading}
            className="flex-1 gap-2"
            style={{ backgroundColor: accentColor }}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
            Confirm acceptance
          </Button>
        </div>
      </div>
    )
  }

  if (state === "declining") {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900">Decline this quote</h3>
        <Textarea
          value={declineReason}
          onChange={(e) => setDeclineReason(e.target.value)}
          placeholder="Optional: let us know why you're declining..."
          rows={3}
        />
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setState("idle")} className="flex-1">Back</Button>
          <Button variant="destructive" onClick={handleDecline} disabled={loading} className="flex-1 gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
            Decline quote
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <Button
        className="w-full h-12 text-base gap-2"
        style={{ backgroundColor: accentColor }}
        onClick={() => setState("accepting")}
      >
        <CheckCircle className="h-5 w-5" />
        Accept this quote
      </Button>
      <Button
        variant="outline"
        className="w-full gap-2"
        onClick={() => setState("declining")}
      >
        <XCircle className="h-4 w-4 text-slate-400" />
        Decline quote
      </Button>
    </div>
  )
}
