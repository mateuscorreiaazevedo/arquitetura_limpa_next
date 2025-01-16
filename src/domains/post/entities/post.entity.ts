export interface PostInterface {
  id?: string
  title: string
  content: string
}

export class Post {
  constructor(private post: PostInterface) {}

  get id(): string | undefined {
    return this.post.id
  }

  get title(): string {
    return this.post.title
  }

  get content(): string {
    return this.post.content
  }
}
