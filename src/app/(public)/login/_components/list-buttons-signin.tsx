'use client'

import { AccessLevelEnum, AccessRoleEnum } from '@/main/config/client/client-config-permissions'
import { Button } from '@/shared/components/button'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

interface OptionOfLogin {
  id: string
  accessLevel: AccessLevelEnum
  accessRole: AccessRoleEnum
  label: string
}

export function ListButtonsSignin() {
  const router = useRouter()

  const optionsOfLogin: OptionOfLogin[] = [
    {
      id: '1',
      accessLevel: AccessLevelEnum.ADMIN,
      accessRole: AccessRoleEnum.INTERNAL,
      label: 'Login como administrador interno',
    },
    {
      id: '2',
      accessLevel: AccessLevelEnum.ADMIN,
      accessRole: AccessRoleEnum.EXTERNAL,
      label: 'Login como administrador externo',
    },
    {
      id: '3',
      accessLevel: AccessLevelEnum.MANAGER,
      accessRole: AccessRoleEnum.INTERNAL,
      label: 'Login como gestor interno',
    },
    {
      id: '4',
      accessLevel: AccessLevelEnum.MANAGER,
      accessRole: AccessRoleEnum.EXTERNAL,
      label: 'Login como gestor externo',
    },
    {
      id: '5',
      accessLevel: AccessLevelEnum.EMPLOYEE,
      accessRole: AccessRoleEnum.INTERNAL,
      label: 'Login como colaborador',
    },
  ]

  const handleLogin = useCallback((option: OptionOfLogin) => {
    if (!option) {
      return
    }
    const token = btoa(JSON.stringify({ accessLevel: option.accessLevel, accessRole: option.accessRole }))

    router.push(`/api/auth/signin?sso=${token}`)
  }, [])

  return (
    <div className="flex flex-col gap-3 items-center justify-center w-full">
      {optionsOfLogin.map(option => (
        <Button color="primary" key={option.id} onClick={() => handleLogin(option)}>
          {option.label}
        </Button>
      ))}
    </div>
  )
}
