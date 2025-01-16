import type { PostGateway } from '@/domains/post'
import { PostResponseDTO } from '../dtos/get-all-posts.dto'

export class GetAllPostsUseCase {
  constructor(private gateway: PostGateway) {}

  async execute(): Promise<PostResponseDTO> {
    const response = await this.gateway.getAll()

    return new PostResponseDTO(response)
  }
}
