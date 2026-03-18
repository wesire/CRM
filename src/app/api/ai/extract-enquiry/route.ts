import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { text } = body

  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 })
  }

  // Mock AI extraction
  return NextResponse.json({
    name: "Extracted Customer Name",
    email: "customer@example.com",
    phone: "07700 000000",
    description: text.slice(0, 200),
    suggestedTitle: "Extracted enquiry from email",
  })
}
