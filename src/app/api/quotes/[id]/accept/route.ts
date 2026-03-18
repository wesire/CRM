import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, _context: { params: { id: string } }) {
  await request.json()
  // TODO: Mark quote as accepted, record name/email/signature
  return NextResponse.json({ success: true })
}
