import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  return NextResponse.json(
    {
      id: `enq_${Date.now()}`,
      ...body,
      status: "NEW",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    { status: 201 }
  )
}

export async function GET() {
  return NextResponse.json({ enquiries: [], total: 0 })
}
