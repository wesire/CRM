import { Reply, Send } from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'

interface EmailEntry {
  id: string
  subject: string
  preview: string
  from: string
  direction: 'inbound' | 'outbound'
  createdAt: Date
}

interface EmailTimelineProps {
  emails: EmailEntry[]
}

export function EmailTimeline({ emails }: EmailTimelineProps) {
  if (emails.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center py-6">No emails synced yet.</p>
    )
  }

  return (
    <div className="space-y-3">
      {emails.map((email) => (
        <div key={email.id} className="flex gap-3">
          <div className={`mt-0.5 h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
            email.direction === 'inbound' ? 'bg-blue-100' : 'bg-gray-100'
          }`}>
            {email.direction === 'inbound' ? (
              <Reply className="h-4 w-4 text-blue-600" />
            ) : (
              <Send className="h-4 w-4 text-gray-500" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-medium text-gray-900 truncate">{email.subject}</p>
              <span className="text-xs text-gray-400 shrink-0">{formatRelativeTime(email.createdAt)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{email.from}</p>
            <p className="text-xs text-gray-400 mt-0.5 truncate">{email.preview}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
