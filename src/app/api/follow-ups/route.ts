import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  return NextResponse.json(
    {
      id: `fu_${Date.now()}`,
      ...body,
      status: "PENDING",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    { status: 201 }
  )
}

export async function GET() {
  return NextResponse.json({ followUps: [], total: 0 })
}
