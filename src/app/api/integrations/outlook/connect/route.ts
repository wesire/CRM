import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // TODO: Redirect to Microsoft OAuth consent screen
  const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
    new URLSearchParams({
      client_id: process.env.MICROSOFT_CLIENT_ID ?? '',
      redirect_uri: `${process.env.NEXT_PUBLIC_URL}/api/integrations/outlook/callback`,
      scope: 'Mail.Read',
      response_type: 'code',
    }).toString()

  return NextResponse.redirect(authUrl)
}
