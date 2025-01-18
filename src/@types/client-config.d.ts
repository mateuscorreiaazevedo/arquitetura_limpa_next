declare type AccessRoleType = 'admin' | 'employee' | 'manager'

declare interface ClientConfigPermission {
  [key: AccessRoleType]: string[]
}

// @param key: key of translation in i18n for example: sidebar.menu.dashboard
// @param path: path of the route for example: /dashboard or /settings
declare interface ClientConfigSidebarOption {
  key: string
  path: string
}
