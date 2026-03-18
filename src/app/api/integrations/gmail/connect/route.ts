import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({
    authUrl: `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/api/integrations/gmail/callback`,
  })
}
