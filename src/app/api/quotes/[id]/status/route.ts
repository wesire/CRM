import { NextResponse } from 'next/server'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  return NextResponse.json({ success: true, quoteId: params.id, status: body.status, updatedAt: new Date() })
}
