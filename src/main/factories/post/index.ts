import { GetAllPostsUseCase } from '@/application/post'
import { AxiosHttpClient } from '@/infra/http'
import { HttpPostService } from '@/infra/services'

const axiosHttpClient = new AxiosHttpClient()

const httpPostService = new HttpPostService(axiosHttpClient)

export const postFactory = {
  getAllPosts: new GetAllPostsUseCase(httpPostService),
}
