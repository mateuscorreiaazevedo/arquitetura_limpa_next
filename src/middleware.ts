import { type NextRequest, NextResponse } from 'next/server'
import {
  AccessRoleEnum,
  CreationRoleUserEnum,
  clientConfig,
  validateToRouteIsAllowedInClientConfigPermissions,
} from './main/config/client'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const _token = req.cookies.get('auth.token')?.value
  // biome-ignore lint/style/useConst: <explanation>
  let accessRole: AccessRoleEnum | undefined
  // biome-ignore lint/style/useConst: <explanation>
  let userRole: CreationRoleUserEnum | undefined

  if (['/login', '/register'].includes(pathname)) {
    return NextResponse.next()
  }

  // try {
  //   const payload = token ? JSON.parse(atob(token.split('.')[1])) : undefined
  //   userRole = (payload?.levelUserRole as CreationRoleUserEnum) || undefined
  //   accessRole = (payload?.levelAccessRole as AccessRoleEnum) || undefined
  // } catch (_e) {
  //   throw new Error('Error decoding token')
  // }

  accessRole = AccessRoleEnum.MANAGER
  userRole = CreationRoleUserEnum.EXTERNAL

  if (!accessRole || !userRole) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const allowedRoutes = clientConfig[userRole][accessRole] || []
  const routeAllowed = validateToRouteIsAllowedInClientConfigPermissions(pathname, allowedRoutes)

  if (!routeAllowed) {
    return NextResponse.redirect(new URL('/not-found', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
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
