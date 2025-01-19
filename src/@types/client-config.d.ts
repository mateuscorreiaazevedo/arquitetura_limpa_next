declare type AccessLevelType = 'ADMIN' | 'EMPLOYEE' | 'MANAGER'
declare type AccessRoleType = 'EXTERNAL' | 'INTERNAL'

declare type ClientConfigPermission = Record<AccessRoleType, Record<AccessLevelType, string[]>>

// @param key: key of translation in i18n for example: sidebar.menu.dashboard
// @param path: path of the route for example: /dashboard or /settings
declare interface ClientConfigSidebarOption {
  key: string
  path: string
}

declare type ValidationLoggedUserRoles = Record<AccessRoleType, Record<AccessLevelType, string>>
