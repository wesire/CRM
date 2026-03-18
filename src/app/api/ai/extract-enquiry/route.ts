import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { text } = await request.json()
  // Stub — in production this would call OpenAI
  return NextResponse.json({
    title: 'Enquiry from email',
    description: text?.substring(0, 200) ?? '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    source: 'EMAIL',
  })
}
