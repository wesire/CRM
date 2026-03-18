import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()

  return NextResponse.json({
    draft: `Hi there,\n\nI just wanted to follow up on the quote I sent recently. Have you had a chance to review it?\n\nPlease don't hesitate to get in touch if you have any questions.\n\nBest regards`,
    context: body.quoteId,
  })
}
