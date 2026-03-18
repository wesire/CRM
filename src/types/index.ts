// Enums matching Prisma schema
export type QuoteStatus = 'DRAFT' | 'SENT' | 'OPENED' | 'REPLIED' | 'ACCEPTED' | 'LOST' | 'EXPIRED'
export type EnquiryStatus = 'NEW' | 'CONTACTED' | 'QUOTED' | 'CLOSED'
export type EnquirySource = 'PHONE' | 'EMAIL' | 'WEBSITE' | 'REFERRAL' | 'SOCIAL_MEDIA' | 'WALK_IN' | 'OTHER'
export type ActivityType =
  | 'ENQUIRY_CREATED'
  | 'ENQUIRY_UPDATED'
  | 'QUOTE_CREATED'
  | 'QUOTE_SENT'
  | 'QUOTE_OPENED'
  | 'QUOTE_REPLIED'
  | 'QUOTE_ACCEPTED'
  | 'QUOTE_LOST'
  | 'QUOTE_EXPIRED'
  | 'QUOTE_UPDATED'
  | 'FOLLOW_UP_SCHEDULED'
  | 'FOLLOW_UP_COMPLETED'
  | 'EMAIL_SENT'
  | 'EMAIL_RECEIVED'
  | 'NOTE_ADDED'
  | 'CUSTOMER_CREATED'
export type FollowUpStatus = 'PENDING' | 'COMPLETED' | 'SKIPPED' | 'OVERDUE'

// Core entity types
export interface User {
  id: string
  name: string
  email: string
  emailVerified?: Date | null
  image?: string | null
  businessName?: string | null
  phone?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface UserSettings {
  id: string
  userId: string
  businessName?: string | null
  businessEmail?: string | null
  businessPhone?: string | null
  businessAddress?: string | null
  logoUrl?: string | null
  accentColor: string
  quotePrefix: string
  quoteNextNumber: number
  currency: string
  taxRate: number
  taxLabel: string
  followUpDays: number
  quoteExpiryDays: number
  createdAt: Date
  updatedAt: Date
}

export interface Customer {
  id: string
  userId: string
  name: string
  email?: string | null
  phone?: string | null
  company?: string | null
  address?: string | null
  postcode?: string | null
  notes?: string | null
  createdAt: Date
  updatedAt: Date
  _count?: {
    quotes: number
    enquiries: number
  }
}

export interface Enquiry {
  id: string
  userId: string
  customerId?: string | null
  customer?: Customer | null
  title: string
  description?: string | null
  source: EnquirySource
  status: EnquiryStatus
  contactName?: string | null
  contactEmail?: string | null
  contactPhone?: string | null
  quoteId?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface QuoteLineItem {
  id: string
  quoteId: string
  description: string
  quantity: number
  unitPrice: number
  total: number
  optional: boolean
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}

export interface Quote {
  id: string
  userId: string
  customerId: string
  customer?: Customer
  quoteNumber: string
  title: string
  description?: string | null
  status: QuoteStatus
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
  validUntil?: Date | null
  sentAt?: Date | null
  openedAt?: Date | null
  repliedAt?: Date | null
  acceptedAt?: Date | null
  lostAt?: Date | null
  lostReason?: string | null
  wonReason?: string | null
  customerNote?: string | null
  internalNote?: string | null
  publicToken: string
  createdAt: Date
  updatedAt: Date
  lineItems?: QuoteLineItem[]
  enquiry?: Enquiry | null
}

export interface Activity {
  id: string
  userId: string
  customerId?: string | null
  customer?: Customer | null
  quoteId?: string | null
  quote?: Quote | null
  type: ActivityType
  title: string
  description?: string | null
  metadata?: Record<string, unknown> | null
  createdAt: Date
}

export interface FollowUp {
  id: string
  userId: string
  quoteId: string
  quote?: Quote
  status: FollowUpStatus
  dueDate: Date
  note?: string | null
  completedAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

// UI-specific types
export interface StatCardData {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

export interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}
