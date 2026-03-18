import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { quoteId } = await request.json()
  // Stub — in production this would call OpenAI
  return NextResponse.json({
    draft: `Hi there,\n\nI just wanted to follow up on the quote I sent over for quote #${quoteId}. Please let me know if you have any questions or if you're ready to go ahead — I'd love to get started!\n\nBest wishes`,
  })
}
