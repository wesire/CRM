/* eslint-disable @next/next/no-img-element */
interface QuoteBrandingProps {
  businessName: string
  phone?: string
  email?: string
  logoUrl?: string
  accentColor: string
}

export function QuoteBranding({ businessName, phone, email, logoUrl, accentColor }: QuoteBrandingProps) {
  return (
    <header className="w-full py-4 px-6" style={{ backgroundColor: accentColor }}>
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {logoUrl ? (
            <img src={logoUrl} alt={businessName} className="h-8 w-8 rounded-lg object-cover" />
          ) : (
            <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">
                {businessName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <span className="text-white font-semibold">{businessName}</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-white/80 text-sm">
          {phone && <span>{phone}</span>}
          {email && <span>{email}</span>}
        </div>
      </div>
    </header>
  )
}
