import { NextRequest, NextResponse } from 'next/server'

export async function POST(_request: NextRequest, _context: { params: { id: string } }) {
  // TODO: Send quote via email and update status to SENT
  return NextResponse.json({ success: true, message: 'Quote sent' })
}
