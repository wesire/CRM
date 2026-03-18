import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // TODO: Redirect to Google OAuth consent screen
  const authUrl = `https://accounts.google.com/o/oauth2/auth?` +
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? '',
      redirect_uri: `${process.env.NEXT_PUBLIC_URL}/api/integrations/gmail/callback`,
      scope: 'https://www.googleapis.com/auth/gmail.readonly',
      response_type: 'code',
      access_type: 'offline',
    }).toString()

  return NextResponse.redirect(authUrl)
}
