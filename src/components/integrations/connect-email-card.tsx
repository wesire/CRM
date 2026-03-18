"use client"

import { useState } from "react"
import { Mail, Check, RefreshCw, Unlink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ConnectEmailCardProps {
  provider: "gmail" | "outlook"
  connected?: boolean
  email?: string
  lastSyncAt?: Date | string | null
}

const PROVIDER_CONFIG = {
  gmail: {
    name: "Gmail",
    icon: "G",
    color: "bg-red-50 text-red-600",
    description: "Connect Gmail to automatically track quote emails and customer replies.",
  },
  outlook: {
    name: "Outlook",
    icon: "O",
    color: "bg-blue-50 text-blue-600",
    description: "Connect Outlook to automatically track quote emails and customer replies.",
  },
}

export function ConnectEmailCard({ provider, connected = false, email, lastSyncAt }: ConnectEmailCardProps) {
  const [isConnected, setIsConnected] = useState(connected)
  const config = PROVIDER_CONFIG[provider]

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${config.color}`}>
              {config.icon}
            </div>
            <div>
              <CardTitle className="text-base">{config.name}</CardTitle>
              {isConnected ? (
                <Badge variant="success" className="mt-1">Connected</Badge>
              ) : (
                <Badge variant="secondary" className="mt-1">Not connected</Badge>
              )}
            </div>
          </div>
          {isConnected && (
            <Button variant="ghost" size="sm" onClick={() => setIsConnected(false)} className="text-slate-500">
              <Unlink className="h-4 w-4 mr-1.5" />
              Disconnect
            </Button>
          )}
        </div>
        <CardDescription className="mt-2">{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Check className="h-4 w-4 text-emerald-500" />
              <span>Connected as <strong>{email || `user@${provider}.com`}</strong></span>
            </div>
            {lastSyncAt && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Last synced just now</span>
              </div>
            )}
          </div>
        ) : (
          <Button onClick={() => setIsConnected(true)} variant="outline" className="w-full gap-2">
            <Mail className="h-4 w-4" />
            Connect {config.name}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
