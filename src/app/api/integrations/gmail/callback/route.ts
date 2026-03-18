import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  if (!code) {
    return NextResponse.redirect(new URL('/settings?error=gmail_auth', request.url))
  }
  // TODO: Exchange code for tokens and save integration
  return NextResponse.redirect(new URL('/settings?connected=gmail', request.url))
}
