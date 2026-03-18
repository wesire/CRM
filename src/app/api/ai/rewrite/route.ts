import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { text, style } = await request.json()
  // Stub — in production this would call OpenAI
  const prefixes: Record<string, string> = {
    shorter: '[Shorter] ',
    professional: '[Professional] ',
    friendlier: '[Friendly] ',
    persuasive: '[Persuasive] ',
  }
  return NextResponse.json({
    result: `${prefixes[style] ?? ''}${text}`,
  })
}
