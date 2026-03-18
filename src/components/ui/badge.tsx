import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-brand-100 text-brand-700',
        secondary: 'bg-gray-100 text-gray-700',
        draft: 'bg-slate-100 text-slate-700',
        sent: 'bg-blue-100 text-blue-700',
        opened: 'bg-indigo-100 text-indigo-700',
        replied: 'bg-purple-100 text-purple-700',
        accepted: 'bg-emerald-100 text-emerald-700',
        lost: 'bg-rose-100 text-rose-700',
        expired: 'bg-amber-100 text-amber-700',
        new: 'bg-blue-100 text-blue-700',
        contacted: 'bg-amber-100 text-amber-700',
        quoted: 'bg-indigo-100 text-indigo-700',
        closed: 'bg-slate-100 text-slate-600',
        destructive: 'bg-rose-100 text-rose-700',
        outline: 'border border-gray-200 text-gray-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
