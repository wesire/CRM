import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json()
  const { status, reason } = body
  // TODO: Update quote status in database
  return NextResponse.json({ success: true, status })
}
