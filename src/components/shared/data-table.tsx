import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DataTableProps {
  headers: string[]
  children: ReactNode
  className?: string
}

export function DataTable({ headers, children, className }: DataTableProps) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-gray-100', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 bg-white">{children}</tbody>
      </table>
    </div>
  )
}
