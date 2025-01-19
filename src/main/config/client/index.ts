import dayjs from 'dayjs'
import { type NextRequest, NextResponse } from 'next/server'
import { env } from '../env'
import { AccessLevelEnum, AccessRoleEnum, clientConfigPermissions } from './client-config-permissions'

export class ClientConfig {
  private publicRoutes: string[] = ['/login', '/signup']
  private res: NextResponse
  constructor(private req: NextRequest) {
    this.res = NextResponse.next()
  }

  private transformRouteToRegex(route: string): RegExp {
    const dynamicRouteRegex = route.replace(/:[^/]+/g, '([^/]+)')

    return new RegExp(`^${dynamicRouteRegex}$`)
  }

  private redirectToDashboardByUserRoles(accessRules: AccessRoleEnum, accessLevel: AccessLevelEnum) {
    const redirectionPath: ValidationLoggedUserRoles = {
      [AccessRoleEnum.EXTERNAL]: {
        [AccessLevelEnum.ADMIN]: '/dashboard/admin',
        [AccessLevelEnum.MANAGER]: '/dashboard/admin',
        [AccessLevelEnum.EMPLOYEE]: '/dashboard/employee',
      },
      [AccessRoleEnum.INTERNAL]: {
        [AccessLevelEnum.ADMIN]: '/dashboard/admin',
        [AccessLevelEnum.EMPLOYEE]: '/dashboard/employee',
        [AccessLevelEnum.MANAGER]: '/dashboard/admin',
      },
    }

    return redirectionPath[accessRules][accessLevel]
  }

  private isRouteAllowed(pathname: string, allowedRoutes: string[]): boolean {
    return allowedRoutes.some(route => {
      if (route === pathname) {
        return true
      }

      if (route.includes(':')) {
        const routeRegex = this.transformRouteToRegex(route)

        return routeRegex.test(pathname)
      }

      return false
    })
  }

  settingLocale(): NextResponse | void {
    const { pathname } = this.req.nextUrl
    const searchParams = new URLSearchParams(this.req.nextUrl.search)
    const lang = searchParams.get('lang')
    const locale = this.req.cookies.get('locale')?.value
    let modified = false

    const EXPIRES_COOKIE = dayjs().add(1, 'year').toDate()

    if (lang) {
      this.res.cookies.set({
        name: 'locale',
        value: lang,
        path: '/',
        expires: EXPIRES_COOKIE,
      })
      searchParams.delete('lang')

      modified = true
    }

    if (!lang && !locale) {
      this.res.cookies.set({
        name: 'locale',
        value: 'pt-BR',
        path: '/',
        expires: EXPIRES_COOKIE,
      })

      modified = true
    }

    if (modified) {
      const nextResponse = NextResponse.redirect(new URL(pathname, this.req.url))
      this.res.cookies.getAll().forEach(cookie => {
        nextResponse.cookies.set(cookie)
      })

      return nextResponse
    }
  }

  validateUserAccessRoles(): NextResponse | void {
    const { pathname } = this.req.nextUrl

    const searchParams = new URLSearchParams(this.req.nextUrl.search)

    const ssoToken = searchParams.get('sso')
    const authToken = this.req.cookies.get('auth.token')?.value

    const redirectToLogin = NextResponse.redirect(env.redirectToLogin)

    if (ssoToken) {
      return NextResponse.redirect(new URL(`/api/auth/signin?sso=${ssoToken}`, this.req.url))
    }

    if (this.publicRoutes.includes(pathname) && !authToken) {
      return
    }

    if (!authToken) {
      return redirectToLogin
    }

    const token = JSON.parse(atob(authToken))
    const accessLevel = (token?.accessLevel as AccessLevelEnum) || undefined
    const accessRole = (token?.accessRole as AccessRoleEnum) || undefined

    if (!accessLevel || !accessRole) {
      return redirectToLogin
    }
    const redirectToDashboard = this.redirectToDashboardByUserRoles(accessRole, accessLevel)

    if ([...this.publicRoutes, '/'].includes(pathname)) {
      return NextResponse.redirect(new URL(redirectToDashboard, this.req.url))
    }

    const allowedRoutes = clientConfigPermissions[accessRole][accessLevel] || []
    const isRouteAllowed = this.isRouteAllowed(pathname, allowedRoutes)

    if (!isRouteAllowed) {
      return NextResponse.redirect(new URL('/not-found', this.req.url))
    }
  }
}
