import { PostList } from './_components/post'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-center">Posts</h1>
      <PostList />
    </div>
  )
}
