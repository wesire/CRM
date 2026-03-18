import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const subtotal = (body.lineItems || []).reduce((sum: number, item: { total: number }) => sum + item.total, 0)
  const taxAmount = subtotal * (body.taxRate || 0.2)
  const total = subtotal + taxAmount

  return NextResponse.json(
    {
      id: `quote_${Date.now()}`,
      quoteNumber: `QF-${1000 + Math.floor(Math.random() * 9000)}`,
      publicToken: `tok_${Date.now()}`,
      ...body,
      subtotal,
      taxAmount,
      total,
      status: "DRAFT",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    { status: 201 }
  )
}

export async function GET() {
  return NextResponse.json({ quotes: [], total: 0 })
}
