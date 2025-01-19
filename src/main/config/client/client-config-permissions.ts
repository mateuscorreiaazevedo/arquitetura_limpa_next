import { clientConfigExternalAdminPermissions } from './client-config-external-admin-permissions'
import { clientConfigExternalManagerPermissions } from './client-config-external-manager-permissions'
import { clientConfigInternalAdminPermissions } from './client-config-internal-admin-permissions'
import { clientConfigInternalEmployeePermissions } from './client-config-internal-employee-permissions'
import { clientConfigInternalManagerPermissions } from './client-config-internal-manager-permissions'

export enum AccessLevelEnum {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  MANAGER = 'MANAGER',
}

export enum AccessRoleEnum {
  EXTERNAL = 'EXTERNAL',
  INTERNAL = 'INTERNAL',
}

export const clientConfigPermissions: ClientConfigPermission = {
  [AccessRoleEnum.EXTERNAL]: {
    [AccessLevelEnum.ADMIN]: clientConfigExternalAdminPermissions,
    [AccessLevelEnum.MANAGER]: clientConfigExternalManagerPermissions,
    [AccessLevelEnum.EMPLOYEE]: [],
  },
  [AccessRoleEnum.INTERNAL]: {
    [AccessLevelEnum.ADMIN]: clientConfigInternalAdminPermissions,
    [AccessLevelEnum.EMPLOYEE]: clientConfigInternalEmployeePermissions,
    [AccessLevelEnum.MANAGER]: clientConfigInternalManagerPermissions,
  },
}
