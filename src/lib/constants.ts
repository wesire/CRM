import {
  LayoutDashboard,
  Inbox,
  FileText,
  Users,
  Settings,
  Phone,
  Mail,
  Globe,
  Share2,
  UserPlus,
  MapPin,
  HelpCircle,
} from 'lucide-react'

export const CURRENCY_SYMBOL = '£'

export const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'Enquiries',
    href: '/enquiries',
    icon: Inbox,
  },
  {
    label: 'Quotes',
    href: '/quotes',
    icon: FileText,
  },
  {
    label: 'Customers',
    href: '/customers',
    icon: Users,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]

export const QUOTE_STATUSES = [
  { value: 'DRAFT', label: 'Draft', color: 'status-draft', bgClass: 'bg-slate-100 text-slate-700' },
  { value: 'SENT', label: 'Sent', color: 'status-sent', bgClass: 'bg-blue-100 text-blue-700' },
  { value: 'OPENED', label: 'Opened', color: 'status-opened', bgClass: 'bg-indigo-100 text-indigo-700' },
  { value: 'REPLIED', label: 'Replied', color: 'status-replied', bgClass: 'bg-purple-100 text-purple-700' },
  { value: 'ACCEPTED', label: 'Accepted', color: 'status-accepted', bgClass: 'bg-emerald-100 text-emerald-700' },
  { value: 'LOST', label: 'Lost', color: 'status-lost', bgClass: 'bg-rose-100 text-rose-700' },
  { value: 'EXPIRED', label: 'Expired', color: 'status-expired', bgClass: 'bg-amber-100 text-amber-700' },
]

export const ENQUIRY_SOURCES = [
  { value: 'PHONE', label: 'Phone', icon: Phone },
  { value: 'EMAIL', label: 'Email', icon: Mail },
  { value: 'WEBSITE', label: 'Website', icon: Globe },
  { value: 'REFERRAL', label: 'Referral', icon: UserPlus },
  { value: 'SOCIAL_MEDIA', label: 'Social Media', icon: Share2 },
  { value: 'WALK_IN', label: 'Walk In', icon: MapPin },
  { value: 'OTHER', label: 'Other', icon: HelpCircle },
]

export const ENQUIRY_STATUSES = [
  { value: 'NEW', label: 'New', bgClass: 'bg-blue-100 text-blue-700' },
  { value: 'CONTACTED', label: 'Contacted', bgClass: 'bg-amber-100 text-amber-700' },
  { value: 'QUOTED', label: 'Quoted', bgClass: 'bg-indigo-100 text-indigo-700' },
  { value: 'CLOSED', label: 'Closed', bgClass: 'bg-slate-100 text-slate-600' },
]

export const FOLLOW_UP_STATUSES = [
  { value: 'PENDING', label: 'Pending', bgClass: 'bg-amber-100 text-amber-700' },
  { value: 'COMPLETED', label: 'Completed', bgClass: 'bg-emerald-100 text-emerald-700' },
  { value: 'SKIPPED', label: 'Skipped', bgClass: 'bg-slate-100 text-slate-600' },
  { value: 'OVERDUE', label: 'Overdue', bgClass: 'bg-rose-100 text-rose-700' },
]
