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

  const authToken = req.cookies.get('auth.token')?.value
  let accessLevel: AccessRoleEnum | undefined
  let accessRole: CreationRoleUserEnum | undefined

  const redirectToLogin = NextResponse.redirect(new URL('/login', req.url))

  try {
    const payload = authToken ? JSON.parse(atob(authToken)) : undefined
    accessLevel = (payload?.levelAccessRole as AccessRoleEnum) || undefined
    accessRole = (payload?.levelUserRole as CreationRoleUserEnum) || undefined
  } catch (_error) {
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
