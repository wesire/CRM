import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ quote: { id: params.id } })
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  return NextResponse.json({ quote: { id: params.id, ...body, updatedAt: new Date() } })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ success: true, id: params.id })
}
