import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest, _context: { params: { id: string } }) {
  const body = await request.json()
  const { status } = body
  // TODO: Update quote status in database (body may also contain 'reason' for LOST status)
  return NextResponse.json({ success: true, status })
}
