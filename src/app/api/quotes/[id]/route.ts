import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest, { params: _params }: { params: { id: string } }) {
  return NextResponse.json({ quote: null })
}

export async function PATCH(request: NextRequest, { params: _params }: { params: { id: string } }) {
  await request.json()
  return NextResponse.json({ success: true })
}

export async function DELETE(_request: NextRequest, { params: _params }: { params: { id: string } }) {
  return NextResponse.json({ success: true })
}
