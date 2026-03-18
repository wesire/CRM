'use client'

import { useState } from 'react'
import { Calendar, Shield } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { QuoteBranding } from './quote-branding'
import { LineItemsDisplay } from './line-items-display'
import { OptionalExtras } from './optional-extras'
import { AcceptanceForm } from './acceptance-form'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Quote } from '@/types'

interface Business {
  name: string
  phone?: string
  email?: string
  logoUrl?: string
  accentColor: string
}

interface PublicQuoteViewProps {
  quote: Quote
  business: Business
}

export function PublicQuoteView({ quote, business }: PublicQuoteViewProps) {
  const [extrasTotal, setExtrasTotal] = useState(0)
  const requiredItems = quote.lineItems?.filter((i) => !i.optional) ?? []
  const optionalItems = quote.lineItems?.filter((i) => i.optional) ?? []
  const extrasTax = extrasTotal * (quote.taxRate / 100)
  const grandTotal = quote.total + extrasTotal + extrasTax

  return (
    <div className="min-h-screen bg-gray-50">
      <QuoteBranding
        businessName={business.name}
        phone={business.phone}
        email={business.email}
        logoUrl={business.logoUrl}
        accentColor={business.accentColor}
      />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Quote intro */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-gray-400 mb-1">{quote.quoteNumber}</p>
              <h1 className="text-xl font-bold text-gray-900">{quote.title}</h1>
              <p className="text-gray-500 text-sm mt-1">For {quote.customer?.name}</p>
            </div>
            <div
              className="rounded-xl px-4 py-2 text-right shrink-0"
              style={{ backgroundColor: `${business.accentColor}15` }}
            >
              <p className="text-xs font-medium" style={{ color: business.accentColor }}>Total</p>
              <p className="text-2xl font-bold" style={{ color: business.accentColor }}>
                {formatCurrency(grandTotal)}
              </p>
            </div>
          </div>

          {quote.customerNote && (
            <div
              className="mt-4 p-4 rounded-xl text-sm leading-relaxed text-gray-700"
              style={{ backgroundColor: `${business.accentColor}10` }}
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
          <LineItemsDisplay items={requiredItems as any} accentColor={business.accentColor} />
          {optionalItems.length > 0 && (
            <OptionalExtras
              items={optionalItems as any}
              accentColor={business.accentColor}
              onSelectionChange={(_, total) => setExtrasTotal(total)}
            />
          )}
          <div className="border-t border-gray-100 px-6 py-4 space-y-2 bg-gray-50">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(quote.subtotal + extrasTotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>VAT ({quote.taxRate}%)</span>
              <span>{formatCurrency(quote.taxAmount + extrasTax)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-gray-900 text-lg">
              <span>Total</span>
              <span style={{ color: business.accentColor }}>{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Acceptance */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <AcceptanceForm accentColor={business.accentColor} />
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
