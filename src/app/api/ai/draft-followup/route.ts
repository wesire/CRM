import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { quoteId: _quoteId, context: _context } = await request.json()
  // TODO: Use OpenAI to draft follow-up email
  return NextResponse.json({ draft: '' })
}
