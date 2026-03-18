'use client'

import { useState } from 'react'
import { Calendar, Shield } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { LineItemsDisplay } from './line-items-display'
import { OptionalExtras } from './optional-extras'
import { AcceptanceForm } from './acceptance-form'
import { QuoteBranding } from './quote-branding'
import { formatCurrency, formatDate } from '@/lib/utils'

interface LineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
  optional: boolean
}

interface PublicQuoteViewProps {
  quote: {
    quoteNumber: string
    title: string
    description?: string | null
    customerNote?: string | null
    subtotal: number
    taxRate: number
    taxAmount: number
    total: number
    validUntil?: Date | null
    lineItems?: LineItem[]
    customer?: { name: string } | null
  }
  business: {
    name: string
    phone?: string
    email?: string
    accentColor: string
  }
}

export function PublicQuoteView({ quote, business }: PublicQuoteViewProps) {
  const [extrasTotal, setExtrasTotal] = useState(0)
  const optionalItems = quote.lineItems?.filter((i) => i.optional) ?? []
  const grandTotal = quote.total + extrasTotal

  return (
    <QuoteBranding accentColor={business.accentColor}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="w-full py-4 px-6 accent-bg">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {business.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="text-white font-semibold">{business.name}</span>
            </div>
            {business.phone && (
              <div className="text-white/80 text-sm hidden sm:block">{business.phone}</div>
            )}
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
          {/* Quote intro */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-gray-400 mb-1">{quote.quoteNumber}</p>
                <h1 className="text-xl font-bold text-gray-900">{quote.title}</h1>
                {quote.customer && (
                  <p className="text-gray-500 text-sm mt-1">For {quote.customer.name}</p>
                )}
              </div>
              <div className="rounded-xl px-4 py-2 text-right shrink-0 accent-bg-light">
                <p className="text-xs font-medium accent-text">Total</p>
                <p className="text-2xl font-bold accent-text">{formatCurrency(grandTotal)}</p>
              </div>
            </div>

            {quote.customerNote && (
              <div className="mt-4 p-4 rounded-xl text-sm leading-relaxed accent-bg-light text-gray-700">
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
            <LineItemsDisplay items={quote.lineItems ?? []} accentColor={business.accentColor} />
            {optionalItems.length > 0 && (
              <OptionalExtras
                items={optionalItems}
                accentColor={business.accentColor}
                onTotalChange={setExtrasTotal}
              />
            )}
            <div className="border-t border-gray-100 px-6 py-4 space-y-2 bg-gray-50">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(quote.subtotal)}</span>
              </div>
              {extrasTotal > 0 && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Optional extras</span>
                  <span>+{formatCurrency(extrasTotal)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-600">
                <span>VAT ({quote.taxRate}%)</span>
                <span>{formatCurrency(quote.taxAmount)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-gray-900 text-lg">
                <span>Total</span>
                <span className="accent-text">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Acceptance */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <AcceptanceForm accentColor={business.accentColor} />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pb-4">
            <Shield className="h-3.5 w-3.5" />
            <span>Powered by Quote Flow · Your response is secure</span>
          </div>
        </main>
      </div>
    </QuoteBranding>
  )
}
