import { PublicQuoteView } from '@/components/quote-page/public-quote-view'

const PLACEHOLDER_QUOTE = {
  quoteNumber: 'QF-1023',
  title: 'Kitchen Plumbing Repairs',
  description:
    'Full kitchen plumbing repair including replacement of stop tap, new flexi pipes to sink and dishwasher, and fixing slow-draining waste pipe. All work is guaranteed for 12 months.',
  subtotal: 566.67,
  taxRate: 20,
  taxAmount: 113.33,
  total: 680,
  validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20),
  customerNote:
    'Thanks for getting in touch, Mark. Please review the quote below and accept or get in touch if you have any questions.',
  customer: { name: 'Mark Davis' },
  lineItems: [
    { id: 'li1', description: 'Labour — 4 hours @ £65/hr', quantity: 4, unitPrice: 65, total: 260, optional: false },
    { id: 'li2', description: 'Replacement stop tap (15mm)', quantity: 1, unitPrice: 28, total: 28, optional: false },
    { id: 'li3', description: 'Flexi hose set (pair)', quantity: 2, unitPrice: 12, total: 24, optional: false },
    { id: 'li4', description: 'Waste pipe repair kit', quantity: 1, unitPrice: 18.67, total: 18.67, optional: false },
    { id: 'li5', description: 'Materials and consumables', quantity: 1, unitPrice: 15, total: 15, optional: false },
    { id: 'li6', description: 'Inline water filter upgrade (optional extra)', quantity: 1, unitPrice: 221, total: 221, optional: true },
  ],
}

const BUSINESS = {
  name: 'Mitchell Plumbing and Heating',
  phone: '07700 900000',
  email: 'james@mitchellplumbing.co.uk',
  accentColor: '#6366f1',
}

export default function PublicQuotePage({ params }: { params: { token: string } }) {
  void params
  return <PublicQuoteView quote={PLACEHOLDER_QUOTE} business={BUSINESS} />
}
