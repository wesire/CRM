import { NextResponse } from 'next/server'

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  return NextResponse.json({ success: true, quoteId: params.id, acceptedAt: new Date(), ...body })
}
