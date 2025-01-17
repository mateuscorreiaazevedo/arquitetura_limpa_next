import { postFactory } from '@/main/factories/post'
import { PostItem } from './_components/post'

export default async function App() {
  const { data } = await postFactory.getAllPosts.execute()

  return (
    <div className="flex flex-col gap-2 p-4">
      {data.map(item => (
        <PostItem key={item.postId} {...item} />
      ))}
    </div>
  )
}
