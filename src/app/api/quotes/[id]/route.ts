import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json()
  return NextResponse.json({
    id: params.id,
    ...body,
    updatedAt: new Date().toISOString(),
  })
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ id: params.id })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ deleted: true, id: params.id })
}
