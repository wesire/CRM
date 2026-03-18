import { NextRequest, NextResponse } from "next/server"

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({
    id: params.id,
    status: "SENT",
    sentAt: new Date().toISOString(),
    message: "Quote marked as sent successfully",
  })
}
