import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ followUps: [], total: 0 })
}

export async function POST(request: NextRequest) {
  await request.json()
  return NextResponse.json({ success: true, id: 'new-followup-id' }, { status: 201 })
}
