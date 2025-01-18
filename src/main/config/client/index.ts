import { clientConfigAdminPermissions } from './client-config-admin'
import { clientConfigManagerPermissions, clientConfigManagerSidebarMenuOptions } from './client-config-manager'
import { clientConfigUserPermissions } from './client-config-user'

export const AccessRole = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager',
} as const

export const clientConfigPermissions: ClientConfigPermission = {
  [AccessRole.ADMIN]: clientConfigAdminPermissions,
  [AccessRole.MANAGER]: clientConfigManagerPermissions,
  [AccessRole.USER]: clientConfigUserPermissions,
}

export const sidebarMenuOptions: Record<AccessRoleType, ClientConfigSidebarOption[]> = {
  [AccessRole.ADMIN]: [],
  [AccessRole.MANAGER]: clientConfigManagerSidebarMenuOptions,
  [AccessRole.USER]: [],
}
