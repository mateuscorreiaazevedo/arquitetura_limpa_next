import type { Post, PostGateway } from '@/domains/post'
import type { HttpClient } from '@/infra/http/http-client'
import { HttpClientHelper } from '@/infra/utils'

export class HttpPostService implements PostGateway {
  constructor(private httpClient: HttpClient) {}

  async getAll(): Promise<Post[]> {
    const response = await this.httpClient.request<Post[]>({
      url: '/posts',
    })

    const data = HttpClientHelper.validateResponse(response)

    return data
  }
  async getById(id: string): Promise<Post> {
    const response = await this.httpClient.request<Post>({
      url: `/posts/${id}`,
    })

    const data = HttpClientHelper.validateResponse(response)

    return data
  }
}
