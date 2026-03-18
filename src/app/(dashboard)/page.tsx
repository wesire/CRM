'use client'

import Link from 'next/link'
import { Plus, TrendingUp, Clock, CheckCircle2, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/dashboard/stat-card'
import { ActionCard } from '@/components/dashboard/action-card'
import { QuotePipeline } from '@/components/dashboard/quote-pipeline'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { getGreeting, formatCurrency } from '@/lib/utils'

const MOCK_PIPELINE = [
  { status: 'DRAFT', count: 2 },
  { status: 'SENT', count: 5 },
  { status: 'OPENED', count: 3 },
  { status: 'REPLIED', count: 2 },
  { status: 'ACCEPTED', count: 8 },
]

const MOCK_ACTIVITIES = [
  { id: '1', type: 'QUOTE_SENT' as const, title: 'Quote QF-1024 sent to Sarah Wilson', createdAt: new Date(Date.now() - 1000 * 60 * 20) },
  { id: '2', type: 'QUOTE_ACCEPTED' as const, title: 'Quote QF-1019 accepted by Tom Barnes', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  { id: '3', type: 'ENQUIRY_CREATED' as const, title: 'New enquiry: Boiler replacement needed', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5) },
  { id: '4', type: 'QUOTE_OPENED' as const, title: 'Quote QF-1022 opened by Mark Davis', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8) },
  { id: '5', type: 'FOLLOW_UP_COMPLETED' as const, title: 'Follow-up sent for quote QF-1018', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) },
]

export default function DashboardPage() {
  const greeting = getGreeting()

  return (
    <div className="space-y-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{greeting}, James</h1>
          <p className="text-gray-500 mt-0.5">Here is what is happening with your quotes today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/enquiries">
              <Plus className="h-4 w-4 mr-1.5" />
              New Enquiry
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/quotes">
              <Plus className="h-4 w-4 mr-1.5" />
              New Quote
            </Link>
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Quotes"
          value="12"
          icon={TrendingUp}
          trend="up"
          trendValue="+2 this week"
        />
        <StatCard
          title="Quotes Sent"
          value="23"
          icon={CheckCircle2}
          trend="up"
          trendValue="+15% vs last month"
        />
        <StatCard
          title="Total Won"
          value={formatCurrency(14600)}
          icon={TrendingUp}
          trend="up"
          trendValue="+8% vs last month"
        />
        <StatCard
          title="Follow-ups Due"
          value="4"
          icon={Bell}
          trend="neutral"
          trendValue="2 overdue"
        />
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ActionCard
          title="Quotes Needing Attention"
          description="3 quotes have had no response in 3+ days"
          count={3}
          href="/quotes"
          icon={Clock}
          urgency="warning"
        />
        <ActionCard
          title="Enquiries to Convert"
          description="3 new enquiries waiting to be quoted"
          count={3}
          href="/enquiries"
          icon={TrendingUp}
          urgency="normal"
        />
        <ActionCard
          title="Follow-ups Due Today"
          description="2 follow-ups are due today"
          count={2}
          href="/quotes"
          icon={Bell}
          urgency="danger"
        />
      </div>

      {/* Pipeline + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuotePipeline data={MOCK_PIPELINE} />
        <RecentActivity activities={MOCK_ACTIVITIES} />
      </div>
    </div>
  )
}
