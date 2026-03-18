import { Plus, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/shared/page-header'
import { EmptyState } from '@/components/shared/empty-state'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { QuoteCard } from '@/components/quotes/quote-card'
import { Quote } from '@/types'

const PLACEHOLDER_QUOTES: Quote[] = [
  {
    id: '1',
    userId: 'user1',
    customerId: 'c1',
    customer: { id: 'c1', userId: 'user1', name: 'Sarah Thompson', email: 'sarah@email.com', createdAt: new Date(), updatedAt: new Date() },
    quoteNumber: 'QF-1024',
    title: 'Bathroom renovation — full plumbing',
    status: 'ACCEPTED',
    subtotal: 2875,
    taxRate: 20,
    taxAmount: 575,
    total: 3450,
    validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    publicToken: 'tok1',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    updatedAt: new Date(),
  },
  {
    id: '2',
    userId: 'user1',
    customerId: 'c2',
    customer: { id: 'c2', userId: 'user1', name: 'Mark Davis', email: 'mark@email.com', createdAt: new Date(), updatedAt: new Date() },
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
    id: '3',
    userId: 'user1',
    customerId: 'c3',
    customer: { id: 'c3', userId: 'user1', name: 'Robert Clarke', createdAt: new Date(), updatedAt: new Date() },
    quoteNumber: 'QF-1022',
    title: 'Central heating service',
    status: 'SENT',
    subtotal: 183.33,
    taxRate: 20,
    taxAmount: 36.67,
    total: 220,
    validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20),
    publicToken: 'tok3',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
    updatedAt: new Date(),
  },
  {
    id: '4',
    userId: 'user1',
    customerId: 'c4',
    customer: { id: 'c4', userId: 'user1', name: 'Emma Wilson', createdAt: new Date(), updatedAt: new Date() },
    quoteNumber: 'QF-1021',
    title: 'Boiler replacement — Ideal Logic 24kW',
    status: 'DRAFT',
    subtotal: 2083.33,
    taxRate: 20,
    taxAmount: 416.67,
    total: 2500,
    publicToken: 'tok4',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    updatedAt: new Date(),
  },
  {
    id: '5',
    userId: 'user1',
    customerId: 'c5',
    customer: { id: 'c5', userId: 'user1', name: 'Patricia Moore', createdAt: new Date(), updatedAt: new Date() },
    quoteNumber: 'QF-1019',
    title: 'Emergency leak repair',
    status: 'LOST',
    subtotal: 175,
    taxRate: 20,
    taxAmount: 35,
    total: 210,
    lostReason: 'Went with cheaper quote',
    publicToken: 'tok5',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    updatedAt: new Date(),
  },
]

const STATUS_FILTERS = ['All', 'Draft', 'Sent', 'Opened', 'Accepted', 'Lost']

export default function QuotesPage() {
  const quotes = PLACEHOLDER_QUOTES

  return (
    <div className="space-y-6 animate-slideUp">
      <PageHeader
        title="Quotes"
        subtitle={`${quotes.length} total quotes`}
      >
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Quote
        </Button>
      </PageHeader>

      <Tabs defaultValue="All">
        <TabsList className="flex-wrap h-auto gap-1">
          {STATUS_FILTERS.map((status) => (
            <TabsTrigger key={status} value={status}>
              {status}
            </TabsTrigger>
          ))}
        </TabsList>

        {STATUS_FILTERS.map((status) => {
          const filtered =
            status === 'All'
              ? quotes
              : quotes.filter(
                  (q) => q.status === status.toUpperCase()
                )

          return (
            <TabsContent key={status} value={status}>
              {filtered.length === 0 ? (
                <EmptyState
                  icon={FileText}
                  title={`No ${status.toLowerCase()} quotes`}
                  description="Quotes in this status will appear here."
                  actionLabel="Create Quote"
                  actionHref="/quotes/new"
                />
              ) : (
                <div className="grid gap-3 mt-2">
                  {filtered.map((quote) => (
                    <QuoteCard key={quote.id} quote={quote} />
                  ))}
                </div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
