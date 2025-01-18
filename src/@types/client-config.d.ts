declare type AccessRoleType = 'ADMIN' | 'EMPLOYEE' | 'MANAGER'
declare type CreationRoleUserType = 'EXTERNAL' | 'INTERNAL'

declare type ClientConfigPermission = Record<CreationRoleUserType, Record<AccessRoleType, string[]>>

// @param key: key of translation in i18n for example: sidebar.menu.dashboard
// @param path: path of the route for example: /dashboard or /settings
declare interface ClientConfigSidebarOption {
  key: string
  path: string
}

declare type ValidationLoggedUserRoles = Record<CreationRoleUserType, Record<AccessRoleType, string>>
