'use client'

import { useState } from 'react'
import { Mail, CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ConnectEmailCardProps {
  provider: 'gmail' | 'outlook'
  isConnected?: boolean
  connectedEmail?: string
  onConnect?: () => void
  onDisconnect?: () => void
}

const PROVIDER_CONFIG = {
  gmail: {
    name: 'Gmail',
    description: 'Connect Google Workspace or Gmail to sync email threads with your quotes.',
    icon: '✉️',
    color: 'bg-red-50 border-red-200',
  },
  outlook: {
    name: 'Outlook',
    description: 'Connect Microsoft 365 or Outlook to sync email threads with your quotes.',
    icon: '📧',
    color: 'bg-blue-50 border-blue-200',
  },
}

export function ConnectEmailCard({
  provider,
  isConnected = false,
  connectedEmail,
  onConnect,
  onDisconnect,
}: ConnectEmailCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const config = PROVIDER_CONFIG[provider]

  const handleConnect = async () => {
    setIsLoading(true)
    try {
      await fetch(`/api/integrations/${provider}/connect`, { method: 'POST' })
      onConnect?.()
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = async () => {
    setIsLoading(true)
    try {
      onDisconnect?.()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('rounded-xl border p-5 flex items-start gap-4', isConnected ? 'bg-emerald-50 border-emerald-200' : config.color)}>
      <div className="text-2xl">{config.icon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">{config.name}</h3>
          {isConnected && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-100 rounded-full px-2 py-0.5">
              <CheckCircle className="h-3 w-3" />
              Connected
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-0.5">{config.description}</p>
        {isConnected && connectedEmail && (
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {connectedEmail}
          </p>
        )}
      </div>
      <Button
        variant={isConnected ? 'outline' : 'default'}
        size="sm"
        disabled={isLoading}
        onClick={isConnected ? handleDisconnect : handleConnect}
      >
        {isLoading && <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />}
        {isConnected ? 'Disconnect' : 'Connect'}
      </Button>
    </div>
  )
}
