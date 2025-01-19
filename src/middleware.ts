import { type NextRequest, NextResponse } from 'next/server'
import { ClientConfig } from './main/config/client'

export function middleware(req: NextRequest) {
  const clientConfig = new ClientConfig(req)

  const localeConfig = clientConfig.settingLocale()
  if (localeConfig instanceof NextResponse) {
    return localeConfig
  }

  const validateUserAccessRolesConfig = clientConfig.validateUserAccessRoles()
  if (validateUserAccessRolesConfig instanceof NextResponse) {
    return validateUserAccessRolesConfig
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
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
