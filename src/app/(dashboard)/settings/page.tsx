'use client'

import { useState } from 'react'
import { Building2, FileText, Palette, Zap, Plug, Sparkles, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { PageHeader } from '@/components/shared/page-header'
import { AutomationRules } from '@/components/integrations/automation-rules'
import { ConnectEmailCard } from '@/components/integrations/connect-email-card'
import { THEME_PRESETS } from '@/lib/constants'

export default function SettingsPage() {
  const [accentColor, setAccentColor] = useState('#6366f1')
  const [aiFollowUp, setAiFollowUp] = useState(true)
  const [aiRewrite, setAiRewrite] = useState(true)
  const [aiExtract, setAiExtract] = useState(false)

  return (
    <div className="space-y-8 animate-slideUp max-w-3xl">
      <PageHeader
        title="Settings"
        subtitle="Manage your business profile and preferences"
      />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-brand-600" />
            <CardTitle>Business Profile</CardTitle>
          </div>
          <CardDescription>Your business details shown on quotes and emails.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" defaultValue="Mitchell Plumbing and Heating" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="businessEmail">Email</Label>
              <Input id="businessEmail" type="email" defaultValue="james@mitchellplumbing.co.uk" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="businessPhone">Phone</Label>
              <Input id="businessPhone" type="tel" defaultValue="07700 900000" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="businessAddress">Address</Label>
              <Input id="businessAddress" defaultValue="14 Carpenter Close, Bristol, BS1 4QT" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button size="sm">Save Profile</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand-600" />
            <CardTitle>Quote Settings</CardTitle>
          </div>
          <CardDescription>Configure default values for new quotes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="quotePrefix">Quote Prefix</Label>
              <Input id="quotePrefix" defaultValue="QF-" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="quoteStart">Starting Number</Label>
              <Input id="quoteStart" type="number" defaultValue="1001" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="expiryDays">Default Expiry (days)</Label>
              <Input id="expiryDays" type="number" defaultValue="30" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="vatRate">Default VAT Rate (%)</Label>
              <Input id="vatRate" type="number" defaultValue="20" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button size="sm">Save Quote Settings</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-brand-600" />
            <CardTitle>Branding</CardTitle>
          </div>
          <CardDescription>Customise the accent colour on your customer-facing quote pages.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="mb-2 block">Accent Colour</Label>
            <div className="flex flex-wrap gap-3">
              {THEME_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  title={preset.name}
                  onClick={() => setAccentColor(preset.color)}
                  className="h-9 w-9 rounded-full border-2 transition-all"
                  style={{
                    backgroundColor: preset.color,
                    borderColor: accentColor === preset.color ? preset.color : 'transparent',
                    boxShadow: accentColor === preset.color ? `0 0 0 3px ${preset.color}40` : 'none',
                  }}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-400">Selected: {accentColor}</p>
          </div>
          <div className="flex justify-end">
            <Button size="sm">Save Branding</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-brand-600" />
            <CardTitle>Automation</CardTitle>
          </div>
          <CardDescription>Configure automatic reminders and follow-up rules.</CardDescription>
        </CardHeader>
        <CardContent>
          <AutomationRules />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Plug className="h-5 w-5 text-brand-600" />
            <CardTitle>Integrations</CardTitle>
          </div>
          <CardDescription>Connect your email provider to sync threads with quotes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ConnectEmailCard provider="gmail" />
          <ConnectEmailCard provider="outlook" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-600" />
            <CardTitle>AI Features</CardTitle>
          </div>
          <CardDescription>Enable or disable AI-powered features in your workflow.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="ai-followup" className="font-medium">AI Follow-up Drafting</Label>
              <p className="text-sm text-gray-500 mt-0.5">Automatically draft follow-up messages for sent quotes.</p>
            </div>
            <Switch id="ai-followup" checked={aiFollowUp} onCheckedChange={setAiFollowUp} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="ai-rewrite" className="font-medium">AI Quote Rewriting</Label>
              <p className="text-sm text-gray-500 mt-0.5">Rewrite quote descriptions in different tones.</p>
            </div>
            <Switch id="ai-rewrite" checked={aiRewrite} onCheckedChange={setAiRewrite} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="ai-extract" className="font-medium">AI Enquiry Extraction</Label>
              <p className="text-sm text-gray-500 mt-0.5">Extract enquiry details automatically from pasted emails.</p>
            </div>
            <Switch id="ai-extract" checked={aiExtract} onCheckedChange={setAiExtract} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-brand-600" />
            <CardTitle>Plan and Billing</CardTitle>
          </div>
          <CardDescription>Manage your subscription and usage.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-brand-50 border border-brand-200">
            <div>
              <p className="font-semibold text-brand-900">Starter Plan</p>
              <p className="text-sm text-brand-700">Free - Up to 10 active quotes</p>
            </div>
            <Button size="sm">Upgrade</Button>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="text-2xl font-bold text-gray-900">7</p>
              <p className="text-xs text-gray-500 mt-1">Active quotes</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="text-2xl font-bold text-gray-900">23</p>
              <p className="text-xs text-gray-500 mt-1">Quotes this month</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs text-gray-500 mt-1">Customers</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
