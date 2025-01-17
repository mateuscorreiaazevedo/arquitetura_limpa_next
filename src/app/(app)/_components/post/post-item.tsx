import type { IPostResponseDTO } from '@/application/post'

export function PostItem(post: IPostResponseDTO) {
  return (
    <div className="border flex flex-col gap-2 p-4">
      <h2>
        {post.postId} - {post.title}
      </h2>
      <p className="pl-4 italic">{post.content}</p>
    </div>
  )
}
