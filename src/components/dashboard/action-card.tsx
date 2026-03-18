import Link from 'next/link'
import { LucideIcon, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ActionCardProps {
  title: string
  description: string
  count: number
  href: string
  icon: LucideIcon
  urgency?: 'normal' | 'warning' | 'danger'
  className?: string
}

export function ActionCard({
  title,
  description,
  count,
  href,
  icon: Icon,
  urgency = 'normal',
  className,
}: ActionCardProps) {
  const urgencyStyles = {
    normal: 'bg-brand-50 text-brand-600',
    warning: 'bg-amber-50 text-amber-600',
    danger: 'bg-rose-50 text-rose-600',
  }

  const countStyles = {
    normal: 'bg-brand-100 text-brand-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-rose-100 text-rose-700',
  }

  return (
    <Link href={href}>
      <Card className={cn('cursor-pointer transition-all hover:-translate-y-0.5', className)}>
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xl shrink-0',
                urgencyStyles[urgency]
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-900">{title}</p>
                <span
                  className={cn(
                    'inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-bold',
                    countStyles[urgency]
                  )}
                >
                  {count}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 truncate">{description}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 shrink-0" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
