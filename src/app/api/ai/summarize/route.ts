import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()

  return NextResponse.json({
    summary: `Summary: ${String(body.content || "").slice(0, 100)}...`,
    keyPoints: ["Point 1", "Point 2", "Point 3"],
  })
}
