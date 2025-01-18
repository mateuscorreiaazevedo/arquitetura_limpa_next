import dayjs from 'dayjs'
import { type NextRequest, NextResponse } from 'next/server'
import {
  type AccessRoleEnum,
  type CreationRoleUserEnum,
  clientConfigPermissions,
  validateToLoggedUserRoles,
  validateToRouteIsAllowedInClientConfigPermissions,
} from './main/config/client'

const publicRoutes: string[] = ['/login', '/signup']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const searchParams = new URLSearchParams(req.nextUrl.search)

  const ssoToken = searchParams.get('sso')
  const lang = searchParams.get('lang')
  const locale = req.cookies.get('locale')?.value
  let modified = false

  const response = NextResponse.next()

  if (lang) {
    response.cookies.set({
      name: 'locale',
      value: lang,
      path: '/',
      expires: dayjs().add(1, 'year').toDate(),
    })
    searchParams.delete('lang')

    modified = true
  }

  if (!lang && !locale) {
    response.cookies.set({
      name: 'locale',
      value: 'pt-BR',
      path: '/',
      expires: dayjs().add(1, 'year').toDate(),
    })

    modified = true
  }

  if (modified) {
    const nextResponse = NextResponse.redirect(new URL(pathname, req.url))
    response.cookies.getAll().forEach(cookie => {
      nextResponse.cookies.set(cookie)
    })

    return nextResponse
  }

  const authToken = req.cookies.get('auth.token')?.value
  let accessLevel: AccessRoleEnum | undefined
  let accessRole: CreationRoleUserEnum | undefined

  if (publicRoutes.includes(pathname) && (!authToken || !ssoToken)) {
    return response
  }

  if (ssoToken && !authToken) {
    return NextResponse.redirect(new URL(`/api/auth?sso=${ssoToken}`, req.url))
  }

  const redirectToLogin = NextResponse.redirect(new URL('/login', req.url))

  if (authToken) {
    const payload = authToken ? JSON.parse(atob(authToken)) : undefined
    accessLevel = (payload?.levelAccessRole as AccessRoleEnum) || undefined
    accessRole = (payload?.levelUserRole as CreationRoleUserEnum) || undefined
  } else {
    if (publicRoutes.includes(pathname)) {
      return response
    }
    return redirectToLogin
  }

  if (!accessLevel || !accessRole) {
    return redirectToLogin
  }

  const allowedRoutes = clientConfigPermissions[accessRole][accessLevel] || []
  const routeAllowed = validateToRouteIsAllowedInClientConfigPermissions(pathname, allowedRoutes)
  const redirectDashboardByTypeOfUserAccess = validateToLoggedUserRoles(accessRole, accessLevel)

  if ([...publicRoutes, '/'].includes(pathname)) {
    return NextResponse.redirect(new URL(redirectDashboardByTypeOfUserAccess, req.url))
  }

  if (!routeAllowed) {
    return NextResponse.redirect(new URL('/not-found', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard/admin',
    '/profiles',
    '/reports',
    '/settings',
    '/registrations/employees',
    '/registrations/turns',
    '/registrations/positions',
    '/registrations/departments',
    '/registrations/teams',
    '/registrations/work-locations',
    '/registrations/cost-centers',
    '/registrations/punch-in',
    '/registrations/business-units',
    '/point-management',
    '/notifications',
    '/dashboard/employee',
    '/profile:employeeId',
    '/reports',
  ],
}
