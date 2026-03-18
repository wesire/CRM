'use client'

import { useState } from 'react'
import { Mail, CheckCircle, Loader2, Unlink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ConnectEmailCardProps {
  provider: 'gmail' | 'outlook'
  connected?: boolean
  connectedEmail?: string
  onConnect?: () => void
  onDisconnect?: () => void
  className?: string
}

const providerConfig = {
  gmail: {
    name: 'Gmail',
    description: 'Sync quote emails from your Gmail inbox',
    iconColor: 'text-red-500',
  },
  outlook: {
    name: 'Outlook / Microsoft 365',
    description: 'Sync quote emails from your Outlook inbox',
    iconColor: 'text-blue-500',
  },
}

export function ConnectEmailCard({
  provider,
  connected = false,
  connectedEmail,
  onConnect,
  onDisconnect,
  className,
}: ConnectEmailCardProps) {
  const [loading, setLoading] = useState(false)
  const config = providerConfig[provider]

  const handleConnect = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    onConnect?.()
    setLoading(false)
  }

  const handleDisconnect = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 500))
    onDisconnect?.()
    setLoading(false)
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 rounded-xl border bg-gray-50',
        connected ? 'border-emerald-200 bg-emerald-50' : 'border-gray-100',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
          <Mail className={cn('h-4 w-4', config.iconColor)} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-900">{config.name}</p>
            {connected && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                <CheckCircle className="h-3 w-3" />
                Connected
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500">
            {connected && connectedEmail ? connectedEmail : config.description}
          </p>
        </div>
      </div>

      {connected ? (
        <Button
          variant="outline"
          size="sm"
          onClick={handleDisconnect}
          disabled={loading}
          className="shrink-0 text-rose-600 hover:bg-rose-50 hover:border-rose-200"
        >
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Unlink className="h-3.5 w-3.5 mr-1.5" />}
          Disconnect
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={handleConnect}
          disabled={loading}
          className="shrink-0"
        >
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
          ) : (
            <span className="text-xs mr-1.5">🔗</span>
          )}
          Connect
        </Button>
      )}
    </div>
  )
}
