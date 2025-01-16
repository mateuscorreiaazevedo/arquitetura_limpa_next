import type { Post } from '../entities/post.entity'

export abstract class PostGateway {
  abstract getAll(): Promise<Post[]>
  abstract getById(id: string): Promise<Post>
  abstract create?(post: Post): Promise<void>
  abstract updateAll?(post: Post): Promise<void>
  abstract updateTitle?(title: string): Promise<void>
  abstract updateContent?(content: string): Promise<void>
  abstract delete?(post: Post): Promise<void>
}
