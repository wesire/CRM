import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { customerId: _customerId, quoteId: _quoteId } = await request.json()
  // TODO: Use OpenAI to summarize customer communication thread
  return NextResponse.json({ summary: '' })
}
