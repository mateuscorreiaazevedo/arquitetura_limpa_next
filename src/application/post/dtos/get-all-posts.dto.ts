import type { Post } from '@/domains/post'
import { z } from 'zod'

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
      if (post.id && !this.validateId(post.id).safe) {
        throw new Error(this.validateId(post.id).message)
      }
      if (post.title && !this.validateTitle(post.title).safe) {
        throw new Error(this.validateTitle(post.title).message)
      }
      if (post.content && !this.validateContent(post.content).safe) {
        throw new Error(this.validateContent(post.content).message)
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

  private validateId(id: string): ValidationDTO {
    const schemaId = z.string().min(1, { message: 'MIN_LENGTH_ID' }).regex(/^\d+$/, { message: 'ONLY_NUMBERS_ID' })

    return {
      safe: schemaId.safeParse(id).success,
      message: schemaId.safeParse(id).error?.errors[0]?.message ?? '',
    }
  }
  private validateTitle(title: string): ValidationDTO {
    const schemaTitle = z.string().min(10, { message: 'MIN_LENGTH_TITLE' })

    return {
      safe: schemaTitle.safeParse(title).success,
      message: schemaTitle.safeParse(title).error?.errors[0]?.message ?? '',
    }
  }
  private validateContent(content: string): ValidationDTO {
    const schemaContent = z.string().min(10, { message: 'MIN_LENGTH_CONTENT' })

    return {
      safe: schemaContent.safeParse(content).success,
      message: schemaContent.safeParse(content).error?.errors[0]?.message ?? '',
    }
  }
}
