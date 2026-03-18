import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { QUOTE_STATUSES } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface PipelineData {
  status: string
  count: number
}

const PLACEHOLDER_DATA: PipelineData[] = [
  { status: 'DRAFT', count: 4 },
  { status: 'SENT', count: 8 },
  { status: 'OPENED', count: 5 },
  { status: 'REPLIED', count: 3 },
  { status: 'ACCEPTED', count: 12 },
  { status: 'LOST', count: 6 },
  { status: 'EXPIRED', count: 2 },
]

const statusBarColors: Record<string, string> = {
  DRAFT: 'bg-slate-400',
  SENT: 'bg-blue-400',
  OPENED: 'bg-indigo-500',
  REPLIED: 'bg-purple-500',
  ACCEPTED: 'bg-emerald-500',
  LOST: 'bg-rose-400',
  EXPIRED: 'bg-amber-400',
}

interface QuotePipelineProps {
  data?: PipelineData[]
}

export function QuotePipeline({ data = PLACEHOLDER_DATA }: QuotePipelineProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Quote Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Stacked bar */}
        <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
          {data.map((item) => {
            const percentage = total > 0 ? (item.count / total) * 100 : 0
            const barColor = statusBarColors[item.status]
            return (
              <div
                key={item.status}
                className={cn('h-full rounded-sm transition-all', barColor)}
                style={{ width: `${percentage}%` }}
                title={`${item.status}: ${item.count}`}
              />
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
          {data.map((item) => {
            const statusInfo = QUOTE_STATUSES.find((s) => s.value === item.status)
            const barColor = statusBarColors[item.status]
            return (
              <div key={item.status} className="flex items-center gap-1.5">
                <div className={cn('h-2.5 w-2.5 rounded-sm', barColor)} />
                <span className="text-xs text-gray-600">
                  {statusInfo?.label ?? item.status}
                </span>
                <span className="text-xs font-semibold text-gray-900">{item.count}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
