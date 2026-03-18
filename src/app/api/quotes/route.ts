import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ quotes: [], total: 0 })
}

export async function POST(request: NextRequest) {
  await request.json()
  return NextResponse.json({ success: true, id: 'new-quote-id' }, { status: 201 })
}
