import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  return NextResponse.json(
    {
      id: `cust_${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    { status: 201 }
  )
}

export async function GET() {
  return NextResponse.json({ customers: [], total: 0 })
}
