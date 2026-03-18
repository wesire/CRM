import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest, _context: { params: { id: string } }) {
  return NextResponse.json({ quote: null })
}

export async function PATCH(request: NextRequest, _context: { params: { id: string } }) {
  await request.json()
  return NextResponse.json({ success: true })
}

export async function DELETE(_request: NextRequest, _context: { params: { id: string } }) {
  return NextResponse.json({ success: true })
}
