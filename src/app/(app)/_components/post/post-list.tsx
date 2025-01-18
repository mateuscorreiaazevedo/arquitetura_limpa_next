import { postFactory } from '@/main/factories/post'
import dayjs from 'dayjs'
import { PostItem } from './post-item'

export default async function PostList() {
  const { data, lastUpdated } = await postFactory.getAllPosts.execute()

  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-center">Posts</h1>

      {data.map(item => (
        <PostItem key={item.postId} {...item} />
      ))}

      <span>{dayjs(lastUpdated).format('DD/MM/YYYY')}</span>
    </div>
  )
}
