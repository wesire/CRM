import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { text } = await request.json()
  if (!text) {
    return NextResponse.json({ error: 'Text is required' }, { status: 400 })
  }
  // TODO: Use OpenAI to extract enquiry details from email text
  return NextResponse.json({
    contactName: null,
    contactEmail: null,
    contactPhone: null,
    title: null,
    description: null,
    source: 'EMAIL',
  })
}
