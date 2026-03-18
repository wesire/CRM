import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { text, style } = await request.json()
  if (!text || !style) {
    return NextResponse.json({ error: 'text and style are required' }, { status: 400 })
  }
  // TODO: Use OpenAI to rewrite text in given style
  return NextResponse.json({ rewritten: text })
}
