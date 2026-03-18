"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Info } from "lucide-react"

export function AutomationRules() {
  const [autoReminders, setAutoReminders] = useState(true)
  const [noReplyDays, setNoReplyDays] = useState(2)
  const [unopenedDays, setUnopenedDays] = useState(5)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Automatic Reminders</CardTitle>
        <CardDescription>
          Set up automatic follow-up reminders so you never forget to chase a quote.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main toggle */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="auto-reminders" className="text-sm font-medium text-slate-900">
              Automatically remind me to follow up
            </Label>
            <p className="text-xs text-slate-500 mt-0.5">
              Get notified when quotes need chasing
            </p>
          </div>
          <Switch
            id="auto-reminders"
            checked={autoReminders}
            onCheckedChange={setAutoReminders}
          />
        </div>

        {autoReminders && (
          <div className="space-y-4 pl-0">
            <div className="flex items-center gap-3">
              <p className="text-sm text-slate-700 min-w-0">
                Send reminder after
              </p>
              <Input
                type="number"
                value={noReplyDays}
                onChange={(e) => setNoReplyDays(Number(e.target.value))}
                className="w-16 text-center"
                min={1}
                max={30}
              />
              <p className="text-sm text-slate-700">days if no reply</p>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-sm text-slate-700 min-w-0">
                Send reminder after
              </p>
              <Input
                type="number"
                value={unopenedDays}
                onChange={(e) => setUnopenedDays(Number(e.target.value))}
                className="w-16 text-center"
                min={1}
                max={30}
              />
              <p className="text-sm text-slate-700">days if quote unopened</p>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-slate-50 text-xs text-slate-600">
              <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-slate-400" />
              <span>Reminders stop automatically when a quote is accepted, declined, or expired.</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
