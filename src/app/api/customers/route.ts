import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  // TODO: Fetch from database with auth check
  return NextResponse.json({ customers: [], total: 0 })
}

export async function POST(request: NextRequest) {
  await request.json()
  // TODO: Create customer in database
  return NextResponse.json({ success: true, id: 'new-customer-id' }, { status: 201 })
}
