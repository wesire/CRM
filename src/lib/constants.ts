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

export const QUOTE_STATUS_CONFIG: Record<string, { label: string; bgColor: string; textColor: string }> = {
  DRAFT: { label: 'Draft', bgColor: 'bg-slate-100', textColor: 'text-slate-700' },
  SENT: { label: 'Sent', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
  OPENED: { label: 'Opened', bgColor: 'bg-indigo-100', textColor: 'text-indigo-700' },
  REPLIED: { label: 'Replied', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
  ACCEPTED: { label: 'Accepted', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
  LOST: { label: 'Lost', bgColor: 'bg-rose-100', textColor: 'text-rose-700' },
  EXPIRED: { label: 'Expired', bgColor: 'bg-amber-100', textColor: 'text-amber-700' },
}

export const ENQUIRY_SOURCE_CONFIG: Record<string, { label: string }> = {
  PHONE: { label: 'Phone' },
  EMAIL: { label: 'Email' },
  WEBSITE: { label: 'Website' },
  REFERRAL: { label: 'Referral' },
  SOCIAL_MEDIA: { label: 'Social Media' },
  WALK_IN: { label: 'Walk In' },
  OTHER: { label: 'Other' },
}

export const ENQUIRY_STATUS_CONFIG: Record<string, { label: string; bgColor: string; textColor: string }> = {
  NEW: { label: 'New', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
  CONTACTED: { label: 'Contacted', bgColor: 'bg-amber-100', textColor: 'text-amber-700' },
  QUOTED: { label: 'Quoted', bgColor: 'bg-indigo-100', textColor: 'text-indigo-700' },
  CLOSED: { label: 'Closed', bgColor: 'bg-slate-100', textColor: 'text-slate-600' },
}

export const THEME_PRESETS = [
  { name: 'Indigo', color: '#6366f1' },
  { name: 'Blue', color: '#3b82f6' },
  { name: 'Emerald', color: '#10b981' },
  { name: 'Amber', color: '#f59e0b' },
  { name: 'Rose', color: '#f43f5e' },
  { name: 'Slate', color: '#475569' },
]
