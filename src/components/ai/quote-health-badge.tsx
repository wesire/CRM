import { cn } from "@/lib/utils"
import { AlertTriangle, Clock, TrendingDown, CheckCircle } from "lucide-react"

type HealthStatus = "healthy" | "follow-up" | "going-cold" | "no-reply"

interface QuoteHealthBadgeProps {
  sentAt?: Date | string | null
  openedAt?: Date | string | null
  repliedAt?: Date | string | null
  status?: string
  className?: string
}

function getHealthStatus(props: QuoteHealthBadgeProps): HealthStatus {
  const { sentAt, openedAt, repliedAt, status } = props

  if (!sentAt || status === "DRAFT") return "healthy"
  if (status === "ACCEPTED" || status === "LOST" || status === "EXPIRED") return "healthy"

  const sentDate = new Date(sentAt)
  const daysSinceSent = Math.floor((Date.now() - sentDate.getTime()) / (1000 * 60 * 60 * 24))

  if (repliedAt) return "healthy"
  if (!openedAt && daysSinceSent >= 5) return "no-reply"
  if (openedAt && daysSinceSent >= 3) return "going-cold"
  if (daysSinceSent >= 2) return "follow-up"

  return "healthy"
}

const healthConfig: Record<HealthStatus, { label: string; className: string; icon: React.ElementType }> = {
  healthy: { label: "Healthy", className: "bg-emerald-50 text-emerald-700", icon: CheckCircle },
  "follow-up": { label: "Follow up today", className: "bg-blue-50 text-blue-700", icon: Clock },
  "going-cold": { label: "Going cold", className: "bg-amber-50 text-amber-700", icon: TrendingDown },
  "no-reply": { label: "No reply", className: "bg-orange-50 text-orange-700", icon: AlertTriangle },
}

export function QuoteHealthBadge({ className, ...props }: QuoteHealthBadgeProps) {
  const health = getHealthStatus(props)
  const config = healthConfig[health]
  const Icon = config.icon

  if (health === "healthy") return null

  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", config.className, className)}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  )
}
