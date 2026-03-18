import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json()
  return NextResponse.json({
    id: params.id,
    status: body.status,
    updatedAt: new Date().toISOString(),
    message: `Quote status updated to ${body.status}`,
  })
}
