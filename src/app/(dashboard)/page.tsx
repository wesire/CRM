import {
  FileText,
  PoundSterling,
  Clock,
  Bell,
  Plus,
  Inbox,
} from 'lucide-react'
import { StatCard } from '@/components/dashboard/stat-card'
import { ActionCard } from '@/components/dashboard/action-card'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { QuotePipeline } from '@/components/dashboard/quote-pipeline'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-slideUp">
      {/* Welcome Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Good morning, James 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Here&apos;s what needs your attention today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/enquiries">
              <Inbox className="h-4 w-4 mr-2" />
              New Enquiry
            </Link>
          </Button>
          <Button asChild>
            <Link href="/quotes">
              <Plus className="h-4 w-4 mr-2" />
              New Quote
            </Link>
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Quotes"
          value="40"
          icon={FileText}
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Won This Month"
          value="£8,420"
          icon={PoundSterling}
          trend="up"
          trendValue="+23%"
        />
        <StatCard
          title="Awaiting Response"
          value="13"
          icon={Clock}
          trend="neutral"
          trendValue="same"
        />
        <StatCard
          title="Follow-ups Due"
          value="5"
          icon={Bell}
          trend="down"
          trendValue="-2"
        />
      </div>

      {/* Action Cards */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Needs Your Attention
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ActionCard
            title="Quotes needing follow-up"
            description="Sent 3+ days ago with no response"
            count={5}
            href="/quotes?status=SENT"
            icon={Clock}
            urgency="warning"
          />
          <ActionCard
            title="New enquiries"
            description="Uncontacted enquiries waiting"
            count={3}
            href="/enquiries?status=NEW"
            icon={Inbox}
            urgency="danger"
          />
        </div>
      </div>

      {/* Pipeline + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <QuotePipeline />
          <RecentActivity />
        </div>

        {/* Quick tips / upcoming */}
        <div className="space-y-4">
          <div className="rounded-xl border border-brand-100 bg-brand-50 p-5">
            <h3 className="text-sm font-semibold text-brand-700 mb-2">
              💡 Quick tips
            </h3>
            <ul className="space-y-2 text-sm text-brand-600">
              <li>• Follow up within 48 hours to double win rates</li>
              <li>• Use quote notes to track customer conversations</li>
              <li>• Set reminders for quotes expiring this week</li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              This month
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Quotes sent</span>
                <span className="font-semibold text-gray-900">18</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Accepted</span>
                <span className="font-semibold text-emerald-600">7</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Lost</span>
                <span className="font-semibold text-rose-500">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Win rate</span>
                <span className="font-bold text-gray-900">39%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
