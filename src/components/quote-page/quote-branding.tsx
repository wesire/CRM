interface QuoteBrandingProps {
  businessName: string
  phone?: string
  email?: string
  accentColor: string
}

export function QuoteBranding({ businessName, phone, email, accentColor }: QuoteBrandingProps) {
  return (
    <header className="w-full py-4 px-6" style={{ backgroundColor: accentColor }}>
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {businessName.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <span className="text-white font-semibold">{businessName}</span>
        </div>
        <div className="text-white/80 text-sm hidden sm:block">
          {phone || email}
        </div>
      </div>
    </header>
  )
}
