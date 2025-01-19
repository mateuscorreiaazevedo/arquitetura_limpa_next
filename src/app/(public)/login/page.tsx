import { ListButtonsSignin } from './_components/list-buttons-signin'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <span className="font-bold uppercase mb-10">Login options</span>
      <ListButtonsSignin />
    </div>
  )
}
