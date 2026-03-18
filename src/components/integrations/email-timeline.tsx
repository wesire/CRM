import { Mail, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { formatRelativeTime } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface EmailEntry {
  id: string
  subject: string
  snippet: string
  timestamp: Date | string
  direction: "sent" | "received"
}

interface EmailTimelineProps {
  emails: EmailEntry[]
}

export function EmailTimeline({ emails }: EmailTimelineProps) {
  if (emails.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-slate-400 py-2">
        <Mail className="h-4 w-4" />
        No email activity yet
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {emails.map((email) => (
        <div key={email.id} className="flex items-start gap-3">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
            email.direction === "sent" ? "bg-blue-50 text-blue-600" : "bg-indigo-50 text-indigo-600"
          )}>
            {email.direction === "sent"
              ? <ArrowUpRight className="h-4 w-4" />
              : <ArrowDownLeft className="h-4 w-4" />
            }
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-slate-500 uppercase">
                {email.direction === "sent" ? "Sent" : "Received"}
              </p>
              <span className="text-xs text-slate-400">{formatRelativeTime(email.timestamp)}</span>
            </div>
            <p className="text-sm font-medium text-slate-900 truncate">{email.subject}</p>
            <p className="text-xs text-slate-500 truncate">{email.snippet}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
