'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, onCheckedChange, onChange, checked, defaultChecked, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked ?? false)
    const controlled = checked !== undefined
    const value = controlled ? checked : isChecked

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!controlled) setIsChecked(e.target.checked)
      onCheckedChange?.(e.target.checked)
      onChange?.(e)
    }

    return (
      <label className={cn('relative inline-flex h-5 w-9 cursor-pointer items-center', className)}>
        <input
          type="checkbox"
          ref={ref}
          className="sr-only peer"
          checked={value}
          onChange={handleChange}
          {...props}
        />
        <div className="h-5 w-9 rounded-full bg-gray-200 peer-checked:bg-brand-500 transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-4" />
      </label>
    )
  }
)
Switch.displayName = 'Switch'

export { Switch }
