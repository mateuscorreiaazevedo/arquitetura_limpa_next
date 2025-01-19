import { env } from '@/main/config/env'
import dayjs from 'dayjs'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = new URLSearchParams(req.nextUrl.search)
  const ssoToken = searchParams.get('sso')

  const redirectToLogin = NextResponse.redirect(env.redirectToLogin)

  if (!ssoToken) {
    return redirectToLogin
  }

  return NextResponse.redirect(new URL('/', req.url), {
    headers: {
      'Set-Cookie': `auth.token=${ssoToken}; Path=/; Expires=${dayjs().add(1, 'day').toDate()}; HttpOnly`,
    },
  })
}
