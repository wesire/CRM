import {
  FileText,
  Send,
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  User,
  Bell,
  Sparkles,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatRelativeTime } from '@/lib/utils'
import { ActivityType } from '@/types'
import { cn } from '@/lib/utils'

interface ActivityItem {
  id: string
  type: ActivityType
  title: string
  description?: string | null
  createdAt: Date
}

const activityIcons: Record<ActivityType, React.ComponentType<{ className?: string }>> = {
  AI_SUGGESTION: Sparkles,
  ENQUIRY_CREATED: Plus,
  ENQUIRY_UPDATED: FileText,
  QUOTE_CREATED: FileText,
  QUOTE_SENT: Send,
  QUOTE_OPENED: Eye,
  QUOTE_REPLIED: MessageSquare,
  QUOTE_ACCEPTED: CheckCircle,
  QUOTE_LOST: XCircle,
  QUOTE_EXPIRED: Clock,
  QUOTE_UPDATED: FileText,
  FOLLOW_UP_SCHEDULED: Bell,
  FOLLOW_UP_COMPLETED: CheckCircle,
  EMAIL_SENT: Send,
  EMAIL_RECEIVED: MessageSquare,
  NOTE_ADDED: FileText,
  CUSTOMER_CREATED: User,
}

const activityColors: Record<ActivityType, string> = {
  AI_SUGGESTION: 'bg-violet-100 text-violet-600',
  ENQUIRY_CREATED: 'bg-blue-100 text-blue-600',
  ENQUIRY_UPDATED: 'bg-gray-100 text-gray-600',
  QUOTE_CREATED: 'bg-indigo-100 text-indigo-600',
  QUOTE_SENT: 'bg-blue-100 text-blue-600',
  QUOTE_OPENED: 'bg-indigo-100 text-indigo-600',
  QUOTE_REPLIED: 'bg-purple-100 text-purple-600',
  QUOTE_ACCEPTED: 'bg-emerald-100 text-emerald-600',
  QUOTE_LOST: 'bg-rose-100 text-rose-600',
  QUOTE_EXPIRED: 'bg-amber-100 text-amber-600',
  QUOTE_UPDATED: 'bg-gray-100 text-gray-600',
  FOLLOW_UP_SCHEDULED: 'bg-amber-100 text-amber-600',
  FOLLOW_UP_COMPLETED: 'bg-emerald-100 text-emerald-600',
  EMAIL_SENT: 'bg-blue-100 text-blue-600',
  EMAIL_RECEIVED: 'bg-indigo-100 text-indigo-600',
  NOTE_ADDED: 'bg-gray-100 text-gray-600',
  CUSTOMER_CREATED: 'bg-teal-100 text-teal-600',
}

const PLACEHOLDER_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    type: 'QUOTE_ACCEPTED',
    title: 'Quote accepted by Sarah Thompson',
    description: 'QF-1024 — Bathroom renovation · £3,450',
    createdAt: new Date(Date.now() - 1000 * 60 * 20),
  },
  {
    id: '2',
    type: 'QUOTE_OPENED',
    title: 'Quote opened by Mark Davis',
    description: 'QF-1023 — Kitchen plumbing repairs · £680',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: '3',
    type: 'ENQUIRY_CREATED',
    title: 'New enquiry from Emma Wilson',
    description: 'Boiler replacement — via website',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
  {
    id: '4',
    type: 'QUOTE_SENT',
    title: 'Quote sent to Robert Clarke',
    description: 'QF-1022 — Central heating service · £220',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
  },
  {
    id: '5',
    type: 'FOLLOW_UP_COMPLETED',
    title: 'Follow-up completed for QF-1019',
    description: 'Called customer — going ahead next week',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
  },
  {
    id: '6',
    type: 'CUSTOMER_CREATED',
    title: 'New customer added: Patricia Moore',
    description: 'Bristol · Referred by existing customer',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: '7',
    type: 'QUOTE_LOST',
    title: 'Quote marked as lost',
    description: 'QF-1018 — Went with cheaper quote',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26),
  },
]

interface RecentActivityProps {
  activities?: ActivityItem[]
}

export function RecentActivity({ activities = PLACEHOLDER_ACTIVITIES }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-50">
          {activities.map((activity, index) => {
            const Icon = activityIcons[activity.type]
            const colorClass = activityColors[activity.type]

            return (
              <div
                key={activity.id}
                className={cn(
                  'flex items-start gap-3 px-6 py-3.5 transition-colors hover:bg-gray-50',
                  index === 0 && 'animate-slideUp'
                )}
              >
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full shrink-0 mt-0.5',
                    colorClass
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  {activity.description && (
                    <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
                  )}
                </div>
                <span className="text-xs text-gray-400 shrink-0 mt-0.5">
                  {formatRelativeTime(activity.createdAt)}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
