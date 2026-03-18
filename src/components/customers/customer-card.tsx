import Link from 'next/link'
import { Mail, Phone, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'
import { Customer } from '@/types'
import { cn } from '@/lib/utils'

interface CustomerCardProps {
  customer: Customer
  className?: string
}

export function CustomerCard({ customer, className }: CustomerCardProps) {
  return (
    <Link href={`/customers/${customer.id}`}>
      <Card className={cn('cursor-pointer transition-all hover:-translate-y-0.5', className)}>
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{customer.name}</p>
              {customer.company && (
                <p className="text-sm text-gray-500 truncate">{customer.company}</p>
              )}
              <div className="flex items-center flex-wrap gap-3 mt-2">
                {customer.email && (
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Mail className="h-3 w-3" />
                    {customer.email}
                  </span>
                )}
                {customer.phone && (
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Phone className="h-3 w-3" />
                    {customer.phone}
                  </span>
                )}
              </div>
            </div>
            {customer._count && (
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                  <FileText className="h-4 w-4 text-gray-400" />
                  {customer._count.quotes}
                </div>
                <p className="text-xs text-gray-400">quotes</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
