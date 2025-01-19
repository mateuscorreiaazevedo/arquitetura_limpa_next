import { Button } from '@/shared/components/button'
import Link from 'next/link'

export default function EmployeeDashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <span>Employee Dashboard Page</span>
      <Link href={'/api/auth/signout'}>
        <Button variant="light">Sign out</Button>
      </Link>
    </div>
  )
}
