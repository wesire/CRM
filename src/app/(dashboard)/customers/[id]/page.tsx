import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { QuoteCard } from '@/components/quotes/quote-card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'
import { Customer, Quote, Activity } from '@/types'

const PLACEHOLDER_CUSTOMER: Customer = {
  id: 'c2',
  userId: 'user1',
  name: 'Mark Davis',
  email: 'mark.davis@email.com',
  phone: '07700 900002',
  address: '14 Clifton Road, Bristol',
  postcode: 'BS8 1AA',
  notes: 'Reliable payer. Has a large Victorian house with older pipework. Likes to be kept informed.',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
  updatedAt: new Date(),
  _count: { quotes: 2, enquiries: 1 },
}

const PLACEHOLDER_QUOTES: Quote[] = [
  {
    id: '2',
    userId: 'user1',
    customerId: 'c2',
    quoteNumber: 'QF-1023',
    title: 'Kitchen plumbing repairs',
    status: 'OPENED',
    subtotal: 566.67,
    taxRate: 20,
    taxAmount: 113.33,
    total: 680,
    publicToken: 'tok2',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    updatedAt: new Date(),
  },
  {
    id: '6',
    userId: 'user1',
    customerId: 'c2',
    quoteNumber: 'QF-1010',
    title: 'Annual boiler service',
    status: 'ACCEPTED',
    subtotal: 108.33,
    taxRate: 20,
    taxAmount: 21.67,
    total: 130,
    publicToken: 'tok6',
    acceptedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    updatedAt: new Date(),
  },
]

const PLACEHOLDER_ACTIVITIES: Activity[] = [
  { id: 'a1', userId: 'u1', customerId: 'c2', quoteId: '2', type: 'QUOTE_OPENED', title: 'Opened quote QF-1023', description: 'Mark viewed the kitchen plumbing quote', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  { id: 'a2', userId: 'u1', customerId: 'c2', quoteId: '2', type: 'QUOTE_SENT', title: 'Quote QF-1023 sent', description: 'Sent via email', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) },
  { id: 'a3', userId: 'u1', customerId: 'c2', quoteId: '6', type: 'QUOTE_ACCEPTED', title: 'Quote QF-1010 accepted', description: 'Annual boiler service accepted', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) },
  { id: 'a4', userId: 'u1', customerId: 'c2', type: 'CUSTOMER_CREATED', title: 'Customer added', description: 'Mark Davis created', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15) },
]

export default function CustomerDetailPage() {
  const customer = PLACEHOLDER_CUSTOMER

  return (
    <div className="space-y-6 animate-slideUp">
      {/* Back nav */}
      <Button variant="ghost" size="sm" asChild className="-ml-2 text-gray-500">
        <Link href="/customers">
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to Customers
        </Link>
      </Button>

      {/* Customer header */}
      <div className="flex items-start gap-4">
        <Avatar className="h-14 w-14 shrink-0">
          <AvatarFallback className="text-lg">{getInitials(customer.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
          {customer.company && <p className="text-gray-500">{customer.company}</p>}
          <div className="flex items-center flex-wrap gap-4 mt-2">
            {customer.email && (
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <Mail className="h-4 w-4" />
                {customer.email}
              </span>
            )}
            {customer.phone && (
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <Phone className="h-4 w-4" />
                {customer.phone}
              </span>
            )}
            {customer.address && (
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                {customer.address}, {customer.postcode}
              </span>
            )}
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-1.5" />
          Edit
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Quotes */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              Quotes ({PLACEHOLDER_QUOTES.length})
            </h2>
            <div className="grid gap-3">
              {PLACEHOLDER_QUOTES.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} />
              ))}
            </div>
          </div>

          {/* Activity */}
          <RecentActivity activities={PLACEHOLDER_ACTIVITIES} />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total quotes</span>
                <span className="font-semibold text-gray-900">{customer._count?.quotes}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total enquiries</span>
                <span className="font-semibold text-gray-900">{customer._count?.enquiries}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Customer since</span>
                <span className="font-semibold text-gray-900">
                  {customer.createdAt.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </CardContent>
          </Card>

          {customer.notes && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">{customer.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
