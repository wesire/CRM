import { Quote } from "@/types"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Calendar, Shield } from "lucide-react"

interface BusinessSettings {
  name: string
  phone: string
  email: string
  accentColor: string
}

interface PublicQuoteViewProps {
  quote: Quote
  business: BusinessSettings
}

export function PublicQuoteView({ quote, business }: PublicQuoteViewProps) {
  const requiredItems = quote.lineItems?.filter((li) => !li.optional) ?? []

  return (
    <div className="space-y-6">
      {/* Quote intro */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-slate-400 mb-1">{quote.quoteNumber}</p>
            <h1 className="text-xl font-bold text-slate-900">{quote.title}</h1>
            <p className="text-slate-500 text-sm mt-1">For {quote.customer?.name}</p>
          </div>
          <div
            className="rounded-xl px-4 py-2 text-right shrink-0"
            style={{ backgroundColor: `${business.accentColor}15` }}
          >
            <p className="text-xs font-medium" style={{ color: business.accentColor }}>Total</p>
            <p className="text-2xl font-bold" style={{ color: business.accentColor }}>
              {formatCurrency(quote.total)}
            </p>
          </div>
        </div>

        {quote.customerNote && (
          <div className="mt-4 p-4 rounded-xl bg-slate-50 text-sm text-slate-700 leading-relaxed">
            {quote.customerNote}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
          {quote.createdAt && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Sent {formatDate(quote.createdAt)}
            </span>
          )}
          {quote.validUntil && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Valid until {formatDate(quote.validUntil)}
            </span>
          )}
        </div>
      </div>

      {/* Line items */}
      {requiredItems.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">What&apos;s included</h2>
          <div className="space-y-3">
            {requiredItems.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{item.description}</p>
                  {item.quantity !== 1 && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      {item.quantity} × {formatCurrency(item.unitPrice)}
                    </p>
                  )}
                </div>
                <p className="text-sm font-semibold text-slate-900 shrink-0">
                  {formatCurrency(item.total)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 space-y-1">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>{formatCurrency(quote.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>VAT ({quote.taxRate}%)</span>
              <span>{formatCurrency(quote.taxAmount)}</span>
            </div>
            <div className="flex justify-between font-bold text-slate-900 text-base pt-1">
              <span>Total</span>
              <span>{formatCurrency(quote.total)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Guarantee */}
      <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50">
        <Shield className="h-5 w-5 text-slate-400 shrink-0" />
        <p className="text-xs text-slate-600">
          All work is fully guaranteed. If you have any questions, please don&apos;t hesitate to get in touch.
        </p>
      </div>
    </div>
  )
}
