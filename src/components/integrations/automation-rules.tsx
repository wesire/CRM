'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface AutomationRule {
  id: string
  label: string
  description: string
  enabled: boolean
  days?: number
}

const DEFAULT_RULES: AutomationRule[] = [
  {
    id: 'followup-sent',
    label: 'Auto follow-up after sending a quote',
    description: 'Remind you to follow up if no response after',
    enabled: true,
    days: 3,
  },
  {
    id: 'followup-opened',
    label: 'Follow up when quote is opened',
    description: 'Remind you to follow up after',
    enabled: true,
    days: 1,
  },
  {
    id: 'expiry-warning',
    label: 'Notify before quote expires',
    description: 'Send reminder before quote expires',
    enabled: true,
    days: 3,
  },
  {
    id: 'mark-lost-expired',
    label: 'Auto-mark expired quotes as lost',
    description: 'Mark quotes as lost if no response after',
    enabled: false,
    days: 30,
  },
]

export function AutomationRules() {
  const [rules, setRules] = useState<AutomationRule[]>(DEFAULT_RULES)

  const toggleRule = (id: string) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)))
  }

  const updateDays = (id: string, days: number) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, days } : r)))
  }

  return (
    <div className="space-y-4">
      {rules.map((rule) => (
        <div
          key={rule.id}
          className={`rounded-xl border p-4 transition-colors ${
            rule.enabled ? 'border-brand-200 bg-brand-50' : 'border-gray-200 bg-gray-50'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Label
                htmlFor={`rule-${rule.id}`}
                className={`font-medium cursor-pointer ${rule.enabled ? 'text-brand-900' : 'text-gray-700'}`}
              >
                {rule.label}
              </Label>
              <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
                {rule.description}
                {rule.days !== undefined && (
                  <>
                    <Input
                      type="number"
                      min="1"
                      max="30"
                      value={rule.days}
                      onChange={(e) => updateDays(rule.id, parseInt(e.target.value) || 1)}
                      disabled={!rule.enabled}
                      className="inline-flex w-14 h-6 text-xs text-center px-1 bg-white"
                    />
                    <span>days</span>
                  </>
                )}
              </p>
            </div>
            <Switch
              id={`rule-${rule.id}`}
              checked={rule.enabled}
              onCheckedChange={() => toggleRule(rule.id)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
