import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message: "Gmail OAuth would redirect here",
    authUrl: "https://accounts.google.com/oauth2/auth?...",
    note: "This is a stub — real OAuth integration coming soon",
  })
}
