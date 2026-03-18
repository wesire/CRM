import Link from 'next/link'
import {
  ArrowLeft,
  Send,
  Edit,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  StickyNote,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { StatusBadge } from '@/components/quotes/status-badge'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Quote, Activity } from '@/types'

const PLACEHOLDER_QUOTE: Quote = {
  id: '1',
  userId: 'user1',
  customerId: 'c2',
  customer: {
    id: 'c2',
    userId: 'user1',
    name: 'Mark Davis',
    email: 'mark@email.com',
    phone: '07700 900123',
    address: '14 Clifton Road, Bristol',
    postcode: 'BS8 1AA',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  quoteNumber: 'QF-1023',
  title: 'Kitchen plumbing repairs',
  description: 'Full kitchen plumbing repair including replacement of stop tap, new flexi pipes to sink and dishwasher, and fixing slow-draining waste pipe.',
  status: 'OPENED',
  subtotal: 566.67,
  taxRate: 20,
  taxAmount: 113.33,
  total: 680,
  validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20),
  sentAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  openedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  internalNote: 'Customer mentioned they want to proceed quickly — kitchen in use.',
  publicToken: 'tok2',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  updatedAt: new Date(),
  lineItems: [
    { id: 'li1', quoteId: '1', description: 'Labour — 4 hours @ £65/hr', quantity: 4, unitPrice: 65, total: 260, optional: false, selected: true, sortOrder: 0, createdAt: new Date(), updatedAt: new Date() },
    { id: 'li2', quoteId: '1', description: 'Replacement stop tap (15mm)', quantity: 1, unitPrice: 28, total: 28, optional: false, selected: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
    { id: 'li3', quoteId: '1', description: 'Flexi hose set (pair)', quantity: 2, unitPrice: 12, total: 24, optional: false, selected: true, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
    { id: 'li4', quoteId: '1', description: 'Waste pipe repair kit', quantity: 1, unitPrice: 18.67, total: 18.67, optional: false, selected: true, sortOrder: 3, createdAt: new Date(), updatedAt: new Date() },
    { id: 'li5', quoteId: '1', description: 'PTFE tape, jointing compound, consumables', quantity: 1, unitPrice: 15, total: 15, optional: false, selected: true, sortOrder: 4, createdAt: new Date(), updatedAt: new Date() },
    { id: 'li6', quoteId: '1', description: 'Water filter upgrade (optional)', quantity: 1, unitPrice: 221, total: 221, optional: true, selected: false, sortOrder: 5, createdAt: new Date(), updatedAt: new Date() },
  ],
}

const PLACEHOLDER_ACTIVITIES: Activity[] = [
  { id: 'a1', userId: 'u1', quoteId: '1', type: 'QUOTE_OPENED', title: 'Quote viewed by customer', description: 'Mark Davis opened the quote link', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  { id: 'a2', userId: 'u1', quoteId: '1', type: 'QUOTE_SENT', title: 'Quote sent to Mark Davis', description: 'Sent via email to mark@email.com', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) },
  { id: 'a3', userId: 'u1', quoteId: '1', type: 'QUOTE_CREATED', title: 'Quote created', description: 'QF-1023 created from enquiry', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 - 1000 * 60 * 30) },
]

export default function QuoteDetailPage() {
  const quote = PLACEHOLDER_QUOTE
  const requiredItems = quote.lineItems?.filter((li) => !li.optional) ?? []
  const optionalItems = quote.lineItems?.filter((li) => li.optional) ?? []

  return (
    <div className="space-y-6 animate-slideUp">
      {/* Back nav + header */}
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2 text-gray-500">
          <Link href="/quotes">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back to Quotes
          </Link>
        </Button>

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-sm font-mono text-gray-400">{quote.quoteNumber}</span>
              <StatusBadge status={quote.status} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{quote.title}</h1>
            <p className="text-gray-500 mt-1">
              {quote.customer?.name}
              {quote.sentAt && ` · Sent ${formatDate(quote.sentAt)}`}
              {quote.openedAt && ` · Opened ${formatDate(quote.openedAt)}`}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1.5" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Send className="h-4 w-4 mr-1.5" />
              Send
            </Button>
            <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
              <CheckCircle className="h-4 w-4 mr-1.5" />
              Mark Won
            </Button>
            <Button variant="outline" size="sm" className="text-rose-600 hover:bg-rose-50 hover:border-rose-200">
              <XCircle className="h-4 w-4 mr-1.5" />
              Mark Lost
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quote description */}
          {quote.description && (
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-gray-700 leading-relaxed">{quote.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Line items */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Line Items</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Qty</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Unit</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {requiredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-5 py-3 text-gray-900">{item.description}</td>
                      <td className="px-5 py-3 text-right text-gray-600">{item.quantity}</td>
                      <td className="px-5 py-3 text-right text-gray-600">{formatCurrency(item.unitPrice)}</td>
                      <td className="px-5 py-3 text-right font-medium text-gray-900">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                  {optionalItems.length > 0 && (
                    <>
                      <tr>
                        <td colSpan={4} className="px-5 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">
                          Optional Extras
                        </td>
                      </tr>
                      {optionalItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 opacity-70">
                          <td className="px-5 py-3 text-gray-700 italic">{item.description}</td>
                          <td className="px-5 py-3 text-right text-gray-500">{item.quantity}</td>
                          <td className="px-5 py-3 text-right text-gray-500">{formatCurrency(item.unitPrice)}</td>
                          <td className="px-5 py-3 text-right text-gray-600">{formatCurrency(item.total)}</td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>

              {/* Totals */}
              <div className="border-t border-gray-100 px-5 py-4 space-y-1.5">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(quote.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>VAT ({quote.taxRate}%)</span>
                  <span>{formatCurrency(quote.taxAmount)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-lg">{formatCurrency(quote.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity timeline */}
          <RecentActivity activities={PLACEHOLDER_ACTIVITIES} />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Customer info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-semibold text-gray-900">{quote.customer?.name}</p>
              {quote.customer?.email && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  {quote.customer.email}
                </div>
              )}
              {quote.customer?.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  {quote.customer.phone}
                </div>
              )}
              {quote.customer?.address && (
                <div className="flex items-start gap-2 text-sm text-gray-500">
                  <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>{quote.customer.address}, {quote.customer.postcode}</span>
                </div>
              )}
              <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                <Link href={`/customers/${quote.customerId}`}>View Customer</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Dates */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-gray-500">
                  <Calendar className="h-3.5 w-3.5" />
                  Created
                </span>
                <span className="text-gray-900">{formatDate(quote.createdAt)}</span>
              </div>
              {quote.sentAt && (
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <Send className="h-3.5 w-3.5" />
                    Sent
                  </span>
                  <span className="text-gray-900">{formatDate(quote.sentAt)}</span>
                </div>
              )}
              {quote.openedAt && (
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <Clock className="h-3.5 w-3.5" />
                    Opened
                  </span>
                  <span className="text-gray-900">{formatDate(quote.openedAt)}</span>
                </div>
              )}
              {quote.validUntil && (
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <Calendar className="h-3.5 w-3.5" />
                    Valid until
                  </span>
                  <span className="text-gray-900">{formatDate(quote.validUntil)}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Internal note */}
          {quote.internalNote && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-1.5">
                  <StickyNote className="h-4 w-4" />
                  Internal Note
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">{quote.internalNote}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
