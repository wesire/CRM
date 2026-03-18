import { CheckCircle, XCircle, Calendar, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Quote } from '@/types'

const PLACEHOLDER_QUOTE: Quote = {
  id: '2',
  userId: 'user1',
  customerId: 'c2',
  customer: {
    id: 'c2',
    userId: 'user1',
    name: 'Mark Davis',
    email: 'mark.davis@email.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  quoteNumber: 'QF-1023',
  title: 'Kitchen Plumbing Repairs',
  description:
    'Full kitchen plumbing repair including replacement of stop tap, new flexi pipes to sink and dishwasher, and fixing slow-draining waste pipe. All work is guaranteed for 12 months.',
  status: 'SENT',
  subtotal: 566.67,
  taxRate: 20,
  taxAmount: 113.33,
  total: 680,
  validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20),
  customerNote: 'Thanks for getting in touch, Mark. Please review the quote below and accept or get in touch if you have any questions.',
  publicToken: 'tok2',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  updatedAt: new Date(),
  lineItems: [
    { id: 'li1', quoteId: '2', description: 'Labour — 4 hours @ £65/hr', quantity: 4, unitPrice: 65, total: 260, optional: false, selected: true, sortOrder: 0, createdAt: new Date(), updatedAt: new Date() },
    { id: 'li2', quoteId: '2', description: 'Replacement stop tap (15mm)', quantity: 1, unitPrice: 28, total: 28, optional: false, selected: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
    { id: 'li3', quoteId: '2', description: 'Flexi hose set (pair)', quantity: 2, unitPrice: 12, total: 24, optional: false, selected: true, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
    { id: 'li4', quoteId: '2', description: 'Waste pipe repair kit', quantity: 1, unitPrice: 18.67, total: 18.67, optional: false, selected: true, sortOrder: 3, createdAt: new Date(), updatedAt: new Date() },
    { id: 'li5', quoteId: '2', description: 'Materials & consumables', quantity: 1, unitPrice: 15, total: 15, optional: false, selected: true, sortOrder: 4, createdAt: new Date(), updatedAt: new Date() },
    { id: 'li6', quoteId: '2', description: 'Inline water filter upgrade (optional extra)', quantity: 1, unitPrice: 221, total: 221, optional: true, selected: false, sortOrder: 5, createdAt: new Date(), updatedAt: new Date() },
  ],
}

const BUSINESS = {
  name: 'Mitchell Plumbing & Heating',
  phone: '07700 900000',
  email: 'james@mitchellplumbing.co.uk',
  accentColor: '#6366f1',
}

export default function PublicQuotePage({ params }: { params: { token: string } }) {
  const quote = PLACEHOLDER_QUOTE
  const requiredItems = quote.lineItems?.filter((li) => !li.optional) ?? []
  const optionalItems = quote.lineItems?.filter((li) => li.optional) ?? []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header bar */}
      <header
        className="w-full py-4 px-6"
        style={{ backgroundColor: BUSINESS.accentColor }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-sm">JM</span>
            </div>
            <span className="text-white font-semibold">{BUSINESS.name}</span>
          </div>
          <div className="text-white/80 text-sm hidden sm:block">
            {BUSINESS.phone}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Quote intro card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-gray-400 mb-1">{quote.quoteNumber}</p>
              <h1 className="text-xl font-bold text-gray-900">{quote.title}</h1>
              <p className="text-gray-500 text-sm mt-1">For {quote.customer?.name}</p>
            </div>
            <div
              className="rounded-xl px-4 py-2 text-right shrink-0"
              style={{ backgroundColor: `${BUSINESS.accentColor}15` }}
            >
              <p className="text-xs font-medium" style={{ color: BUSINESS.accentColor }}>
                Total
              </p>
              <p className="text-2xl font-bold" style={{ color: BUSINESS.accentColor }}>
                {formatCurrency(quote.total)}
              </p>
            </div>
          </div>

          {quote.customerNote && (
            <div
              className="mt-4 p-4 rounded-xl text-sm leading-relaxed"
              style={{ backgroundColor: `${BUSINESS.accentColor}10`, color: '#374151' }}
            >
              {quote.customerNote}
            </div>
          )}

          {quote.description && (
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">{quote.description}</p>
          )}

          {quote.validUntil && (
            <div className="flex items-center gap-1.5 mt-4 text-xs text-gray-400">
              <Calendar className="h-3.5 w-3.5" />
              This quote is valid until {formatDate(quote.validUntil)}
            </div>
          )}
        </div>

        {/* Line items */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">What&apos;s included</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {requiredItems.map((item) => (
              <div key={item.id} className="flex items-start justify-between px-6 py-4 gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.description}</p>
                  {item.quantity !== 1 && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.quantity} × {formatCurrency(item.unitPrice)}
                    </p>
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-900 shrink-0">
                  {formatCurrency(item.total)}
                </span>
              </div>
            ))}
          </div>

          {optionalItems.length > 0 && (
            <>
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Optional extras
                </p>
              </div>
              <div className="divide-y divide-gray-50">
                {optionalItems.map((item) => (
                  <div key={item.id} className="flex items-start justify-between px-6 py-4 gap-4 opacity-75">
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{item.description}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Add-on · not included in total above</p>
                    </div>
                    <span className="text-sm text-gray-600 shrink-0">
                      +{formatCurrency(item.total)}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Totals */}
          <div className="border-t border-gray-100 px-6 py-4 space-y-2 bg-gray-50">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(quote.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>VAT ({quote.taxRate}%)</span>
              <span>{formatCurrency(quote.taxAmount)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-gray-900 text-lg">
              <span>Total</span>
              <span style={{ color: BUSINESS.accentColor }}>{formatCurrency(quote.total)}</span>
            </div>
          </div>
        </div>

        {/* Accept / Reject */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Ready to proceed?</h2>
          <p className="text-sm text-gray-500">
            Accepting this quote confirms you&apos;re happy to proceed with the work as described above.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="flex-1"
              style={{ backgroundColor: BUSINESS.accentColor }}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Accept Quote
            </Button>
            <Button variant="outline" className="flex-1 text-rose-600 hover:bg-rose-50 hover:border-rose-200">
              <XCircle className="h-4 w-4 mr-2" />
              Decline
            </Button>
          </div>
        </div>

        {/* Trust footer */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pb-4">
          <Shield className="h-3.5 w-3.5" />
          <span>Powered by Quote Flow · Your response is secure</span>
        </div>
      </main>
    </div>
  )
}
