'use client'

import { useState } from 'react'
import { Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface AutomationRule {
  id: string
  label: string
  description: string
  enabled: boolean
  daysValue?: number
  daysLabel?: string
}

const DEFAULT_RULES: AutomationRule[] = [
  {
    id: 'auto_follow_up',
    label: 'Auto follow-up reminders',
    description: 'Automatically schedule follow-up reminders when a quote is sent',
    enabled: true,
  },
  {
    id: 'no_reply',
    label: 'No reply reminder',
    description: "Remind me if a customer hasn't replied within",
    enabled: true,
    daysValue: 2,
    daysLabel: 'days',
  },
  {
    id: 'unopened',
    label: 'Unopened quote reminder',
    description: "Remind me if a customer hasn't opened the quote within",
    enabled: true,
    daysValue: 5,
    daysLabel: 'days',
  },
  {
    id: 'stop_on_accept',
    label: 'Stop reminders when accepted',
    description: 'Automatically cancel follow-ups when a quote is accepted or declined',
    enabled: true,
  },
]

interface AutomationRulesProps {
  className?: string
}

export function AutomationRules({ className }: AutomationRulesProps) {
  const [rules, setRules] = useState(DEFAULT_RULES)

  const toggleRule = (id: string) => {
    setRules((r) =>
      r.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule))
    )
  }

  const updateDays = (id: string, value: number) => {
    setRules((r) =>
      r.map((rule) => (rule.id === id ? { ...rule, daysValue: value } : rule))
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-brand-600" />
          <CardTitle className="text-base">Automation Rules</CardTitle>
        </div>
        <CardDescription>
          Control how Quote Flow automatically manages follow-ups and reminders.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="flex items-start justify-between gap-4 py-3 border-b border-gray-50 last:border-0"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900">{rule.label}</p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-gray-500">{rule.description}</p>
                {rule.daysValue !== undefined && rule.enabled && (
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      value={rule.daysValue}
                      onChange={(e) => updateDays(rule.id, Number(e.target.value))}
                      className="h-6 w-14 text-xs text-center px-1"
                      min={1}
                      max={30}
                    />
                    <span className="text-xs text-gray-500">{rule.daysLabel}</span>
                  </div>
                )}
              </div>
            </div>
            <Switch
              checked={rule.enabled}
              onCheckedChange={() => toggleRule(rule.id)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
