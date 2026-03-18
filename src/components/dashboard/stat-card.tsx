import { LucideIcon, TrendingDown, TrendingUp, Minus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  className?: string
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  className,
}: StatCardProps) {
  return (
    <Card className={cn('', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold tracking-tight text-gray-900">{value}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 shrink-0">
            <Icon className="h-5 w-5 text-brand-600" />
          </div>
        </div>

        {trend && trendValue && (
          <div className="flex items-center gap-1 mt-4">
            {trend === 'up' && (
              <>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-medium text-emerald-600">{trendValue}</span>
              </>
            )}
            {trend === 'down' && (
              <>
                <TrendingDown className="h-4 w-4 text-rose-500" />
                <span className="text-xs font-medium text-rose-600">{trendValue}</span>
              </>
            )}
            {trend === 'neutral' && (
              <>
                <Minus className="h-4 w-4 text-gray-400" />
                <span className="text-xs font-medium text-gray-500">{trendValue}</span>
              </>
            )}
            <span className="text-xs text-gray-400">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
