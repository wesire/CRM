interface QuoteBrandingProps {
  accentColor: string
  children: React.ReactNode
}

export function QuoteBranding({ accentColor, children }: QuoteBrandingProps) {
  return (
    <>
      <style>{`
        :root { --accent: ${accentColor}; }
        .accent-bg { background-color: ${accentColor}; }
        .accent-text { color: ${accentColor}; }
        .accent-border { border-color: ${accentColor}; }
        .accent-bg-light { background-color: ${accentColor}18; }
      `}</style>
      {children}
    </>
  )
}
