import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { text, style } = body

  if (!text || !style) {
    return NextResponse.json({ error: "Text and style are required" }, { status: 400 })
  }

  return NextResponse.json({
    original: text,
    rewritten: `[Rewritten as ${style}]: ${text}`,
    style,
  })
}
