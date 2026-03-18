import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json()
  return NextResponse.json({
    id: params.id,
    status: "ACCEPTED",
    acceptedAt: new Date().toISOString(),
    acceptedByName: body.name,
    acceptedByEmail: body.email,
    message: "Quote accepted successfully",
  })
}
