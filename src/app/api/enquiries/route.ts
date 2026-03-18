import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ enquiries: [], total: 0 })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json({ success: true, id: 'new-enquiry-id' }, { status: 201 })
}
