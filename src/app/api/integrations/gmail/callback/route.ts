import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")

  return NextResponse.json({
    success: true,
    code,
    message: "Gmail OAuth callback stub — would exchange code for tokens here",
  })
}
