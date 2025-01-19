import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.cookies.has('auth.token')

  if (token) {
    return NextResponse.redirect(new URL('/', req.url), {
      headers: {
        'Set-Cookie': 'auth.token=; Path=/; max-age=0',
      },
    })
  }

  return NextResponse.redirect(new URL('/', req.url))
}
