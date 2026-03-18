import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  await request.json()
  // TODO: Use OpenAI to draft follow-up email
  return NextResponse.json({ draft: '' })
}
