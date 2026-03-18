import { Building2, Mail, Phone, MapPin, Palette, FileText, Percent, Calendar, Plug, Link as LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PageHeader } from '@/components/shared/page-header'
import { Separator } from '@/components/ui/separator'

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-slideUp max-w-3xl">
      <PageHeader
        title="Settings"
        subtitle="Manage your business profile and preferences"
      />

      {/* Business Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-brand-600" />
            <CardTitle className="text-base">Business Profile</CardTitle>
          </div>
          <CardDescription>Your business details shown on quotes and communications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Business name</label>
              <Input defaultValue="Mitchell Plumbing & Heating" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Your name</label>
              <Input defaultValue="James Mitchell" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" /> Business email
              </label>
              <Input defaultValue="james@mitchellplumbing.co.uk" type="email" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> Phone number
              </label>
              <Input defaultValue="07700 900000" type="tel" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> Business address
            </label>
            <Input defaultValue="Bristol, BS1 1AA" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Logo</label>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-brand-500 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">JM</span>
              </div>
              <Button variant="outline" size="sm">Upload Logo</Button>
              <span className="text-xs text-gray-400">PNG, JPG up to 2MB</span>
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Save Profile</Button>
          </div>
        </CardContent>
      </Card>

      {/* Quote Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand-600" />
            <CardTitle className="text-base">Quote Settings</CardTitle>
          </div>
          <CardDescription>Control how your quotes are numbered and what defaults are used.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Quote prefix</label>
              <Input defaultValue="QF" maxLength={5} />
              <p className="text-xs text-gray-400">e.g. QF-1001</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Next number</label>
              <Input defaultValue="1025" type="number" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Percent className="h-3.5 w-3.5" /> Default tax rate
              </label>
              <Input defaultValue="20" type="number" />
              <p className="text-xs text-gray-400">VAT (%)</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Quote expiry (days)
              </label>
              <Input defaultValue="30" type="number" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Follow-up after (days)</label>
              <Input defaultValue="3" type="number" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Save Quote Settings</Button>
          </div>
        </CardContent>
      </Card>

      {/* Branding */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-brand-600" />
            <CardTitle className="text-base">Branding</CardTitle>
          </div>
          <CardDescription>Customise how your quote pages look to customers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Accent colour</label>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-brand-500 shrink-0 border border-gray-200" />
              <Input defaultValue="#6366f1" className="max-w-[140px] font-mono" />
              <div className="flex gap-2">
                {['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6'].map((color) => (
                  <button
                    key={color}
                    className="h-6 w-6 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Save Branding</Button>
          </div>
        </CardContent>
      </Card>

      {/* Integrations */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Plug className="h-5 w-5 text-brand-600" />
            <CardTitle className="text-base">Integrations</CardTitle>
          </div>
          <CardDescription>Connect your email accounts to sync quote conversations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Gmail */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <Mail className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Gmail</p>
                <p className="text-xs text-gray-500">Sync quote emails from your Gmail inbox</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="shrink-0">
              <LinkIcon className="h-3.5 w-3.5 mr-1.5" />
              Connect
            </Button>
          </div>

          <Separator />

          {/* Outlook */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                <Mail className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Outlook / Microsoft 365</p>
                <p className="text-xs text-gray-500">Sync quote emails from your Outlook inbox</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="shrink-0">
              <LinkIcon className="h-3.5 w-3.5 mr-1.5" />
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
