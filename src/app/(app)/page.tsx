import { Title } from '@/shared/components'

export default function HomePage() {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-2">
      <Title>Home</Title>
      <Title color="primary">Teste</Title>
      <Title color="secondary">123</Title>
    </div>
  )
}
