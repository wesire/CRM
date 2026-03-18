import { NextRequest, NextResponse } from 'next/server'

export async function POST(_request: NextRequest, { params: _params }: { params: { id: string } }) {
  await _request.json()
  // TODO: Mark quote as accepted, record name/email/signature
  return NextResponse.json({ success: true })
}
