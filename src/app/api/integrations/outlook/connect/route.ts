import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message: "Outlook OAuth would redirect here",
    authUrl: "https://login.microsoftonline.com/oauth2/v2.0/authorize?...",
    note: "This is a stub — real OAuth integration coming soon",
  })
}
