import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ quotes: [], total: 0 })
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ quote: { id: 'new', ...body, createdAt: new Date(), updatedAt: new Date() } }, { status: 201 })
}
