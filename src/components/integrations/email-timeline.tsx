import { Mail, Send, ArrowDownLeft, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatRelativeTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface EmailEvent {
  id: string
  type: 'sent' | 'received' | 'opened'
  subject: string
  from?: string
  to?: string
  preview?: string
  timestamp: Date
}

const PLACEHOLDER_EMAILS: EmailEvent[] = [
  {
    id: 'e1',
    type: 'sent',
    subject: 'Your quote from Mitchell Plumbing & Heating — QF-1023',
    to: 'mark@email.com',
    preview: 'Hi Mark, please find your quote attached...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
  {
    id: 'e2',
    type: 'opened',
    subject: 'Your quote from Mitchell Plumbing & Heating — QF-1023',
    preview: 'Quote viewed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
]

const eventIcons = {
  sent: Send,
  received: ArrowDownLeft,
  opened: Clock,
}

const eventColors = {
  sent: 'bg-blue-100 text-blue-600',
  received: 'bg-emerald-100 text-emerald-600',
  opened: 'bg-indigo-100 text-indigo-600',
}

interface EmailTimelineProps {
  emails?: EmailEvent[]
  className?: string
}

export function EmailTimeline({ emails = PLACEHOLDER_EMAILS, className }: EmailTimelineProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Mail className="h-4 w-4 text-gray-400" />
          Email history
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {emails.length === 0 ? (
          <div className="px-6 py-8 text-center text-sm text-gray-400">
            No email history yet
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {emails.map((email) => {
              const Icon = eventIcons[email.type]
              return (
                <div key={email.id} className="flex items-start gap-3 px-6 py-3.5">
                  <div
                    className={cn(
                      'flex h-7 w-7 items-center justify-center rounded-full shrink-0 mt-0.5',
                      eventColors[email.type]
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{email.subject}</p>
                    {email.preview && (
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{email.preview}</p>
                    )}
                    {(email.from ?? email.to) && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {email.type === 'sent' ? `To: ${email.to}` : `From: ${email.from}`}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">
                    {formatRelativeTime(email.timestamp)}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
