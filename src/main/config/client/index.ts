import { clientConfigExternalAdminPermissions } from './client-config-external-admin-permissions'
import { clientConfigExternalManagerPermissions } from './client-config-external-manager-permissions'
import { clientConfigInternalAdminPermissions } from './client-config-internal-admin-permissions'
import { clientConfigInternalEmployeePermissions } from './client-config-internal-employee-permissions'
import { clientConfigInternalManagerPermissions } from './client-config-internal-manager-permissions'

export enum AccessRoleEnum {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER',
}

export enum CreationRoleUserEnum {
  EXTERNAL = 'EXTERNAL',
  INTERNAL = 'INTERNAL',
}

export const clientConfigPermissions: ClientConfigPermission = {
  [CreationRoleUserEnum.EXTERNAL]: {
    [AccessRoleEnum.ADMIN]: clientConfigExternalAdminPermissions,
    [AccessRoleEnum.MANAGER]: clientConfigExternalManagerPermissions,
    [AccessRoleEnum.EMPLOYEE]: [],
  },
  [CreationRoleUserEnum.INTERNAL]: {
    [AccessRoleEnum.ADMIN]: clientConfigInternalAdminPermissions,
    [AccessRoleEnum.EMPLOYEE]: clientConfigInternalEmployeePermissions,
    [AccessRoleEnum.MANAGER]: clientConfigInternalManagerPermissions,
  },
}

const routeToRegex = (route: string): RegExp => {
  const dynamicRouteRegex = route.replace(/:[^/]+/g, '([^/]+)')

  return new RegExp(`^${dynamicRouteRegex}$`)
}

export function validateToRouteIsAllowedInClientConfigPermissions(pathname: string, allowedRoutes: string[]): boolean {
  return allowedRoutes.some(route => {
    if (route === pathname) {
      return true
    }

    if (route.includes(':')) {
      const routeRegex = routeToRegex(route)

      return routeRegex.test(pathname)
    }

    return false
  })
}

export function validateToLoggedUserRoles(
  creationRole: CreationRoleUserEnum | null,
  accessRole: AccessRoleEnum | null,
): string {
  if (!creationRole || !accessRole) {
    return '/login'
  }

  const validationLoggedUserRoles: ValidationLoggedUserRoles = {
    [CreationRoleUserEnum.EXTERNAL]: {
      [AccessRoleEnum.ADMIN]: '/dashboard/admin',
      [AccessRoleEnum.MANAGER]: '/dashboard/admin',
      [AccessRoleEnum.EMPLOYEE]: '/dashboard/employee',
    },
    [CreationRoleUserEnum.INTERNAL]: {
      [AccessRoleEnum.ADMIN]: '/dashboard/admin',
      [AccessRoleEnum.EMPLOYEE]: '/dashboard/employee',
      [AccessRoleEnum.MANAGER]: '/dashboard/admin',
    },
  }

  return validationLoggedUserRoles[creationRole][accessRole]
}
