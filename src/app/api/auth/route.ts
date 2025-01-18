import dayjs from 'dayjs'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = new URLSearchParams(req.nextUrl.search)
  const ssoToken = searchParams.get('sso')

  if (!ssoToken) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.redirect(new URL('/', req.url), {
    headers: {
      'Set-Cookie': `auth.token=${ssoToken}; Path=/; Expires=${dayjs().add(1, 'day').toDate()}; HttpOnly`,
    },
  })
}
