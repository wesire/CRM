import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { text } = await request.json()
  // Stub — in production this would call OpenAI
  return NextResponse.json({
    summary: text?.substring(0, 100) ?? 'No summary available.',
  })
}
