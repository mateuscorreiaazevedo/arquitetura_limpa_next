import type { Post } from '@/domains/post'
import { GetAllPostsSchema } from '@/infra/schemas/post/get-all-posts.schema'

export interface IPostResponseDTO {
  postId: string
  title: string
  content: string
}

export class PostResponseDTO {
  constructor(private posts: Post[]) {}

  get data(): IPostResponseDTO[] {
    const data: IPostResponseDTO[] = []

    this.posts.forEach(post => {
      if (post.id && !GetAllPostsSchema.validateId(post.id).safe) {
        throw new Error(GetAllPostsSchema.validateId(post.id).message)
      }
      if (post.title && !GetAllPostsSchema.validateTitle(post.title).safe) {
        throw new Error(GetAllPostsSchema.validateTitle(post.title).message)
      }
      if (post.content && !GetAllPostsSchema.validateContent(post.content).safe) {
        throw new Error(GetAllPostsSchema.validateContent(post.content).message)
      }

      data.push({
        postId: post.id ?? '',
        title: post.title,
        content: post.content,
      })
    })

    return data
  }

  get lastUpdated(): string {
    return new Date().toISOString()
  }
}
