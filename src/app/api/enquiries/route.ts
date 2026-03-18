import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ enquiries: [], total: 0 })
}

export async function POST(request: NextRequest) {
  await request.json()
  return NextResponse.json({ success: true, id: 'new-enquiry-id' }, { status: 201 })
}
